// ============================================
// SUPABASE CONFIGURATION
// The Voices Of Future Rwanda
// ============================================
// File: assets/js/supabase-config.js

// IMPORTANT: Replace these with YOUR actual Supabase credentials
// Find these at: Supabase Dashboard → Settings → API

const SUPABASE_URL = 'https://edjegahltxocgamfiquo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkamVnYWhsdHhvY2dhbWZpcXVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MjA0NDgsImV4cCI6MjA4NDM5NjQ0OH0.BXX5tum4rzuPKrCt-ouR8BQFfZDFZaVQjcy57SVGMC8';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Verify connection
console.log('✅ Supabase client initialized');
console.log('📍 Project URL:', SUPABASE_URL);

// Optional: Test connection on page load
async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection error:', error.message);
    } else {
      console.log('✅ Supabase connection successful!');
    }
  } catch (err) {
    console.error('❌ Supabase initialization error:', err);
  }
}

// Run connection test (optional - remove in production)
// testSupabaseConnection();