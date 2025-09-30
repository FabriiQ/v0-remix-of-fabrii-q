'use server'

import { createServiceClient } from '@/lib/supabase/server'

// Define the types for our Supabase tables
interface Document {
  id: string
  processing_status: 'pending' | 'processing' | 'completed' | 'failed'
  processing_time?: number
  created_at: string
  updated_at: string
}

interface Chunk {
  id: string
  token_count: number
  document_id: string
  created_at: string
}

export interface KnowledgeBaseStats {
  totalDocuments: number
  totalChunks: number
  totalTokens: number
  avgProcessingTime: number
  completedDocuments: number
  failedDocuments: number
  processingDocuments: number
  pendingDocuments: number
}

export async function getKnowledgeBaseStats(): Promise<{ data: KnowledgeBaseStats | null; error: string | null }> {
  const supabase = createServiceClient()
  
  try {
    // Get document counts by status
    const { count: total } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })

    const { count: completed } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
      .eq('processing_status', 'completed')

    const { count: failed } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
      .eq('processing_status', 'failed')

    const { count: processing } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
      .eq('processing_status', 'processing')

    const { count: pending } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
      .eq('processing_status', 'pending')

    // Get chunk and token stats
    const { data: chunkStats, error: chunkError } = await supabase
      .from('chunks')
      .select('token_count')
      .returns<Pick<Chunk, 'token_count'>[]>()
      .limit(1000) // Limit to avoid performance issues

    if (chunkError) throw chunkError

    const totalChunks = chunkStats?.length || 0
    const totalTokens = chunkStats?.reduce((sum, chunk) => sum + (chunk.token_count || 0), 0) || 0

    // Calculate average processing time
    const { data: processingTimes, error: processingError } = await supabase
      .from('documents')
      .select('processing_time')
      .not('processing_time', 'is', null)
      .returns<Pick<Document, 'processing_time'>[]>()
      .limit(100) // Limit to avoid performance issues

    if (processingError) throw processingError

    const avgProcessingTime = processingTimes?.length 
      ? processingTimes.reduce((sum, doc) => sum + (doc.processing_time || 0), 0) / processingTimes.length 
      : 0

    const stats: KnowledgeBaseStats = {
      totalDocuments: total || 0,
      totalChunks,
      totalTokens,
      avgProcessingTime: Math.round(avgProcessingTime * 100) / 100, // Round to 2 decimal places
      completedDocuments: completed || 0,
      failedDocuments: failed || 0,
      processingDocuments: processing || 0,
      pendingDocuments: pending || 0
    }

    return { data: stats, error: null }
  } catch (error) {
    console.error('Error fetching knowledge base stats:', error)
    return { data: null, error: 'Failed to load knowledge base statistics' }
  }
}
