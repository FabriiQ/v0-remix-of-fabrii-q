'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import the client component with no SSR
const CRMDashboard = dynamic(
  () => import('./crm-dashboard'),
  { 
    ssr: false,
    loading: () => <div className="p-4">Loading dashboard...</div>,
  }
);

// This is now a Client Component
export default function CRMDashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">CRM Dashboard</h1>
      </header>
      <main className="flex-1 p-4 overflow-auto">
        <Suspense fallback={<div>Loading dashboard data...</div>}>
          <CRMDashboard />
        </Suspense>
      </main>
    </div>
  );
}
