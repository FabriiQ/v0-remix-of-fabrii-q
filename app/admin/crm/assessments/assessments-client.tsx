'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Target,
  Filter,
  Download,
  Eye,
  Calendar,
  TrendingUp,
  Award,
  Users,
  Building,
  CheckCircle,
  AlertTriangle,
  Clock,
  Star,
  BarChart3
} from 'lucide-react'
import { PartnershipAssessment, AssessmentsData } from '@/lib/services/crmService'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase/client'


export default function AssessmentsClient({ initialData }: { initialData: AssessmentsData }) {
  const [assessments, setAssessments] = useState<PartnershipAssessment[]>(initialData.assessments)
  const [filteredAssessments, setFilteredAssessments] = useState<PartnershipAssessment[]>(initialData.assessments)
  const [statistics, setStatistics] = useState(initialData.statistics);
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [readinessFilter, setReadinessFilter] = useState<string>('all')
  const [institutionTypeFilter, setInstitutionTypeFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseClient();
    const channel = supabase
      .channel('assessments-client-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'partnership_assessments' }, () => {
        router.refresh();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  const filterAssessments = useCallback(() => {
    let filtered = assessments

    if (statusFilter !== 'all') {
      filtered = filtered.filter(assessment => assessment.status === statusFilter)
    }

    if (readinessFilter !== 'all') {
      filtered = filtered.filter(assessment => assessment.readiness_level === readinessFilter)
    }

    if (institutionTypeFilter !== 'all') {
      filtered = filtered.filter(assessment => assessment.institution_type === institutionTypeFilter)
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(assessment => assessment.partnership_priority === priorityFilter)
    }

    setFilteredAssessments(filtered)
  }, [assessments, statusFilter, readinessFilter, institutionTypeFilter, priorityFilter]);

  useEffect(() => {
    filterAssessments()
  }, [filterAssessments]);

  useEffect(() => {
    setAssessments(initialData.assessments);
    setStatistics(initialData.statistics);
  }, [initialData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'under_review': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'declined': return 'bg-red-100 text-red-800'
      case 'follow_up_needed': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getReadinessColor = (level: string) => {
    switch (level) {
      case 'committed': return 'bg-emerald-100 text-emerald-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'evaluating': return 'bg-yellow-100 text-yellow-800'
      case 'exploring': return 'bg-blue-100 text-blue-800'
      case 'initial': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'high': return <TrendingUp className="w-4 h-4 text-orange-500" />
      case 'medium': return <Clock className="w-4 h-4 text-blue-500" />
      case 'low': return <CheckCircle className="w-4 h-4 text-gray-500" />
      default: return null
    }
  }

  const getInstitutionIcon = (type: string) => {
    switch (type) {
      case 'public_university':
      case 'private_university': return <Award className="w-4 h-4 text-purple-600" />
      case 'community_college': return <Users className="w-4 h-4 text-blue-600" />
      case 'k12_district': return <Building className="w-4 h-4 text-green-600" />
      case 'vocational_institute': return <Target className="w-4 h-4 text-orange-600" />
      default: return <Building className="w-4 h-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatInstitutionType = (type: string) => {
    return type.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1F504B]">Partnership Assessments</h1>
            <p className="text-[#1F504B]/70 mt-1">
              {filteredAssessments.length} of {assessments.length} assessments
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <Link
              href="/admin/crm/assessments/analytics"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1F504B] to-[#5A8A84] text-white rounded-lg hover:from-[#5A8A84] hover:to-[#1F504B] transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assessments</p>
              <p className="text-2xl font-bold text-[#1F504B]">{statistics.total}</p>
            </div>
            <Target className="w-8 h-8 text-[#5A8A84]" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-orange-600">
                {statistics.high_priority}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready/Committed</p>
              <p className="text-2xl font-bold text-green-600">
                {statistics.ready_for_partnership}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(statistics.average_score) || 0}
              </p>
            </div>
            <Star className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F504B] focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
              <option value="follow_up_needed">Follow-up Needed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Readiness Level</label>
            <select
              value={readinessFilter}
              onChange={(e) => setReadinessFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F504B] focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="initial">Initial</option>
              <option value="exploring">Exploring</option>
              <option value="evaluating">Evaluating</option>
              <option value="ready">Ready</option>
              <option value="committed">Committed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Institution Type</label>
            <select
              value={institutionTypeFilter}
              onChange={(e) => setInstitutionTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F504B] focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="public_university">Public University</option>
              <option value="private_university">Private University</option>
              <option value="community_college">Community College</option>
              <option value="k12_district">K-12 District</option>
              <option value="vocational_institute">Vocational Institute</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F504B] focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assessments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Scale
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assessment Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Readiness
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssessments.map((assessment) => (
                <tr key={assessment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getInstitutionIcon(assessment.institution_type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {assessment.institution_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatInstitutionType(assessment.institution_type)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {assessment.contact_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {assessment.contact_email}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {assessment.campus_count} Campus{assessment.campus_count !== 1 ? 'es' : ''}
                    </div>
                    <div className="text-xs text-gray-500">
                      {assessment.student_population.toLocaleString()} students
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-gradient-to-r from-[#1F504B] to-[#5A8A84] h-2 rounded-full"
                          style={{ width: `${Math.min(assessment.assessment_score, 100)}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-semibold px-2 py-1 rounded ${getScoreColor(assessment.assessment_score)}`}>
                        {assessment.assessment_score.toFixed(1)}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getReadinessColor(assessment.readiness_level)}`}>
                      {assessment.readiness_level}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {getPriorityIcon(assessment.partnership_priority)}
                      <span className="text-sm font-medium capitalize">
                        {assessment.partnership_priority}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assessment.status)}`}>
                      {assessment.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(assessment.submitted_at)}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/crm/assessments/${assessment.id}`}
                        className="text-[#5A8A84] hover:text-[#1F504B]"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/admin/crm/contacts/${assessment.contact_id}`}
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <Users className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-12">
            <Target className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No assessments found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}