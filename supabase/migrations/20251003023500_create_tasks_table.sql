CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

CREATE TABLE IF NOT EXISTS tasks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  contact_id UUID REFERENCES lead_contacts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status task_status DEFAULT 'pending',
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on contact_id for faster lookups
CREATE INDEX IF NOT EXISTS tasks_contact_id_idx ON tasks(contact_id);

-- Index on status for filtering
CREATE INDEX IF NOT EXISTS tasks_status_idx ON tasks(status);

-- Trigger to update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_tasks_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_tasks_timestamp();