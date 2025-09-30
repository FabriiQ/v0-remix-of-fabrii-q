'use client';

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Database,
  Settings,
  BarChart3,
  Home,
  Brain,
  Users,
  MessageSquare,
  CheckCircle
} from 'lucide-react'

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  current: boolean;
}

export default function AdminSidebar() {
  const pathname = usePathname();

  const navigation: NavItem[] = [
    {
      name: 'Documents',
      href: '/admin/documents',
      icon: Database,
      current: pathname === '/admin/documents'
    },
    {
      name: 'Knowledge Base',
      href: '/admin/knowledge-base',
      icon: Brain,
      current: pathname === '/admin/knowledge-base'
    },
    {
      name: 'CRM Dashboard',
      href: '/admin/crm',
      icon: Users,
      current: pathname?.startsWith('/admin/crm') || false
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      current: pathname === '/admin/settings'
    }
  ]

  // CRM sub-navigation when on CRM pages
  const crmNavigation: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/admin/crm',
      icon: BarChart3,
      current: pathname === '/admin/crm'
    },
    {
      name: 'Contacts',
      href: '/admin/crm/contacts',
      icon: Users,
      current: pathname?.startsWith('/admin/crm/contacts') || false
    },
    {
      name: 'Conversations',
      href: '/admin/crm/conversations',
      icon: MessageSquare,
      current: pathname?.startsWith('/admin/crm/conversations') || false
    },
    {
      name: 'Tasks',
      href: '/admin/crm/tasks',
      icon: CheckCircle,
      current: pathname?.startsWith('/admin/crm/tasks') || false
    }
  ]

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="mt-8 px-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? 'bg-[#1F504B] text-white'
                      : 'text-gray-700 hover:bg-[#D8E3E0] hover:text-[#1F504B]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CRM Sub-navigation */}
        {pathname?.startsWith('/admin/crm') && (
          <div className="mt-6">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              CRM Tools
            </h3>
            <ul className="space-y-1">
              {crmNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        item.current
                          ? 'bg-[#5A8A84] text-white'
                          : 'text-gray-600 hover:bg-[#D8E3E0] hover:text-[#1F504B]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {pathname?.startsWith('/admin/crm') ? 'CRM Stats' : 'Quick Stats'}
          </h3>
          <div className="space-y-2">
            {pathname?.startsWith('/admin/crm') ? (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Leads</span>
                  <span className="font-medium text-[#1F504B]">-</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Tasks</span>
                  <span className="font-medium text-[#1F504B]">-</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Conversations</span>
                  <span className="font-medium text-[#1F504B]">-</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Documents</span>
                  <span className="font-medium text-gray-900">-</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vector Chunks</span>
                  <span className="font-medium text-gray-900">-</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Tokens</span>
                  <span className="font-medium text-gray-900">-</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-800">System Online</span>
          </div>
          <p className="text-xs text-green-600 mt-1">AI services are running</p>
        </div>
      </nav>
    </aside>
  )
}