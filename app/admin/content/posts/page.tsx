'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Post } from '@/lib/services/blogService';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle } from 'lucide-react';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/content/posts');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        toast({
          title: 'Error fetching posts',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  const getStatusVariant = (status: string | null) => {
    switch (status) {
      case 'published': return 'default';
      case 'pending_review': return 'secondary';
      case 'draft': return 'outline';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <TableBody>
          {Array.from({ length: 8 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
              <TableCell><Skeleton className="h-5 w-20" /></TableCell>
              <TableCell><Skeleton className="h-5 w-24" /></TableCell>
              <TableCell><Skeleton className="h-8 w-16" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      );
    }

    if (error) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="text-center text-red-500 py-8">
              {error}
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    if (posts.length === 0) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No posts found. Get started by creating one!
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    return (
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">{post.title}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(post.status)}>{post.status}</Badge>
            </TableCell>
            <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
            <TableCell>
                <Link href={`/admin/content/posts/${post.id}/edit`}>
                    <Button variant="outline" size="sm">Edit</Button>
                </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Blog Posts</h1>
            <Link href="/admin/content/posts/new">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Post
                </Button>
            </Link>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>All Posts</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                {renderContent()}
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}