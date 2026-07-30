import { createClient } from "@supabase/supabase-js";

let supabaseClient: ReturnType<typeof createClient> | null = null;

export function assertSupabaseEnv() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "SUPABASE_URL and (SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY) must be set.",
    );
  }
}

export function isSupabaseConfigured(): boolean {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  
  // Check if values are set and not placeholders
  if (!supabaseUrl || !supabaseKey) return false;
  if (supabaseUrl.includes("YOUR-PROJECT-REF")) return false;
  if (supabaseKey.includes("YOUR_SUPABASE")) return false;
  
  return true;
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseClient) {
    supabaseClient = createClient(
      process.env.SUPABASE_URL!,
      supabaseKey!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );
  }
  return supabaseClient;
}

export const supabase = getSupabaseClient;

export const db = {
  supabase: getSupabaseClient,
};

export async function verifySupabaseConnection() {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY).",
    );
  }
  const { error } = await client.auth.getSession();
  if (error) {
    throw new Error(`Supabase connection check failed: ${error.message}`);
  }
  return true;
}

export * from "./schema";
