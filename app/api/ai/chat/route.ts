import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { generateEmbedding } from '@/lib/embeddings/openai-embeddings'
import { generateRAGResponse } from '@/lib/ai/gemini'
import { AIVYConversationMemory } from '@/lib/ai/conversation-memory'
import { ExecutiveKnowledgePrioritizer } from '@/lib/ai/executive-knowledge-prioritizer'
import type { Database } from '@/lib/supabase/database.types'


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationId, userId } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Initialize services
    const supabase = createServiceClient()
    const conversationMemory = new AIVYConversationMemory()

    // Get or create conversation session with proper identifier format
    let sessionIdentifier = conversationId

    // Handle legacy UUID format or create new session identifier
    if (!sessionIdentifier || sessionIdentifier === 'default' || sessionIdentifier.includes('-')) {
      // Generate a new AIVY-compatible session identifier
      sessionIdentifier = AIVYConversationMemory.generateSessionIdentifier()
    }

    const sessionId = await conversationMemory.getOrCreateSession(sessionIdentifier, userId)

    // Get conversation context for executive-level processing
    const context = await conversationMemory.getSessionContext(sessionId)

    // Generate embedding for the user query using OpenAI
    console.log('Generating embedding for query:', message.substring(0, 100) + '...')
    const queryEmbedding = await generateEmbedding(message)
    console.log('Generated OpenAI embedding with dimensions:', queryEmbedding.length)

    // Perform vector search for relevant context
    console.log('Performing vector search with OpenAI embeddings, threshold: 0.7, match_count: 5')
    type MatchDocument = Database['public']['Functions']['match_documents']['Returns'][number]
    const { data: relevantChunks, error: searchError } = await ((supabase as any).rpc('match_documents', {
      query_embedding: queryEmbedding,
      similarity_threshold: 0.7,
      match_count: 5,
    }) as Promise<{ data: MatchDocument[] | null; error: any }>)

    if (searchError) {
      console.error('Vector search error:', searchError)
    }
    
    const foundCount = Array.isArray(relevantChunks) ? relevantChunks.length : 0
    console.log('Found relevant chunks:', foundCount)
    if (foundCount > 0) {
      console.log('Top similarity scores:', (relevantChunks as MatchDocument[]).slice(0, 2).map((chunk) => chunk.similarity))
    }

    // If no results found with high threshold, try with lower threshold
    const initialRelevantChunks: MatchDocument[] = Array.isArray(relevantChunks) ? (relevantChunks as MatchDocument[]) : []
    let finalRelevantChunks: MatchDocument[] = initialRelevantChunks
    if (initialRelevantChunks.length === 0) {
      console.log('No chunks found with threshold 0.7, trying with 0.5...')
      const { data: fallbackChunks, error: fallbackError } = await ((supabase as any).rpc('match_documents', {
        query_embedding: queryEmbedding,
        similarity_threshold: 0.5,
        match_count: 5,
      }) as Promise<{ data: MatchDocument[] | null; error: any }>)
      
      if (fallbackError) {
        console.error('Fallback vector search error:', fallbackError)
      } else {
        finalRelevantChunks = (fallbackChunks ?? []) as MatchDocument[]
        console.log('Found fallback chunks:', (fallbackChunks?.length || 0))
        if ((fallbackChunks?.length || 0) > 0) {
          console.log('Fallback similarity scores:', (fallbackChunks as MatchDocument[]).slice(0, 2).map((chunk) => chunk.similarity))
        }
      }
    }
    
    // Analyze user intent using AIVY's executive intelligence
    const intentAnalysis = await conversationMemory.analyzeIntent(message, context)
    console.log('Intent analysis:', intentAnalysis.primaryIntent, 'confidence:', intentAnalysis.confidence)
    
    // Apply executive-level knowledge prioritization to retrieved chunks
    let prioritizedChunks: Array<{ content: string; similarity: number }> = []
    if (finalRelevantChunks.length > 0) {
      const executiveContext = {
        profile: context.executiveProfile,
        state: context.conversationState,
        intent: intentAnalysis
      }
      
      prioritizedChunks = ExecutiveKnowledgePrioritizer.prioritizeForExecutive(
        finalRelevantChunks.map((chunk) => ({
          content: chunk.content,
          similarity: chunk.similarity,
        })),
        executiveContext,
      )
      
      console.log('Applied executive prioritization to', prioritizedChunks.length, 'chunks')
    }

    // Generate response using Gemini with RAG and executive context
    // Convert conversation history to format expected by RAG
    const conversationHistory = context.recentHistory.map(turn => ({
      role: 'user',
      content: `${turn.userQuery} | Response: ${turn.responseContent}`
    }))
    
    const response = await generateRAGResponse({
      query: message,
      relevantChunks: prioritizedChunks || [],
      conversationHistory,
      executiveContext: {
        profile: context.executiveProfile,
        state: context.conversationState,
        intent: intentAnalysis,
      },
    })

    // Save conversation turn to AIVY memory system
    await conversationMemory.saveConversationTurn(
      sessionId,
      message,
      response,
      intentAnalysis,
      prioritizedChunks || []
    )

    // Log analytics (optional)
    try {
      await (supabase as any)
        .from('ai_analytics')
        .insert({
          event_type: 'chat_message',
          user_id: userId || null,
          session_id: conversationId ?? null,
          metadata: {
            message_length: message.length,
            response_length: response.length,
            timestamp: new Date().toISOString(),
          },
        } as Database['public']['Tables']['ai_analytics']['Insert'])
    } catch (analyticsError) {
      console.warn('Failed to log analytics:', analyticsError)
    }
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    return NextResponse.json({
      response,
      conversationId,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Chat API error:', error)
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  )
}