import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { generateRAGResponse } from '@/lib/ai/gemini' // Assuming this can be adapted
import { generateEmbedding } from '@/lib/embeddings/openai-embeddings'
import type { Database } from '@/lib/supabase/database.types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, context, userId } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // 1. Generate embedding for the prompt/context
    const queryEmbedding = await generateEmbedding(prompt + (context ? `\n\n${context}` : ''))

    // 2. Find relevant documents
    const { data: relevantChunks, error: searchError } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      similarity_threshold: 0.7,
      match_count: 10,
    })

    if (searchError) {
      console.error('Vector search error:', searchError)
    }

    // 3. Generate content using the RAG setup
    const generatedContent = await generateRAGResponse({
      query: prompt,
      relevantChunks: relevantChunks || [],
      conversationHistory: [], // Not a conversational generation
      executiveContext: { /* Add any relevant context for generation */ }
    })

    // 4. Log the generation request
    const { data: logData, error: logError } = await supabase
      .from('ai_generation_logs')
      .insert({
        prompt,
        parameters: { context, model: 'gemini' }, // example params
        output: generatedContent,
        status: 'success',
        created_by: userId || null,
      })
      .select()
      .single()

    if (logError) {
      console.error('Error logging AI generation:', logError)
      // Don't fail the request, just log the error
    }

    return NextResponse.json({
      content: generatedContent,
      logId: logData?.id,
    })

  } catch (error) {
    console.error('AI Generation API error:', error)

    // Log the failure
    try {
        const supabase = createServiceClient()
        const body = await request.json().catch(() => ({}))
        await supabase.from('ai_generation_logs').insert({
            prompt: body.prompt || 'N/A',
            parameters: body,
            output: '',
            status: 'error',
            error_message: error instanceof Error ? error.message : 'Unknown error',
            created_by: body.userId || null,
        })
    } catch (dbError) {
        console.error('Failed to log error to database:', dbError)
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
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