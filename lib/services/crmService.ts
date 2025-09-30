import { createServerSupabaseClient } from '@/lib/supabase/server';

// Type definitions for assessment data
export interface PartnershipAssessment {
  id: string;
  contact_id: string;
  contact_name: string;
  contact_email: string;
  organization: string;
  institution_name: string;
  institution_type: string;
  campus_count: number;
  student_population: number;
  investment_timeline: string;
  partnership_commitment_level: string;
  assessment_score: number;
  readiness_level: 'initial' | 'exploring' | 'evaluating' | 'ready' | 'committed';
  partnership_priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'submitted' | 'under_review' | 'approved' | 'declined' | 'follow_up_needed';
  submitted_at: string;
  reviewed_at?: string;
  custom_requirements?: string;
  vision_statement?: string;
  lead_contacts?: any;
}

export interface AssessmentStats {
    total: number;
    submitted: number;
    under_review: number;
    approved: number;
    high_priority: number;
    ready_for_partnership: number;
    average_score: number;
    by_institution_type: Record<string, number>;
}

export interface AssessmentsData {
  assessments: PartnershipAssessment[];
  statistics: AssessmentStats;
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export async function getAssessments(
  page: number = 1,
  pageSize: number = 50,
  status?: string,
  readinessLevel?: string,
  institutionType?: string,
  priority?: string,
  sortBy: string = 'submitted_at',
  sortOrder: string = 'desc'
): Promise<AssessmentsData> {
  const supabase = createServerSupabaseClient();

  let query = (supabase.from('partnership_assessments') as any)
      .select(`
        *,
        lead_contacts!inner(*)
      `)
      .range((page - 1) * pageSize, page * pageSize - 1);

  // Apply filters
  if (status && status !== 'all') {
    query = query.eq('status', status);
  }
  if (readinessLevel && readinessLevel !== 'all') {
    query = query.eq('readiness_level', readinessLevel);
  }
  if (institutionType && institutionType !== 'all') {
    query = query.eq('institution_type', institutionType);
  }
  if (priority && priority !== 'all') {
    query = query.eq('partnership_priority', priority);
  }

  // Apply sorting
  query = query.order(sortBy, { ascending: sortOrder === 'asc' });

  const { data: assessments, error } = await query;

  if (error) {
    console.error('Error fetching assessments:', error);
    throw new Error('Failed to fetch assessments');
  }

  const { count: totalCount, error: countError } = await (supabase
    .from('partnership_assessments') as any)
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Error fetching assessments count:', countError);
    throw new Error('Failed to fetch assessments count');
  }

  // Get assessment statistics
  type AssessmentStatsRow = {
    status: string | null
    readiness_level: string | null
    partnership_priority: string | null
    institution_type: string | null
    assessment_score: number | null
  }

  const statsRes = await (supabase
    .from('partnership_assessments') as any)
    .select('status, readiness_level, partnership_priority, institution_type, assessment_score');

  const stats = (statsRes.data as unknown as AssessmentStatsRow[] | null);
  const statsError = statsRes.error;

  if (statsError) {
    console.error('Error fetching assessment stats:', statsError);
  }

