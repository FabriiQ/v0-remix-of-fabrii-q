export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      agents: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          enabled_tools: string[] | null
          id: string
          is_active: boolean | null
          llm_config: Json | null
          max_tokens: number | null
          metadata: Json | null
          name: string
          persona: string | null
          role_id: number | null
          system_prompt: string | null
          temperature: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          enabled_tools?: string[] | null
          id?: string
          is_active?: boolean | null
          llm_config?: Json | null
          max_tokens?: number | null
          metadata?: Json | null
          name: string
          persona?: string | null
          role_id?: number | null
          system_prompt?: string | null
          temperature?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          enabled_tools?: string[] | null
          id?: string
          is_active?: boolean | null
          llm_config?: Json | null
          max_tokens?: number | null
          metadata?: Json | null
          name?: string
          persona?: string | null
          role_id?: number | null
          system_prompt?: string | null
          temperature?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_analytics: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          metadata: Json | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_generation_logs: {
        Row: {
          created_at: string
          created_by: string | null
          error_message: string | null
          id: string
          output: string | null
          parameters: Json
          prompt: string
          status: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          id?: string
          output?: string | null
          parameters: Json
          prompt: string
          status: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          id?: string
          output?: string | null
          parameters?: Json
          prompt?: string
          status?: string
        }
        Relationships: []
      }
      ai_settings: {
        Row: {
          description: string | null
          id: string
          is_active: boolean | null
          setting_key: string
          setting_value: Json
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          is_active?: boolean | null
          setting_key: string
          setting_value: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          is_active?: boolean | null
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      channel_participants: {
        Row: {
          agent_id: string | null
          channel_id: string | null
          id: string
          joined_at: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          agent_id?: string | null
          channel_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          agent_id?: string | null
          channel_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channel_participants_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_agent_id"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_interactions: {
        Row: {
          action_items: string[] | null
          contact_id: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          interaction_date: string | null
          interaction_score: number | null
          interaction_type: string
          metadata: Json | null
          next_steps: string | null
          outcome: string | null
          sentiment: string | null
          session_id: string | null
          topics_discussed: string[] | null
        }
        Insert: {
          action_items?: string[] | null
          contact_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          interaction_date?: string | null
          interaction_score?: number | null
          interaction_type: string
          metadata?: Json | null
          next_steps?: string | null
          outcome?: string | null
          sentiment?: string | null
          session_id?: string | null
          topics_discussed?: string[] | null
        }
        Update: {
          action_items?: string[] | null
          contact_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          interaction_date?: string | null
          interaction_score?: number | null
          interaction_type?: string
          metadata?: Json | null
          next_steps?: string | null
          outcome?: string | null
          sentiment?: string | null
          session_id?: string | null
          topics_discussed?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_interactions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "lead_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_interactions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "conversation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_tags: {
        Row: {
          contact_id: string | null
          created_at: string | null
          id: string
          tag_category: string | null
          tag_name: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          id?: string
          tag_category?: string | null
          tag_name: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          id?: string
          tag_category?: string | null
          tag_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_tags_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "lead_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      content_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      content_posts: {
        Row: {
          ai_generated: boolean | null
          author_id: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          id: string
          published_at: string | null
          scheduled_at: string | null
          slug: string
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean | null
          author_id?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          scheduled_at?: string | null
          slug: string
          status?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean | null
          author_id?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          scheduled_at?: string | null
          slug?: string
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      conversation_analytics: {
        Row: {
          business_questions: number | null
          buying_signals: number | null
          competitive_mentions: string[] | null
          contact_id: string | null
          contact_info_provided: boolean | null
          conversation_duration_minutes: number | null
          conversion_stage: string | null
          demo_requested: boolean | null
          id: string
          intent_distribution: Json | null
          last_updated: string | null
          meeting_requested: boolean | null
          objections_raised: string[] | null
          pain_points_mentioned: string[] | null
          partnership_assessment_completed: boolean | null
          pricing_discussed: boolean | null
          satisfaction_indicators: Json | null
          session_id: string | null
          technical_questions: number | null
          topics_covered: string[] | null
          total_messages: number | null
          user_engagement_score: number | null
        }
        Insert: {
          business_questions?: number | null
          buying_signals?: number | null
          competitive_mentions?: string[] | null
          contact_id?: string | null
          contact_info_provided?: boolean | null
          conversation_duration_minutes?: number | null
          conversion_stage?: string | null
          demo_requested?: boolean | null
          id?: string
          intent_distribution?: Json | null
          last_updated?: string | null
          meeting_requested?: boolean | null
          objections_raised?: string[] | null
          pain_points_mentioned?: string[] | null
          partnership_assessment_completed?: boolean | null
          pricing_discussed?: boolean | null
          satisfaction_indicators?: Json | null
          session_id?: string | null
          technical_questions?: number | null
          topics_covered?: string[] | null
          total_messages?: number | null
          user_engagement_score?: number | null
        }
        Update: {
          business_questions?: number | null
          buying_signals?: number | null
          competitive_mentions?: string[] | null
          contact_id?: string | null
          contact_info_provided?: boolean | null
          conversation_duration_minutes?: number | null
          conversion_stage?: string | null
          demo_requested?: boolean | null
          id?: string
          intent_distribution?: Json | null
          last_updated?: string | null
          meeting_requested?: boolean | null
          objections_raised?: string[] | null
          pain_points_mentioned?: string[] | null
          partnership_assessment_completed?: boolean | null
          pricing_discussed?: boolean | null
          satisfaction_indicators?: Json | null
          session_id?: string | null
          technical_questions?: number | null
          topics_covered?: string[] | null
          total_messages?: number | null
          user_engagement_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_analytics_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "lead_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_analytics_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "conversation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_sessions: {
        Row: {
          contact_collected: boolean | null
          conversation_state: Json | null
          created_at: string | null
          executive_profile: Json | null
          id: string
          last_interaction_at: string | null
          lead_contact_id: string | null
          session_identifier: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          contact_collected?: boolean | null
          conversation_state?: Json | null
          created_at?: string | null
          executive_profile?: Json | null
          id?: string
          last_interaction_at?: string | null
          lead_contact_id?: string | null
          session_identifier: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          contact_collected?: boolean | null
          conversation_state?: Json | null
          created_at?: string | null
          executive_profile?: Json | null
          id?: string
          last_interaction_at?: string | null
          lead_contact_id?: string | null
          session_identifier?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_sessions_lead_contact_id_fkey"
            columns: ["lead_contact_id"]
            isOneToOne: false
            referencedRelation: "lead_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_turns: {
        Row: {
          created_at: string | null
          feedback: number | null
          id: string
          intent_analysis: Json | null
          knowledge_sources: Json | null
          parent_turn_id: string | null
          response_content: string
          response_metrics: Json | null
          session_id: string | null
          turn_state: string | null
          user_query: string
        }
        Insert: {
          created_at?: string | null
          feedback?: number | null
          id?: string
          intent_analysis?: Json | null
          knowledge_sources?: Json | null
          parent_turn_id?: string | null
          response_content: string
          response_metrics?: Json | null
          session_id?: string | null
          turn_state?: string | null
          user_query: string
        }
        Update: {
          created_at?: string | null
          feedback?: number | null
          id?: string
          intent_analysis?: Json | null
          knowledge_sources?: Json | null
          parent_turn_id?: string | null
          response_content?: string
          response_metrics?: Json | null
          session_id?: string | null
          turn_state?: string | null
          user_query?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_turns_parent_turn_id_fkey"
            columns: ["parent_turn_id"]
            isOneToOne: false
            referencedRelation: "conversation_turns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_turns_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "conversation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      document_chunks: {
        Row: {
          chunk_index: number
          content: string
          created_at: string | null
          document_id: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          token_count: number | null
        }
        Insert: {
          chunk_index: number
          content: string
          created_at?: string | null
          document_id?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          token_count?: number | null
        }
        Update: {
          chunk_index?: number
          content?: string
          created_at?: string | null
          document_id?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          token_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "document_chunks_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          file_size: number | null
          file_type: string | null
          id: string
          metadata: Json | null
          processing_status: string | null
          source_type: string
          source_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          metadata?: Json | null
          processing_status?: string | null
          source_type: string
          source_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          metadata?: Json | null
          processing_status?: string | null
          source_type?: string
          source_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      email_threads: {
        Row: {
          created_at: string | null
          crm_contact_id: string | null
          id: string
          last_message_id: string | null
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          crm_contact_id?: string | null
          id?: string
          last_message_id?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          crm_contact_id?: string | null
          id?: string
          last_message_id?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_threads_crm_contact_id_fkey"
            columns: ["crm_contact_id"]
            isOneToOne: false
            referencedRelation: "lead_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      follow_up_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          due_date: string
          id: string
          priority: string | null
          result: string | null
          status: string | null
          task_description: string | null
          task_title: string
          task_type: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          due_date: string
          id?: string
          priority?: string | null
          result?: string | null
          status?: string | null
          task_description?: string | null
          task_title: string
          task_type: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          due_date?: string
          id?: string
          priority?: string | null
          result?: string | null
          status?: string | null
          task_description?: string | null
          task_title?: string
          task_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "follow_up_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "lead_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_contacts: {
        Row: {
          annual_revenue: string | null
          assigned_to: string | null
          budget_range: string | null
          collected_at: string | null
          company_size: string | null
          company_website: string | null
          created_at: string | null
          decision_timeline: string | null
          email: string | null
          id: string
          industry: string | null
          interests: string[] | null
          job_function: string | null
          last_contact_date: string | null
          lead_score: number | null
          lead_status: string | null
          metadata: Json | null
          name: string
          next_follow_up: string | null
          notes: string | null
          organization: string | null
          pain_points: string[] | null
          phone: string
          role: string | null
          session_id: string | null
          social_links: Json | null
          source: string | null
          updated_at: string | null
        }
        Insert: {
          annual_revenue?: string | null
          assigned_to?: string | null
          budget_range?: string | null
          collected_at?: string | null
          company_size?: string | null
          company_website?: string | null
          created_at?: string | null
          decision_timeline?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          interests?: string[] | null
          job_function?: string | null
          last_contact_date?: string | null
          lead_score?: number | null
          lead_status?: string | null
          metadata?: Json | null
          name: string
          next_follow_up?: string | null
          notes?: string | null
          organization?: string | null
          pain_points?: string[] | null
          phone: string
          role?: string | null
          session_id?: string | null
          social_links?: Json | null
          source?: string | null
          updated_at?: string | null
        }
        Update: {
          annual_revenue?: string | null
          assigned_to?: string | null
          budget_range?: string | null
          collected_at?: string | null
          company_size?: string | null
          company_website?: string | null
          created_at?: string | null
          decision_timeline?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          interests?: string[] | null
          job_function?: string | null
          last_contact_date?: string | null
          lead_score?: number | null
          lead_status?: string | null
          metadata?: Json | null
          name?: string
          next_follow_up?: string | null
          notes?: string | null
          organization?: string | null
          pain_points?: string[] | null
          phone?: string
          role?: string | null
          session_id?: string | null
          social_links?: Json | null
          source?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_contacts_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "conversation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_scoring_rules: {
        Row: {
          condition_field: string
          condition_operator: string
          condition_value: string
          created_at: string | null
          id: string
          is_active: boolean | null
          rule_name: string
          rule_type: string
          score_points: number
        }
        Insert: {
          condition_field: string
          condition_operator: string
          condition_value: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          rule_name: string
          rule_type: string
          score_points: number
        }
        Update: {
          condition_field?: string
          condition_operator?: string
          condition_value?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          rule_name?: string
          rule_type?: string
          score_points?: number
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          created_at: string
          file_size: number | null
          file_type: string
          height: number | null
          id: string
          name: string
          uploaded_by: string | null
          url: string
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_size?: number | null
          file_type: string
          height?: number | null
          id?: string
          name: string
          uploaded_by?: string | null
          url: string
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_size?: number | null
          file_type?: string
          height?: number | null
          id?: string
          name?: string
          uploaded_by?: string | null
          url?: string
          width?: number | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          channel_id: string | null
          content: string
          conversation_id: string | null
          created_at: string | null
          email_headers: Json | null
          email_thread_id: string | null
          id: string
          metadata: Json | null
          parent_message_id: string | null
          processing_time_ms: number | null
          role: string
          sender_agent_id: string | null
          sender_id: string | null
          tokens_used: number | null
        }
        Insert: {
          channel_id?: string | null
          content: string
          conversation_id?: string | null
          created_at?: string | null
          email_headers?: Json | null
          email_thread_id?: string | null
          id?: string
          metadata?: Json | null
          parent_message_id?: string | null
          processing_time_ms?: number | null
          role: string
          sender_agent_id?: string | null
          sender_id?: string | null
          tokens_used?: number | null
        }
        Update: {
          channel_id?: string | null
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          email_headers?: Json | null
          email_thread_id?: string | null
          id?: string
          metadata?: Json | null
          parent_message_id?: string | null
          processing_time_ms?: number | null
          role?: string
          sender_agent_id?: string | null
          sender_id?: string | null
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_sender_agent_id"
            columns: ["sender_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_email_thread_id_fkey"
            columns: ["email_thread_id"]
            isOneToOne: false
            referencedRelation: "email_threads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_parent_message_id_fkey"
            columns: ["parent_message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      partnership_assessments: {
        Row: {
          assessment_score: number | null
          campus_count: number | null
          contact_id: string | null
          created_at: string | null
          current_tech_ecosystem: string
          custom_requirements: string | null
          id: string
          institution_name: string
          institution_type: string
          investment_timeline: string
          partnership_commitment_level: string
          partnership_priority: string | null
          primary_contact_email: string
          primary_contact_name: string
          primary_contact_phone: string | null
          primary_contact_role: string
          readiness_level: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          session_id: string | null
          status: string | null
          strategic_challenges: string
          student_population: number | null
          submitted_at: string | null
          updated_at: string | null
          vision_statement: string | null
        }
        Insert: {
          assessment_score?: number | null
          campus_count?: number | null
          contact_id?: string | null
          created_at?: string | null
          current_tech_ecosystem: string
          custom_requirements?: string | null
          id?: string
          institution_name: string
          institution_type: string
          investment_timeline: string
          partnership_commitment_level: string
          partnership_priority?: string | null
          primary_contact_email: string
          primary_contact_name: string
          primary_contact_phone?: string | null
          primary_contact_role: string
          readiness_level?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          session_id?: string | null
          status?: string | null
          strategic_challenges: string
          student_population?: number | null
          submitted_at?: string | null
          updated_at?: string | null
          vision_statement?: string | null
        }
        Update: {
          assessment_score?: number | null
          campus_count?: number | null
          contact_id?: string | null
          created_at?: string | null
          current_tech_ecosystem?: string
          custom_requirements?: string | null
          id?: string
          institution_name?: string
          institution_type?: string
          investment_timeline?: string
          partnership_commitment_level?: string
          partnership_priority?: string | null
          primary_contact_email?: string
          primary_contact_name?: string
          primary_contact_phone?: string | null
          primary_contact_role?: string
          readiness_level?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          session_id?: string | null
          status?: string | null
          strategic_challenges?: string
          student_population?: number | null
          submitted_at?: string | null
          updated_at?: string | null
          vision_statement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partnership_assessments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "lead_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partnership_assessments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "conversation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      post_categories: {
        Row: {
          category_id: string
          post_id: string
        }
        Insert: {
          category_id: string
          post_id: string
        }
        Update: {
          category_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "content_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_metadata: {
        Row: {
          created_at: string
          id: string
          key: string
          post_id: string | null
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          post_id?: string | null
          updated_at?: string
          value: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          post_id?: string | null
          updated_at?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "post_metadata_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "content_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "content_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "content_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission_id: number
          role_id: number
        }
        Insert: {
          id?: number
          permission_id: number
          role_id: number
        }
        Update: {
          id?: number
          permission_id?: number
          role_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          preferences: Json | null
          role: string | null
          role_id: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          preferences?: Json | null
          role?: string | null
          role_id?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          preferences?: Json | null
          role?: string | null
          role_id?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_role_id"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: number
          role_id: number
          user_id: string
        }
        Insert: {
          id?: number
          role_id: number
          user_id: string
        }
        Update: {
          id?: number
          role_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      calculate_lead_score: {
        Args: { p_contact_id: string }
        Returns: number
      }
      calculate_partnership_score: {
        Args: { p_assessment_id: string }
        Returns: number
      }
      create_lead_contact: {
        Args: {
          p_email?: string
          p_name: string
          p_organization?: string
          p_phone: string
          p_role?: string
          p_session_id: string
        }
        Returns: string
      }
      create_partnership_assessment: {
        Args: {
          p_assessment_data: Json
          p_contact_id: string
          p_session_id: string
        }
        Returns: string
      }
      get_conversation_history: {
        Args: { p_limit?: number; p_session_id: string }
        Returns: {
          created_at: string
          intent_analysis: Json
          response_content: string
          turn_id: string
          user_query: string
        }[]
      }
      get_or_create_conversation_session: {
        Args: { p_session_identifier: string; p_user_id?: string }
        Returns: string
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      has_permission: {
        Args: { p_permission_name: string; p_user_id: string }
        Returns: boolean
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      match_documents: {
        Args:
          | {
              match_count?: number
              min_content_length?: number
              query_embedding: string
              similarity_threshold?: number
            }
          | {
              match_count?: number
              query_embedding: string
              similarity_threshold?: number
            }
        Returns: {
          content: string
          document_id: string
          id: string
          metadata: Json
          similarity: number
        }[]
      }
      session_has_contact_info: {
        Args: { p_session_id: string }
        Returns: boolean
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      update_executive_profile: {
        Args: { p_profile_updates: Json; p_session_id: string }
        Returns: undefined
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const