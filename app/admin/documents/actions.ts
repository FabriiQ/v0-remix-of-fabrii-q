'use server'

import { createServiceClient } from '@/lib/supabase/server'

interface Document {
  id: string
  title: string
  content: string
  source_type: 'upload' | 'web' | 'manual'
  file_size?: number
  file_type?: string
  processing_status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
  updated_at: string
}

export async function getDocuments() {
  const supabase = createServiceClient()
  
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    
    return { data: data as Document[], error: null }
  } catch (error) {
    console.error('Error loading documents:', error)
    return { data: null, error: 'Failed to load documents' }
  }
}
