'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Agent } from '@/types/agent';
import { PlusCircle, Edit, Trash2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';

export default function AgentsManagementPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();

  const fetchAgents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching agents:', error);
      toast({ title: 'Error', description: 'Failed to load agents.', variant: 'destructive' });
    } else {
      setAgents(data as Agent[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (agentId: string, agentName: string) => {
    if (window.confirm(`Are you sure you want to delete the agent "${agentName}"?`)) {
      const { error } = await supabase.from('agents').delete().eq('id', agentId);
      if (error) {
        toast({ title: 'Error', description: `Failed to delete agent: ${error.message}`, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Agent deleted successfully.' });
        fetchAgents(); // Refresh the list
      }
    }
  };

  if (loading) {
    return <div>Loading agents...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agents Management</h1>
        <Button onClick={() => router.push('/admin/agents/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Agent
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Agents</CardTitle>
          <CardDescription>View and manage all AI agents in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Image
                    src={agent.avatar_url || '/default-avatar.png'}
                    alt={agent.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{agent.name}</h3>
                    <p className="text-sm text-gray-500">{agent.persona}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={agent.is_active ? 'default' : 'destructive'}>
                    {agent.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => router.push(`/admin/agents/${agent.id}/edit`)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(agent.id, agent.name)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => router.push(`/admin/agents/${agent.id}/logs`)}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}