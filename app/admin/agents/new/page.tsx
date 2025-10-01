'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export default function NewAgentPage() {
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [persona, setPersona] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [enabledTools, setEnabledTools] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const { error } = await supabase.from('agents').insert({
      name,
      avatar_url: avatarUrl,
      persona,
      system_prompt: systemPrompt,
      enabled_tools: enabledTools.split(',').map(tool => tool.trim()),
    });

    setIsSaving(false);

    if (error) {
      toast({
        title: 'Error creating agent',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Agent created successfully',
        description: `The agent "${name}" has been created.`,
      });
      router.push('/admin/agents');
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Agent</CardTitle>
          <CardDescription>Define the configuration for a new AI agent.</CardDescription>
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
                {isSaving ? 'Saving...' : 'Save Agent'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}