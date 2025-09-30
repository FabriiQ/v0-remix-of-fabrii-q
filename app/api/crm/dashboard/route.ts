import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Activity = {
  id: string;
  interaction_type: string;
  interaction_date: string;
  outcome: string | null;
  sentiment: string | null;
  interaction_score: number | null;
  lead_contacts: { name: string; organization: string };
};

type Task = {
  id: string;
  task_title: string;
  due_date: string;
  priority: string;
  status: string;
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

type DashboardStats = {
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

// GET /api/crm/dashboard - Get CRM dashboard statistics and recent activity
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    
    // Default to last 30 days of data
    const timeRange = searchParams.get('timeRange') || '30';
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
      // Lead statistics
      supabase
        .from('lead_contacts')
        .select('lead_status, source, created_at, lead_score')
        .gte('created_at', startDate.toISOString()),
        
      // Conversation statistics
      supabase
        .from('conversation_analytics')
        .select('session_id, total_messages, user_engagement_score, demo_requested, partnership_assessment_completed, conversion_stage')
        .gte('last_updated', startDate.toISOString()),
        
      // Assessment statistics
      supabase
        .from('partnership_assessments')
        .select('id, assessment_score, readiness_level, submitted_at')
        .gte('submitted_at', startDate.toISOString()),
        
      // Recent activities
      supabase
        .from('contact_interactions')
        .select(`
          id,
          interaction_type,
          interaction_date,
          outcome,
          sentiment,
          interaction_score,
          lead_contacts!inner(name, organization)
        `)
        .order('interaction_date', { ascending: false })
        .limit(10),
        
      // Upcoming tasks
      supabase
        .from('follow_up_tasks')
        .select(`
          id,
          task_title,
          due_date,
          priority,
          status,
          lead_contacts!inner(name, organization)
        `)
        .eq('status', 'pending')
        .gte('due_date', new Date().toISOString())
        .order('due_date', { ascending: true })
        .limit(10)
    ]);

    // Handle errors
    if (leadError) throw new Error(`Lead stats error: ${leadError.message}`);
    if (convError) console.error('Conversation stats error:', convError);
    if (assessError) console.error('Assessment stats error:', assessError);
    if (activityError) console.error('Recent activities error:', activityError);
    if (taskError) console.error('Upcoming tasks error:', taskError);

    // Process lead statistics
    const leadData = leadStats as unknown as Lead[];
    const totalLeads = leadData.length;
    const qualifiedLeads = leadData.filter(lead => 
      ['qualified', 'opportunity', 'proposal', 'negotiation'].includes(lead.lead_status)
    ).length;
    const averageLeadScore = leadData.length > 0 
      ? leadData.reduce((sum, lead) => sum + (lead.lead_score || 0), 0) / leadData.length 
      : 0;
    const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0;

    // Process conversation statistics
    const conversationData = (conversationStats || []) as unknown as ConversationStat[];
    const activeConversations = conversationData.length;
    const avgEngagementScore = activeConversations > 0
      ? conversationData.reduce((sum, conv) => sum + (conv.user_engagement_score || 0), 0) / activeConversations
      : 0;

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
    const response: DashboardStats = {
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
        priority: (activity.interaction_score || 0) > 50 ? 'high' : 
                 (activity.interaction_score || 0) > 25 ? 'medium' : 'low'
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

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}