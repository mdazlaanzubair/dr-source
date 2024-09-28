import { createClient } from "@supabase/supabase-js";
import { appEnv } from "../utils/exportEnv";

// Create a single supabase client for interacting with your database
const supabase = createClient(appEnv.supabase.url, appEnv.supabase.key);

export default supabase;
