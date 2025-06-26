import type React from "react"
import { useState } from "react"
import { useAuth } from "../context/AuthContex"
import { Button } from "../components/UI/Button"
import PostsTable from "../components/Post/PostsTable"

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("posts")
  const { logout, user } = useAuth()

  const handleLogout = async () => {
    await logout()
    window.location.href = "/"
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
            <p className="text-gray-600">Profile management coming soon...</p>
          </div>
        )
      case "posts":
        return <PostsTable />
      default:
        return <PostsTable />
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-300 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <img
            src="/assets/images/Logo.png"
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("posts")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "posts"
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Posts
            </button>
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full text-left text-gray-600 hover:text-gray-900"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">{renderContent()}</div>
    </div>
  )
}

export default DashboardPage
