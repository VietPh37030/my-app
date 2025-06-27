import type React from "react"
import { motion } from "framer-motion"
import { useAuth } from "../../context/AuthContex"
import { Button } from "../UI/Button"
import { useNavigate } from "react-router-dom"
import { LogOut, User, ArrowRight, Menu, X } from "lucide-react"
import { useState } from "react"

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
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
          {/* Logo + Navigation */}
          <div className="flex items-center space-x-20">
            {/* Logo */}
            <div className="cursor-pointer" onClick={() => navigate("/")}>
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
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center">
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
                <Button variant="outline" size="lg" onClick={() => navigate("/login")}>
                  Request Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-gray-100 bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-3">
                <a
                  href="#about"
                  className="block text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#help"
                  className="block text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Help
                </a>
                <a
                  href="#features"
                  className="block text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#signup"
                  className="block text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Signup
                </a>
              </nav>

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-100">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        navigate("/dashboard")
                        setIsMobileMenuOpen(false)
                      }}
                      className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                    >
                      Dashboard
                    </button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start flex items-center space-x-2"
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <User className="w-4 h-4" />
                      <span>{user?.username}</span>
                      <LogOut className="w-4 h-4 ml-auto" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      navigate("/login")
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Request Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header
