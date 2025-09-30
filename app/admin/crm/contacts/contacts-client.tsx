'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Search, 
  Star,
  Trash2,
  Edit,
  Building
} from 'lucide-react';
import { ContactsData, Contact } from '@/lib/services/crmService';

export function ContactsClient({ initialData }: { initialData: ContactsData }) {
  const [contacts, setContacts] = useState<Contact[]>(initialData.contacts);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(initialData.contacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseClient();
    const channel = supabase
      .channel('contacts-client-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'lead_contacts' }, () => {
        router.refresh();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  const filterContacts = useCallback(() => {
    let filtered = [...contacts];

    const matchesSearch = (contact: Contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.phone && contact.phone.includes(searchTerm)) ||
      contact.organization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = (contact: Contact) =>
      selectedStatus === 'all' || contact.lead_status === selectedStatus;

    const matchesPriority = (contact: Contact) =>
      selectedPriority === 'all' || contact.priority === selectedPriority;

    filtered = contacts.filter(contact => matchesSearch(contact) && matchesStatus(contact) && matchesPriority(contact));
    
    setFilteredContacts(filtered);
  }, [contacts, searchTerm, selectedStatus, selectedPriority]);

  useEffect(() => {
    filterContacts();
  }, [filterContacts]);

  useEffect(() => {
    setContacts(initialData.contacts);
  }, [initialData]);


  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch(`/api/data/crm/contacts/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete contact');
        }
        
        router.refresh();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const toggleStar = async (id: string, currentValue: boolean) => {
    // Optimistic UI update
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === id ? { ...contact, starred: !currentValue } : contact
      )
    );

    try {
      const response = await fetch(`/api/data/crm/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ starred: !currentValue }),
      });
        
      if (!response.ok) {
        throw new Error('Failed to toggle star');
      }
    } catch (error) {
      console.error('Error toggling star:', error);
      // Revert optimistic update
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === id ? { ...contact, starred: currentValue } : contact
        )
      );
    }
  };

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
                          contact.lead_status === 'new'
                            ? 'bg-blue-100 text-blue-800'
                            : contact.lead_status === 'contacted'
                            ? 'bg-purple-100 text-purple-800'
                            : contact.lead_status === 'qualified'
                            ? 'bg-green-100 text-green-800'
                            : contact.lead_status === 'opportunity'
                            ? 'bg-yellow-100 text-yellow-800'
                            : contact.lead_status === 'converted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {contact.lead_status.charAt(0).toUpperCase() + contact.lead_status.slice(1)}
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