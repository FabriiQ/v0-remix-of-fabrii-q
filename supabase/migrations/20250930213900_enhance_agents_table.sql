-- Add new configuration columns to the agents table
ALTER TABLE public.agents
ADD COLUMN IF NOT EXISTS temperature REAL CHECK (temperature >= 0 AND temperature <= 2),
ADD COLUMN IF NOT EXISTS max_tokens INTEGER CHECK (max_tokens > 0),
ADD COLUMN IF NOT EXISTS llm_config JSONB;

-- Add a default value for the new columns for existing agents
UPDATE public.agents
SET
    temperature = 0.7,
    max_tokens = 1024,
    llm_config = '{"model": "gemini-pro"}'::jsonb
WHERE temperature IS NULL;

-- Add comments to the columns for better documentation
COMMENT ON COLUMN public.agents.temperature IS 'The temperature setting for the language model (0.0 - 2.0).';
COMMENT ON COLUMN public.agents.max_tokens IS 'The maximum number of tokens to generate in the response.';
COMMENT ON COLUMN public.agents.llm_config IS 'JSONB object for storing model-specific configuration, e.g., {"model": "gemini-pro", "top_p": 0.9}.';