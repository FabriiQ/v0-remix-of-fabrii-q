'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, FileText, Share2 } from 'lucide-react';

function AIContentGenerator() {
  const [generationMode, setGenerationMode] = useState('blog');

  // Blog state
  const [blogTopic, setBlogTopic] = useState('');
  const [blogKeywords, setBlogKeywords] = useState('');
  const [blogTone, setBlogTone] = useState('Informative');

  // Social Media state
  const [socialPlatform, setSocialPlatform] = useState('LinkedIn');
  const [socialMessage, setSocialMessage] = useState('');

  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleGenerate = async () => {
    let prompt;
    let context = ``;

    if (generationMode === 'blog') {
      if (!blogTopic) {
        toast({ title: "Blog topic is required", variant: "destructive" });
        return;
      }
      prompt = `Write a comprehensive blog post on the topic: "${blogTopic}".`;
      if (blogKeywords) context += ` Please include the following keywords: ${blogKeywords}.`;
      if (blogTone) context += ` The tone of the post should be ${blogTone}.`;
    } else {
      if (!socialMessage) {
        toast({ title: "Core message is required", variant: "destructive" });
        return;
      }
      prompt = `Generate a ${socialPlatform} post based on the following message: "${socialMessage}".`;
      context = `The post should be engaging and appropriate for the ${socialPlatform} platform.`;
    }

    setIsLoading(true);
    setGeneratedContent('');
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, context }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }
      const data = await response.json();
      setGeneratedContent(data.content);
      toast({ title: "Content Generated", description: "AI content is ready to be used." });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseContent = () => {
    if (!generatedContent) return;

    if (generationMode === 'blog') {
      const newPostUrl = `/admin/content/posts/new?content=${encodeURIComponent(generatedContent)}`;
      router.push(newPostUrl);
    } else {
      navigator.clipboard.writeText(generatedContent);
      toast({ title: "Copied to clipboard", description: "Social media post has been copied." });
    }
  };

  const renderBlogForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="blog-topic">Topic</Label>
        <Input id="blog-topic" value={blogTopic} onChange={(e) => setBlogTopic(e.target.value)} placeholder="e.g., The Future of Renewable Energy" />
      </div>
      <div>
        <Label htmlFor="blog-keywords">Keywords (comma-separated)</Label>
        <Input id="blog-keywords" value={blogKeywords} onChange={(e) => setBlogKeywords(e.target.value)} placeholder="e.g., solar, wind, sustainability" />
      </div>
      <div>
        <Label htmlFor="blog-tone">Tone</Label>
        <Select value={blogTone} onValueChange={setBlogTone}>
            <SelectTrigger id="blog-tone"><SelectValue /></SelectTrigger>
            <SelectContent>
                <SelectItem value="Informative">Informative</SelectItem>
                <SelectItem value="Casual">Casual</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Humorous">Humorous</SelectItem>
                <SelectItem value="Persuasive">Persuasive</SelectItem>
            </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderSocialForm = () => (
    <div className="space-y-4">
        <div>
            <Label htmlFor="social-platform">Platform</Label>
            <Select value={socialPlatform} onValueChange={setSocialPlatform}>
                <SelectTrigger id="social-platform"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Twitter">Twitter / X</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div>
            <Label htmlFor="social-message">Core Message</Label>
            <Textarea id="social-message" value={socialMessage} onChange={(e) => setSocialMessage(e.target.value)} placeholder="e.g., Announcing our new product launch next week!" rows={4} />
        </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>AI Content Generation</CardTitle>
                <CardDescription>Select a content type and provide details for the AI.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <RadioGroup defaultValue="blog" value={generationMode} onValueChange={setGenerationMode} className="grid grid-cols-2 gap-4">
                    <div>
                        <RadioGroupItem value="blog" id="r1" className="peer sr-only" />
                        <Label htmlFor="r1" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            <FileText className="mb-3 h-6 w-6" />
                            Blog Post
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="social" id="r2" className="peer sr-only" />
                        <Label htmlFor="r2" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            <Share2 className="mb-3 h-6 w-6" />
                            Social Media
                        </Label>
                    </div>
                </RadioGroup>

                {generationMode === 'blog' ? renderBlogForm() : renderSocialForm()}

                <Button onClick={handleGenerate} disabled={isLoading} className="w-full !mt-8">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Generate Content
                </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Generated Content</CardTitle>
                <Button variant="default" size="sm" onClick={handleUseContent} disabled={!generatedContent}>
                  {generationMode === 'blog' ? 'Use in Editor' : 'Copy Text'}
                </Button>
            </CardHeader>
            <CardContent>
                <div className="prose dark:prose-invert max-w-none h-[30rem] overflow-y-auto rounded-md border p-4 bg-background">
                    {generatedContent || <p className="text-muted-foreground">AI-generated content will appear here.</p>}
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default function AIGeneratorPage() {
    return (
        <div className="p-6 space-y-6">
             <h1 className="text-3xl font-bold">AI Content Generator</h1>
             <AIContentGenerator />
        </div>
    )
}