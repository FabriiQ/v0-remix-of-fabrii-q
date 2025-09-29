import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'deferred' | 'cancelled';
type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
type TaskType = 'call' | 'email' | 'meeting' | 'follow_up' | 'other';

interface Task {
  id: string;
  contact_id: string;
  task_type: TaskType;
  task_title: string;
  task_description: string | null;
  due_date: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigned_to: string | null;
  created_by: string;
  completed_at: string | null;
  result: string | null;
  created_at: string;
  updated_at: string;
  lead_contacts?: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    organization: string | null;
    role: string | null;
    lead_status: string | null;
    lead_score: number | null;
  };
}

interface TaskStats {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
  overdue: number;
  high_priority: number;
}

// GET /api/crm/tasks - Get all follow-up tasks with filtering
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '50');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assignedTo = searchParams.get('assignedTo');
    const contactId = searchParams.get('contactId'); // Add contactId filter
    const dueDateFilter = searchParams.get('dueDateFilter'); // 'overdue', 'today', 'upcoming'
    const sortBy = searchParams.get('sortBy') || 'due_date';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    
    let query = supabase
      .from('follow_up_tasks')
      .select(`
        id,
        task_type,
        task_title,
        task_description,
        due_date,
        priority,
        status,
        assigned_to,
        created_by,
        completed_at,
        result,
        created_at,
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
      .range((page - 1) * pageSize, page * pageSize - 1);
    
    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    
    if (priority && priority !== 'all') {
      query = query.eq('priority', priority);
    }
    
    if (assignedTo) {
      query = query.eq('assigned_to', assignedTo);
    }
    
    if (contactId) {
      query = query.eq('contact_id', contactId);
    }
    
    // Date filters
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    if (dueDateFilter === 'overdue') {
      query = query.lt('due_date', today.toISOString()).neq('status', 'completed');
    } else if (dueDateFilter === 'today') {
      query = query.gte('due_date', today.toISOString()).lt('due_date', tomorrow.toISOString());
    } else if (dueDateFilter === 'upcoming') {
      query = query.gte('due_date', tomorrow.toISOString());
    }
    
    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });
    
    const { data: tasks, error } = await query;
    
    if (error) {
      console.error('Error fetching tasks:', error);
      return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
    
    // Get count for pagination
    const { count: totalCount, error: countError } = await supabase
      .from('follow_up_tasks')
      .select('*', { count: 'exact', head: true });
    
    // Get task statistics
    const { data: stats, error: statsError } = await (supabase as any)
      .from('follow_up_tasks')
      .select('status, priority, due_date, completed_at');
    
    // Initialize stats with default values
    const taskStats: TaskStats = {
      total: 0,
      pending: 0,
      in_progress: 0,
      completed: 0,
      overdue: 0,
      high_priority: 0
    };
    
    if (stats && Array.isArray(stats)) {
      taskStats.total = stats.length;
      taskStats.pending = stats.filter((t: any) => t.status === 'pending').length;
      taskStats.in_progress = stats.filter((t: any) => t.status === 'in_progress').length;
      taskStats.completed = stats.filter((t: any) => t.status === 'completed').length;
      taskStats.overdue = stats.filter((t: any) => 
        t.status !== 'completed' && 
        t.due_date && 
        new Date(t.due_date) < now
      ).length;
      taskStats.high_priority = stats.filter((t: any) => 
        t.priority === 'high' || t.priority === 'urgent'
      ).length;
    };
    
    return NextResponse.json({
      tasks,
      statistics: taskStats,
      pagination: {
        page,
        pageSize,
        totalCount: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / pageSize)
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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