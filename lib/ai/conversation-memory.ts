// AIVY Conversation Memory Service
// Handles executive-level conversation context, session management, and intent analysis

import { createServiceClient } from '@/lib/supabase/server'
import type {
  ExecutiveProfile,
  ConversationState,
  IntentAnalysis,
  ConversationTurn,
  LeadContact,
  AppConversationTurn,
  AppLeadContact
} from './conversation-memory.types'

export class AIVYConversationMemory {
  private supabase = createServiceClient() as any // Cast to any to bypass type checking for now

  async getOrCreateSession(sessionIdentifier: string, userId?: string): Promise<string> {
    // Convert non-UUID user IDs to null for anonymous users
    let processedUserId = null
    if (userId && userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      processedUserId = userId
    }
    
    const { data, error } = await this.supabase
      .rpc('get_or_create_conversation_session', {
        p_session_identifier: sessionIdentifier,
        p_user_id: processedUserId
      })

    if (error) {
      console.error('Error creating/getting session:', error)
      throw new Error(`Failed to manage session: ${error.message}`)
    }

    return data
  }

  async getSessionContext(sessionId: string): Promise<{
    executiveProfile: ExecutiveProfile
    conversationState: ConversationState
    recentHistory: ConversationTurn[]
  }> {
    // Get session data
    const { data: sessionData, error: sessionError } = await this.supabase
      .from('conversation_sessions')
      .select('executive_profile, conversation_state')
      .eq('id', sessionId)
      .single()

    if (sessionError) {
      console.error('Error fetching session:', sessionError)
      return {
        executiveProfile: {},
        conversationState: {
          engagementLevel: 'initial',
          discussedTopics: [],
          expressedChallenges: [],
          decisionCriteria: [],
          institutionContext: {}
        },
        recentHistory: []
      }
    }

    // Get recent conversation history
    const { data: historyData, error: historyError } = await this.supabase
      .rpc('get_conversation_history', {
        p_session_id: sessionId,
        p_limit: 5
      })

    const recentHistory: ConversationTurn[] = historyError ? [] : (historyData || []).map((turn: any) => ({
      id: turn.turn_id,
      userQuery: turn.user_query,
      responseContent: turn.response_content,
      intentAnalysis: turn.intent_analysis || {
        primaryIntent: '',
        executiveContext: {},
        strategicFocus: []
      },
      knowledgeSources: [],
      responseMetrics: {},
      createdAt: new Date(turn.created_at)
    }))

    return {
      executiveProfile: sessionData.executive_profile || {},
      conversationState: sessionData.conversation_state || {
        engagementLevel: 'initial',
        discussedTopics: [],
        expressedChallenges: [],
        decisionCriteria: [],
        institutionContext: {}
      },
      recentHistory: recentHistory.reverse() // Reverse to get chronological order
    }
  }

