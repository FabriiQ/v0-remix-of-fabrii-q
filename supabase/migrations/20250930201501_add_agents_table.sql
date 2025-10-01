-- Create the agents table to store agent configurations
CREATE TABLE IF NOT EXISTS agents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    avatar_url TEXT,
    persona TEXT,
    system_prompt TEXT,
    enabled_tools TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Add foreign key constraints to channel_participants and messages tables
-- This links them to the new agents table
DO $$
BEGIN
    -- First ensure the column exists in channel_participants
    IF NOT EXISTS (
        SELECT 1
        FROM   information_schema.columns
        WHERE  table_name = 'channel_participants'
        AND    column_name = 'agent_id'
    ) THEN
        ALTER TABLE channel_participants
        ADD COLUMN agent_id UUID;
    END IF;

    -- Then add the foreign key constraint
    IF NOT EXISTS (
        SELECT 1
        FROM   pg_constraint
        WHERE  conname = 'fk_agent_id'
        AND    conrelid = 'channel_participants'::regclass
    ) THEN
        ALTER TABLE channel_participants
        ADD CONSTRAINT fk_agent_id FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE SET NULL;
    END IF;
END;
$$;

DO $$
BEGIN
    -- First ensure the column exists in messages
    IF NOT EXISTS (
        SELECT 1
        FROM   information_schema.columns
        WHERE  table_name = 'messages'
        AND    column_name = 'sender_agent_id'
    ) THEN
        ALTER TABLE messages
        ADD COLUMN sender_agent_id UUID;
    END IF;

    -- Then add the foreign key constraint
    IF NOT EXISTS (
        SELECT 1
        FROM   pg_constraint
        WHERE  conname = 'fk_sender_agent_id'
        AND    conrelid = 'messages'::regclass
    ) THEN
        ALTER TABLE messages
        ADD CONSTRAINT fk_sender_agent_id FOREIGN KEY (sender_agent_id) REFERENCES agents(id) ON DELETE SET NULL;
    END IF;
END;
$$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS agents_is_active_idx ON agents(is_active);

-- Enable RLS for the new agents table
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agents
-- For now, only service_role can manage agents.
-- This will be updated later with the new roles and permissions system.
CREATE POLICY "Service role can manage agents" ON agents FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Allow authenticated users to view active agents
CREATE POLICY "Authenticated users can view active agents" ON agents FOR SELECT
USING (is_active = TRUE);