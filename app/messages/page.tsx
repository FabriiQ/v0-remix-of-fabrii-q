'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, MessageSquare } from 'lucide-react';
import ChatView from './ChatView';

interface Channel {
  id: string;
  name: string;
}

export default function MessagesPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchChannels = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('channels')
        .select('*');

      if (error) {
        console.error('Error fetching channels:', error);
      } else {
        setChannels(data as Channel[]);
        if (data && data.length > 0) {
          setSelectedChannel(data[0]);
        }
      }
      setLoading(false);
    };

    fetchChannels();
  }, [supabase]);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Left Sidebar: Channel List */}
      <div className="w-1/4 border-r p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Channels</h2>
          <Button variant="outline" size="sm">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`p-2 rounded-lg cursor-pointer ${
                selectedChannel?.id === channel.id ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedChannel(channel)}
            >
              {channel.name}
            </div>
          ))}
        </div>
      </div>

      {/* Right Content: Chat View */}
      <div className="w-3/4 flex flex-col h-full">
        {selectedChannel ? (
          <ChatView channel={selectedChannel} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <MessageSquare className="h-16 w-16 mb-4" />
            <p>Select a channel to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
}