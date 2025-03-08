import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, // Je récupère les clés depuis .env
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;
