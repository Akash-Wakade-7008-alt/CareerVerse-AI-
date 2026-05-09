-- Create the user_assessments table
CREATE TABLE IF NOT EXISTS public.user_assessments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    career_id TEXT NOT NULL,
    quiz_answer TEXT NOT NULL,
    knowledge_level TEXT NOT NULL CHECK (knowledge_level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.user_assessments ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own assessments
CREATE POLICY "Users can insert their own assessments" 
ON public.user_assessments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own assessments
CREATE POLICY "Users can view their own assessments" 
ON public.user_assessments FOR SELECT 
USING (auth.uid() = user_id);
