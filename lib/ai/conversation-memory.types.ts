import type { Json } from '@/lib/supabase/types';

declare global {
  // Extend the Supabase database types
  namespace SupabaseSchema {
    // Database table interfaces
    interface ConversationSession {
      id: string;
      session_identifier: string;
      user_id: string | null;
      executive_profile: Json;
      conversation_state: Json;
      created_at: string;
      updated_at: string;
      lead_contact_id: string | null;
    }

    interface ConversationTurn {
      id: string;
      session_id: string;
      user_query: string;
      response_content: string;
      intent_analysis: Json;
      knowledge_sources: Json[];
      response_metrics: Json;
      created_at: string;
    }

    interface LeadContact {
      id: string;
      email: string | null;
      phone: string | null;
      first_name: string | null;
      last_name: string | null;
      company: string | null;
      job_title: string | null;
      notes: string | null;
      created_at: string;
      updated_at: string;
      session_id: string | null;
    }

    // Database function interfaces
    interface DatabaseFunctions {
      get_conversation_history: {
        Args: {
          p_session_id: string;
          p_limit?: number;
        };
        Returns: Array<{
          turn_id: string;
          user_query: string;
          response_content: string;
          created_at: string;
        }>;
      };
      
      get_conversation_summary: {
        Args: {
          p_session_id: string;
        };
        Returns: Array<{
          summary: string;
          topics: string[];
          next_steps: string[];
          last_updated: string;
        }>;
      };
      
      get_lead_contact: {
        Args: {
          p_session_id: string;
        };
        Returns: Array<{
          id: string;
          email: string | null;
          phone: string | null;
          first_name: string | null;
          last_name: string | null;
          company: string | null;
          job_title: string | null;
          created_at: string;
          updated_at: string;
        }>;
      };
      
      save_lead_contact: {
        Args: {
          p_session_id: string;
          p_email: string | null;
          p_organization: string | null;
          p_role: string | null;
        };
        Returns: string;
      };
    }
  }
}

// Core types for executive knowledge prioritization
export interface IntentAnalysis {
  primaryIntent: 'decision_support' | 'problem_solving' | 'relationship_building' | string;
  confidence?: number; // Added missing confidence property
  executiveContext: {
    urgency?: 'high' | 'medium' | 'low';
    decisionStage?: 'evaluation' | 'decision' | 'implementation' | string;
    authorityLevel?: 'executive' | 'manager' | 'staff' | string;
  };
  strategicFocus: string[];
  keyTopics?: string[];
  // Add other properties that might be used in the code
  [key: string]: unknown;
}

export interface ExecutiveProfile {
  institutionSize?: 'small' | 'medium' | 'large' | string;
  role?: string;
  focusAreas?: string[];
  preferences?: Record<string, unknown>;
}

export interface ConversationState {
  engagementLevel: 'initial' | 'exploring' | 'evaluating' | 'deciding' | 'committed' | string;
  discussedTopics: string[];
  expressedChallenges: string[];
  decisionCriteria: string[];
  institutionContext: Record<string, unknown>;
  context?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

// Conversation turn type
export interface ConversationTurn {
  id: string;
  userQuery: string;
  responseContent: string;
  intentAnalysis: IntentAnalysis;
  knowledgeSources: unknown[];
  responseMetrics: Record<string, unknown>;
  createdAt: Date;
}

// Lead contact type
export interface LeadContact {
  id: string;
  email: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  name?: string; // Added name property to match usage
  company: string | null;
  jobTitle: string | null;
  notes: string | null;
  sessionId: string | null;
  // Add other properties that might be used in the code
  [key: string]: unknown;
  createdAt: Date;
  updatedAt: Date;
}

// Application-facing interfaces
export interface AppConversationTurn {
  id: string;
  userQuery: string;
  responseContent: string;
  intentAnalysis: Record<string, unknown>;
  knowledgeSources: unknown[];
  responseMetrics: Record<string, unknown>;
  createdAt: Date;
}

export interface AppConversationSession {
  id: string;
  sessionIdentifier: string;
  userId: string | null;
  executiveProfile: Record<string, unknown>;
  conversationState: Record<string, unknown>;
  leadContactId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppLeadContact {
  id: string;
  email: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  jobTitle: string | null;
  notes: string | null;
  sessionId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
