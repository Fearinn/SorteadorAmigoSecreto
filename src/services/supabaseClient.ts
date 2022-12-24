import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://xhexdnrmtpfyntwordms.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZXhkbnJtdHBmeW50d29yZG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA4OTAwNjgsImV4cCI6MTk4NjQ2NjA2OH0.d4R_zi0E03ARxGIgolk7yrSURk1XuoRarLF_2dXPpAI";
export const supabase = createClient(PROJECT_URL, PUBLIC_KEY);