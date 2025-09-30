import { notFound } from 'next/navigation';
import { getConversationById } from '@/lib/services/crmService';
import { ConversationClient } from './conversation-client';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function ConversationPage({ params }: { params: { id: string } }) {
  const conversation = await getConversationById(params.id);

  if (!conversation) {
    notFound();
  }

  return (
    <Suspense fallback={<ConversationSkeleton />}>
      <ConversationClient conversation={conversation} />
    </Suspense>
  );
}

function ConversationSkeleton() {
    return (
        <div className="p-6 space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        </div>
    )
}