  async analyzeIntent(query: string, context: {
    executiveProfile: ExecutiveProfile
    conversationState: ConversationState
    recentHistory: ConversationTurn[]
  }): Promise<IntentAnalysis> {
    // Simple rule-based intent classification (can be enhanced with ML later)
    const queryLower = query.toLowerCase()
    
    // Determine primary intent
    let primaryIntent: IntentAnalysis['primaryIntent'] = 'information_seeking'
    let confidence = 0.7

    // Decision support patterns
    if (queryLower.includes('roi') || queryLower.includes('cost') || queryLower.includes('budget') ||
        queryLower.includes('implementation') || queryLower.includes('timeline') ||
        queryLower.includes('decision') || queryLower.includes('evaluate')) {
      primaryIntent = 'decision_support'
      confidence = 0.85
    }
    // Problem solving patterns
    else if (queryLower.includes('challenge') || queryLower.includes('problem') ||
             queryLower.includes('struggling') || queryLower.includes('difficult') ||
             queryLower.includes('issue') || queryLower.includes('solution')) {
      primaryIntent = 'problem_solving'
      confidence = 0.8
    }
    // Relationship building patterns
    else if (queryLower.includes('partner') || queryLower.includes('work together') ||
             queryLower.includes('collaboration') || queryLower.includes('next step') ||
             queryLower.includes('meeting') || queryLower.includes('demo')) {
      primaryIntent = 'relationship_building'
      confidence = 0.75
    }

    // Determine urgency
    let urgency: 'low' | 'medium' | 'high' = 'medium'
    if (queryLower.includes('urgent') || queryLower.includes('immediate') || 
        queryLower.includes('asap') || queryLower.includes('quickly')) {
      urgency = 'high'
    } else if (queryLower.includes('future') || queryLower.includes('eventually') ||
               queryLower.includes('planning') || queryLower.includes('considering')) {
      urgency = 'low'
    }

    // Determine decision stage
    let decisionStage: 'awareness' | 'consideration' | 'evaluation' | 'decision' = 'awareness'
    if (queryLower.includes('compare') || queryLower.includes('vs') || 
        queryLower.includes('alternative') || queryLower.includes('option')) {
      decisionStage = 'evaluation'
    } else if (queryLower.includes('how') || queryLower.includes('implementation') ||
               queryLower.includes('process') || queryLower.includes('step')) {
      decisionStage = 'consideration'
    } else if (queryLower.includes('approve') || queryLower.includes('buy') ||
               queryLower.includes('purchase') || queryLower.includes('contract')) {
      decisionStage = 'decision'
    }

    // Determine authority level based on profile and language
    let authorityLevel: 'influencer' | 'decision_maker' | 'budget_holder' = 'influencer'
    if (context.executiveProfile.role?.toLowerCase().includes('president') ||
        context.executiveProfile.role?.toLowerCase().includes('ceo') ||
        context.executiveProfile.role?.toLowerCase().includes('chancellor')) {
      authorityLevel = 'budget_holder'
    } else if (context.executiveProfile.role?.toLowerCase().includes('director') ||
               context.executiveProfile.role?.toLowerCase().includes('dean') ||
               queryLower.includes('budget') || queryLower.includes('funding')) {
      authorityLevel = 'decision_maker'
    }

    // Extract key topics
    const keyTopics = []
    const topicPatterns = {
      'enrollment': ['enrollment', 'student registration', 'admission'],
      'financial': ['financial', 'fee', 'tuition', 'payment', 'billing'],
      'academic': ['academic', 'curriculum', 'course', 'grading', 'assessment'],
      'analytics': ['analytics', 'reporting', 'data', 'insights', 'metrics'],
      'communication': ['communication', 'notification', 'messaging', 'engagement'],
      'multi-campus': ['multi-campus', 'multiple campus', 'branch', 'location'],
      'ai': ['ai', 'artificial intelligence', 'automation', 'intelligent']
    }

    for (const [topic, patterns] of Object.entries(topicPatterns)) {
      if (patterns.some(pattern => queryLower.includes(pattern))) {
        keyTopics.push(topic)
      }
    }

    // Strategic focus areas
    const strategicFocus = []
    if (queryLower.includes('scale') || queryLower.includes('growth') || queryLower.includes('expansion')) {
      strategicFocus.push('scalability')
    }
    if (queryLower.includes('efficiency') || queryLower.includes('streamline') || queryLower.includes('optimize')) {
      strategicFocus.push('operational_efficiency')
    }
    if (queryLower.includes('student') && (queryLower.includes('success') || queryLower.includes('outcome'))) {
      strategicFocus.push('student_success')
    }
    if (queryLower.includes('competitive') || queryLower.includes('advantage') || queryLower.includes('differentiate')) {
      strategicFocus.push('competitive_advantage')
    }

    return {
      primaryIntent,
      confidence,
      executiveContext: {
        urgency,
        decisionStage,
        authorityLevel
      },
      keyTopics,
      strategicFocus
    }
  }

  async saveConversationTurn(
    sessionId: string,
    userQuery: string,
    responseContent: string,
    intentAnalysis: IntentAnalysis,
    knowledgeSources: any[]
  ): Promise<void> {
    // Calculate response metrics
    const wordCount = responseContent.split(/\s+/).length
    const responseMetrics = {
      wordCount,
      executiveAppropriate: wordCount >= 50 && wordCount <= 200 ? 1 : 0.5,
      conversationalFlow: responseContent.includes('?') ? 1 : 0.5,
      actionOriented: responseContent.includes('next step') || responseContent.includes('consider') ? 1 : 0.5,
      strategicInsight: intentAnalysis.strategicFocus.length > 0 ? 1 : 0.5
    }

    const { error } = await this.supabase
      .from('conversation_turns')
      .insert({
        session_id: sessionId,
        user_query: userQuery,
        response_content: responseContent,
        intent_analysis: intentAnalysis,
        knowledge_sources: knowledgeSources,
        response_metrics: responseMetrics
      })

    if (error) {
      console.error('Error saving conversation turn:', error)
    }

    // Update conversation state based on the interaction
    await this.updateSessionContext(sessionId, intentAnalysis, userQuery)
  }

