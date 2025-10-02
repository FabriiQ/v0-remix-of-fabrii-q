-- Create a table to manage email conversation threads
CREATE TABLE IF NOT EXISTS email_threads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    crm_contact_id UUID REFERENCES lead_contacts(id) ON DELETE SET NULL,
    subject TEXT,
    last_message_id TEXT, -- The Message-ID of the last email in the thread
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add a thread_id to the messages table to link messages to an email thread
ALTER TABLE messages
ADD COLUMN email_thread_id UUID REFERENCES email_threads(id) ON DELETE SET NULL;

-- Add a parent_message_id to the messages table for threading within the UI
ALTER TABLE messages
ADD COLUMN parent_message_id UUID REFERENCES messages(id) ON DELETE SET NULL;

-- Add headers to the messages table to store email-specific information
ALTER TABLE messages
ADD COLUMN email_headers JSONB;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS email_threads_crm_contact_id_idx ON email_threads(crm_contact_id);
CREATE INDEX IF NOT EXISTS messages_email_thread_id_idx ON messages(email_thread_id);
CREATE INDEX IF NOT EXISTS messages_parent_message_id_idx ON messages(parent_message_id);

-- Enable RLS for the new table
ALTER TABLE email_threads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for email_threads
-- For now, allow service_role to manage threads. This will be updated with permissions.
CREATE POLICY "Service role can manage email threads" ON email_threads
FOR ALL USING (auth.role() = 'service_role');