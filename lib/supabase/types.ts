import { Database } from './database.types';

export type Tables = Database['public']['Tables']
export type Functions = Database['public']['Functions']

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

declare global {
  namespace SupabaseSchema {
    // Extend the database types with our conversation tables
    interface Database {
      public: {
        Tables: {
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
            }
          }
        }
        Functions: {
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
              p_limit: number
            }
            Returns: Array<{
              turn_id: string
              user_query: string
              response_content: string
              intent_analysis: Json
              created_at: string
            }>
          }
          has_contact_info: {
            Args: {
              p_session_id: string
            }
            Returns: boolean
          }
          get_lead_contact: {
            Args: {
              p_session_id: string
            }
            Returns: Array<{
              id: string
              name: string
              email: string | null
              phone: string
              organization: string | null
              role: string | null
            }>
          }
        }
      }
    }
  }
}
