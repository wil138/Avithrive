"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  username?: string
  age?: number
  phone?: string
  avatar?: string
  level: number
  points: number
  role: "user" | "guide" | "admin"
  accountStatus?: string
  achievements?: Array<{ title: string; description?: string; points?: number }>
  badges?: Array<{ name: string; icon?: string; date?: string; earned?: boolean }>
  bio?: string
  createdAt?: string
  favoriteLocations?: string[]
  joinDate?: string
  lastActive?: string
  nextLevelPoints?: number
  location?: string
  preferences?: Record<string, any>
  recentSightings?: Array<any>
  specializations?: string[]
  stats?: Record<string, any>
  title?: string
  updatedAt?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string, age?: number, phone?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("avitravel_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      // Construct endpoint with URL-encoded email and password
      const encodedEmail = encodeURIComponent(email)
      const encodedPassword = encodeURIComponent(password)
      const url = `https://fm5sp9ml-8005.use.devtunnels.ms/login/${encodedEmail}/${encodedPassword}`

      // Call the local Next.js API proxy to avoid CORS and keep credentials out of the URL
      const proxyRes = await fetch('/api/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const text = await proxyRes.text().catch(() => '')
      let data: any = null
      try {
        data = text ? JSON.parse(text) : null
      } catch (e) {
        data = null
      }

      if (proxyRes.ok && data && typeof data.ok === 'string') {
        // Map backend user if provided
        const backendUser = data.user || {}
        const name = backendUser.name || email.split("@")[0] || 'N/A'
        const username = backendUser.username || (email.split("@")[0] ?? 'N/A')
        const age = typeof backendUser.age === 'number' ? backendUser.age : undefined
        const phone = backendUser.phone || undefined
  const avatar = backendUser.avatar || undefined

        const loggedUser: User = {
          id: backendUser._id || Date.now().toString(),
          email,
          name,
          username,
          age,
          phone,
          avatar,
          level: backendUser.level ?? 1,
          points: backendUser.points ?? 0,
          role: backendUser.role ?? 'user',
          accountStatus: backendUser.accountStatus,
          achievements: backendUser.achievements,
          badges: backendUser.badges,
          bio: backendUser.bio,
          createdAt: backendUser.createdAt,
          favoriteLocations: backendUser.favoriteLocations,
          joinDate: backendUser.joinDate,
          lastActive: backendUser.lastActive,
          nextLevelPoints: backendUser.nextLevelPoints,
          location: backendUser.location,
          preferences: backendUser.preferences,
          recentSightings: backendUser.recentSightings,
          specializations: backendUser.specializations,
          stats: backendUser.stats,
          title: backendUser.title,
          updatedAt: backendUser.updatedAt,
        }

        setUser(loggedUser)
        try {
          localStorage.setItem('avitravel_user', JSON.stringify(loggedUser))
        } catch (e) {
          // ignore storage errors
        }

        setIsLoading(false)
        return { success: true }
      }

  // If backend returned an error message or non-JSON body, include status + body for debugging.
  const serverMessage = data && typeof data.error === 'string' ? data.error : text || proxyRes.statusText
  setIsLoading(false)
  return { success: false, error: `${proxyRes.status} ${serverMessage}` }
    } catch (err) {
      // Network or unexpected error
      setIsLoading(false)
      return { success: false, error: (err as Error)?.message || "Network error" }
    }
  }

  const register = async (email: string, password: string, name: string, age?: number, phone?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      // Use the proxy to call backend register
      const username = email.split("@")[0]
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ username, password, name, email, age, phone }),
      })

      const text = await res.text().catch(() => '')
      let data: any = null
      try {
        data = text ? JSON.parse(text) : null
      } catch (e) {
        data = null
      }

      if (res.ok && data && typeof data.ok === 'string') {
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name,
          level: 1,
          points: 0,
          role: 'user',
        }
        setUser(mockUser)
        try {
          localStorage.setItem('avitravel_user', JSON.stringify(mockUser))
        } catch (e) {
          // ignore
        }
        setIsLoading(false)
        return { success: true }
      }

      const serverMessage = data && typeof data.error === 'string' ? data.error : text || res.statusText
      setIsLoading(false)
      return { success: false, error: `${res.status} ${serverMessage}` }
    } catch (err) {
      setIsLoading(false)
      return { success: false, error: (err as Error)?.message || 'Network error' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("avitravel_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
