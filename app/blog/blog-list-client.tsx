'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type Post } from '@/lib/services/blogService';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

interface BlogListClientProps {
  posts: Post[];
}

function EmptyState() {
    return (
        <div className="text-center py-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block p-6 bg-gray-800/50 rounded-full border border-gray-700"
            >
                <BookOpen className="h-12 w-12 text-fabriiq-primary" />
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 text-2xl font-bold text-white"
            >
                No Posts Yet
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-2 text-lg text-gray-400"
            >
                Our team is busy writing. Please check back soon for insights and updates.
            </motion.p>
        </div>
    );
}

export function BlogListClient({ posts }: BlogListClientProps) {
    if (posts.length === 0) {
        return <EmptyState />;
    }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Card className="flex flex-col h-full bg-gray-900/50 border-gray-800 hover:border-fabriiq-primary/50 transition-colors duration-300">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-white hover:text-fabriiq-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="flex items-center text-gray-400 pt-2">
                        <Calendar className="mr-2 h-4 w-4" />
                        {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not Published'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-gray-300">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                    <Link href={`/blog/${post.slug}`} className="w-full">
                        <Button variant="outline" className="w-full border-gray-700 hover:bg-fabriiq-primary/10 hover:border-fabriiq-primary hover:text-fabriiq-primary">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
      ))}
    </div>
  );
}