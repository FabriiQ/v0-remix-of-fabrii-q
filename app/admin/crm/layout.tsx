import { SidebarNav } from '@/components/sidebar-nav';
import { dashboardConfig } from '@/config/dashboard';

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="border-b">
          <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
              <div className="h-full py-6 pr-6 lg:py-8">
                <SidebarNav items={dashboardConfig.sidebarNav} className="p-1" />
              </div>
            </aside>
            <main className="flex w-full flex-col overflow-hidden">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
