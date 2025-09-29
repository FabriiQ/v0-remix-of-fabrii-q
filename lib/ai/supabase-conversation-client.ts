import { createServiceClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/database.types'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type Tables = Database['public']['Tables']

export interface ConversationTables {
  conversation_sessions: {
    Row: {
      id: string
      session_identifier: string
      user_id: string | null
      executive_profile: Json
      conversation_state: Json
      created_at: string
      updated_at: string
      lead_contact_id: string | null
    }
    Insert: {
      id?: string
      session_identifier: string
      user_id?: string | null
      executive_profile?: Json
      conversation_state?: Json
      created_at?: string
      updated_at?: string
      lead_contact_id?: string | null
    }
    Update: {
      id?: string
      session_identifier?: string
      user_id?: string | null
      executive_profile?: Json
      conversation_state?: Json
      created_at?: string
      updated_at?: string
      lead_contact_id?: string | null
    }
  }
  conversation_turns: {
    Row: {
      id: string
      session_id: string
      user_query: string
      response_content: string
      intent_analysis: Json
      knowledge_sources: Json[]
      response_metrics: Json
      created_at: string
    }
    Insert: {
      id?: string
      session_id: string
      user_query: string
      response_content: string
      intent_analysis: Json
      knowledge_sources?: Json[]
      response_metrics: Json
      created_at?: string
    }
    Update: {
      id?: string
      session_id?: string
      user_query?: string
      response_content?: string
      intent_analysis?: Json
      knowledge_sources?: Json[]
      response_metrics?: Json
      created_at?: string
    }
  }
  lead_contacts: {
    Row: {
      id: string
      name: string
      email: string | null
      phone: string
      organization: string | null
      role: string | null
      created_at: string
      updated_at: string
      session_id: string | null
    }
    Insert: {
      id?: string
      name: string
      email?: string | null
      phone: string
      organization?: string | null
      role?: string | null
      created_at?: string
      updated_at?: string
      session_id?: string | null
    }
    Update: {
      id?: string
      name?: string
      email?: string | null
      phone?: string
      organization?: string | null
      role?: string | null
      created_at?: string
      updated_at?: string
      session_id?: string | null
    }
  }
}

type Functions = {
  get_or_create_conversation_session: {
    Args: {
      p_session_identifier: string
      p_user_id?: string | null
    }
    Returns: string
  }
  get_conversation_history: {
    Args: {
      p_session_id: string
      p_limit?: number
    }
    Returns: Array<{
      turn_id: string
      user_query: string
      response_content: string
      intent_analysis: Json
      created_at: string
    }>
  }
  session_has_contact_info: {
    Args: {
      p_session_id: string
    }
    Returns: boolean
  }
  create_lead_contact: {
    Args: {
      p_session_id: string
      p_name: string
      p_phone: string
      p_email?: string | null
      p_organization?: string | null
      p_role?: string | null
    }
    Returns: string
  }
}

export function createConversationClient() {
  const supabase = createServiceClient()
  
  return {
    ...supabase,
    from: <T extends keyof ConversationTables>(table: T) => {
      return supabase.from(table) as any // Cast to any to bypass type checking
    },
    rpc: <T extends keyof Functions>(
      fn: T,
      params: Functions[T]['Args']
    ) => {
      return supabase.rpc(fn, params as any) as any // Cast to any to bypass type checking
    }
  }
}
