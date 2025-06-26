"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { apiService } from "../services/api"

interface AuthContextType {
  isAuthenticated: boolean
  user: any | null
  login: (username: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = async (username: string) => {
    try {
      // Thêm await ở đây để đợi response
      const response = await apiService.login(username)
      console.log("Login successful:", response)

      // Bây giờ response là object, không phải Promise
      const accessToken = response.accessToken || response.access_token || response.token
      const refreshToken = response.refreshToken || response.refresh_token

      if (!accessToken) {
        throw new Error("No access token received")
      }

      localStorage.setItem("accessToken", accessToken)
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken)
      }
      localStorage.setItem("user", JSON.stringify({ username }))

      setIsAuthenticated(true)
      setUser({ username })
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.clear()
      setIsAuthenticated(false)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>{children}</AuthContext.Provider>
  )
}
