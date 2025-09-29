import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// GET /api/crm/dashboard - Get CRM dashboard statistics and recent activity
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    
    const timeRange = searchParams.get('timeRange') || '30'; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeRange));
    
    // Local interfaces for non-typed tables
    interface Lead {
      lead_status: string;
      source: string | null;
      created_at: string;
      lead_score: number | null;
    }
    interface ConversationStat {
      session_id: string;
      total_messages: number | null;
      user_engagement_score: number | null;
      demo_requested: boolean | null;
      partnership_assessment_completed: boolean | null;
      conversion_stage: string | null;
      last_updated?: string;
    }
    interface AssessmentStat {
      id: string;
      assessment_score: number | null;
      readiness_level: string | null;
      submitted_at: string;
    }
    interface Activity {
      id: string;
      interaction_type: string;
      interaction_date: string;
      outcome: string | null;
      sentiment: string | null;
      interaction_score: number | null;
      lead_contacts: { name: string; organization: string };
    }
    interface Task {
      id: string;
      task_title: string;
      due_date: string;
      priority: string;
      status: string;
      lead_contacts: { name: string; organization: string };
    }

    // Get lead statistics
    const { data: leadStatsRaw, error: leadError } = await (supabase as any)
      .from('lead_contacts')
      .select('lead_status, source, created_at, lead_score')
      .gte('created_at', startDate.toISOString());
    const leadStats: Lead[] = (leadStatsRaw ?? []) as Lead[];
    
    if (leadError) {
      console.error('Error fetching lead stats:', leadError);
      return NextResponse.json({ error: 'Failed to fetch lead statistics' }, { status: 500 });
    }
    
    // Calculate basic statistics
    const totalLeads = leadStats.length;
    const qualifiedLeads = leadStats.filter((lead: Lead) => 
      ['qualified', 'opportunity', 'proposal', 'negotiation'].includes(lead.lead_status)
    ).length;
    const averageLeadScore = (leadStats.reduce((sum: number, lead: Lead) => sum + (lead.lead_score || 0), 0) / (totalLeads || 1)) || 0;
    const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0;
    
    // Get conversation statistics
    const { data: conversationStatsRaw, error: convError } = await (supabase as any)
      .from('conversation_analytics')
      .select('session_id, total_messages, user_engagement_score, demo_requested, partnership_assessment_completed, conversion_stage')
      .gte('last_updated', startDate.toISOString());
    const conversationStats: ConversationStat[] = (conversationStatsRaw ?? []) as ConversationStat[];
    
    if (convError) {
      console.error('Error fetching conversation stats:', convError);
    }
    
    const activeConversations = conversationStats.length;
    const avgEngagementScore = (conversationStats.reduce((sum: number, conv: ConversationStat) => sum + (conv.user_engagement_score || 0), 0) / (activeConversations || 1)) || 0;
    
    // Get partnership assessment statistics
    const { data: assessmentStatsRaw, error: assessError } = await (supabase as any)
      .from('partnership_assessments')
      .select('id, assessment_score, readiness_level, submitted_at')
      .gte('submitted_at', startDate.toISOString());
    const assessmentStats: AssessmentStat[] = (assessmentStatsRaw ?? []) as AssessmentStat[];
    
    if (assessError) {
      console.error('Error fetching assessment stats:', assessError);
    }
    
    const partnershipAssessments = assessmentStats.length;
    
    // Get recent activities
    const { data: recentActivitiesRaw, error: activityError } = await (supabase as any)
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
      .limit(10);
    const recentActivities: Activity[] = (recentActivitiesRaw ?? []) as Activity[];
    
    if (activityError) {
      console.error('Error fetching recent activities:', activityError);
    }
    
    // Get lead source distribution
    const sourceDistribution = leadStats.reduce((acc: Record<string, number>, lead: Lead) => {
      const src = lead.source || 'unknown';
      acc[src] = (acc[src] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Get lead status distribution
    const statusDistribution = leadStats.reduce((acc: Record<string, number>, lead: Lead) => {
      acc[lead.lead_status] = (acc[lead.lead_status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Get monthly trends
    const monthlyTrends: Record<string, number> = {};
    leadStats.forEach((lead: Lead) => {
      const month = new Date(lead.created_at).toISOString().substring(0, 7); // YYYY-MM format
      monthlyTrends[month] = (monthlyTrends[month] || 0) + 1;
    });
    
    // Get upcoming tasks
    const { data: upcomingTasksRaw, error: taskError } = await (supabase as any)
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
      .limit(10);
    const upcomingTasks: Task[] = (upcomingTasksRaw ?? []) as Task[];
    
    if (taskError) {
      console.error('Error fetching upcoming tasks:', taskError);
    }
    
    // Format response data
    const dashboardData = {
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
      recentActivities: recentActivities.map((activity: Activity) => ({
        id: activity.id,
        type: activity.interaction_type,
        contactName: activity.lead_contacts?.name ?? '',
        organization: activity.lead_contacts?.organization ?? '',
        timestamp: activity.interaction_date,
        outcome: activity.outcome,
        sentiment: activity.sentiment,
        score: activity.interaction_score ?? 0,
        priority: (activity.interaction_score ?? 0) > 50 ? 'high' : 
                 (activity.interaction_score ?? 0) > 25 ? 'medium' : 'low'
      })),
      upcomingTasks: upcomingTasks.map((task: Task) => ({
        id: task.id,
        title: task.task_title,
        contactName: task.lead_contacts?.name ?? '',
        organization: task.lead_contacts?.organization ?? '',
        dueDate: task.due_date,
        priority: task.priority,
        status: task.status
      }))
    };
    
    return NextResponse.json(dashboardData);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}