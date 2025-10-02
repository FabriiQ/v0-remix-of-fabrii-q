'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  Shield, 
  LogOut,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import DocumentUpload from '@/components/admin/DocumentUpload'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Tables } from '@/types/supabase'

type Role = Tables<'roles'>;
type UserProfile = Tables<'user_profiles'> & { roles: { name: string } | null };
type Document = Tables<'documents'>;

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<UserProfile[]>([])
  const [roles, setRoles] = useState<Role[]>([]);
  const [documents, setDocuments] = useState<Document[]>([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDocuments: 0,
    processingDocuments: 0,
    totalConversations: 0
  })
  const router = useRouter()
  const { toast } = useToast()

  const loadUsers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          roles ( name )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  }, []);

  const loadRoles = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('roles').select('*');
      if (error) throw error;
      setRoles(data || []);
    } catch (error) {
      console.error('Failed to load roles:', error);
    }
  }, []);

  const handleRoleChange = async (userId: string, newRoleId: string) => {
    const { error } = await supabase
      .from('user_profiles')
      .update({ role_id: parseInt(newRoleId, 10) })
      .eq('id', userId);

    if (error) {
      toast({ title: 'Error', description: `Failed to update role: ${error.message}`, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'User role updated successfully.' });
      loadUsers(); // Refresh the user list
    }
  };

  const loadDocuments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setDocuments(data || [])
    } catch (error) {
      console.error('Failed to load documents:', error)
    }
  }, [])

  const loadStats = useCallback(async () => {
    try {
      const [usersResult, docsResult, processingResult, conversationsResult] = await Promise.all([
        supabase.from('user_profiles').select('id', { count: 'exact', head: true }),
        supabase.from('documents').select('id', { count: 'exact', head: true }),
        supabase.from('documents').select('id', { count: 'exact', head: true }).in('processing_status', ['pending', 'processing']),
        supabase.from('conversations').select('id', { count: 'exact', head: true })
      ])

      setStats({
        totalUsers: usersResult.count || 0,
        totalDocuments: docsResult.count || 0,
        processingDocuments: processingResult.count || 0,
        totalConversations: conversationsResult.count || 0
      })
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }, [])

  const checkAuth = useCallback(async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/auth')
        return
      }

      // Check if user is admin
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*, roles ( name )')
        .eq('user_id', user.id)
        .single()

      const isAdmin = profile && (profile as any)?.role === 'admin'
      if (profileError || !profile || !isAdmin) {
        router.push('/')
        return
      }

      setUser(user)
      setUserProfile(profile)

      // Load dashboard data
      await Promise.all([
        loadUsers(),
        loadDocuments(),
        loadStats(),
        loadRoles(),
      ])

    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/auth')
    } finally {
      setLoading(false)
    }
  }, [router, loadUsers, loadDocuments, loadStats, loadRoles])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1F504B] via-[#5A8A84] to-[#D8E3E0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="mt-4 text-white">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F504B] via-[#5A8A84] to-[#D8E3E0] p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-[#1F504B]" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FabriiQ Admin Dashboard</h1>
              <p className="text-gray-600">Welcome, {userProfile?.full_name || user?.email}</p>
            </div>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#1F504B]" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-[#1F504B]">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#5A8A84]" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Documents</p>
                  <p className="text-2xl font-bold text-[#5A8A84]">{stats.totalDocuments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#F59E0B]" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Processing</p>
                  <p className="text-2xl font-bold text-[#F59E0B]">{stats.processingDocuments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-[#3B82F6]" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversations</p>
                  <p className="text-2xl font-bold text-[#3B82F6]">{stats.totalConversations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="documents" className="space-y-4">
          <TabsList className="bg-white">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-4">
            <DocumentUpload />
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>
                  Latest documents uploaded to the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(doc.processing_status)}
                        <div>
                          <h3 className="font-medium text-gray-900">{doc.title}</h3>
                          <p className="text-sm text-gray-500">
                            {doc.source_type} • {doc.file_size ? `${(doc.file_size / 1024 / 1024).toFixed(2)} MB` : 'Unknown size'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(doc.processing_status)}>
                          {doc.processing_status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {documents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No documents uploaded yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts and roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {user.full_name || 'Unnamed User'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Joined {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Select
                          value={user.role_id?.toString()}
                          onValueChange={(newRoleId) => handleRoleChange(user.id, newRoleId)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id.toString()}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Badge className={user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>AI Settings</CardTitle>
                <CardDescription>
                  Configure AI models and parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    AI settings configuration will be available in the next update.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>
                  System usage statistics and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <BarChart3 className="h-4 w-4" />
                  <AlertDescription>
                    Detailed analytics dashboard coming soon.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}