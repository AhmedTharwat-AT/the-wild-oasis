import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zeclijdfypmmytzbwvhn.supabase.co";
export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
