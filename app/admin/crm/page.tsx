import { Suspense } from 'react';
import { getDashboardData } from '@/lib/services/crmService';
import CRMDashboard from './crm-dashboard';
import { DashboardStats } from '@/lib/services/crmService';
import { Skeleton } from '@/components/ui/skeleton';

// This is now a Server Component
export default async function CRMDashboardPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const timeRange = typeof searchParams.timeRange === 'string' ? searchParams.timeRange : '30';

  // Fetch data on the server
  const initialDashboardData = await getDashboardData(timeRange);

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">CRM Dashboard</h1>
      </header>
      <main className="flex-1 p-4 overflow-auto">
        <Suspense fallback={<DashboardSkeleton />}>
          <CRMDashboard initialData={initialDashboardData} />
        </Suspense>
      </main>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
}