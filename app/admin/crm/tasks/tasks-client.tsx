'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase/client'
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
import { TasksData, Task, TaskStats } from '@/lib/services/crmService'

export default function TasksClient({ initialData }: { initialData: TasksData }) {
  const [tasks, setTasks] = useState<Task[]>(initialData.tasks)
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(initialData.tasks)
  const [statistics, setStatistics] = useState<TaskStats>(initialData.statistics)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [dueDateFilter, setDueDateFilter] = useState<string>('all')
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const supabase = getSupabaseClient()
    const channel = supabase
      .channel('tasks-client-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'follow_up_tasks' }, () => {
        router.refresh()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [router])

  const filterTasks = useCallback(() => {
    let filtered = [...tasks]

    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(task =>
            task.task_title.toLowerCase().includes(query) ||
            (task.task_description && task.task_description.toLowerCase().includes(query)) ||
            (task.lead_contacts && task.lead_contacts.name.toLowerCase().includes(query))
        );
    }

    if (statusFilter !== 'all') {
        filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (typeFilter !== 'all') {
        filtered = filtered.filter(task => task.task_type === typeFilter);
    }

    if (priorityFilter !== 'all') {
        filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    const now = new Date();
    if (dueDateFilter === 'today') {
      const today = new Date(now.setHours(0, 0, 0, 0));
      const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
      filtered = filtered.filter(task => {
          const dueDate = new Date(task.due_date);
          return dueDate >= today && dueDate < tomorrow;
      });
    } else if (dueDateFilter === 'overdue') {
        filtered = filtered.filter(task => new Date(task.due_date) < now && task.status !== 'completed');
    } else if (dueDateFilter === 'upcoming') {
        const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
        tomorrow.setHours(0,0,0,0);
        filtered = filtered.filter(task => new Date(task.due_date) >= tomorrow);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, statusFilter, typeFilter, priorityFilter, dueDateFilter]);

  useEffect(() => {
    filterTasks()
  }, [filterTasks])

  useEffect(() => {
    setTasks(initialData.tasks);
    setStatistics(initialData.statistics);
    setFilteredTasks(initialData.tasks);
  }, [initialData]);

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