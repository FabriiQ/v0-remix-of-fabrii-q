'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  CheckCircle, 
  Clock, 
  Plus, 
  Filter, 
  Calendar,
  User,
  Building,
  Phone,
  Mail,
  AlertTriangle,
  Trash2,
  Edit,
  MoreHorizontal,
  Search,
  Download
} from 'lucide-react'

interface Task {
  id: string
  contact_id?: string
  task_type: 'call' | 'email' | 'demo' | 'meeting' | 'proposal' | 'follow_up' | 'partnership_review'
  task_title: string
  task_description?: string
  due_date: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  assigned_to?: string
  created_by?: string
  completed_at?: string
  result?: string
  created_at: string
  lead_contacts?: {
    id: string
    name: string
    email: string
    phone?: string
    organization: string
    role?: string
    lead_status: string
    lead_score?: number
  }
}

interface TaskStatistics {
  total: number
  pending: number
  in_progress: number
  completed: number
  overdue: number
  high_priority: number
}

function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [statistics, setStatistics] = useState<TaskStatistics>({
    total: 0,
    pending: 0,
    in_progress: 0,
    completed: 0,
    overdue: 0,
    high_priority: 0
  })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [dueDateFilter, setDueDateFilter] = useState<string>('all')
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    filterTasks()
  }, [tasks, searchQuery, statusFilter, typeFilter, priorityFilter, dueDateFilter])

  const loadTasks = async () => {
    try {
      const response = await fetch('/api/crm/tasks')
      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }
      
      const data = await response.json()
      setTasks(data.tasks || [])
      setFilteredTasks(data.tasks || [])
      setStatistics(data.statistics || {
        total: 0,
        pending: 0,
        in_progress: 0,
        completed: 0,
        overdue: 0,
        high_priority: 0
      })
    } catch (error) {
      console.error('Failed to load tasks:', error)
      setTasks([])
      setFilteredTasks([])
    } finally {
      setLoading(false)
    }
  }

  const filterTasks = () => {
    // Implementation of filterTasks function
    // ... (keep the existing implementation)
  }

  // ... (keep all other existing functions like getStatusColor, getPriorityColor, etc.)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#1F504B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="text-sm text-gray-500">Manage and track all your tasks in one place</p>
          </div>
          <button
            onClick={() => setShowAddTaskModal(true)}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#1F504B] to-[#5A8A84] text-white rounded-lg hover:from-[#5A8A84] hover:to-[#1F504B] transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Task
          </button>
        </div>
      </div>

      {/* Task statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* ... (keep existing statistics cards) */}
      </div>

      {/* Task list */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {/* Task filters */}
        <div className="mb-6">
          {/* ... (keep existing filter UI) */}
        </div>

        {/* Task table */}
        <div className="overflow-x-auto">
          {/* ... (keep existing task table) */}
        </div>

        {/* No tasks found */}
        {filteredTasks.length === 0 && (
          <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600 mb-6">
              {tasks.length === 0 
                ? "Get started by creating your first task."
                : "Try adjusting your filters to see more results."
              }
            </p>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#1F504B] to-[#5A8A84] text-white rounded-lg hover:from-[#5A8A84] hover:to-[#1F504B] transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Task
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskManagement;
