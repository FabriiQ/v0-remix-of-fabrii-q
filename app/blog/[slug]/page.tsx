import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/services/blogService';
import { NavBar } from '@/components/nav-bar';
import { Footer } from '@/components/footer';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
        <NavBar />
        <main className="container mx-auto px-4 py-8">
            <article className="prose dark:prose-invert max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
                {post.published_at && (
                    <p className="text-muted-foreground">
                        Published on {new Date(post.published_at).toLocaleDateString()}
                    </p>
                )}
                <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
            </article>
        </main>
        <Footer />
    </div>
  );
}