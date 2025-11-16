import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para o banco de dados
export type UserProfile = {
  id: string
  email: string
  full_name?: string
  subscription_type?: 'monthly' | 'quarterly' | 'biannual' | 'annual' | null
  subscription_end_date?: string
  subscription_cancelled?: boolean
  theme_preference?: 'dark' | 'light'
  language_preference?: string
  created_at: string
  updated_at: string
}

export type Activity = {
  id: string
  user_id: string
  activity_type: 'running' | 'walking' | 'cycling'
  distance: number
  duration: number
  speed: number
  calories: number
  photo_url?: string
  created_at: string
}

export type CalorieEntry = {
  id: string
  user_id: string
  food_name: string
  calories: number
  quantity: number
  created_at: string
}

export type Exercise = {
  id: string
  user_id: string
  exercise_name: string
  category: 'home' | 'outdoor' | 'kids'
  duration: string
  calories: number
  completed_at: string
}
