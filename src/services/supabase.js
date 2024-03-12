import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ksdrekezbbdukriuzlhx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZHJla2V6YmJkdWtyaXV6bGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3MjU1NTYsImV4cCI6MjAyNTMwMTU1Nn0.SJNtfmNFCz8KV8aJkD1pLci89q9uMWFaA_YUPm6rP78";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
