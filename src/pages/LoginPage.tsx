"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "../components/UI/Button"
import { Input } from "../components/UI/Input"
import { useAuth } from "../context/AuthContex"

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const testAccounts = [
    // List Account Test 1 (normal tokens)
    "admin",
    "admin1",
    "admin2",
    // List Account Test 2 (tokens expire after 2 minutes)
    "adminRefresh",
    "adminRefresh1",
    "adminRefresh2",
    "adminRefresh3",
    "adminRefresh4",
    "adminRefresh5",
    "adminRefresh6",
    "adminRefresh7",
    "adminRefresh8",
    "adminRefresh9",
    "adminRefresh10",
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
      navigate("/dashboard")
    } catch (err) {
      setError("Login failed. Please check your username.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img
            src="/assets/images/Logo.png"
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Sign In Form */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-left">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                User name
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                disabled={loading}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
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
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">List Account Test 1 (Normal):</p>
              <div className="grid grid-cols-3 gap-2">
                {testAccounts.slice(0, 3).map((account) => (
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

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">List Account Test 2 (Token expires in 2 min):</p>
              <div className="grid grid-cols-3 gap-2">
                {testAccounts.slice(3).map((account) => (
                  <Button
                    key={account}
                    variant="outline"
                    size="sm"
                    onClick={() => setUsername(account)}
                    className="text-xs bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
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

export default LoginPage
