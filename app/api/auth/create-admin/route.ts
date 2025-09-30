import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/database.types'

// Use the exported supabase instance for admin operations
const supabase = createServiceClient()

interface CreateAdminRequest {
  email: string
  password: string
  fullName: string
}

interface AdminResponse {
  message?: string
  user?: {
    id: string
    email: string
    role: string
  }
  error?: string
}

interface AdminCheckResponse {
  hasAdmin: boolean
  message: string
  error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<AdminResponse>> {
  try {
    const { email, password, fullName } = await request.json() as Partial<CreateAdminRequest>

    if (!email || !password || !fullName) {
      return NextResponse.json<AdminResponse>(
        { 
          message: 'Validation failed',
          error: 'Email, password, and full name are required' 
        },
        { status: 400 }
      )
    }

    // Use Supabase Admin client to create user without email confirmation
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      // @ts-ignore - Supabase types might be outdated
      email: email as string,
      password: password as string,
      email_confirm: true, // Skip email confirmation
      user_metadata: {
        full_name: fullName,
        role: 'admin'
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      return NextResponse.json<AdminResponse>(
        { 
          message: 'Authentication failed',
          error: authError.message 
        },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json<AdminResponse>(
        { 
          message: 'User creation failed',
          error: 'Failed to create user' 
        },
        { status: 400 }
      )
    }

    // Use a type assertion to help TypeScript understand the shape of the data
    const userProfile = {
      user_id: authData.user.id,
      full_name: fullName,
      role: 'admin' as const,
      avatar_url: null,
      is_active: true,
      preferences: {
        notifications: true,
        theme: 'light' as const,
        language: 'en' as const
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as const

    const { error: profileError } = await (supabase as any)
      .from('user_profiles')
      .insert(userProfile)
      .select()
      .single()

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Try to clean up the created auth user if profile creation fails
      await (supabase as any).auth.admin.deleteUser(authData.user.id)
      return NextResponse.json<AdminResponse>(
        { 
          message: 'Profile creation failed',
          error: 'Failed to create user profile' 
        },
        { status: 500 }
      )
    }

    const response: AdminResponse = {
      message: 'Admin user created successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email!,
        role: 'admin'
      }
    };
    return NextResponse.json<AdminResponse>(response)

  } catch (error: any) {
    console.error('Unexpected error:', error)
    return NextResponse.json<AdminResponse>(
      { 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      },
      { status: 500 }
    )
  }
}

// This endpoint should only be available during development/setup
export async function GET(): Promise<NextResponse<AdminCheckResponse>> {
  // Check if admin already exists
  try {
    const { data: existingAdmins, error } = await (supabase as any)
      .from('user_profiles')
      .select('id')
      .eq('role', 'admin')
      .limit(1)

    if (error) {
      return NextResponse.json<AdminCheckResponse>(
        { 
          hasAdmin: false,
          message: 'Failed to check existing admins',
          error: error.message 
        },
        { status: 500 }
      )
    }

    const hasAdmin = existingAdmins && existingAdmins.length > 0
    const response: AdminCheckResponse = {
      hasAdmin,
      message: hasAdmin 
        ? 'Admin user already exists' 
        : 'No admin user found'
    }
    return NextResponse.json<AdminCheckResponse>(response)
  } catch (error) {
    return NextResponse.json<AdminCheckResponse>(
      { 
        hasAdmin: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      },
      { status: 500 }
    )
  }
}