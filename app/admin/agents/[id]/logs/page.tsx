'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Agent } from '@/types/agent';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ConversationTurn {
  id: string;
  user_query: string;
  response_content: string;
  created_at: string;
}

export default function AgentLogsPage() {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [logs, setLogs] = useState<ConversationTurn[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const agentId = params.id as string;
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      if (!agentId) return;
      setLoading(true);

      // Fetch agent details
      const { data: agentData, error: agentError } = await supabase
        .from('agents')
        .select('*')
        .eq('id', agentId)
        .single();

      if (agentError) {
        console.error('Error fetching agent:', agentError);
        router.push('/admin/agents');
        return;
      }
      setAgent(agentData);

      // Fetch agent logs (this is a simplified query for now)
      // A real implementation might need a more complex join or a dedicated logging table
      const { data: logData, error: logError } = await supabase
        .from('conversation_turns')
        .select('*')
        // This assumes an agent_id is associated with a turn, which is not yet in the schema.
        // This is a placeholder for a more complex query.
        // .eq('agent_id', agentId)
        .order('created_at', { ascending: false });

      if (logError) {
        console.error('Error fetching logs:', logError);
      } else {
        setLogs(logData as ConversationTurn[]);
      }

      setLoading(false);
    };
    fetchData();
  }, [agentId, router, supabase]);

  if (loading) {
    return <div>Loading agent logs...</div>;
  }

  return (
    <div className="p-6">
      <Link href="/admin/agents" className="flex items-center text-sm text-gray-500 hover:text-black mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Agents
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Chat Logs for {agent?.name}</CardTitle>
          <CardDescription>Review the conversation history for this agent.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.length > 0 ? (
              logs.map((log) => (
                <div key={log.id} className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(log.created_at).toLocaleString()}
                  </p>
                  <p><strong>User:</strong> {log.user_query}</p>
                  <p><strong>Agent:</strong> {log.response_content}</p>
                </div>
              ))
            ) : (
              <p>No chat logs found for this agent.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}