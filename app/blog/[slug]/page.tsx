import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/services/blogService';
import { Metadata } from 'next';
import BlogPostClient from './blog-post-client';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);
    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: `${post.title} | FabriiQ Blog`,
      description: post.excerpt || 'An article from the FabriiQ team.',
    };
}


// The main page component - now a pure Server Component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}