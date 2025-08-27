-- Create a table for conversations
CREATE TABLE public.am_conversations (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    participants uuid[] NOT NULL
);

-- Add a GIN index to efficiently query the participants array
CREATE INDEX idx_am_conversations_participants ON public.am_conversations USING GIN (participants);

-- Create a table for messages
CREATE TABLE public.am_messages (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    conversation_id uuid NOT NULL REFERENCES public.am_conversations(id) ON DELETE CASCADE,
    sender_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content text NOT NULL
);

-- Add index for faster message retrieval
CREATE INDEX idx_am_messages_conversation_id_created_at ON public.am_messages (conversation_id, created_at DESC);


-- Enable Row Level Security (RLS)
ALTER TABLE public.am_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.am_messages ENABLE ROW LEVEL SECURITY;


-- Create RLS policies for am_conversations
CREATE POLICY "Users can view their own conversations."
ON public.am_conversations FOR SELECT
USING (auth.uid() = ANY(participants));

CREATE POLICY "Users can create conversations they are a part of."
ON public.am_conversations FOR INSERT
WITH CHECK (auth.uid() = ANY(participants));


-- Create RLS policies for am_messages
CREATE POLICY "Users can view messages in their conversations."
ON public.am_messages FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.am_conversations
    WHERE am_conversations.id = am_messages.conversation_id
      AND auth.uid() = ANY(am_conversations.participants)
  )
);

CREATE POLICY "Users can send messages in their conversations."
ON public.am_messages FOR INSERT
WITH CHECK (
  sender_id = auth.uid() AND
  EXISTS (
    SELECT 1
    FROM public.am_conversations
    WHERE am_conversations.id = am_messages.conversation_id
      AND auth.uid() = ANY(am_conversations.participants)
  )
);

-- Add tables to the supabase_realtime publication
-- This is not strictly necessary for public tables with a primary key,
-- but it's good practice to be explicit.
-- The supabase_realtime publication must already exist.
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.am_conversations, public.am_messages;
EXCEPTION
  WHEN undefined_object THEN
    RAISE NOTICE 'publication supabase_realtime does not exist, skipping. This is normal in a local dev environment.';
END;
$$;
