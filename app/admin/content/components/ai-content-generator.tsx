'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'

interface AIContentGeneratorProps {
  onContentGenerated: (content: string) => void;
}

export function AIContentGenerator({ onContentGenerated }: AIContentGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [context, setContext] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Prompt is required",
        description: "Please enter a prompt to generate content.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setGeneratedContent('')

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, context }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate content')
      }

      const data = await response.json()
      setGeneratedContent(data.content)
      toast({
        title: "Content Generated",
        description: "AI has successfully generated the content.",
      })
    } catch (error) {
      console.error('Generation failed:', error)
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseContent = () => {
    if (generatedContent) {
      onContentGenerated(generatedContent);
      toast({
        title: "Content Sent to Editor",
        description: "The generated content has been added to the editor.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>AI Content Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="prompt">Prompt</Label>
                    <Textarea
                        id="prompt"
                        placeholder="e.g., Write a blog post about the benefits of serverless architecture for startups."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={4}
                    />
                </div>
                <div>
                    <Label htmlFor="context">Additional Context (Optional)</Label>
                    <Textarea
                        id="context"
                        placeholder="e.g., Mention our new serverless product, 'SwiftDeploy'. The tone should be informative but engaging."
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        rows={6}
                    />
                </div>
                <Button onClick={handleGenerate} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isLoading ? 'Generating...' : 'Generate Content'}
                </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Generated Content</CardTitle>
                <Button variant="outline" size="sm" onClick={handleUseContent} disabled={!generatedContent}>
                    Use This Content
                </Button>
            </CardHeader>
            <CardContent>
                <div className="prose dark:prose-invert max-w-none h-96 overflow-y-auto rounded-md border p-4">
                    {generatedContent ? <p>{generatedContent}</p> : <p className="text-muted-foreground">AI-generated content will appear here.</p>}
                </div>
            </CardContent>
        </Card>
    </div>
  )
}