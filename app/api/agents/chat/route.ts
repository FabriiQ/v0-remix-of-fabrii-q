import { NextResponse } from 'next/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { VisitorEngagementAgent } from '@/app/agents/VisitorEngagementAgent';
import { AgentState, AgentInput } from '@/types/agent';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { message, state } = (await req.json()) as { message: string; state: AgentState };

    if (!message || !state) {
      return NextResponse.json({ error: 'Message and state are required' }, { status: 400 });
    }

    // Initialize Supabase and Gemini on the server-side
    const supabase = createClient();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

    // Instantiate the agent
    const agent = new VisitorEngagementAgent(supabase as any, genAI);

    const agentInput: AgentInput = {
      type: 'visitor_message',
      content: message,
    };

    // Call the agent to get a response
    const agentResponse = await agent.process(state, agentInput);

    // Insert the conversation turn into the database
    const { data, error } = await supabase
      .from('conversation_turns')
      .insert({
        session_id: state.id,
        user_query: message,
        response_content: agentResponse,
        parent_turn_id: state.parentTurnId, // Add this line
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error saving conversation turn:', error);
      // We can still return the response even if saving fails
    }

    return NextResponse.json({ response: agentResponse, turnId: data?.id });
  } catch (error) {
    console.error('Error in agent chat API:', error);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}