-- Update the is_admin function to use the new roles table
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    is_admin_user BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM user_roles ur
        JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_id = auth.uid() AND r.name = 'admin'
    ) INTO is_admin_user;
    RETURN is_admin_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop old policies before creating new ones to avoid conflicts
-- Documents
DROP POLICY IF EXISTS "Admins can insert documents" ON documents;
DROP POLICY IF EXISTS "Admins can update documents" ON documents;
DROP POLICY IF EXISTS "Admins can delete documents" ON documents;
-- Document Chunks
DROP POLICY IF EXISTS "Admins can manage document chunks" ON document_chunks;
-- Conversations
DROP POLICY IF EXISTS "Admins can view all conversations" ON conversations;
-- Messages
DROP POLICY IF EXISTS "Admins can view all messages" ON messages;
-- AI Settings
DROP POLICY IF EXISTS "Admins can manage AI settings" ON ai_settings;
-- Analytics
DROP POLICY IF EXISTS "Admins can view all analytics" ON ai_analytics;

-- Create new policies using the has_permission function
-- Documents
CREATE POLICY "Users with permission can insert documents" ON documents
FOR INSERT WITH CHECK (has_permission(auth.uid(), 'documents:create'));

CREATE POLICY "Users with permission can update documents" ON documents
FOR UPDATE USING (has_permission(auth.uid(), 'documents:update'));

CREATE POLICY "Users with permission can delete documents" ON documents
FOR DELETE USING (has_permission(auth.uid(), 'documents:delete'));

-- Document Chunks
CREATE POLICY "Users with permission can manage document chunks" ON document_chunks
FOR ALL USING (has_permission(auth.uid(), 'documents:update')); -- Assuming chunk management is part of document updates

-- Conversations
CREATE POLICY "Admins can view all conversations" ON conversations
FOR SELECT USING (has_permission(auth.uid(), 'chats:read_all'));

-- Messages
CREATE POLICY "Admins can view all messages" ON messages
FOR SELECT USING (has_permission(auth.uid(), 'chats:read_all'));

-- AI Settings
CREATE POLICY "Admins can manage AI settings" ON ai_settings
FOR ALL USING (is_admin());

-- Analytics
CREATE POLICY "Admins can view all analytics" ON ai_analytics
FOR SELECT USING (is_admin());

-- Update policies for the agents table to use permissions
DROP POLICY IF EXISTS "Service role can manage agents" ON agents;
CREATE POLICY "Users with permission can manage agents" ON agents
FOR ALL USING (has_permission(auth.uid(), 'agents:update'))
WITH CHECK (has_permission(auth.uid(), 'agents:create'));

-- Update policies for roles and permissions management
DROP POLICY IF EXISTS "Service role can manage roles" ON roles;
DROP POLICY IF EXISTS "Service role can manage permissions" ON permissions;
DROP POLICY IF EXISTS "Service role can manage role_permissions" ON role_permissions;
DROP POLICY IF EXISTS "Service role can manage user_roles" ON user_roles;

CREATE POLICY "Admins can manage roles" ON roles FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage permissions" ON permissions FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage role_permissions" ON role_permissions FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage user_roles" ON user_roles FOR ALL USING (is_admin());