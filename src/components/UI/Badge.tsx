import type React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-200 text-gray-900 hover:bg-gray-100",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  )
}

export { Badge }
