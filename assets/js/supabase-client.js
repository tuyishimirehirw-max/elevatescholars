// assets/js/supabase-client.js
// This file establishes the connection to Supabase

import SUPABASE_CONFIG from './config.js';

// Import Supabase library from CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm';

// Create Supabase client
export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

// Helper function to check if user is logged in
export async function getCurrentUser() {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
        console.error('Error getting session:', error);
        return null;
    }
    
    return session?.user || null;
}

// Helper function to sign out
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error);
        return false;
    }
    return true;
}

// Helper function to get student profile
export async function getStudentProfile(userId) {
    const { data, error } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
    
    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
    
    return data;
}

console.log('Supabase client initialized successfully');