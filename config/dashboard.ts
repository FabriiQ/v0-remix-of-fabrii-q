export type DashboardNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  // icon is a string key; mapped in the client SidebarNav component
  icon?:
    | 'layoutDashboard'
    | 'users'
    | 'messageSquare'
    | 'barChart2'
    | 'mail'
    | 'creditCard'
    | 'settings';
  label?: string;
};

export type DashboardConfig = {
  sidebarNav: DashboardNavItem[];
};

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Dashboard',
      href: '/admin/crm',
      icon: 'layoutDashboard',
    },
    {
      title: 'Contacts',
      href: '/admin/crm/contacts',
      icon: 'users',
    },
    {
      title: 'Messages',
      href: '/admin/crm/messages',
      icon: 'messageSquare',
    },
    {
      title: 'Analytics',
      href: '/admin/crm/analytics',
      icon: 'barChart2',
    },
    {
      title: 'Tasks',
      href: '/admin/crm/tasks',
      icon: 'settings',
    },
  ],
};
