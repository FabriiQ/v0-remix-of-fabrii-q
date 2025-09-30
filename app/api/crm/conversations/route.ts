import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic';

// Type definitions for the conversation data
interface Contact {
  id?: string;
  name?: string;
  email?: string;
  company?: string;
  organization?: string;
}

interface ContactInteraction {
  id?: string;
  contact_id?: string;
  lead_contacts?: Contact;
  [key: string]: any;
}

interface ConversationAnalytics {
  total_messages?: number;
  conversation_duration_minutes?: number;
  user_engagement_score?: number;
  intent_distribution?: Record<string, any>;
  topics_covered?: string[];
  pain_points_mentioned?: string[];
  buying_signals?: number;
  objections_raised?: string[];
  competitive_mentions?: string[];
  demo_requested?: boolean;
  contact_info_provided?: boolean;
  meeting_requested?: boolean;
  pricing_discussed?: boolean;
  partnership_assessment_completed?: boolean;
  technical_questions?: number;
  business_questions?: number;
  satisfaction_indicators?: Record<string, any>;
  conversion_stage?: string;
  [key: string]: any;
}

interface ConversationTurn {
  id?: string;
  [key: string]: any;
}

interface Conversation {
  id: string;
  session_identifier?: string;
  contact_interactions?: ContactInteraction | ContactInteraction[];
  conversation_analytics?: ConversationAnalytics | ConversationAnalytics[];
  conversation_turns?: ConversationTurn | ConversationTurn[];
  last_interaction_at?: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

// GET - Retrieve conversations with optional filters
export async function GET(request: NextRequest) {
  try {
    // Validate required environment variables
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('[conversations] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables')
      return NextResponse.json(
        { error: 'Server not configured: missing Supabase environment variables' },
        { status: 500 }
      )
    }
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    const supabase: any = createServiceClient()

    // First, get the conversations with related data
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
      .limit(limit)

    if (error) {
      console.error('Error fetching conversations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch conversations' },
        { status: 500 }
      )
    }

    // If no conversations found, return empty array
    if (!conversations || conversations.length === 0) {
      return NextResponse.json({ conversations: [] })
    }

    // Transform the data to match the frontend's expected format
    const transformedConversations = conversations.map((conv: Conversation) => {
      // Get the first contact interaction and its related contact
      const contactInteraction = Array.isArray(conv.contact_interactions) 
        ? conv.contact_interactions[0] || {}
        : conv.contact_interactions || {}
      
      const contact = contactInteraction.lead_contacts || {}
      
      // Get conversation analytics (could be array or object)
      const analytics = Array.isArray(conv.conversation_analytics) 
        ? conv.conversation_analytics[0] 
        : conv.conversation_analytics || {}
      
      // Get conversation turns count
      const conversationTurns = Array.isArray(conv.conversation_turns) 
        ? conv.conversation_turns 
        : []
      
      return {
        id: conv.id,
        session_identifier: conv.session_identifier || conv.id,
        contact_interactions: [{
          ...contactInteraction,
          lead_contacts: contact
        }],
        conversation_analytics: [{
          ...analytics,
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
          conversion_stage: analytics.conversion_stage || 'awareness'
        }],
        last_interaction_at: conv.last_interaction_at || conv.updated_at || conv.created_at,
        created_at: conv.created_at,
        updated_at: conv.updated_at
      }
    })

    return NextResponse.json({ conversations: transformedConversations })
  } catch (error) {
    console.error('Error in GET /api/crm/conversations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create interaction record and update conversation status
export async function POST(request: NextRequest) {
  try {
    const { 
      sessionId, 
      contactId, 
      interactionType, 
      outcome, 
      sentiment = 'neutral',
      topicsDiscussed = [],
      actionItems = [],
      nextSteps,
      handoverToHuman = false,
      metadata = {}
    } = await request.json()

    if (!sessionId || !contactId || !interactionType) {
      return NextResponse.json(
        { error: 'Session ID, contact ID, and interaction type are required' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient() as any

    // Create interaction record
    const { data: interaction, error: interactionError } = await supabase
      .from('contact_interactions')
      .insert({
        contact_id: contactId,
        session_id: sessionId,
        interaction_type: interactionType,
        outcome,
        sentiment,
        topics_discussed: topicsDiscussed,
        action_items: actionItems,
        next_steps: nextSteps,
        metadata: {
          ...metadata,
          handover_requested: handoverToHuman,
          created_via: 'aivy_api'
        }
      })
      .select()
      .single()

    if (interactionError) {
      console.error('Error creating interaction:', interactionError)
      return NextResponse.json(
        { error: 'Failed to create interaction record' },
        { status: 500 }
      )
    }

    // If handover to human is requested, create follow-up task
    if (handoverToHuman) {
      await createHandoverTask(supabase, contactId, sessionId, nextSteps, topicsDiscussed)
    }

    // Update conversation analytics to mark contact info as provided
    await supabase
      .from('conversation_analytics')
      .update({
        contact_info_provided: true,
        last_updated: new Date().toISOString()
      })
      .eq('session_id', sessionId)

    return NextResponse.json({
      success: true,
      interaction,
      handoverCreated: handoverToHuman
    })
  } catch (error) {
    console.error('Error in POST /api/crm/conversations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function createHandoverTask(
  supabase: any, 
  contactId: string, 
  sessionId: string, 
  nextSteps?: string,
  topicsDiscussed: string[] = []
) {
  try {
    // Get conversation summary for task description
    const { data: conversationSummary } = await supabase
      .rpc('get_conversation_history', {
        p_session_id: sessionId,
        p_limit: 10
      })

    const taskDescription = `
AIVY Conversation Handover - Contact requires human assistance

Key Discussion Topics: ${topicsDiscussed.join(', ') || 'General inquiry'}

Recent Conversation Summary:
${conversationSummary?.map((turn: any) => 
  `User: ${turn.user_query}\nAIVY: ${turn.response_content}\n---`
).slice(0, 3).join('\n')}

Next Steps: ${nextSteps || 'Follow up on conversation and address specific needs'}

Please review the full conversation history and contact profile before reaching out.
    `.trim()

    await supabase
      .from('follow_up_tasks')
      .insert({
        contact_id: contactId,
        task_type: 'follow_up',
        task_title: 'AIVY Conversation Handover',
        task_description: taskDescription,
        due_date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
        priority: topicsDiscussed.some(topic => 
          topic.toLowerCase().includes('demo') || 
          topic.toLowerCase().includes('pricing') ||
          topic.toLowerCase().includes('partnership')
        ) ? 'high' : 'medium',
        status: 'pending'
      })
  } catch (error) {
    console.error('Error creating handover task:', error)
  }
}