// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Use Vite's environment variables instead of hardcoded strings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ⚠️ WARNING: Never use Service Role Keys in a frontend React app.
// It bypasses all security (RLS) and anyone can delete your whole database.
// Only use the Anon Key here.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);