'use client'

import { motion } from 'framer-motion';
import { type Post } from '@/lib/services/blogService';
import { Calendar, User } from 'lucide-react';
import { NavBar } from '@/components/nav-bar';
import { Footer } from '@/components/footer';

interface BlogPostClientProps {
  post: Post & { author_name?: string }; // Expect author_name to be passed
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <main className="pt-32 pb-16">
        <article className="container mx-auto px-4">
          {/* Animated Post Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                {/* Display dynamic author name, fallback to 'FabriiQ Team' */}
                <span>{post.author_name || 'FabriiQ Team'}</span>
              </div>
              {post.published_at && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Post Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto prose-p:leading-relaxed prose-headings:text-white prose-a:text-fabriiq-primary hover:prose-a:text-fabriiq-teal"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}