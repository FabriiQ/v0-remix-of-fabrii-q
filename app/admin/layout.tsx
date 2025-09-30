import { ReactNode } from 'react'
import Link from 'next/link'
import { Home, Brain } from 'lucide-react'
import AdminSidebar from './admin-sidebar'

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-[#1F504B] hover:text-[#5A8A84] transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to FabriiQ</span>
              </Link>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-[#1F504B]" />
                  <span className="text-xl font-bold text-gray-900">FabriiQ Admin</span>
                  <span className="text-xs bg-[#D8E3E0] text-[#1F504B] px-2 py-1 rounded-full">Alpha</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                AI Knowledge Management
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <AdminSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}