/* ─────────────────────────────────────────────
   MomoPack — Supabase Client
   Paste your Project URL and Anon Key below.
   ───────────────────────────────────────────── */

const SUPABASE_URL  = 'https://nehdwvnnytlqzbakkces.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5laGR3dm5ueXRscXpiYWtrY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY1MjIsImV4cCI6MjA4ODg5MjUyMn0.zycZ0pSH_SzCrmKi6SWSyypwzUMUPFbRUIZTiP-MmdA';

/* Load the Supabase SDK from CDN (added via <script> in each page) and
   export a single shared client instance for the whole site. */
const { createClient } = supabase;
const supabaseClient   = createClient(SUPABASE_URL, SUPABASE_ANON);
