import { Suspense } from 'react';
import { getAssessments, AssessmentsData } from '@/lib/services/crmService';
import AssessmentsClient from './assessments-client';
import { Skeleton } from '@/components/ui/skeleton';

export default async function AssessmentsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const pageSize = typeof searchParams.pageSize === 'string' ? parseInt(searchParams.pageSize) : 50;
  const status = typeof searchParams.status === 'string' ? searchParams.status : undefined;
  const readinessLevel = typeof searchParams.readinessLevel === 'string' ? searchParams.readinessLevel : undefined;
  const institutionType = typeof searchParams.institutionType === 'string' ? searchParams.institutionType : undefined;
  const priority = typeof searchParams.priority === 'string' ? searchParams.priority : undefined;

  const initialData = await getAssessments(
    page,
    pageSize,
    status,
    readinessLevel,
    institutionType,
    priority
  );

  return (
    <Suspense fallback={<AssessmentsSkeleton />}>
      <AssessmentsClient initialData={initialData} />
    </Suspense>
  );
}

function AssessmentsSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-lg" />
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-12 w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}