  private async updateSessionContext(sessionId: string, intentAnalysis: IntentAnalysis, query: string): Promise<void> {
    // Get current session state
    const { data: currentSession, error } = await this.supabase
      .from('conversation_sessions')
      .select('conversation_state, executive_profile, turn_count')
      .eq('id', sessionId)
      .single()

    if (error) {
      console.error('Error fetching session for update:', error)
      return
    }

    const currentState = currentSession.conversation_state as ConversationState || {
      engagementLevel: 'initial',
      discussedTopics: [],
      expressedChallenges: [],
      decisionCriteria: [],
      institutionContext: {},
      context: {}
    };
    
    const currentProfile = currentSession.executive_profile as ExecutiveProfile || {};

    // Update engagement level based on intent and interaction depth
    const newEngagementLevel = this.calculateEngagementLevel(
      currentSession.turn_count || 0,
      currentState.engagementLevel
    );

    // Update state with new information
    const updatedState: ConversationState = {
      ...currentState,
      engagementLevel: newEngagementLevel,
      discussedTopics: [...new Set([
        ...(currentState.discussedTopics || []), 
        ...this.extractTopics(query)
      ])],
      expressedChallenges: [...new Set([
        ...(currentState.expressedChallenges || []), 
        ...this.extractChallenges(query)
      ])],
      decisionCriteria: currentState.decisionCriteria || [],
      institutionContext: this.updateInstitutionContext(
        currentState.institutionContext || {},
        query
      ),
      context: currentState.context || {}
    };

    // Default empty profile updates
    const profileUpdates: Partial<ExecutiveProfile> = {};

    const { error: updateError } = await this.supabase
      .from('conversation_sessions')
      .update({
        conversation_state: updatedState,
        executive_profile: { ...currentProfile, ...profileUpdates }
      })

    if (updateError) {
      console.error('Error updating conversation state:', updateError)
    }
  }

  // Calculate engagement level based on conversation depth
  private calculateEngagementLevel(turnCount: number, currentLevel: string): string {
    if (turnCount === 0) return 'initial';
    if (turnCount < 3) return 'exploring';
    if (turnCount < 6) return 'evaluating';
    return 'deciding';
  }

  // Extract topics from text
  private extractTopics(text: string): string[] {
    // Simple implementation - can be enhanced with NLP
    const topicKeywords = ['topic', 'subject', 'about', 'regarding', 'concerning'];
    const topics: string[] = [];
    
    topicKeywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword)) {
        // Extract the sentence containing the keyword
        const regex = new RegExp(`[^.!?]*${keyword}[^.!?]*[.!?]`, 'i');
        const match = text.match(regex);
        if (match) {
          topics.push(match[0].trim());
        }
      }
    });
    
    return topics;
  }

  // Extract challenges from text
  private extractChallenges(text: string): string[] {
    // Simple implementation - can be enhanced with NLP
    const challengeKeywords = ['challenge', 'problem', 'issue', 'difficulty', 'struggle', 'pain point'];
    const challenges: string[] = [];
    
    challengeKeywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword)) {
        // Extract the sentence containing the keyword
        const regex = new RegExp(`[^.!?]*${keyword}[^.!?]*[.!?]`, 'i');
        const match = text.match(regex);
        if (match) {
          challenges.push(match[0].trim());
        }
      }
    });
    
    return challenges;
  }

  // Update institution context
  private updateInstitutionContext(
    currentContext: Record<string, unknown>,
    query: string
  ): Record<string, unknown> {
    // Simple implementation - can be enhanced with NLP
    const context = { ...currentContext };
    
    // Look for institution-related information
    const institutionKeywords = ['university', 'college', 'school', 'institution', 'organization'];
    institutionKeywords.forEach(keyword => {
      if (query.toLowerCase().includes(keyword)) {
        context[keyword] = true;
      }
    });
    
    return context;
  }

  // Helper method to generate session identifier for anonymous users
  static generateSessionIdentifier(): string {
    return `anonymous_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
  }

  // Check if session has contact information collected
  async hasContactInfo(sessionId: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .rpc('session_has_contact_info', {
        p_session_id: sessionId
      })

    if (error) {
      console.error('Error checking contact info:', error)
      return false
    }

    return data || false
  }

  // Create lead contact for session
  async createLeadContact(sessionId: string, contactInfo: LeadContact): Promise<string | null> {
    const { data, error } = await this.supabase
      .rpc('create_lead_contact', {
        p_session_id: sessionId,
        p_name: contactInfo.name,
        p_phone: contactInfo.phone,
        p_email: contactInfo.email || null,
        p_organization: contactInfo.organization || null,
        p_role: contactInfo.role || null
      })

    if (error) {
      console.error('Error creating lead contact:', error)
      return null
    }

    console.log('Lead contact created:', contactInfo.name, contactInfo.phone)
    return data
  }

  // Get lead contact for session
  async getLeadContact(sessionId: string): Promise<LeadContact | null> {
    const { data, error } = await this.supabase
      .from('lead_contacts')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (error) {
      if (error.code !== 'PGRST116') { // Not found error
        console.error('Error fetching lead contact:', error)
      }
      return null
    }

    return {
      id: data.id,
      name: data.name,
      firstName: data.first_name || data.name?.split(' ')[0] || null,
      lastName: data.last_name || data.name?.split(' ').slice(1).join(' ') || null,
      phone: data.phone,
      email: data.email,
      company: data.organization || data.company || null,
      jobTitle: data.role || data.job_title || null,
      notes: data.notes || null,
      sessionId: data.session_id || null,
      createdAt: data.created_at ? new Date(data.created_at) : new Date(),
      updatedAt: data.updated_at ? new Date(data.updated_at) : new Date()
    }
  }
}