import { Metadata } from 'next';
import { Suspense } from 'react';
import { getContacts, ContactsData } from '@/lib/services/crmService';
import { ContactsClient } from './contacts-client';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Contacts | FabriiQ CRM',
  description: 'Manage your contacts in FabriiQ CRM',
};

export default async function ContactsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const pageSize = typeof searchParams.pageSize === 'string' ? parseInt(searchParams.pageSize) : 50;
  const status = typeof searchParams.status === 'string' ? searchParams.status : undefined;
  const source = typeof searchParams.source === 'string' ? searchParams.source : undefined;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

  const initialContactsData = await getContacts(page, pageSize, status, source, search);

  return (
    <Suspense fallback={<ContactsSkeleton />}>
      <ContactsClient initialData={initialContactsData} />
    </Suspense>
  );
}

function ContactsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-12"><Skeleton className="h-6 w-6" /></th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"><Skeleton className="h-6 w-24" /></th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"><Skeleton className="h-6 w-32" /></th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"><Skeleton className="h-6 w-20" /></th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"><Skeleton className="h-6 w-20" /></th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"><Skeleton className="h-6 w-24" /></th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground"><Skeleton className="h-6 w-16" /></th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle"><Skeleton className="h-6 w-6" /></td>
                  <td className="p-4 align-middle"><Skeleton className="h-10 w-40" /></td>
                  <td className="p-4 align-middle"><Skeleton className="h-6 w-32" /></td>
                  <td className="p-4 align-middle"><Skeleton className="h-6 w-20" /></td>
                  <td className="p-4 align-middle"><Skeleton className="h-6 w-20" /></td>
                  <td className="p-4 align-middle"><Skeleton className="h-6 w-24" /></td>
                  <td className="p-4 align-middle text-right"><Skeleton className="h-8 w-16" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}