import { NextRequest, NextResponse } from 'next/server';
import { getConversations } from '@/lib/services/crmService';
import { createServiceClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET - Retrieve conversations with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const conversations = await getConversations(limit, offset);

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Error in GET /api/crm/conversations:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
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