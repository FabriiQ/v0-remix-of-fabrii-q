import { Message } from 'ai';

/**
 * Represents a record in the Customer Relationship Management (CRM) system.
 * This interface will be expanded as the CRM features are built out.
 */
export interface CRMRecord {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  [key: string]: any; // Allow for additional custom fields
}

/**
 * Represents a single action that can be performed by an agent.
 * This is a discriminated union type, allowing for different action payloads.
 */
export type AgentAction =
  | { type: 'visitor_message'; content: string, id?: string }
  | { type: 'agent_response'; content: string, id?: string }
  | { type: 'crm_data_loaded'; data: CRMRecord, id?: string }
  | { type: 'qualification_updated'; score: number, id?: string }
  | { type: 'action_completed'; actionId: string, id?: string };

/**
 * Represents the state of a single agent conversation.
 * This state is managed by the agentReducer and stored externally.
 */
export interface AgentState {
  id: string;
  conversationHistory: Message[];
  crmData: CRMRecord | null;
  qualificationScore: number;
  nextActions: AgentAction[];
  conversationState:
    | 'initial_contact'
    | 'exploring_needs'
    | 'demonstrating_value'
    | 'addressing_concerns'
    | 'partnership_discussion'
    | 'scheduling_demo'
    | 'qualified_lead'
    | 'unqualified_lead';
}

/**
 * Represents the input to an agent.
 * This is the data that an agent will process in a single execution step.
 */
export type AgentInput =
  | { type: 'visitor_message'; content: string }
  | { type: 'system_event'; event: string; data?: any };

/**
 * Represents the output of an agent's execution.
 * This is the result of an agent processing an input.
 */
export interface AgentOutput {
    type: AgentAction['type'];
    payload?: any;
}

/**
 * Represents the configuration and state of a single AI agent.
 * This corresponds to the `agents` table in the database.
 */
export interface Agent {
    id: string;
    name: string;
    avatar_url?: string;
    persona?: string;
    system_prompt?: string;
    enabled_tools?: string[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
    metadata?: any;
    role_id?: number;
}