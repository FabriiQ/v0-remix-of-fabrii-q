'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ArrowLeft,
  Edit,
  Star,
  StarOff,
  Mail,
  Phone,
  Building,
  Calendar,
  MessageSquare,
  Target,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  Plus,
  Trash2,
  Download,
  Send,
  User,
  Award,
  TrendingUp,
  Activity
} from 'lucide-react'

interface ContactDetail {
  id: string
  name: string
  email: string
  phone?: string
  organization: string
  role?: string
  leadScore: number
  status: 'new' | 'contacted' | 'qualified' | 'opportunity' | 'converted' | 'lost'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  lastActivity: string
  source: 'aivy_chat' | 'assessment' | 'manual' | 'referral'
  tags: string[]
  conversationCount: number
  hasAssessment: boolean
  starred: boolean
  createdAt: string
  notes?: string
  website?: string
  linkedIn?: string
  address?: string
}

interface Conversation {
  id: string
  sessionId: string
  startTime: string
  endTime?: string
  messageCount: number
  sentiment: 'positive' | 'neutral' | 'negative'
  topics: string[]
  outcome: 'information_provided' | 'lead_generated' | 'assessment_started' | 'demo_requested' | 'no_outcome'
}

interface AssessmentSummary {
  id: string
  completedAt: string
  overallScore: number
  partnershipReadiness: 'low' | 'medium' | 'high'
  keyStrengths: string[]
  improvementAreas: string[]
  nextSteps: string[]
}

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'completed' | 'overdue'
  assignee?: string
}

