'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Agent } from '@/types/agent';

export default function EditAgentPage() {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [persona, setPersona] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [enabledTools, setEnabledTools] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const agentId = params.id as string;
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAgent = async () => {
      if (!agentId) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', agentId)
        .single();

      if (error) {
        toast({ title: 'Error', description: 'Failed to load agent.', variant: 'destructive' });
        router.push('/admin/agents');
      } else {
        setAgent(data);
        setName(data.name);
        setAvatarUrl(data.avatar_url || '');
        setPersona(data.persona || '');
        setSystemPrompt(data.system_prompt || '');
        setEnabledTools((data.enabled_tools || []).join(', '));
      }
      setLoading(false);
    };
    fetchAgent();
  }, [agentId, router, supabase, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const { error } = await supabase
      .from('agents')
      .update({
        name,
        avatar_url: avatarUrl,
        persona,
        system_prompt: systemPrompt,
        enabled_tools: enabledTools.split(',').map(tool => tool.trim()),
      })
      .eq('id', agentId);

    setIsSaving(false);

    if (error) {
      toast({
        title: 'Error updating agent',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Agent updated successfully',
        description: `The agent "${name}" has been updated.`,
      });
      router.push('/admin/agents');
    }
  };

  if (loading) {
    return <div>Loading agent details...</div>;
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Agent</CardTitle>
          <CardDescription>Update the configuration for the agent: {agent?.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input id="avatarUrl" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="persona">Persona</Label>
              <Textarea id="persona" value={persona} onChange={(e) => setPersona(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemPrompt">System Prompt</Label>
              <Textarea id="systemPrompt" value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} rows={5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enabledTools">Enabled Tools (comma-separated)</Label>
              <Input id="enabledTools" value={enabledTools} onChange={(e) => setEnabledTools(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}