  let assessmentStats: AssessmentStats = {
    total: stats?.length || 0,
    submitted: stats?.filter(a => a.status === 'submitted').length || 0,
    under_review: stats?.filter(a => a.status === 'under_review').length || 0,
    approved: stats?.filter(a => a.status === 'approved').length || 0,
    high_priority: stats?.filter(a => a.partnership_priority === 'high' || a.partnership_priority === 'critical').length || 0,
    ready_for_partnership: stats?.filter(a => a.readiness_level === 'ready' || a.readiness_level === 'committed').length || 0,
    average_score: stats?.length ? stats.reduce((sum, a) => sum + (a.assessment_score || 0), 0) / stats.length : 0,
    by_institution_type: (stats || []).reduce((acc, a) => {
      const key = a.institution_type || 'unknown'
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  const transformedAssessments = (assessments || []).map((assessment: any) => {
    const contact = assessment.lead_contacts;
    return {
      ...assessment,
      contact_id: contact?.id || assessment.contact_id,
      contact_name: contact?.name || assessment.primary_contact_name,
      contact_email: contact?.email || assessment.primary_contact_email,
      organization: contact?.organization || assessment.institution_name,
    };
  });

  return {
    assessments: transformedAssessments as PartnershipAssessment[],
    statistics: assessmentStats,
    pagination: {
      page,
      pageSize,
      totalCount: totalCount || 0,
      totalPages: Math.ceil((totalCount || 0) / pageSize)
    }
  };
}

// Type definitions for contact data
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  organization: string;
  role?: string | null;
  lead_status: string;
  source: string;
  created_at: string;
  updated_at: string;
  partnership_assessments: any[];
  conversation_analytics: any[];
  contact_interactions: any[];
  follow_up_tasks: any[];
  // These fields are from the `contacts-client.tsx` and might need to be derived or adjusted
  leadScore: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lastActivity: string;
  tags: string[];
  conversationCount: number;
  hasAssessment: boolean;
  starred: boolean;
}

export interface ContactsData {
  contacts: Contact[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export async function getContacts(
  page: number = 1,
  pageSize: number = 50,
  status?: string,
  source?: string,
  search?: string,
  sortBy: string = 'created_at',
  sortOrder: string = 'desc'
): Promise<ContactsData> {
  const supabase = createServerSupabaseClient();

  let query = supabase
    .from('lead_contacts')
    .select(`
      *,
      partnership_assessments(id, assessment_score, readiness_level, submitted_at),
      conversation_analytics(
        session_id, total_messages, conversation_duration_minutes,
        user_engagement_score, demo_requested, partnership_assessment_completed,
        conversion_stage
      ),
      contact_interactions(id, interaction_type, interaction_date, sentiment),
      follow_up_tasks(id, status, due_date, priority)
    `)
    .range((page - 1) * pageSize, page * pageSize - 1);

  // Apply filters
  if (status && status !== 'all') {
    query = query.eq('lead_status', status);
  }
  if (source && source !== 'all') {
    query = query.eq('source', source);
  }
  if (search) {
    query = query.or(`name.ilike.%${search}%, email.ilike.%${search}%, organization.ilike.%${search}%`);
  }

  // Apply sorting
  query = query.order(sortBy, { ascending: sortOrder === 'asc' });

  const { data: contacts, error } = await query;

  if (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Failed to fetch contacts');
  }

  const { count: totalCount, error: countError } = await supabase
    .from('lead_contacts')
    .select('*', { count: 'exact', head: true });

  if (countError) {
      console.error('Error fetching contacts count:', countError);
      throw new Error('Failed to fetch contacts count');
  }

  const transformedContacts = (contacts || []).map(c => ({
    ...c,
    leadScore: c.lead_score || 0,
    priority: c.priority || 'medium',
    lastActivity: c.last_interaction_at || c.updated_at,
    tags: c.tags || [],
    conversationCount: c.conversation_analytics?.length || 0,
    hasAssessment: c.partnership_assessments?.length > 0,
    starred: c.starred || false,
  }));

  return {
    contacts: transformedContacts as unknown as Contact[],
    pagination: {
      page,
      pageSize,
      totalCount: totalCount || 0,
      totalPages: Math.ceil((totalCount || 0) / pageSize)
    }
  };
}

// Type definitions for conversation data
export interface Conversation {
  id: string;
  session_identifier?: string;
  contact_id?: string;
  contact_name?: string;
  contact_email?: string;
  organization?: string;
  total_messages: number;
  conversation_duration_minutes: number;
  user_engagement_score: number;
  intent_distribution: Record<string, number>;
  topics_covered: string[];
  pain_points_mentioned: string[];
  buying_signals: number;
  objections_raised: string[];
  competitive_mentions: string[];
  demo_requested: boolean;
  contact_info_provided: boolean;
  meeting_requested: boolean;
  pricing_discussed: boolean;
  partnership_assessment_completed: boolean;
  technical_questions: number;
  business_questions: number;
  satisfaction_indicators: Record<string, any>;
  conversion_stage: 'awareness' | 'interest' | 'consideration' | 'evaluation' | 'decision' | 'partnership';
  last_updated: string;
  created_at: string;
}

interface RawConversation {
  id: string;
  session_identifier?: string;
  contact_interactions?: any | any[];
  conversation_analytics?: any | any[];
  conversation_turns?: any | any[];
  last_interaction_at?: string;
  created_at: string;
  updated_at: string;
}

export async function getConversations(limit: number = 50, offset: number = 0): Promise<Conversation[]> {
  const supabase = createServerSupabaseClient();

  const { data: conversations, error } = await supabase
    .from('conversation_sessions')
    .select(`
      *,
      contact_interactions(
        *,
        lead_contacts(*)
      ),
      conversation_analytics(
        *
      ),
      conversation_turns(
        *
      )
    `)
    .order('last_interaction_at', { ascending: false })
    .range(offset, offset + limit - 1)
    .limit(limit);

  if (error) {
    console.error('Error fetching conversations:', error);
    throw new Error('Failed to fetch conversations');
  }

  if (!conversations) {
    return [];
  }

  // Transform the data to match the frontend's expected format
  return conversations.map((conv: RawConversation) => {
    const contactInteraction = Array.isArray(conv.contact_interactions)
      ? conv.contact_interactions[0] || {}
      : conv.contact_interactions || {};
    const contact = contactInteraction.lead_contacts || {};
    const analytics = (Array.isArray(conv.conversation_analytics)
      ? conv.conversation_analytics[0]
      : conv.conversation_analytics) || {};
    const conversationTurns = Array.isArray(conv.conversation_turns) ? conv.conversation_turns : [];

    return {
      id: conv.id,
      session_id: conv.session_identifier || conv.id,
      contact_id: contact.id || contactInteraction.contact_id || null,
      contact_name: contact.name || 'Unknown Contact',
      contact_email: contact.email || '',
      organization: contact.company || contact.organization || 'Unknown Organization',
      total_messages: analytics.total_messages || conversationTurns.length || 0,
      conversation_duration_minutes: analytics.conversation_duration_minutes || 0,
      user_engagement_score: analytics.user_engagement_score || 0,
      intent_distribution: analytics.intent_distribution || {},
      topics_covered: analytics.topics_covered || [],
      pain_points_mentioned: analytics.pain_points_mentioned || [],
      buying_signals: analytics.buying_signals || 0,
      objections_raised: analytics.objections_raised || [],
      competitive_mentions: analytics.competitive_mentions || [],
      demo_requested: analytics.demo_requested || false,
      contact_info_provided: analytics.contact_info_provided || false,
      meeting_requested: analytics.meeting_requested || false,
      pricing_discussed: analytics.pricing_discussed || false,
      partnership_assessment_completed: analytics.partnership_assessment_completed || false,
      technical_questions: analytics.technical_questions || 0,
      business_questions: analytics.business_questions || 0,
      satisfaction_indicators: analytics.satisfaction_indicators || {},
      conversion_stage: analytics.conversion_stage || 'awareness',
      last_updated: conv.last_interaction_at || conv.updated_at || conv.created_at,
      created_at: conv.created_at
    };
  });
}

// Type definitions for task data
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'deferred' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskType = 'call' | 'email' | 'meeting' | 'follow_up' | 'other';

export interface Task {
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

export interface TaskStats {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
  overdue: number;
  high_priority: number;
}

export interface TasksData {
  tasks: Task[];
  statistics: TaskStats;
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export async function getTasks(
  page: number = 1,
  pageSize: number = 50,
  status?: string,
  priority?: string,
  assignedTo?: string,
  contactId?: string,
  dueDateFilter?: string,
  sortBy: string = 'due_date',
  sortOrder: string = 'asc'
): Promise<TasksData> {
  const supabase = createServerSupabaseClient();

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
    throw new Error('Failed to fetch tasks');
  }

  // Get count for pagination
  const { count: totalCount, error: countError } = await supabase
    .from('follow_up_tasks')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Error fetching task count:', countError);
    throw new Error('Failed to fetch task count');
  }

  // Get task statistics
  const { data: stats, error: statsError } = await (supabase as any)
    .from('follow_up_tasks')
    .select('status, priority, due_date, completed_at');

  if (statsError) {
    console.error('Error fetching task stats:', statsError);
    throw new Error('Failed to fetch task stats');
  }

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
  }

  return {
    tasks: (tasks || []) as Task[],
    statistics: taskStats,
    pagination: {
      page,
      pageSize,
      totalCount: totalCount || 0,
      totalPages: Math.ceil((totalCount || 0) / pageSize)
    }
  };
}

type Activity = {
  id: string;
  interaction_type: string;
  interaction_date: string;
  outcome: string | null;
  sentiment: string | null;
  interaction_score: number | null;
  lead_contacts: { name: string; organization: string };
};

type Lead = {
  lead_status: string;
  source: string | null;
  created_at: string;
  lead_score: number | null;
};

type ConversationStat = {
  session_id: string;
  total_messages: number | null;
  user_engagement_score: number | null;
  demo_requested: boolean | null;
  partnership_assessment_completed: boolean | null;
  conversion_stage: string | null;
  last_updated?: string;
};

type AssessmentStat = {
  id: string;
  assessment_score: number | null;
  readiness_level: string | null;
  submitted_at: string;
};

export type DashboardStats = {
  statistics: {
    totalLeads: number;
    qualifiedLeads: number;
    activeConversations: number;
    partnershipAssessments: number;
    conversionRate: number;
    avgEngagementScore: number;
    avgLeadScore: number;
  };
  distributions: {
    bySource: Record<string, number>;
    byStatus: Record<string, number>;
    monthlyTrends: Record<string, number>;
  };
  recentActivities: Array<{
    id: string;
    type: string;
    contactName: string;
    organization: string;
    timestamp: string;
    outcome: string | null;
    sentiment: string | null;
    score: number;
    priority: 'high' | 'medium' | 'low';
  }>;
  upcomingTasks: Array<{
    id: string;
    title: string;
    contactName: string;
    organization: string;
    dueDate: string;
    priority: string;
    status: string;
  }>;
};

export async function getDashboardData(timeRange: string = '30'): Promise<DashboardStats> {
  const supabase = createServerSupabaseClient();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(timeRange));

  // Fetch all data in parallel
  const [
    { data: leadStats, error: leadError },
    { data: conversationStats, error: convError },
    { data: assessmentStats, error: assessError },
    { data: recentActivities, error: activityError },
    { data: upcomingTasks, error: taskError }
  ] = await Promise.all([
    supabase.from('lead_contacts').select('lead_status, source, created_at, lead_score').gte('created_at', startDate.toISOString()),
    supabase.from('conversation_analytics').select('session_id, total_messages, user_engagement_score, demo_requested, partnership_assessment_completed, conversion_stage').gte('last_updated', startDate.toISOString()),
    supabase.from('partnership_assessments').select('id, assessment_score, readiness_level, submitted_at').gte('submitted_at', startDate.toISOString()),
    supabase.from('contact_interactions').select(`id, interaction_type, interaction_date, outcome, sentiment, interaction_score, lead_contacts!inner(name, organization)`).order('interaction_date', { ascending: false }).limit(10),
    supabase.from('follow_up_tasks').select(`id, task_title, due_date, priority, status, lead_contacts!inner(name, organization)`).eq('status', 'pending').gte('due_date', new Date().toISOString()).order('due_date', { ascending: true }).limit(10)
  ]);

  // Handle errors
  if (leadError) throw new Error(`Lead stats error: ${leadError.message}`);
  if (convError) console.error('Conversation stats error:', convError);
  if (assessError) console.error('Assessment stats error:', assessError);
  if (activityError) console.error('Recent activities error:', activityError);
  if (taskError) console.error('Upcoming tasks error:', taskError);

  // Process lead statistics
  const leadData = (leadStats || []) as unknown as Lead[];
  const totalLeads = leadData.length;
  const qualifiedLeads = leadData.filter(lead => ['qualified', 'opportunity', 'proposal', 'negotiation'].includes(lead.lead_status)).length;
  const averageLeadScore = totalLeads > 0 ? leadData.reduce((sum, lead) => sum + (lead.lead_score || 0), 0) / totalLeads : 0;
  const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0;

  // Process conversation statistics
  const conversationData = (conversationStats || []) as unknown as ConversationStat[];
  const activeConversations = conversationData.length;
  const avgEngagementScore = activeConversations > 0 ? conversationData.reduce((sum, conv) => sum + (conv.user_engagement_score || 0), 0) / activeConversations : 0;

  // Process assessment statistics
  const assessmentData = (assessmentStats || []) as unknown as AssessmentStat[];
  const partnershipAssessments = assessmentData.length;

  // Process distributions
  const sourceDistribution = leadData.reduce((acc, lead) => {
    const src = lead.source || 'unknown';
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusDistribution = leadData.reduce((acc, lead) => {
    acc[lead.lead_status] = (acc[lead.lead_status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const monthlyTrends = leadData.reduce((acc, lead) => {
    const month = new Date(lead.created_at).toISOString().substring(0, 7);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Format response
  return {
    statistics: {
      totalLeads,
      qualifiedLeads,
      activeConversations,
      partnershipAssessments,
      conversionRate: Math.round(conversionRate * 100) / 100,
      avgEngagementScore: Math.round(avgEngagementScore * 100) / 100,
      avgLeadScore: Math.round(averageLeadScore)
    },
    distributions: {
      bySource: sourceDistribution,
      byStatus: statusDistribution,
      monthlyTrends
    },
    recentActivities: ((recentActivities || []) as unknown as Activity[]).map(activity => ({
      id: activity.id,
      type: activity.interaction_type,
      contactName: activity.lead_contacts?.name || '',
      organization: activity.lead_contacts?.organization || '',
      timestamp: activity.interaction_date,
      outcome: activity.outcome,
      sentiment: activity.sentiment,
      score: activity.interaction_score || 0,
      priority: (activity.interaction_score || 0) > 50 ? 'high' : (activity.interaction_score || 0) > 25 ? 'medium' : 'low'
    })),
    upcomingTasks: ((upcomingTasks || []) as unknown as Task[]).map(task => ({
      id: task.id,
      title: task.task_title,
      contactName: task.lead_contacts?.name || '',
      organization: task.lead_contacts?.organization || '',
      dueDate: task.due_date,
      priority: task.priority,
      status: task.status
    }))
  };
}