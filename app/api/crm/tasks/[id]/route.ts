import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// Define the task update data type
type TaskUpdateData = {
  id?: string;
  title?: string;
  description?: string | null;
  due_date?: string | null;
  status?: string;
  priority?: string;
  completed_at?: string | null;
  assigned_to?: string | null;
  lead_contact_id?: string | null;
  created_at?: string;
  updated_at?: string;
  created_by?: string | null;
};

// PATCH /api/crm/tasks/[id] - Update task
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createServerSupabaseClient();
    const data = await request.json();
    const { id: taskId } = await params;
    
    // Prepare update data with proper typing
    const updateData: Partial<TaskUpdateData> = { ...data };
    
    // Set completed_at if marking as completed
    if (data.status === 'completed' && !updateData.completed_at) {
      updateData.completed_at = new Date().toISOString();
    }
    
    const { data: task, error } = await (supabase as any)
      .from('follow_up_tasks')
      .update(updateData)
      .eq('id', taskId)
      .select(`
        *,
        lead_contacts!inner(
          id,
          name,
          email,
          phone,
          organization,
          role,
          lead_status,
          lead_score
        )
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

// DELETE /api/crm/tasks/[id] - Delete task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createServerSupabaseClient();
    const { id: taskId } = await params;
    
    const { error } = await supabase
      .from('follow_up_tasks')
      .delete()
      .eq('id', taskId);
    
    if (error) {
      console.error('Error deleting task:', error);
      return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}