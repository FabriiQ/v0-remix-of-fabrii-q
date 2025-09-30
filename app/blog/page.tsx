import { Suspense } from 'react';
import { getPublishedPosts } from '@/lib/services/blogService';
import { BlogListClient } from './blog-list-client';
import { Skeleton } from '@/components/ui/skeleton';
import { NavBar } from '@/components/nav-bar';
import { Footer } from '@/components/footer';

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div>
        <NavBar />
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
            <Suspense fallback={<BlogListSkeleton />}>
                <BlogListClient posts={posts} />
            </Suspense>
        </main>
        <Footer />
    </div>
  );
}

function BlogListSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-24" />
        </div>
      ))}
    </div>
  );
}