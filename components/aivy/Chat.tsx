'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Message } from 'ai';
import { v4 as uuidv4 } from 'uuid';
import { AgentState } from '@/types/agent';

// This is a placeholder for a real session management implementation.
// In a production scenario, this would be handled more robustly.
const SESSION_IDENTIFIER = `session_${uuidv4()}`;

export default function AivyChat() {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Effect to initialize the session and subscribe to messages
  useEffect(() => {
    const initializeSession = async () => {
      // 1. Get or create a conversation session
      const { data, error } = await supabase
        .rpc('get_or_create_conversation_session', {
          p_session_identifier: SESSION_IDENTIFIER,
        });

      if (error) {
        console.error('Error getting or creating session:', error);
        return;
      }
      const currentSessionId = data;
      setSessionId(currentSessionId);

      // 2. Fetch initial messages for the session
      const { data: initialMessages, error: messagesError } = await supabase
        .from('conversation_turns')
        .select('*')
        .eq('session_id', currentSessionId)
        .order('created_at', { ascending: true });

      if (messagesError) {
        console.error('Error fetching initial messages:', messagesError);
      } else if (initialMessages) {
        const formattedMessages: Message[] = initialMessages.map((msg: any) => ([
            { role: 'user', content: msg.user_query, id: `${msg.id}_user` },
            { role: 'assistant', content: msg.response_content, id: msg.id }
        ])).flat();
        setMessages(formattedMessages);
      }

      // 3. Subscribe to new messages in the conversation for multi-device sync
      const channel = supabase
        .channel(`conversation_turns:session_id=eq.${currentSessionId}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'conversation_turns' },
          (payload) => {
            console.log('Realtime change received!', payload.new);
            // This is where cross-device/tab sync would be implemented.
            // To avoid duplicating messages for the active user, we can check if the message already exists.
            // For now, we will just log it.
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    initializeSession();
  }, [supabase]);

  // Handle form submission to send a new message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;

    const userMessageContent = input.trim();
    const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content: userMessageContent,
        timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Construct the agent state to send to the secure API route
    const currentState: AgentState = {
        id: sessionId,
        conversationHistory: [...messages, userMessage],
        crmData: { id: sessionId },
        qualificationScore: 0,
        nextActions: [],
        conversationState: 'exploring_needs',
    };

    try {
      const response = await fetch('/api/agents/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessageContent,
          state: currentState,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: data.response || "I'm sorry, I couldn't generate a response.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Failed to get agent response:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border rounded-lg shadow-lg">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((m, index) => (
          <div key={m.id || index} className={`my-2 p-2 rounded-lg ${
              m.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            }`}
            style={{ maxWidth: '80%' }}
          >
            <span className="font-bold">{m.role === 'user' ? 'You' : 'AIVY'}</span>
            <p>{m.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex">
          <input
            className="flex-1 p-2 border rounded-l-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AIVY anything..."
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-lg">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}