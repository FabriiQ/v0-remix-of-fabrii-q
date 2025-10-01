'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

interface Channel {
  id: string;
  name: string;
}

interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
}

interface ChatViewProps {
  channel: Channel;
}

export default function ChatView({ channel }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel_id', channel.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data as Message[]);
      }
      setLoading(false);
    };

    fetchMessages();

    const subscription = supabase
      .channel(`messages:channel_id=eq.${channel.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [channel.id, supabase]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('messages').insert({
      channel_id: channel.id,
      sender_id: user.id,
      content: newMessage,
    });

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  if (loading) {
    return <div>Loading chat...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4">
        <h3 className="text-lg font-semibold">{channel.name}</h3>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <p><strong>{message.sender_id.substring(0, 8)}:</strong> {message.content}</p>
          </div>
        ))}
      </div>
      <div className="border-t p-4 flex gap-2">
        <input
          className="flex-1 p-2 border rounded-lg"
          placeholder={`Message #${channel.name}`}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
}