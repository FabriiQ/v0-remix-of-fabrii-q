'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Reply } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
}

interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  parent_message_id: string | null;
  replies?: Message[];
}

interface ChatViewProps {
  channel: Channel;
}

export default function ChatView({ channel }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('channel_id', channel.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      // Process messages into a threaded structure
      const messageMap = new Map<string, Message>();
      const rootMessages: Message[] = [];

      data.forEach(message => {
        messageMap.set(message.id, { ...message, replies: [] });
      });

      data.forEach(message => {
        if (message.parent_message_id && messageMap.has(message.parent_message_id)) {
          const parent = messageMap.get(message.parent_message_id);
          parent?.replies?.push(messageMap.get(message.id)!);
        } else {
          rootMessages.push(messageMap.get(message.id)!);
        }
      });

      setMessages(rootMessages);
    }
    setLoading(false);
  }, [channel.id, supabase]);

  useEffect(() => {
    fetchMessages();

    const subscription = supabase
      .channel(`messages:channel_id=eq.${channel.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
            // Refetch messages to rebuild the thread structure
            fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [channel.id, supabase, fetchMessages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('messages').insert({
      channel_id: channel.id,
      sender_id: user.id,
      content: newMessage,
      parent_message_id: replyingTo?.id || null,
    });

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
      setReplyingTo(null);
    }
  };

  const renderMessages = (msgs: Message[], level = 0) => {
    return msgs.map(message => (
      <div key={message.id} style={{ marginLeft: `${level * 20}px` }} className="mb-2">
        <div className="p-2 rounded-lg bg-gray-100">
            <p><strong>{message.sender_id.substring(0, 8)}:</strong> {message.content}</p>
            <Button variant="ghost" size="sm" onClick={() => setReplyingTo(message)} className="mt-1">
                <Reply className="h-4 w-4 mr-1" />
                Reply
            </Button>
        </div>
        {message.replies && message.replies.length > 0 && (
          <div className="mt-2 pl-4 border-l-2">
            {renderMessages(message.replies, level + 1)}
          </div>
        )}
      </div>
    ));
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
        {renderMessages(messages)}
      </div>
      <div className="border-t p-4">
        {replyingTo && (
            <div className="text-sm text-gray-500 mb-2 p-2 bg-gray-100 rounded-lg">
                Replying to: &quot;{replyingTo.content.substring(0, 50)}...&quot;
                <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)} className="ml-2">X</Button>
            </div>
        )}
        <div className="flex gap-2">
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
    </div>
  );
}