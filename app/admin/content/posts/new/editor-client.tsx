'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const generateSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

export default function EditorClient() {
    const searchParams = useSearchParams();
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [status, setStatus] = useState('draft');
    const [type, setType] = useState('blog_post');
    const [scheduledAt, setScheduledAt] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const aiContent = searchParams.get('content');
        if (aiContent) {
            setContent(decodeURIComponent(aiContent));
        }
    }, [searchParams]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(generateSlug(newTitle));
    };

    const handleSubmit = async (publish: boolean) => {
        setIsSaving(true);

        const postData = {
            title,
            slug,
            content,
            excerpt,
            status: publish ? 'published' : status,
            type,
            scheduled_at: scheduledAt || null,
            published_at: publish ? new Date().toISOString() : null,
        };

        try {
            const response = await fetch('/api/content/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create post');
            }

            const savedPost = await response.json();

            toast({
                title: 'Post Created',
                description: `Your post "${savedPost.title}" has been created successfully.`,
            });

            router.push('/admin/content/posts');

        } catch (error) {
            console.error('Save failed:', error);
            toast({
                title: "Save Failed",
                description: error instanceof Error ? error.message : "An unknown error occurred.",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                    <CardDescription>
                        Fill out the details below to create a new blog post.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Enter post title" value={title} onChange={handleTitleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input id="slug" placeholder="post-slug-will-be-here" value={slug} onChange={(e) => setSlug(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea id="excerpt" placeholder="A short summary of the post..." value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" placeholder="Write your blog post here..." value={content} onChange={(e) => setContent(e.target.value)} rows={15} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="pending_review">Pending Review</SelectItem>
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="scheduled_at">Scheduled At</Label>
                            <Input id="scheduled_at" type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => handleSubmit(false)} disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Draft
                        </Button>
                        <Button onClick={() => handleSubmit(true)} disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Publish
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}