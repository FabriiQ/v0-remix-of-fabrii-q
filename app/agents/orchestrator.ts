import { Message } from 'ai';
import { CRMRecord, AgentAction, AgentState, AgentInput, AgentOutput } from '@/types/agent';
import { VisitorEngagementAgent } from './VisitorEngagementAgent';

// This is a placeholder for a function that will be implemented later.
// It will determine the next actions based on the current state and qualification score.
function deriveNextActions(state: AgentState, score: number): AgentAction[] {
    // Placeholder logic
    console.log(`Deriving next actions for state with score ${score}`);
    return [];
}

/**
 * The core reducer function for the AIVY agent system.
 * It's a pure function that takes the current state and an action, and returns the new state.
 * All state transitions in the agentic system are handled by this reducer.
 *
 * @param state The current state of the agent.
 * @param action The action to be applied to the state.
 * @returns The new state after applying the action.
 */
export function agentReducer(state: AgentState, action: AgentAction): AgentState {
  switch (action.type) {
    case 'visitor_message':
      return {
        ...state,
        conversationHistory: [
          ...state.conversationHistory,
          {
            role: 'user',
            content: action.content,
            createdAt: new Date(),
          } as Message,
        ],
      };

    case 'agent_response':
        return {
            ...state,
            conversationHistory: [
                ...state.conversationHistory,
                {
                    role: 'assistant',
                    content: action.content,
                    createdAt: new Date(),
                } as Message,
            ],
        };

    case 'crm_data_loaded':
      return {
        ...state,
        crmData: action.data,
      };

    case 'qualification_updated':
      return {
        ...state,
        qualificationScore: action.score,
        nextActions: deriveNextActions(state, action.score),
      };

    case 'action_completed':
        return {
            ...state,
            nextActions: state.nextActions.filter(a => a.id !== action.actionId),
        };

    default:
      return state;
  }
}

/**
 * The stateless agent executor.
 * This class is responsible for orchestrating the agent's execution flow.
 * It loads the current state, decides on the next action, applies the action via the reducer,
 * and saves the new state. It remains stateless by externalizing the state management.
 */
export class StatelessAgentExecutor {
  private stateStore: any; // Replace with a proper state store implementation (e.g., Supabase)

  constructor(stateStore: any) {
    this.stateStore = stateStore;
  }

  /**
   * Executes a single step of the agent's logic.
   *
   * @param stateId The ID of the current agent state to load.
   * @param input The input for the agent to process.
   * @returns A promise that resolves to the new state and the output of the action.
   */
  async execute(
    stateId: string,
    input: AgentInput,
    agent: VisitorEngagementAgent
  ): Promise<{ newState: AgentState; output: AgentOutput }> {
    // 1. Load current state from the external store
    const currentState = await this.stateStore.load(stateId);

    // 2. Decide on the next action based on the current state and input
    const action = await this.decideAction(currentState, input, agent);

    // 3. Apply the action to the state using the pure reducer function
    const newState = agentReducer(currentState, action);

    // 4. Save the new state to the external store
    await this.stateStore.save(stateId, newState);

    // 5. Return the new state and the output of the action
    const output: AgentOutput = {
        type: action.type,
        payload: 'content' in action ? action.content : undefined,
    };

    return { newState, output };
  }

  private async decideAction(state: AgentState, input: AgentInput, agent: VisitorEngagementAgent): Promise<AgentAction> {
    // This is where the primary agent logic is invoked.
    // In a multi-agent system, this method would route the input to the appropriate agent.
    if (input.type === 'visitor_message') {
      const responseContent = await agent.process(state, input);
      return { type: 'agent_response', content: responseContent };
    }

    // Return a default action if the input type is not handled
    return { type: 'action_completed', actionId: 'unhandled_input' };
  }
}
// Note: The VisitorEngagementAgent would need to be passed into the execute method
// or instantiated within the executor, ideally with dependency injection for Supabase/Gemini clients.