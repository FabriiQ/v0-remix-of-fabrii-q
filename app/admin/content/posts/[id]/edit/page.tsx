'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { type Post } from '@/lib/services/blogService';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function EditPostPage() {
    const [post, setPost] = useState<Post | null>(null);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [status, setStatus] = useState('draft');
    const [type, setType] = useState('blog_post');
    const [scheduledAt, setScheduledAt] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams();
    const postId = params.id as string;

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) return;
            try {
                setIsLoading(true);
                const response = await fetch(`/api/content/posts/${postId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post data');
                }
                const data: Post = await response.json();
                setPost(data);
                setTitle(data.title);
                setSlug(data.slug);
                setContent(data.content || '');
                setExcerpt(data.excerpt || '');
                setStatus(data.status || 'draft');
                setType(data.type || 'blog_post');
                setScheduledAt(data.scheduled_at ? new Date(data.scheduled_at).toISOString().slice(0, 16) : '');
            } catch (error) {
                toast({ title: 'Error', description: 'Failed to load post.', variant: 'destructive' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [postId, toast]);

    const handleSubmit = async (publish: boolean) => {
        setIsSaving(true);
        const finalStatus = publish ? 'published' : status;
        const postData = {
            title,
            slug,
            content,
            excerpt,
            status: finalStatus,
            type,
            scheduled_at: scheduledAt || null,
            published_at: (publish && !post?.published_at) ? new Date().toISOString() : post?.published_at,
        };

        try {
            const response = await fetch(`/api/content/posts/${postId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });
            if (!response.ok) throw new Error('Failed to update post');

            toast({ title: 'Success', description: 'Post updated successfully.' });
            router.push('/admin/content/posts');
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to update post.', variant: 'destructive' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="p-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!post) {
        return <div className="p-6">Post not found.</div>
    }

    return (
        <div className="p-6">
            <Link href="/admin/content/posts" className="flex items-center text-sm text-gray-500 hover:text-black mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all posts
            </Link>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Post</CardTitle>
                    <CardDescription>
                        You are currently editing &quot;{post.title}&quot;.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input id="slug" value={slug} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={15} />
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
                            Save Changes
                        </Button>
                        <Button onClick={() => handleSubmit(true)} disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update & Publish
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}