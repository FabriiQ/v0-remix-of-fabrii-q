'use client';

import Link from 'next/link';
import { 
  Users, 
  MessageSquare, 
  TrendingUp,
  Clock,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { DashboardStats } from '@/lib/services/crmService';

type PriorityType = 'low' | 'medium' | 'high';

// Helper function to get priority color
const getPriorityColor = (priority: PriorityType) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getActivityIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'lead_created':
    case 'new_lead':
      return <Users className="h-4 w-4 text-blue-600" />;
    case 'conversation_started':
    case 'new_conversation':
      return <MessageSquare className="h-4 w-4 text-green-600" />;
    case 'follow_up':
    case 'followup_scheduled':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'assessment_completed':
      return <BarChart3 className="h-4 w-4 text-purple-600" />;
    default:
      return <MessageSquare className="h-4 w-4 text-gray-500" />;
  }
};

const CRMDashboard = ({ initialData }: { initialData: DashboardStats | null }) => {

  if (!initialData) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Error loading dashboard</h3>
          <p className="mt-2 text-sm text-gray-600">
            Unable to load dashboard data. Please try again later.
          </p>
          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#1F504B] hover:bg-[#163d39] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F504B]"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { statistics, recentActivities } = initialData;

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>
          <p className="text-gray-600">Overview of your contacts and conversations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Leads" 
            value={statistics.totalLeads.toLocaleString()} 
            icon={<Users className="h-6 w-6 text-blue-600" />}
            trend="12%"
            trendType="up"
          />
          <StatCard 
            title="Active Conversations" 
            value={statistics.activeConversations.toString()} 
            icon={<MessageSquare className="h-6 w-6 text-green-600" />}
            trend="8%"
            trendType="up"
          />
          <StatCard 
            title="Conversion Rate" 
            value={`${statistics.conversionRate}%`} 
            icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
            trend="3%"
            trendType="up"
          />
          <StatCard 
            title="Engagement Score" 
            value={Math.round(statistics.avgEngagementScore).toString()} 
            icon={<BarChart3 className="h-6 w-6 text-yellow-600" />}
            trend="5%"
            trendType="up"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Link href="/admin/crm/activity" className="text-sm font-medium text-[#1F504B] hover:underline flex items-center">
              View all activity <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No recent activities found</p>
              </div>
            ) : (
              recentActivities.slice(0, 5).map((activity) => {
                const priority = activity.priority || 'medium'; // Default to medium if not specified
                const timeDisplay = activity.timestamp 
                  ? new Date(activity.timestamp).toLocaleString() 
                  : 'Unknown time';
                
                return (
                  <div key={activity.id} className="flex items-start p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex-shrink-0 p-2 rounded-full bg-gray-100">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.contactName || 'Unknown Contact'}
                          {activity.organization && (
                            <span className="text-xs text-gray-500 ml-2">({activity.organization})</span>
                          )}
                        </p>
                        <span 
                          className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(priority)}`}
                        >
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                         'No description available'
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {timeDisplay}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard 
            title="Add New Contact"
            description="Create a new contact in your CRM"
            icon={<Users className="h-6 w-6" />}
            href="/admin/crm/contacts/new"
            buttonText="Add Contact"
          />
          <QuickActionCard 
            title="Start Conversation"
            description="Initiate a new conversation"
            icon={<MessageSquare className="h-6 w-6" />}
            href="/admin/crm/conversations"
            buttonText="New Chat"
          />
          <QuickActionCard 
            title="View Reports"
            description="Analyze your CRM performance"
            icon={<TrendingUp className="h-6 w-6" />}
            href="/admin/reports"
            buttonText="View Reports"
          />
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, icon, trend, trendType }: { 
  title: string; 
  value: string; 
  icon: React.ReactNode;
  trend: string;
  trendType: 'up' | 'down';
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        <div className={`mt-2 flex items-center text-sm ${trendType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trendType === 'up' ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L13 9.414V17a1 1 0 11-2 0V9.414l-2.293 2.293a1 1 0 01-1.414-1.414l4-4A1 1 0 0112 7z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 13a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L12 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0112 13z" clipRule="evenodd" />
            </svg>
          )}
          <span className="ml-1">{trend} from last month</span>
        </div>
      </div>
      <div className="p-3 rounded-full bg-gray-50">
        {icon}
      </div>
    </div>
  </div>
);

const QuickActionCard = ({ 
  title, 
  description, 
  icon, 
  href, 
  buttonText 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  href: string; 
  buttonText: string;
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full">
    <div className="flex-1">
      <div className="p-3 rounded-full bg-gray-100 w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
    <div className="mt-4">
      <Link 
        href={href}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#1F504B] hover:bg-[#163d39] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F504B]"
      >
        {buttonText}
      </Link>
    </div>
  </div>
);

export default CRMDashboard;