"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart2,
  Mail,
  CreditCard,
  Settings,
} from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  // icon should be a string key; we map it to an actual component locally
  icon?: keyof typeof iconMap | string;
  label?: string;
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
}

const iconMap = {
  layoutDashboard: LayoutDashboard,
  users: Users,
  messageSquare: MessageSquare,
  barChart2: BarChart2,
  mail: Mail,
  creditCard: CreditCard,
  settings: Settings,
};

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)} {...props}>
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : undefined;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
              isActive ? 'bg-accent' : 'transparent',
              item.disabled && 'cursor-not-allowed opacity-60'
            )}
            aria-disabled={item.disabled}
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            <span>{item.title}</span>
            {item.label && (
              <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                {item.label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
