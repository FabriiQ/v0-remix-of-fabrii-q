-- Add a parent_turn_id to conversation_turns to support threaded conversations
ALTER TABLE public.conversation_turns
ADD COLUMN parent_turn_id UUID REFERENCES public.conversation_turns(id) ON DELETE SET NULL;

-- Add an index to the new column for faster lookups
CREATE INDEX idx_parent_turn_id ON public.conversation_turns(parent_turn_id);

-- Add a column to store the user's feedback on a turn
ALTER TABLE public.conversation_turns
ADD COLUMN feedback SMALLINT CHECK (feedback >= 1 AND feedback <= 5);

-- Add a column to store the turn's state (e.g., "needs_clarification")
ALTER TABLE public.conversation_turns
ADD COLUMN turn_state TEXT;