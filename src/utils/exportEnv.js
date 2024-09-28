export const appEnv = {
  llm_api_url: import.meta.env.VITE_DR_SOURCE_URL,
  clerk: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
    bucket: import.meta.env.VITE_SUPABASE_BUCKET_KEY,
  },
};
