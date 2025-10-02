import { createClient } from '@/lib/supabase/server';
import { type Database } from '@/lib/supabase/database.types';

type BasePost = Database['public']['Tables']['content_posts']['Row'];

// Extend the base Post type to include the author's name after transformation
export type Post = BasePost & {
  author_name?: string;
};

// Define the type returned by the query before transformation
type PostWithAuthor = BasePost & {
    author: {
        full_name: string;
    } | null;
};

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('content_posts')
    .select(`
      *,
      author:user_profiles(full_name)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching published posts:', error);
    return [];
  }

  // Transform the data to flatten the author name
  const postsWithAuthorName = (data as PostWithAuthor[]).map(post => {
    const { author, ...rest } = post;
    return {
        ...rest,
        author_name: author?.full_name || 'FabriiQ Team'
    };
  });

  return postsWithAuthorName;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('content_posts')
        .select(`
            *,
            author:user_profiles(full_name)
        `)
        .eq('slug', slug)
        .single();

    if (error) {
        console.error(`Error fetching post by slug "${slug}":`, error);
        return null;
    }

    if (!data) {
        return null;
    }

    // Transform the data to flatten the author name
    const { author, ...rest } = data as PostWithAuthor;
    const postWithAuthorName: Post = {
        ...rest,
        author_name: author?.full_name || 'FabriiQ Team'
    };

    return postWithAuthorName;
}