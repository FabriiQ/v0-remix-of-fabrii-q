import { createServiceClient } from '@/lib/supabase/server';
import { type Database } from '@/lib/supabase/database.types';

export type Post = Database['public']['Tables']['content_posts']['Row'];

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('content_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching published posts:', error);
    return [];
  }

  return data || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const supabase = createServiceClient();
    const { data, error } = await supabase
        .from('content_posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error(`Error fetching post by slug "${slug}":`, error);
        return null;
    }

    return data;
}