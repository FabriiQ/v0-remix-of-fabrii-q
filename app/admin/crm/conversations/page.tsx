import { Metadata } from 'next';
import { Suspense } from 'react';
import { getConversations } from '@/lib/services/crmService';
import ConversationsWrapper from './conversations-wrapper';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Conversations | CRM',
  description: 'View and manage your conversations',
};

export default async function ConversationsPage() {
  const initialConversations = await getConversations();

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">Conversations</h1>
        <p className="text-gray-600">View and manage your conversations with contacts</p>
      </header>
      <main className="flex-1 p-4 overflow-auto">
        <Suspense fallback={<ConversationsSkeleton />}>
          <ConversationsWrapper initialConversations={initialConversations} />
        </Suspense>
      </main>
    </div>
  );
}

function ConversationsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="p-4 space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
}