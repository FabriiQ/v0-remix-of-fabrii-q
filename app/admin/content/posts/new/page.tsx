import { Suspense } from 'react';
import EditorClient from './editor-client';
import { Skeleton } from '@/components/ui/skeleton';

function EditorSkeleton() {
    return (
        <div className="p-6">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-64 w-full" />
                </CardContent>
            </Card>
        </div>
    )
}

export default function NewPostPageWrapper() {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <EditorClient />
    </Suspense>
  );
}