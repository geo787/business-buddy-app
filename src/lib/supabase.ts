import { createClient } from '@supabase/supabase-js'

// Since this project has native Supabase integration, use the built-in configuration
const supabaseUrl = 'https://xvufajrfsggkfegoctpv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2dWZhanJmc2dna2ZlZ29jdHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NDAyNDIsImV4cCI6MjA1MDExNjI0Mn0.ZD-URNB-S6iF9-2O1jF7Yh-OC0YNH0nfVgb3AZKKr3k'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Project {
  id: string
  type: string
  content: any
  created_at: string
}