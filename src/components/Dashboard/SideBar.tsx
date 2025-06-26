"use client"

import type React from "react"

import { LogOut, FileText, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContex"
import { Button } from "../UI/Button"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "posts", label: "Posts", icon: FileText },
  ]

  return (
    <div className="w-64 bg-gray-200 min-h-screen p-4">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8">
        <img
          src="/assets/images/Logo.png"
          alt="Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Menu Items */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start text-left ${
                activeTab === item.id
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          )
        })}

        <Button
          variant="ghost"
          className="w-full justify-start text-left text-gray-700 hover:bg-gray-300"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </nav>
    </div>
  )
}

export default Sidebar
