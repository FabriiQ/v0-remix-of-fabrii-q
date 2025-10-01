-- Enable Row-Level Security for conversation tables
ALTER TABLE conversation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_turns ENABLE ROW LEVEL SECURITY;

--
-- Policies for conversation_sessions
--
-- 1. Allow anonymous and authenticated users to create their own sessions.
CREATE POLICY "Users can create their own conversation sessions"
ON conversation_sessions FOR INSERT
WITH CHECK (true);

-- 2. Allow users to view their own session based on the session_identifier.
--    This is crucial for anonymous users who are identified by a unique session string.
CREATE POLICY "Users can view their own conversation sessions"
ON conversation_sessions FOR SELECT
USING (session_identifier = current_setting('request.jwt.claims', true)::jsonb->>'session_identifier');

-- 3. Allow service_role to bypass RLS for administrative access.
CREATE POLICY "Service role has full access to conversation sessions"
ON conversation_sessions FOR ALL
USING (auth.role() = 'service_role');

--
-- Policies for conversation_turns
--
-- 1. Allow users to add messages to their own conversations.
CREATE POLICY "Users can insert turns into their own conversations"
ON conversation_turns FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM conversation_sessions s
    WHERE s.id = conversation_turns.session_id
    AND s.session_identifier = current_setting('request.jwt.claims', true)::jsonb->>'session_identifier'
  )
);

-- 2. Allow users to view the turns of their own conversations.
CREATE POLICY "Users can view turns from their own conversations"
ON conversation_turns FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM conversation_sessions s
    WHERE s.id = conversation_turns.session_id
    AND s.session_identifier = current_setting('request.jwt.claims', true)::jsonb->>'session_identifier'
  )
);

-- 3. Allow service_role to have full access for agent responses and analysis.
CREATE POLICY "Service role has full access to conversation turns"
ON conversation_turns FOR ALL
USING (auth.role() = 'service_role');

--
-- Supabase Realtime Publication for Chat
--
-- Create a publication that broadcasts all changes on the conversation_turns table.
-- This is what enables the real-time chat functionality on the frontend.
CREATE PUBLICATION supabase_realtime FOR TABLE conversation_turns;