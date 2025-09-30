'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type Post } from '@/lib/services/blogService';
import { Badge } from '@/components/ui/badge';

interface BlogListClientProps {
  posts: Post[];
}

export function BlogListClient({ posts }: BlogListClientProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">{post.excerpt}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Link href={`/blog/${post.slug}`}>
              <Button>Read More</Button>
            </Link>
            <div className="text-sm text-muted-foreground">
                {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}