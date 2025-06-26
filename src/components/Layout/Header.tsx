import type React from "react"
import { motion } from "framer-motion"
import { useAuth } from "../../context/AuthContex"
import { Button } from "../UI/Button"
import { useNavigate } from "react-router-dom"
import { LogOut, User, ArrowRight } from "lucide-react"

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <motion.header
      className="w-full bg-white border-b border-gray-100 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src="/assets/images/Logo.png" alt="Logo" className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              About
            </a>
            <a href="#help" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Help
            </a>
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Features
            </a>
            <a href="#signup" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Signup
            </a>
          </nav>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Dashboard
              </button>
              <Button variant="ghost" className="flex items-center space-x-2" onClick={handleLogout}>
                <User className="w-4 h-4" />
                <span>{user?.username}</span>
                <LogOut className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Request Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  )
}

export default Header
