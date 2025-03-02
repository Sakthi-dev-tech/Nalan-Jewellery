"use client";

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing environment variables for Supabase')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
      autoRefreshToken: true,
      persistSession: true,
      storage: {
          getItem: (key) => {
              try {
                  const storedSession = localStorage.getItem(key);
                  return storedSession;
              } catch {
                  return null;
              }
          },
          setItem: (key, value) => {
              try {
                  localStorage.setItem(key, value);
              } catch {}
          },
          removeItem: (key) => {
              try {
                  localStorage.removeItem(key);
              } catch (err) {
                console.error(err);
              }
          },
      },
  },
});