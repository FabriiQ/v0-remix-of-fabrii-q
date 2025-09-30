// Define the user profile type
export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  role: 'admin' | 'user' | string; // Add other role types if needed
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

// Define the contact type since we can't import from database.types directly
export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  role?: string | null;
  lead_status?: string;
  source?: string;
  company_size?: string | null;
  industry?: string | null;
  job_function?: string | null;
  notes?: string | null;
  company_website?: string | null;
  social_links?: Record<string, unknown> | null;
  metadata?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export type ContactUpdate = Partial<Omit<Contact, 'id' | 'created_at'>>;

// Define the Supabase client type
export interface SupabaseClient {
  from: (table: string) => {
    select: (query?: string) => any;
    insert: (values: any) => any;
    update: (values: any) => any;
    delete: () => any;
    eq: (column: string, value: any) => any;
    or: (query: string) => any;
    order: (column: string, options?: { ascending: boolean }) => any;
    range: (from: number, to: number) => any;
    single: () => any;
  };
  rpc: (fn: string, params: Record<string, unknown>) => Promise<{ data: any; error: any }>;
}
