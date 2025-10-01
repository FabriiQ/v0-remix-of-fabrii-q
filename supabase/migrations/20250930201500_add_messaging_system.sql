-- Create the channels table to represent chat channels
CREATE TABLE IF NOT EXISTS channels (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    description TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the channel_participants table to manage users and agents in channels
CREATE TABLE IF NOT EXISTS channel_participants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    agent_id UUID, -- This will reference the new agents table
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    role TEXT DEFAULT 'member', -- e.g., 'member', 'admin'
    UNIQUE(channel_id, user_id, agent_id)
);

-- Create the messages table to store messages within channels
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES auth.users(id),
    sender_agent_id UUID, -- This will reference the new agents table
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Add channel_id column if it doesn't exist, for backwards compatibility
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM   information_schema.columns
        WHERE  table_name = 'messages'
        AND    column_name = 'channel_id'
    ) THEN
        ALTER TABLE messages
        ADD COLUMN channel_id UUID REFERENCES channels(id) ON DELETE CASCADE;
    END IF;
END;
$$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS channels_created_by_idx ON channels(created_by);
CREATE INDEX IF NOT EXISTS channel_participants_channel_id_idx ON channel_participants(channel_id);
CREATE INDEX IF NOT EXISTS channel_participants_user_id_idx ON channel_participants(user_id);
CREATE INDEX IF NOT EXISTS messages_channel_id_idx ON messages(channel_id);
CREATE INDEX IF NOT EXISTS messages_sender_id_idx ON messages(sender_id);

-- Enable RLS for the new tables
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE channel_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for channels
CREATE POLICY "Users can create channels" ON channels FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can view channels they are a part of" ON channels FOR SELECT USING (
    id IN (SELECT channel_id FROM channel_participants WHERE user_id = auth.uid())
);

-- RLS Policies for channel_participants
CREATE POLICY "Users can join channels" ON channel_participants FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can view participants of channels they are in" ON channel_participants FOR SELECT USING (
    channel_id IN (SELECT channel_id FROM channel_participants WHERE user_id = auth.uid())
);

-- RLS Policies for messages
CREATE POLICY "Users can send messages in channels they are in" ON messages FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    channel_id IN (SELECT channel_id FROM channel_participants WHERE user_id = auth.uid())
);
CREATE POLICY "Users can view messages in channels they are in" ON messages FOR SELECT USING (
    channel_id IN (SELECT channel_id FROM channel_participants WHERE user_id = auth.uid())
);

-- Create a publication for real-time messaging
CREATE PUBLICATION supabase_realtime_messages FOR TABLE messages;