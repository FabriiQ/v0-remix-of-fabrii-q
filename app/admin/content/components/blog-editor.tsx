'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { type Post } from '@/lib/services/blogService';
import { Loader2 } from 'lucide-react';

interface BlogEditorProps {
    postToEdit?: Post | null;
    onSave?: (post: Post) => void;
    initialContent?: string | null;
}

const generateSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
};

export function BlogEditor({ postToEdit, onSave, initialContent }: BlogEditorProps) {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [status, setStatus] = useState('draft');
    const [type, setType] = useState('blog_post');
    const [scheduledAt, setScheduledAt] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (postToEdit) {
            setTitle(postToEdit.title);
            setSlug(postToEdit.slug);
            setContent(postToEdit.content || '');
            setExcerpt(postToEdit.excerpt || '');
            setStatus(postToEdit.status || 'draft');
            setType(postToEdit.type || 'blog_post');
            setScheduledAt(postToEdit.scheduled_at ? new Date(postToEdit.scheduled_at).toISOString().slice(0, 16) : '');
        } else {
            // Reset form for new post, potentially with AI content
            setTitle('');
            setSlug('');
            setContent(initialContent || '');
            setExcerpt('');
            setStatus('draft');
            setType('blog_post');
            setScheduledAt('');
        }
    }, [postToEdit, initialContent]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (!postToEdit) { // Only auto-generate slug for new posts
            setSlug(generateSlug(newTitle));
        }
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
            published_at: publish ? new Date().toISOString() : (postToEdit?.published_at || null),
        };

        try {
            const url = postToEdit ? `/api/content/posts/${postToEdit.id}` : '/api/content/posts';
            const method = postToEdit ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to ${postToEdit ? 'update' : 'create'} post`);
            }

            const savedPost = await response.json();

            toast({
                title: `Post ${postToEdit ? 'Updated' : 'Created'}`,
                description: `Your post "${savedPost.title}" has been saved.`,
            });

            if (onSave) {
                onSave(savedPost);
            }

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
        <Card>
            <CardHeader>
                <CardTitle>{postToEdit ? 'Edit Post' : 'Create New Post'}</CardTitle>
                <CardDescription>
                    {postToEdit ? `Editing "${postToEdit.title}"` : 'Fill out the details below to create a new post.'}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter post title" value={title} onChange={handleTitleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" placeholder="post-slug-will-be-here" value={slug} onChange={(e) => setSlug(e.target.value)} readOnly={!!postToEdit} />
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
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
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
                        {postToEdit ? 'Update Post' : 'Publish'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}