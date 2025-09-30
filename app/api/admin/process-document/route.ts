import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { generateEmbedding } from '@/lib/embeddings/openai-embeddings'

// Configure route for server-side execution only
// This prevents static analysis during build
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

// Add a check to prevent execution during build
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';

// Simple response for build-time analysis
const buildTimeResponse = () => {
  return NextResponse.json(
    { error: 'This API route is not available during build' },
    { status: 200 }
  );
};

export async function POST(request: NextRequest) {
  // Return early during build
  if (isBuild) {
    return buildTimeResponse();
  }

  try {
    const body = await request.json()
    const { documentId, content, settings } = body

    if (!documentId || !content) {
      return NextResponse.json(
        { error: 'documentId and content are required' },
        { status: 400 }
      )
    }

    console.log(`Processing document ${documentId}...`)

    // Initialize Supabase client
    const supabase = createServiceClient()

    // For now, we'll simulate the Edge Function call
    // In production, you would call the actual Supabase Edge Function:
    // const { data, error } = await supabase.functions.invoke('process-document', {
    //   body: { documentId, content, settings }
    // })

    try {
      // Process document with OpenAI embeddings
      await simulateDocumentProcessing(documentId, content, supabase);
      
      return NextResponse.json({
        success: true,
        documentId,
        message: 'Document processed successfully with OpenAI embeddings'
      });
    } catch (error) {
      console.error('Document processing failed:', error);
      throw error; // Will be caught by the outer catch block
    }

    // This return is now unreachable due to the early return above
    // Keeping it as a fallback

  } catch (error) {
    console.error('Document processing API error:', error)
    
    return NextResponse.json(
      { 
        error: (error as Error)?.message ?? 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Simulate the document processing that would happen in the Edge Function
async function simulateDocumentProcessing(documentId: string, content: string, supabase: any) {
  try {
    // Update document status to processing
    await supabase
      .from('documents')
      .update({ processing_status: 'processing' })
      .eq('id', documentId)

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Split content into chunks (simplified version)
    const chunkSize = 500
    const overlap = 50
    const chunks = []
    
    let start = 0
    let chunkIndex = 0
    
    while (start < content.length) {
      const end = Math.min(start + chunkSize, content.length)
      const chunkContent = content.slice(start, end).trim()
      
      if (chunkContent.length > 0) {
        // Generate real embedding using local model
        const embedding = await generateEmbedding(chunkContent)
        
        chunks.push({
          document_id: documentId,
          content: chunkContent,
          chunk_index: chunkIndex,
          embedding,
          metadata: {
            start_index: start,
            end_index: end,
            length: chunkContent.length,
            processing_timestamp: new Date().toISOString()
          },
          token_count: Math.ceil(chunkContent.length / 4) // Rough estimation
        })
        
        chunkIndex++
      }
      
      start = Math.max(end - overlap, start + 1)
      if (start >= end && end >= content.length) break
    }

    // Delete existing chunks for this document
    await supabase
      .from('document_chunks')
      .delete()
      .eq('document_id', documentId)

    // Insert new chunks
    if (chunks.length > 0) {
      const { error: insertError } = await supabase
        .from('document_chunks')
        .insert(chunks)

      if (insertError) {
        throw insertError
      }
    }

    // Update document status to completed
    await supabase
      .from('documents')
      .update({ 
        processing_status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId)

    // Log analytics
    await supabase
      .from('ai_analytics')
      .insert({
        event_type: 'document_processed',
        metadata: {
          document_id: documentId,
          chunks_created: chunks.length,
          total_tokens: chunks.reduce((sum, chunk) => sum + (chunk.token_count || 0), 0),
          simulation: true
        }
      })

    console.log(`Document ${documentId} processed successfully with ${chunks.length} chunks`)

  } catch (error) {
    console.error(`Document processing failed for ${documentId}:`, error)
    
    // Update document status to failed
    await supabase
      .from('documents')
      .update({ 
        processing_status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId)

    // Log error analytics
    await supabase
      .from('ai_analytics')
      .insert({
        event_type: 'document_processing_failed',
        metadata: {
          document_id: documentId,
          error: (error as Error)?.message ?? 'Unknown error',
          timestamp: new Date().toISOString()
        }
      })

    throw error as Error
  }
}