export default function ContactDetail() {
  const params = useParams()
  const contactId = params?.id as string
  
  const [contact, setContact] = useState<ContactDetail | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [assessment, setAssessment] = useState<AssessmentSummary | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'conversations' | 'assessment' | 'tasks' | 'notes'>('overview')
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [notesContent, setNotesContent] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)

  useEffect(() => {
    if (contactId) {
      loadContactData(contactId)
    }
  }, [contactId])

  const loadContactData = async (id: string) => {
    try {
      // Load contact data from API
      const [contactResponse, conversationsResponse, tasksResponse] = await Promise.all([
        fetch(`/api/crm/contacts/${id}`),
        fetch(`/api/crm/conversations?contactId=${id}`),
        fetch(`/api/crm/tasks?contactId=${id}`)
      ])
      
      if (contactResponse.ok) {
        const contactData = await contactResponse.json()
        const contact = contactData.contact
        
        // Transform API data to match component interface
        const transformedContact: ContactDetail = {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          organization: contact.organization || contact.company,
          role: contact.role,
          leadScore: contact.lead_score || 0,
          status: contact.lead_status || 'new',
          priority: contact.priority || 'medium',
          lastActivity: contact.last_contact_date || contact.updated_at,
          source: contact.source || 'manual',
          tags: [], // TODO: Add tags from database
          conversationCount: 0, // Will be updated from conversations
          hasAssessment: false, // Will be updated if assessment exists
          starred: false, // TODO: Add starred field to database
          createdAt: contact.created_at,
          notes: contact.notes,
          website: contact.company_website,
          linkedIn: contact.social_links?.linkedin,
          address: contact.address
        }
        
        setContact(transformedContact)
        setNotesContent(contact.notes || '')
      } else {
        throw new Error('Failed to fetch contact')
      }
      
      // Load conversations if available
      if (conversationsResponse.ok) {
        const conversationsData = await conversationsResponse.json()
        const transformedConversations = (conversationsData.conversations || []).map((conv: any) => ({
          id: conv.id,
          sessionId: conv.session_identifier || conv.id,
          startTime: conv.created_at,
          endTime: conv.last_interaction_at,
          messageCount: conv.conversation_analytics?.total_messages || 0,
          sentiment: 'positive', // Default for now
          topics: conv.conversation_analytics?.topics_covered || [],
          outcome: 'information_provided' // Default for now
        }))
        
        setConversations(transformedConversations)
        // Update contact with actual conversation count
        setContact(prev => prev ? { ...prev, conversationCount: transformedConversations.length } : null)
      }
      
      // Load tasks if available
      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json()
        const transformedTasks = (tasksData.tasks || []).map((task: any) => ({
          id: task.id,
          title: task.task_title,
          description: task.task_description || '',
          dueDate: task.due_date,
          priority: task.priority,
          status: task.status === 'completed' ? 'completed' : task.status === 'pending' ? 'pending' : 'overdue',
          assignee: task.assigned_to
        }))
        
        setTasks(transformedTasks)
      }
      
      // Try to load assessment data
      try {
        const assessmentResponse = await fetch(`/api/crm/assessments?contactId=${id}`)
        if (assessmentResponse.ok) {
          const assessmentData = await assessmentResponse.json()
          if (assessmentData.assessments && assessmentData.assessments.length > 0) {
            const assessment = assessmentData.assessments[0]
            const transformedAssessment: AssessmentSummary = {
              id: assessment.id,
              completedAt: assessment.submitted_at,
              overallScore: assessment.assessment_score || 0,
              partnershipReadiness: assessment.readiness_level === 'ready' || assessment.readiness_level === 'committed' ? 'high' : 
                                  assessment.readiness_level === 'evaluating' ? 'medium' : 'low',
              keyStrengths: [], // TODO: Parse from assessment data
              improvementAreas: [], // TODO: Parse from assessment data
              nextSteps: [] // TODO: Parse from assessment data
            }
            setAssessment(transformedAssessment)
            
            // Update contact to show has assessment
            setContact(prev => prev ? { ...prev, hasAssessment: true } : null)
          }
        }
      } catch (assessmentError) {
        console.warn('No assessment data available:', assessmentError)
      }
      
    } catch (error) {
      console.error('Failed to load contact data:', error)
      // Show empty states instead of mock data
      setContact(null)
      setConversations([])
      setAssessment(null)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNotes = async () => {
    if (!contactId) return
    
    setSavingNotes(true)
    try {
      const response = await fetch(`/api/crm/contacts/${contactId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notesContent })
      })
      
      if (response.ok) {
        setContact(prev => prev ? { ...prev, notes: notesContent } : null)
        setIsEditingNotes(false)
      } else {
        throw new Error('Failed to save notes')
      }
    } catch (error) {
      console.error('Error saving notes:', error)
      alert('Failed to save notes. Please try again.')
    } finally {
      setSavingNotes(false)
    }
  }
  
  const handleCancelNotes = () => {
    setNotesContent(contact?.notes || '')
    setIsEditingNotes(false)
  }
  
  const handleCreateTask = async (taskData: any) => {
    try {
      const response = await fetch('/api/crm/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...taskData,
          contact_id: contactId
        })
      })
      
      if (response.ok) {
        // Reload tasks
        const tasksResponse = await fetch(`/api/crm/tasks?contactId=${contactId}`)
        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json()
          const transformedTasks = (tasksData.tasks || []).map((task: any) => ({
            id: task.id,
            title: task.task_title,
            description: task.task_description || '',
            dueDate: task.due_date,
            priority: task.priority,
            status: task.status === 'completed' ? 'completed' : task.status === 'pending' ? 'pending' : 'overdue',
            assignee: task.assigned_to
          }))
          setTasks(transformedTasks)
        }
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }
  
  const handleUpdateTask = async (taskId: string, updates: any) => {
    try {
      const response = await fetch(`/api/crm/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      
      if (response.ok) {
        setTasks(prev => prev.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        ))
      }
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-gray-100 text-gray-800'
      case 'contacted': return 'bg-blue-100 text-blue-800'
      case 'qualified': return 'bg-purple-100 text-purple-800'
      case 'opportunity': return 'bg-yellow-100 text-yellow-800'
      case 'converted': return 'bg-green-100 text-green-800'
      case 'lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'high': return <CheckCircle className="w-4 h-4 text-orange-500" />
      case 'medium': return <Clock className="w-4 h-4 text-blue-500" />
      default: return null
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50'
      case 'neutral': return 'text-gray-600 bg-gray-50'
      case 'negative': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }


  const toggleStarred = () => {
    if (contact) {
      setContact({ ...contact, starred: !contact.starred })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#1F504B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact...</p>
        </div>
      </div>
    )
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6 flex items-center justify-center">
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Contact not found</h3>
          <p className="mt-1 text-sm text-gray-500">The contact you're looking for doesn't exist.</p>
          <Link
            href="/admin/crm/contacts"
            className="mt-6 inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#1F504B] to-[#5A8A84] text-white rounded-lg hover:from-[#5A8A84] hover:to-[#1F504B] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contacts
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link
            href="/admin/crm/contacts"
            className="flex items-center text-[#5A8A84] hover:text-[#1F504B]"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Contacts
          </Link>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-[#1F504B] to-[#5A8A84] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-[#1F504B]">{contact.name}</h1>
                <button
                  onClick={toggleStarred}
                  className="text-gray-400 hover:text-yellow-500"
                >
                  {contact.starred ? (
                    <Star className="w-6 h-6 fill-current text-yellow-400" />
                  ) : (
                    <StarOff className="w-6 h-6" />
                  )}
                </button>
                {getPriorityIcon(contact.priority)}
              </div>
              <div className="flex items-center space-x-4 text-[#1F504B]/70">
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  <span>{contact.organization}</span>
                </div>
                {contact.role && (
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{contact.role}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                  {contact.status}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Lead Score:</span>
                  <span className="text-lg font-bold text-[#1F504B]">{contact.leadScore}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Send className="w-4 h-4" />
              <span>Send Email</span>
            </button>
            <Link
              href={`/admin/crm/contacts/${contact.id}/edit`}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1F504B] to-[#5A8A84] text-white rounded-lg hover:from-[#5A8A84] hover:to-[#1F504B] transition-all duration-300"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Contact</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F504B] mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-400 mr-3" />
              <a href={`mailto:${contact.email}`} className="text-[#5A8A84] hover:text-[#1F504B]">
                {contact.email}
              </a>
            </div>
            {contact.phone && (
              <div className="flex items-center group">
                <Phone className="w-4 h-4 text-green-500 mr-3" />
                <div className="flex flex-col">
                  <a 
                    href={`tel:${contact.phone}`} 
                    className="text-[#5A8A84] hover:text-[#1F504B] font-semibold text-lg group-hover:underline"
                  >
                    {contact.phone}
                  </a>
                  <span className="text-xs text-gray-500">Click to call</span>
                </div>
              </div>
            )}
            {contact.website && (
              <div className="flex items-center">
                <ExternalLink className="w-4 h-4 text-gray-400 mr-3" />
                <a 
                  href={contact.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#5A8A84] hover:text-[#1F504B]"
                >
                  Website
                </a>
              </div>
            )}
            {contact.address && (
              <div className="flex items-start">
                <Building className="w-4 h-4 text-gray-400 mr-3 mt-1" />
                <span className="text-gray-700">{contact.address}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F504B] mb-4">Activity Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">Conversations</span>
              </div>
              <span className="font-semibold">{contact.conversationCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Target className="w-4 h-4 text-purple-500 mr-2" />
                <span className="text-sm text-gray-600">Assessment</span>
              </div>
              <span className="font-semibold">{contact.hasAssessment ? 'Completed' : 'Not started'}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Last Activity</span>
              </div>
              <span className="text-sm text-gray-600">{formatDate(contact.lastActivity)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-orange-500 mr-2" />
                <span className="text-sm text-gray-600">Lead Score</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#1F504B] to-[#5A8A84] h-2 rounded-full"
                    style={{ width: `${contact.leadScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold">{contact.leadScore}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F504B] mb-4">Tags & Labels</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {contact.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex px-3 py-1 text-xs font-medium bg-[#D8E3E0] text-[#1F504B] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <button className="flex items-center text-sm text-[#5A8A84] hover:text-[#1F504B]">
            <Plus className="w-4 h-4 mr-1" />
            Add Tag
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'conversations', label: 'Conversations', icon: MessageSquare },
              { id: 'assessment', label: 'Assessment', icon: Target },
              { id: 'tasks', label: 'Tasks', icon: CheckCircle },
              { id: 'notes', label: 'Notes', icon: Edit }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-[#1F504B] text-[#1F504B]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Recent Activity Timeline */}
              <div>
                <h4 className="text-lg font-semibold text-[#1F504B] mb-4">Recent Activity</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Had conversation about demo request</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Completed partnership assessment</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Engagement Metrics</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Conversation Duration</span>
                      <span className="font-medium">45 min avg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Response Rate</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sentiment</span>
                      <span className="font-medium text-green-600">Positive</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Next Actions</h5>
                  <div className="space-y-2">
                    <div className="text-sm">Schedule platform demo</div>
                    <div className="text-sm">Send pricing proposal</div>
                    <div className="text-sm">Follow up on timeline</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'conversations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-[#1F504B]">AIVY Conversations</h4>
                <span className="text-sm text-gray-500">{conversations.length} conversations</span>
              </div>
              
              {conversations.map((conversation) => (
                <div key={conversation.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Session {conversation.sessionId}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getSentimentColor(conversation.sentiment)}`}>
                        {conversation.sentiment}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {conversation.messageCount} messages
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-500">Started:</span>
                      <span className="ml-2">{formatDateTime(conversation.startTime)}</span>
                    </div>
                    {conversation.endTime && (
                      <div>
                        <span className="text-gray-500">Ended:</span>
                        <span className="ml-2">{formatDateTime(conversation.endTime)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-sm text-gray-500">Topics discussed:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {conversation.topics.map((topic, index) => (
                        <span key={index} className="px-2 py-1 bg-white text-xs rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500">Outcome:</span>
                      <span className="ml-2 font-medium">{conversation.outcome.replace('_', ' ')}</span>
                    </div>
                    <Link
                      href={`/admin/crm/conversations/${conversation.id}`}
                      className="text-sm text-[#5A8A84] hover:text-[#1F504B]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'assessment' && assessment && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-[#1F504B]">Partnership Assessment</h4>
                <span className="text-sm text-gray-500">
                  Completed {formatDateTime(assessment.completedAt)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#1F504B]">{assessment.overallScore}</div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold text-green-600 capitalize">{assessment.partnershipReadiness}</div>
                  <div className="text-sm text-gray-600">Partnership Readiness</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-600">{assessment.nextSteps.length}</div>
                  <div className="text-sm text-gray-600">Recommended Actions</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-700 mb-3">Key Strengths</h5>
                  <ul className="space-y-2">
                    {assessment.keyStrengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-orange-700 mb-3">Improvement Areas</h5>
                  <ul className="space-y-2">
                    {assessment.improvementAreas.map((area, index) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-[#1F504B] mb-3">Next Steps</h5>
                <ul className="space-y-2">
                  {assessment.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <Target className="w-4 h-4 text-[#5A8A84] mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-[#1F504B]">Follow-up Tasks</h4>
                <button className="flex items-center space-x-2 px-3 py-1 bg-[#1F504B] text-white rounded-lg hover:bg-[#5A8A84] transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
              </div>
              
              {tasks.map((task) => (
                <div key={task.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-medium text-gray-900">{task.title}</h5>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.status === 'completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'overdue' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        Due: {formatDateTime(task.dueDate)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {task.status !== 'completed' && (
                        <button 
                          onClick={() => handleUpdateTask(task.id, { status: 'completed' })}
                          className="text-gray-400 hover:text-green-600 p-1 rounded transition-colors"
                          title="Mark as completed"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        className="text-gray-400 hover:text-blue-600 p-1 rounded transition-colors"
                        title="Edit task"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-[#1F504B]">Contact Notes</h4>
                {!isEditingNotes && (
                  <button 
                    onClick={() => setIsEditingNotes(true)}
                    className="flex items-center space-x-2 px-3 py-1 bg-[#1F504B] text-white rounded-lg hover:bg-[#5A8A84] transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Notes</span>
                  </button>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                {isEditingNotes ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes
                      </label>
                      <textarea
                        value={notesContent}
                        onChange={(e) => setNotesContent(e.target.value)}
                        placeholder="Add notes about this contact..."
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F504B] focus:border-transparent resize-none"
                      />
                    </div>
                    <div className="flex items-center justify-end space-x-3">
                      <button
                        onClick={handleCancelNotes}
                        disabled={savingNotes}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F504B] disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveNotes}
                        disabled={savingNotes}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#1F504B] rounded-lg hover:bg-[#5A8A84] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F504B] disabled:opacity-50 flex items-center space-x-2"
                      >
                        {savingNotes && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        )}
                        <span>{savingNotes ? 'Saving...' : 'Save Notes'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">Contact Notes</span>
                      </div>
                      <span className="text-xs text-gray-500">Last updated: {formatDate(contact.createdAt)}</span>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      {contact.notes ? (
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.notes}</p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No notes available. Click "Edit Notes" to add some.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}