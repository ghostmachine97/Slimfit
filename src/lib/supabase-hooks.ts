'use client'

import { useEffect, useState } from 'react'
import { supabase, type Activity, type CalorieEntry, type UserProfile } from './supabase'
import { User } from '@supabase/supabase-js'

// Hook para gerenciar autenticação
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}

// Hook para gerenciar perfil do usuário
export function useUserProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    async function loadProfile() {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (!error && data) {
        setProfile(data)
      }
      setLoading(false)
    }

    loadProfile()
  }, [userId])

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!userId) return

    const { error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)

    if (!error) {
      setProfile(prev => prev ? { ...prev, ...updates } : null)
    }
  }

  return { profile, loading, updateProfile }
}

// Hook para gerenciar atividades
export function useActivities(userId: string | undefined) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    async function loadActivities() {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setActivities(data)
      }
      setLoading(false)
    }

    loadActivities()
  }, [userId])

  const addActivity = async (activity: Omit<Activity, 'id' | 'user_id' | 'created_at'>) => {
    if (!userId) return

    const { data, error } = await supabase
      .from('activities')
      .insert([{ ...activity, user_id: userId }])
      .select()
      .single()

    if (!error && data) {
      setActivities(prev => [data, ...prev])
    }
  }

  return { activities, loading, addActivity }
}

// Hook para gerenciar calorias
export function useCalories(userId: string | undefined) {
  const [entries, setEntries] = useState<CalorieEntry[]>([])
  const [totalCalories, setTotalCalories] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    async function loadCalories() {
      const today = new Date().toISOString().split('T')[0]
      
      const { data, error } = await supabase
        .from('calorie_entries')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', today)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setEntries(data)
        const total = data.reduce((sum, entry) => sum + entry.calories, 0)
        setTotalCalories(total)
      }
      setLoading(false)
    }

    loadCalories()
  }, [userId])

  const addCalorieEntry = async (entry: Omit<CalorieEntry, 'id' | 'user_id' | 'created_at'>) => {
    if (!userId) return

    const { data, error } = await supabase
      .from('calorie_entries')
      .insert([{ ...entry, user_id: userId }])
      .select()
      .single()

    if (!error && data) {
      setEntries(prev => [data, ...prev])
      setTotalCalories(prev => prev + data.calories)
    }
  }

  const resetCalories = async () => {
    if (!userId) return

    const today = new Date().toISOString().split('T')[0]
    
    await supabase
      .from('calorie_entries')
      .delete()
      .eq('user_id', userId)
      .gte('created_at', today)

    setEntries([])
    setTotalCalories(0)
  }

  return { entries, totalCalories, loading, addCalorieEntry, resetCalories }
}

// Funções de autenticação
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signUpWithEmail(email: string, password: string, fullName?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  return { data, error }
}
