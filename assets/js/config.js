// assets/js/config.js
// Supabase Configuration
// ⚠️ IMPORTANT: Add config.js to .gitignore to keep credentials safe

const SUPABASE_CONFIG = {
    url: 'https://zyrtvaqcrslklwtxyndq.supabase.co',  // Replace with your Supabase project URL
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5cnR2YXFjcnNsa2x3dHh5bmRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTc0OTUsImV4cCI6MjA4NTk3MzQ5NX0.Bv3R3pNsajJAubfacIQms_LJAnoRYoLxR1WigObohnM'  // Replace with your Supabase anon/public key
};

// Instructions:
// 1. Go to your Supabase project dashboard
// 2. Click Settings (gear icon) → API
// 3. Copy "Project URL" and paste it as the 'url' value above
// 4. Copy "anon public" key and paste it as the 'anonKey' value above
// 5. Save this file
// 6. Add "assets/js/config.js" to your .gitignore file

// Export for use in other files
export default SUPABASE_CONFIG;