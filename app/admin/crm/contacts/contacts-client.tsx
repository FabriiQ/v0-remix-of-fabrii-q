'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ArrowUpDown,
  Star,
  StarOff,
  Mail,
  Phone,
  Trash2,
  Edit,
  ExternalLink,
  Building,
  MessageSquare,
  Target,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization: string;
  role?: string;
  leadScore: number;
  status: 'new' | 'contacted' | 'qualified' | 'opportunity' | 'converted' | 'lost';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lastActivity: string;
  source: 'aivy_chat' | 'assessment' | 'manual' | 'referral';
  tags: string[];
  conversationCount: number;
  hasAssessment: boolean;
  starred: boolean;
  createdAt: string;
};

export function ContactsClient() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.from('contacts').select('*');
      
      if (error) throw error;
      
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.phone && contact.phone.includes(searchTerm)) ||
      contact.organization.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = selectedStatus === 'all' || contact.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || contact.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const supabase = getSupabaseClient();
        const { error } = await supabase.from('contacts').delete().eq('id', id);
        
        if (error) throw error;
        
        // Refresh the contacts list
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const toggleStar = async (id: string, currentValue: boolean) => {
    try {
      const supabase = getSupabaseClient();
      
      // Update the contact's starred status directly with type assertion
      const { error } = await (supabase
        .from('contacts')
        .update({ 
          starred: !currentValue,
          updated_at: new Date().toISOString()
        } as never) // Using never to bypass the type checking
        .eq('id', id) as any);
        
      if (error) throw error;
      
      // Update the local state
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === id ? { ...contact, starred: !currentValue } : contact
        )
      );
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Contacts</h1>
          <p className="text-muted-foreground">
            {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="border rounded-md px-3 py-2 text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="opportunity">Opportunity</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
            
            <select
              className="border rounded-md px-3 py-2 text-sm"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            
            <Link
              href="/admin/crm/contacts/new"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-12"></th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Organization</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Priority</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Activity</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <button
                        onClick={() => toggleStar(contact.id, contact.starred)}
                        className="text-muted-foreground hover:text-amber-400"
                      >
                        {contact.starred ? (
                          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        ) : (
                          <Star className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                    <td className="p-4 align-middle font-medium">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-sm font-medium text-primary">
                            {contact.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">{contact.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{contact.organization}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          contact.status === 'new'
                            ? 'bg-blue-100 text-blue-800'
                            : contact.status === 'contacted'
                            ? 'bg-purple-100 text-purple-800'
                            : contact.status === 'qualified'
                            ? 'bg-green-100 text-green-800'
                            : contact.status === 'opportunity'
                            ? 'bg-yellow-100 text-yellow-800'
                            : contact.status === 'converted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          contact.priority === 'low'
                            ? 'bg-blue-100 text-blue-800'
                            : contact.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : contact.priority === 'high'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {contact.priority.charAt(0).toUpperCase() + contact.priority.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-sm text-muted-foreground">
                      {new Date(contact.lastActivity).toLocaleDateString()}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/crm/contacts/${contact.id}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No contacts found. Try adjusting your search or create a new contact.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
