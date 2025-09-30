import { NextRequest, NextResponse } from 'next/server';
import { getTasks, Task, TaskPriority, TaskStatus } from '@/lib/services/crmService';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// GET /api/crm/tasks - Get all follow-up tasks with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '50');
    const status = searchParams.get('status') || undefined;
    const priority = searchParams.get('priority') || undefined;
    const assignedTo = searchParams.get('assignedTo') || undefined;
    const contactId = searchParams.get('contactId') || undefined;
    const dueDateFilter = searchParams.get('dueDateFilter') || undefined;
    const sortBy = searchParams.get('sortBy') || 'due_date';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    const tasksData = await getTasks(
      page,
      pageSize,
      status,
      priority,
      assignedTo,
      contactId,
      dueDateFilter,
      sortBy,
      sortOrder
    );

    return NextResponse.json(tasksData);

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
  }
}

// POST /api/crm/tasks - Create new task
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const data = await request.json();

    const taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'completed_at' | 'result'> = {
      contact_id: data.contact_id,
      task_type: data.task_type,
      task_title: data.task_title,
      task_description: data.task_description,
      due_date: data.due_date,
      priority: (data.priority || 'medium') as TaskPriority,
      status: (data.status || 'pending') as TaskStatus,
      assigned_to: data.assigned_to,
      created_by: data.created_by
    };

    const { data: task, error } = await (supabase as any)
      .from('follow_up_tasks')
      .insert([taskData])
      .select(`
        *,
        lead_contacts!inner(name, email, organization)
      `)
      .single();

    if (error) {
      console.error('Error creating task:', error);
      return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }

    return NextResponse.json({ task });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/crm/tasks/[id] - Update task
export async function PATCH(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const data = await request.json();
    const url = new URL(request.url);
    const taskId = url.pathname.split('/').pop();

    // Prepare update data with proper typing
    const updateData: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>> = { ...data };

    // Set completed_at if marking as completed
    if (data.status === 'completed' && !updateData.completed_at) {
      updateData.completed_at = new Date().toISOString();
    }

    const { data: task, error } = await (supabase as any)
      .from('follow_up_tasks')
      .update(updateData as any)
      .eq('id', taskId)
      .select(`
        *,
        lead_contacts!inner(name, email, organization)
      `)
      .single();

    if (error) {
      console.error('Error updating task:', error);
      return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }

    return NextResponse.json({ task });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}