'use client'

import { useState, useEffect, useCallback } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Users,
  Target,
  BarChart3,
  Filter,
  Download,
  Eye,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Phone,
  Mail,
  Building,
  Search,
  ChevronRight
} from 'lucide-react'

interface ConversationAnalytics {
  id: string
  session_id: string
  contact_id?: string
  contact_name?: string
  contact_email?: string
  organization?: string
  total_messages: number
  conversation_duration_minutes: number
  user_engagement_score: number
  intent_distribution: Record<string, number>
  topics_covered: string[]
  pain_points_mentioned: string[]
  buying_signals: number
  objections_raised: string[]
  competitive_mentions: string[]
  demo_requested: boolean
  contact_info_provided: boolean
  meeting_requested: boolean
  pricing_discussed: boolean
  partnership_assessment_completed: boolean
  technical_questions: number
  business_questions: number
  satisfaction_indicators: Record<string, any>
  conversion_stage: 'awareness' | 'interest' | 'consideration' | 'evaluation' | 'decision' | 'partnership'
  last_updated: string
  created_at: string
}

export default function ConversationsClient({ initialConversations = [] }: { initialConversations: any[] }) {
  const [conversations, setConversations] = useState<ConversationAnalytics[]>([])
  const [filteredConversations, setFilteredConversations] = useState<ConversationAnalytics[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [stageFilter, setStageFilter] = useState<string>('all')
  const [engagementFilter, setEngagementFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')

  useEffect(() => {
    // Initialize with server-side data
    if (initialConversations.length > 0) {
      setConversations(initialConversations)
      setFilteredConversations(initialConversations)
    } else {
      loadConversations()
    }
    
    // Set up real-time subscription for conversations
    const supabase = getSupabaseClient()
    
    const conversationsChannel = supabase
      .channel('conversations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversation_sessions'
        },
        (payload) => {
          console.log('Conversation change received:', payload)
          loadConversations()
        }
      )
      .subscribe()
    
    const analyticsChannel = supabase
      .channel('conversation-analytics-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversation_analytics'
        },
        () => {
          console.log('Conversation analytics change received')
          loadConversations()
        }
      )
      .subscribe()
    
    const interactionsChannel = supabase
      .channel('interactions-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_interactions'
        },
        () => {
          console.log('Interaction change received')
          loadConversations()
        }
      )
      .subscribe()
    
    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeChannel(conversationsChannel)
      supabase.removeChannel(analyticsChannel)
      supabase.removeChannel(interactionsChannel)
    }
  }, [])

  useEffect(() => {
    filterConversations()
  }, [conversations, searchQuery, stageFilter, engagementFilter, dateFilter])

  const loadConversations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/crm/conversations')
      if (!response.ok) {
        throw new Error('Failed to fetch conversations')
      }
      
      const data = await response.json()
      
      // Transform the API data to match our component interface
      const transformedConversations = (data.conversations || []).map((conv: any) => {
        // Get the first contact interaction and its related contact
        const contactInteraction = conv.contact_interactions?.[0] || {}
        const contact = contactInteraction.lead_contacts || {}
        
        // Get conversation analytics (could be array or object)
        const analytics = Array.isArray(conv.conversation_analytics) 
          ? conv.conversation_analytics[0] 
          : conv.conversation_analytics || {}
        
        // Get conversation turns count
        const conversationTurns = conv.conversation_turns || []
        
        return {
          id: conv.id,
          session_id: conv.session_identifier || conv.id,
          contact_id: contact.id || contactInteraction.contact_id || null,
          contact_name: contact.name || 'Unknown Contact',
          contact_email: contact.email || '',
          organization: contact.company || contact.organization || 'Unknown Organization',
          total_messages: analytics.total_messages || conversationTurns.length || 0,
          conversation_duration_minutes: analytics.conversation_duration_minutes || 0,
          user_engagement_score: analytics.user_engagement_score || 0,
          intent_distribution: analytics.intent_distribution || {},
          topics_covered: analytics.topics_covered || [],
          pain_points_mentioned: analytics.pain_points_mentioned || [],
          buying_signals: analytics.buying_signals || 0,
          objections_raised: analytics.objections_raised || [],
          competitive_mentions: analytics.competitive_mentions || [],
          demo_requested: analytics.demo_requested || false,
          contact_info_provided: analytics.contact_info_provided || false,
          meeting_requested: analytics.meeting_requested || false,
          pricing_discussed: analytics.pricing_discussed || false,
          partnership_assessment_completed: analytics.partnership_assessment_completed || false,
          technical_questions: analytics.technical_questions || 0,
          business_questions: analytics.business_questions || 0,
          satisfaction_indicators: analytics.satisfaction_indicators || {},
          conversion_stage: analytics.conversion_stage || 'awareness',
          last_updated: conv.last_interaction_at || conv.updated_at || conv.created_at,
          created_at: conv.created_at
        } as ConversationAnalytics
      })
      
      setConversations(transformedConversations)
      setFilteredConversations(transformedConversations)
    } catch (error) {
      console.error('Failed to load conversations:', error)
      // Show empty state instead of mock data
      setConversations([])
      setFilteredConversations([])
    } finally {
      setLoading(false)
    }
  }

  const filterConversations = () => {
    let filtered = [...conversations]
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(conv => 
        (conv.contact_name?.toLowerCase().includes(query)) ||
        (conv.contact_email?.toLowerCase().includes(query)) ||
        (conv.organization?.toLowerCase().includes(query)) ||
        (conv.topics_covered?.some(topic => topic.toLowerCase().includes(query)))
      )
    }
    
    // Apply stage filter
    if (stageFilter !== 'all') {
      filtered = filtered.filter(conv => conv.conversion_stage === stageFilter)
    }
    
    // Apply engagement filter
    if (engagementFilter === 'high') {
      filtered = filtered.filter(conv => conv.user_engagement_score >= 7)
    } else if (engagementFilter === 'medium') {
      filtered = filtered.filter(conv => 
        conv.user_engagement_score >= 4 && conv.user_engagement_score < 7
      )
    } else if (engagementFilter === 'low') {
      filtered = filtered.filter(conv => conv.user_engagement_score < 4)
    }
    
    // Apply date filter
    const now = new Date()
    if (dateFilter === 'today') {
      const today = new Date(now.setHours(0, 0, 0, 0))
      filtered = filtered.filter(conv => new Date(conv.last_updated) >= today)
    } else if (dateFilter === 'week') {
      const lastWeek = new Date(now.setDate(now.getDate() - 7))
      filtered = filtered.filter(conv => new Date(conv.last_updated) >= lastWeek)
    } else if (dateFilter === 'month') {
      const lastMonth = new Date(now.setMonth(now.getMonth() - 1))
      filtered = filtered.filter(conv => new Date(conv.last_updated) >= lastMonth)
    }
    
    setFilteredConversations(filtered)
  }

  const getEngagementColor = (score: number) => {
    if (score >= 7) return 'text-green-500'
    if (score >= 4) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      awareness: 'bg-blue-100 text-blue-800',
      interest: 'bg-indigo-100 text-indigo-800',
      consideration: 'bg-purple-100 text-purple-800',
      evaluation: 'bg-yellow-100 text-yellow-800',
      decision: 'bg-green-100 text-green-800',
      partnership: 'bg-teal-100 text-teal-800'
    }
    return colors[stage] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const refreshData = async () => {
    await loadConversations()
  }

  if (loading && conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Conversation Analytics</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Conversations</p>
              <p className="text-2xl font-bold">{conversations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Engagement</p>
              <p className="text-2xl font-bold">
                {conversations.length > 0 
                  ? (conversations.reduce((sum, conv) => sum + conv.user_engagement_score, 0) / conversations.length).toFixed(1)
                  : '0.0'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Conversations</p>
              <p className="text-2xl font-bold">
                {conversations.filter(c => 
                  ['interest', 'consideration', 'evaluation'].includes(c.conversion_stage)
                ).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <Target className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold">
                {conversations.length > 0 
                  ? `${Math.round((conversations.filter(c => c.conversion_stage === 'decision' || c.conversion_stage === 'partnership').length / conversations.length) * 100)}%`
                  : '0%'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
              >
                <option value="all">All Stages</option>
                <option value="awareness">Awareness</option>
                <option value="interest">Interest</option>
                <option value="consideration">Consideration</option>
                <option value="evaluation">Evaluation</option>
                <option value="decision">Decision</option>
                <option value="partnership">Partnership</option>
              </select>
              
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={engagementFilter}
                onChange={(e) => setEngagementFilter(e.target.value)}
              >
                <option value="all">All Engagement</option>
                <option value="high">High (7-10)</option>
                <option value="medium">Medium (4-6.9)</option>
                <option value="low">Low (0-3.9)</option>
              </select>
              
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
              </select>
              
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Messages
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <tr key={conversation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{conversation.contact_name}</div>
                          <div className="text-sm text-gray-500">{conversation.organization}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{conversation.total_messages}</div>
                      <div className="text-sm text-gray-500">messages</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{conversation.conversation_duration_minutes} min</div>
                      <div className="text-sm text-gray-500">
                        {new Date(conversation.last_updated).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${conversation.user_engagement_score >= 7 ? 'bg-green-500' : conversation.user_engagement_score >= 4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${conversation.user_engagement_score * 10}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getEngagementColor(conversation.user_engagement_score)}`}>
                          {conversation.user_engagement_score.toFixed(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageColor(conversation.conversion_stage)}`}>
                        {conversation.conversion_stage.charAt(0).toUpperCase() + conversation.conversion_stage.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(conversation.last_updated)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/crm/conversations/${conversation.id}`} className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-5 w-5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    {loading ? 'Loading conversations...' : 'No conversations found matching your criteria.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{filteredConversations.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <ChevronRight className="h-5 w-5 transform rotate-180" aria-hidden="true" />
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
