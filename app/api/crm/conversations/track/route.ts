import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type ConversationTurn = {
  id?: string;
  session_id: string;
  user_query: string;
  response_content: string;
  intent_analysis: {
    timestamp: string;
    platform: string;
    [key: string]: any;
  };
  knowledge_sources: any[];
  response_metrics: {
    wordCount: number;
    executiveAppropriate: number;
    conversationalFlow: number;
    actionOriented: number;
    strategicInsight: number;
  };
  created_at?: string;
  updated_at?: string;
};

type ConversationAnalytics = {
  id?: string;
  session_id: string;
  total_messages: number;
  topics_covered: string[];
  pain_points_mentioned: string[];
  buying_signals: number;
  contact_info_provided: boolean;
  meeting_requested: boolean;
  pricing_discussed: boolean;
  technical_questions: number;
  business_questions: number;
  last_updated: string;
  conversation_duration_minutes: number;
  user_engagement_score: number;
};

export async function POST(request: NextRequest) {
  try {
    const { sessionId, userMessage, botResponse, timestamp, metadata = {} } = await request.json()

    if (!sessionId || !userMessage || !botResponse) {
      return NextResponse.json(
        { error: 'Session ID, user message, and bot response are required' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // First, get or create conversation session
    const { data: sessionData, error: sessionError } = await (supabase as any)
      .rpc('get_or_create_conversation_session', {
        p_session_identifier: sessionId,
        p_user_id: null // Will be null for anonymous AIVY sessions initially
      })

    if (sessionError) {
      console.error('Error creating/getting session:', sessionError)
      return NextResponse.json(
        { error: 'Failed to create conversation session' },
        { status: 500 }
      )
    }

    const conversationSessionId = sessionData

    // Save the conversation turn
    const conversationTurn: Omit<ConversationTurn, 'id' | 'created_at' | 'updated_at'> = {
      session_id: conversationSessionId,
      user_query: userMessage,
      response_content: botResponse,
      intent_analysis: {
        timestamp: timestamp || new Date().toISOString(),
        platform: 'aivy',
        ...metadata
      },
      knowledge_sources: [],
      response_metrics: {
        wordCount: botResponse.split(' ').length,
        executiveAppropriate: 1,
        conversationalFlow: 1,
        actionOriented: botResponse.includes('demo') || botResponse.includes('schedule') ? 1 : 0,
        strategicInsight: botResponse.includes('partnership') || botResponse.includes('AI') ? 1 : 0
      }
    };

    const { data: savedTurn, error: turnError } = await (supabase as any)
      .from('conversation_turns')
      .insert(conversationTurn)
      .select('id')
      .single()

    if (turnError) {
      console.error('Error saving conversation turn:', turnError)
      return NextResponse.json(
        { error: 'Failed to save conversation turn' },
        { status: 500 }
      )
    }

    // Update conversation analytics
    await updateConversationAnalytics(supabase, conversationSessionId, userMessage, botResponse)

    return NextResponse.json({ 
      success: true, 
      conversationTurnId: savedTurn?.id,
      sessionId: conversationSessionId
    })
  } catch (error) {
    console.error('Error tracking conversation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function updateConversationAnalytics(
  supabase: any,
  sessionId: string,
  userMessage: string,
  botResponse: string
) {
  try {
    // Get existing analytics or create new one
    const { data: existingAnalytics, error: fetchError } = await supabase
      .from('conversation_analytics')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // Not found error
      console.error('Error fetching analytics:', fetchError)
      return
    }

    const topics = extractTopics(userMessage, botResponse)
    const painPoints = extractPainPoints(userMessage)
    const buyingSignals = countBuyingSignals(userMessage, botResponse)
    
    const analyticsData: Omit<ConversationAnalytics, 'id'> = {
      session_id: sessionId,
      total_messages: (existingAnalytics?.total_messages || 0) + 1,
      topics_covered: Array.from(new Set([
        ...(existingAnalytics?.topics_covered || []),
        ...topics
      ])),
      pain_points_mentioned: Array.from(new Set([
        ...(existingAnalytics?.pain_points_mentioned || []),
        ...painPoints
      ])),
      buying_signals: (existingAnalytics?.buying_signals || 0) + buyingSignals,
      user_engagement_score: calculateEngagementScore(userMessage, botResponse),
      contact_info_provided: existingAnalytics?.contact_info_provided || false,
      meeting_requested: (existingAnalytics?.meeting_requested || false) || 
        userMessage.toLowerCase().includes('meeting') || 
        userMessage.toLowerCase().includes('schedule'),
      pricing_discussed: (existingAnalytics?.pricing_discussed || false) || 
        userMessage.toLowerCase().includes('price') || 
        userMessage.toLowerCase().includes('cost'),
      technical_questions: (existingAnalytics?.technical_questions || 0) + 
        (userMessage.toLowerCase().includes('how') || userMessage.toLowerCase().includes('integrate') ? 1 : 0),
      business_questions: (existingAnalytics?.business_questions || 0) + 
        (userMessage.toLowerCase().includes('business') || userMessage.toLowerCase().includes('roi') ? 1 : 0),
      conversation_duration_minutes: existingAnalytics?.conversation_duration_minutes || 0,
      last_updated: new Date().toISOString()
    };

    const { error: upsertError } = await supabase
      .from('conversation_analytics')
      .upsert({
        ...analyticsData,
        ...(existingAnalytics?.id && { id: existingAnalytics.id })
      })

    if (upsertError) {
      console.error('Error updating conversation analytics:', upsertError)
    }
  } catch (error) {
    console.error('Error in updateConversationAnalytics:', error)
  }
}

// Helper functions
function extractTopics(userMessage: string, botResponse: string): string[] {
  // Simple keyword-based topic extraction
  const topics: string[] = [];
  
  const topicKeywords: Record<string, string> = {
    'partnership': 'Partnership',
    'collaborat': 'Collaboration',
    'pricing': 'Pricing',
    'demo': 'Demo',
    'integrat': 'Integration',
    'api': 'API',
    'onboard': 'Onboarding',
    'support': 'Support',
    'feature': 'Features',
    'enterprise': 'Enterprise'
  };

  const message = `${userMessage} ${botResponse}`.toLowerCase();
  
  for (const [keyword, topic] of Object.entries(topicKeywords)) {
    if (message.includes(keyword) && !topics.includes(topic)) {
      topics.push(topic);
    }
  }
  
  return topics;
}

function extractPainPoints(userMessage: string): string[] {
  // Simple keyword-based pain point extraction
  const painPoints: string[] = [];
  
  const painPointKeywords: Record<string, string> = {
    'expensive': 'Cost concerns',
    'cost': 'Budget constraints',
    'hard to use': 'Usability issues',
    'complicated': 'Complexity',
    'slow': 'Performance issues',
    'bug': 'Bugs/issues',
    'missing feature': 'Missing features',
    'support': 'Lack of support',
    'documentation': 'Lack of documentation',
    'learning curve': 'Steep learning curve'
  };
  
  const message = userMessage.toLowerCase();
  
  for (const [keyword, painPoint] of Object.entries(painPointKeywords)) {
    if (message.includes(keyword) && !painPoints.includes(painPoint)) {
      painPoints.push(painPoint);
    }
  }
  
  return painPoints;
}

function countBuyingSignals(userMessage: string, botResponse: string): number {
  // Count potential buying signals in the conversation
  const buyingSignalKeywords = [
    'interested',
    'pricing',
    'trial',
    'demo',
    'schedule',
    'meeting',
    'contact',
    'talk to sales',
    'get started',
    'sign up'
  ];
  
  const message = `${userMessage} ${botResponse}`.toLowerCase();
  return buyingSignalKeywords.filter(keyword => message.includes(keyword)).length;
}

function calculateEngagementScore(userMessage: string, botResponse: string): number {
  // Simple engagement score based on message length and interaction
  let score = 0;
  
  // Base score on message length (up to 5 points)
  score += Math.min(userMessage.length / 50, 5);
  
  // Bonus for questions
  if (userMessage.includes('?') || userMessage.toLowerCase().includes('how ') || userMessage.toLowerCase().includes('what ')) {
    score += 2;
  }
  
  // Bonus for specific engagement terms
  const engagementTerms = ['demo', 'schedule', 'meeting', 'trial', 'pricing'];
  if (engagementTerms.some(term => userMessage.toLowerCase().includes(term))) {
    score += 3;
  }
  
  // Ensure score is between 1-10
  return Math.min(Math.max(Math.round(score), 1), 10);
}
