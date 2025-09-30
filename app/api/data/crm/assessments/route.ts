import { NextRequest, NextResponse } from 'next/server';
import { getAssessments } from '@/lib/services/crmService';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// GET /api/crm/assessments - Get all partnership assessments with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '50');
    const status = searchParams.get('status') || undefined;
    const readinessLevel = searchParams.get('readinessLevel') || undefined;
    const institutionType = searchParams.get('institutionType') || undefined;
    const priority = searchParams.get('priority') || undefined;
    const sortBy = searchParams.get('sortBy') || 'submitted_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const assessmentsData = await getAssessments(
      page,
      pageSize,
      status,
      readinessLevel,
      institutionType,
      priority,
      sortBy,
      sortOrder
    );

    return NextResponse.json(assessmentsData);

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
  }
}

// PATCH /api/crm/assessments/[id] - Update assessment status/review
export async function PATCH(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const data = await request.json();
    const url = new URL(request.url);
    const assessmentId = url.pathname.split('/').pop();

    // Define the update data type
    type AssessmentUpdate = {
      status?: 'pending' | 'submitted' | 'under_review' | 'approved' | 'declined';
      review_notes?: string | null;
      reviewed_at?: string | null;
      reviewed_by?: string | null;
      // Add other possible update fields as needed
    };

    // Prepare update data with proper typing
    const updateData: AssessmentUpdate = { ...data };

    // Set reviewed_at if changing status to a reviewed state
    if ((data.status === 'under_review' || data.status === 'approved' || data.status === 'declined') && !updateData.reviewed_at) {
      updateData.reviewed_at = new Date().toISOString();
    }

    // Cast to any to bypass type checking for the table that's not in the Database type
    const { data: assessment, error } = await (supabase as any)
      .from('partnership_assessments')
      .update(updateData as any)
      .eq('id', assessmentId)
      .select(`
        *,
        lead_contacts!inner(name, email, organization)
      `)
      .single();

    if (error) {
      console.error('Error updating assessment:', error);
      return NextResponse.json({ error: 'Failed to update assessment' }, { status: 500 });
    }

    return NextResponse.json({ assessment });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}