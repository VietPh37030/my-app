"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "../UI/Button"
import { Input } from "../UI/Input"
import { useAuth } from "../../context/AuthContex"

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const testAccounts = [
    "admin",
    "admin1",
    "admin2",
    "adminRefresh",
    "adminRefresh1",
    "adminRefresh2",
    "adminRefresh3",
    "adminRefresh4",
    "adminRefresh5",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) {
      setError("Please enter a username")
      return
    }

    setLoading(true)
    setError("")

    try {
      await login(username)
      window.location.href = "/dashboard"
    } catch (err) {
      setError("Login failed. Please check your username.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <Button variant="outline" className="text-gray-600" onClick={() => (window.location.href = "/")}>
          Sign In
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <img
              src="/assets/images/Logo.png"
              alt="Logo"
              className="h-16 w-auto"
            />
          </div>

          {/* Sign In Form */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Sign In</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg"
                  disabled={loading}
                  error={error}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-lg font-medium"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Test Accounts */}
            <div className="mt-8">
              <p className="text-sm text-gray-600 mb-3">Quick test accounts:</p>
              <div className="grid grid-cols-3 gap-2">
                {testAccounts.slice(0, 9).map((account) => (
                  <Button
                    key={account}
                    variant="outline"
                    size="sm"
                    onClick={() => setUsername(account)}
                    className="text-xs"
                  >
                    {account}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
