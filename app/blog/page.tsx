import { Suspense } from 'react';
import { getPublishedPosts } from '@/lib/services/blogService';
import { BlogListClient } from './blog-list-client';
import { Skeleton } from '@/components/ui/skeleton';
import { NavBar } from '@/components/nav-bar';
import { Footer } from '@/components/footer';

// This is now a correct async Server Component
export default async function BlogPage() {
  const posts = await getPublishedPosts();

  const title = "FabriiQ Insights";
  const description = "Exploring the future of educational technology, AI, and modern learning environments.";

  return (
    <div className="min-h-screen bg-black text-white">
        <NavBar />
        <main className="pt-24">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: 'radial-gradient(circle at 20% 50%, rgba(31,80,75,0.2) 0%, transparent 50%)'
                    }}
                />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1
                        className="text-5xl sm:text-7xl font-black mb-8 leading-tight text-white"
                    >
                        {title}
                    </h1>
                    <p
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        {description}
                    </p>
                </div>
            </section>

            {/* Blog List Section */}
            <section className="py-16 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <Suspense fallback={<BlogListSkeleton />}>
                        <BlogListClient posts={posts} />
                    </Suspense>
                </div>
            </section>
        </main>
        <Footer />
    </div>
  );
}

function BlogListSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4 bg-gray-900/50 p-6 rounded-xl">
          <Skeleton className="h-48 w-full rounded-lg bg-gray-800" />
          <Skeleton className="h-6 w-3/4 bg-gray-800" />
          <Skeleton className="h-4 w-1/2 bg-gray-800" />
          <Skeleton className="h-10 w-24 bg-gray-800" />
        </div>
      ))}
    </div>
  );
}