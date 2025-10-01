import { SupabaseClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AgentState, AgentInput } from '@/types/agent';

// Placeholder for a more robust tool definition structure
interface Tool {
  name: string;
  description: string;
  execute: (params: any) => Promise<any>;
}

export class VisitorEngagementAgent {
  private supabase: SupabaseClient;
  private genAI: GoogleGenerativeAI;
  private tools: Record<string, Tool>;

  constructor(supabase: SupabaseClient, genAI: GoogleGenerativeAI) {
    this.supabase = supabase;
    this.genAI = genAI;
    this.tools = {
      analyze_visitor_intent: {
        name: 'analyze_visitor_intent',
        description: 'Analyzes the user message to determine their role, concerns, and qualification score.',
        execute: this.analyzeVisitorIntent.bind(this),
      },
      search_knowledge_base: {
        name: 'search_knowledge_base',
        description: 'Searches the knowledge base for information relevant to the user query.',
        execute: this.searchKnowledgeBase.bind(this),
      },
      update_crm_visitor: {
        name: 'update_crm_visitor',
        description: 'Updates the CRM with information about the visitor.',
        execute: this.updateCrmVisitor.bind(this),
      },
    };
  }

  /**
   * Processes a user's message, decides on the next action, and returns a response.
   * This is the main entry point for the agent's logic.
   */
  async process(state: AgentState, input: AgentInput): Promise<string> {
    // 1. Analyze the user's intent
    const intent = await this.tools.analyze_visitor_intent.execute({ conversation: state.conversationHistory });

    // 2. Update the CRM with the new information
    await this.tools.update_crm_visitor.execute({ visitorId: state.crmData?.id, data: intent });

    // 3. Search the knowledge base for relevant information
    const knowledge = await this.tools.search_knowledge_base.execute({ query: (input as any).content });

    // 4. Generate a response using the intent and knowledge
    const response = await this.generateResponse(state, intent, knowledge);

    return response;
  }

  // --- Tool Implementations ---

  private async analyzeVisitorIntent(params: { conversation: any[] }): Promise<any> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are an expert at analyzing sales conversations. Based on the following conversation history,
      identify the visitor's likely executive role (e.g., CFO, CIO, CAO), their primary concerns,
      and provide a qualification score from 0 to 100.

      Conversation:
      ${params.conversation.map(m => `${m.role}: ${m.content}`).join('\n')}

      Return the analysis as a JSON object with the following structure:
      {
        "executiveRole": "string",
        "primaryConcerns": ["string"],
        "qualificationScore": number
      }
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // Clean the response to ensure it's valid JSON
      const jsonString = text.replace(/```json|```/g, '').trim();
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error analyzing visitor intent:', error);
      return {
        executiveRole: 'Unknown',
        primaryConcerns: [],
        qualificationScore: 0,
      };
    }
  }

  private async searchKnowledgeBase(params: { query: string }): Promise<any> {
    console.log('Searching knowledge base for query:', params.query);
    const embedding = await this.getEmbedding(params.query);

    const { data, error } = await this.supabase.rpc('match_documents', {
      query_embedding: embedding,
      similarity_threshold: 0.7,
      match_count: 5,
    });

    if (error) {
      console.error('Error searching knowledge base:', error);
      return [];
    }
    return data;
  }

  private async updateCrmVisitor(params: { visitorId: string; data: any }): Promise<any> {
    if (!params.visitorId) {
      console.error('No visitor ID provided to updateCrmVisitor.');
      return { success: false, error: 'No visitor ID provided.' };
    }

    const { error } = await this.supabase
      .from('lead_contacts')
      .update({
        role: params.data.executiveRole,
        pain_points: params.data.primaryConcerns,
        lead_score: params.data.qualificationScore,
        last_contact_date: new Date().toISOString(),
      })
      .eq('id', params.visitorId);

    if (error) {
      console.error('Error updating CRM visitor:', error);
      return { success: false, error };
    }

    console.log('Successfully updated CRM for visitor:', params.visitorId);
    return { success: true };
  }

  // --- Helper Methods ---

  private async generateResponse(state: AgentState, intent: any, knowledge: any[]): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are AIVY, a senior educational technology consultant for FabriiQ.
      Your communication style is conversational, strategic, and consultative.

      The user you are speaking with is likely a ${intent.executiveRole} concerned with ${intent.primaryConcerns.join(', ')}.

      Here is some relevant information from our knowledge base:
      ${knowledge.map((k: any) => k.content).join('\n\n')}

      Based on this information and the conversation history, provide a helpful and strategic response.

      Conversation History:
      ${state.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm sorry, I'm having trouble formulating a response right now. Please try again shortly.";
    }
  }

  private async getEmbedding(text: string): Promise<number[]> {
    // Use the 'text-embedding-004' model for generating embeddings
    const embeddingModel = this.genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await embeddingModel.embedContent(text);
    const embedding = result.embedding;
    return embedding.values;
  }
}