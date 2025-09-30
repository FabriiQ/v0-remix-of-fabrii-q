import { NextRequest, NextResponse } from 'next/server';
import { getContacts } from '@/lib/services/crmService';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// GET /api/crm/contacts - Get all contacts with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '50');
    const status = searchParams.get('status') || undefined;
    const source = searchParams.get('source') || undefined;
    const search = searchParams.get('search') || undefined;
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const contactsData = await getContacts(
      page,
      pageSize,
      status,
      source,
      search,
      sortBy,
      sortOrder
    );
    
    return NextResponse.json(contactsData);
    
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
  }
}

// POST /api/crm/contacts - Create new contact
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const data = await request.json();
    
    const contactData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      role: data.role,
      lead_status: data.status || 'new',
      source: data.source || 'manual',
      company_size: data.company_size,
      industry: data.industry,
      job_function: data.job_function,
      notes: data.notes,
      company_website: data.website,
      social_links: data.social_links || {},
      metadata: {
        created_via: 'admin_panel',
        created_by: 'admin'
      }
    };

    const { data: contact, error } = await (supabase as any)
      .from('lead_contacts')
      .insert(contactData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating contact:', error);
      return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
    }
    
    // Calculate initial lead score
    if (contact?.id) {
      const { data: scoreResult } = await (supabase as any)
        .rpc('calculate_lead_score', { p_contact_id: contact.id });
      return NextResponse.json({ contact, score: scoreResult });
    }
    
    return NextResponse.json({ contact });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/crm/contacts/[id] - Update contact
export async function PATCH(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const data = await request.json();
    const url = new URL(request.url);
    const contactId = url.pathname.split('/').pop();
    
    if (!contactId) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
    }

    const updateData = { ...data };
    
    const { data: contact, error } = await (supabase as any)
      .from('lead_contacts')
      .update(updateData)
      .eq('id', contactId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating contact:', error);
      return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
    }
    
    // Recalculate lead score if relevant fields changed
    if (contactId && (data.role || data.company_size || data.industry)) {
      await (supabase as any).rpc('calculate_lead_score', { p_contact_id: contactId });
    }
    
    return NextResponse.json({ contact });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}