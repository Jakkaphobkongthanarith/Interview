import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.DB_POSTGRES_URL;
const supabaseKey = process.env.SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Key is missing");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
