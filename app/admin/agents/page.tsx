'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Agent } from '@/types/agent';
import { PlusCircle, Edit, Trash2, MessageSquare, ChevronDown, Bot, Wrench, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

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
      .order('created_at', { ascending: true });

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
    return <div className="p-6 text-center">Loading agents...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Agents Management</h1>
        <Button onClick={() => router.push('/admin/agents/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Agent
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Agents</CardTitle>
          <CardDescription>View and manage all AI agents in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent) => (
              <Collapsible key={agent.id} className="border rounded-lg p-4 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={agent.avatar_url || '/default-avatar.png'}
                      alt={agent.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-500">{agent.persona}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={agent.is_active ? 'default' : 'destructive'}>
                      {agent.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); router.push(`/admin/agents/${agent.id}/edit`); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(agent.id, agent.name); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); router.push(`/admin/agents/${agent.id}/logs`); }}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Toggle details</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="pt-4 mt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2"><Bot className="h-5 w-5 text-primary" /> System Prompt</h4>
                      <pre className="text-xs bg-gray-100 p-3 rounded-md whitespace-pre-wrap font-mono max-h-60 overflow-y-auto">
                        {agent.system_prompt}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2"><Wrench className="h-5 w-5 text-primary" /> Enabled Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {agent.enabled_tools?.map(tool => <Badge key={tool} variant="secondary">{tool}</Badge>)}
                      </div>
                      <Separator className="my-4" />
                      <h4 className="font-semibold mb-2 flex items-center gap-2"><Terminal className="h-5 w-5 text-primary" /> LLM Configuration</h4>
                      <pre className="text-xs bg-gray-100 p-3 rounded-md whitespace-pre-wrap font-mono">
                        {JSON.stringify(agent.llm_config, null, 2)}
                      </pre>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}