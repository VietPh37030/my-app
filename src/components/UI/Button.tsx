import type React from "react"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "primary"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", children, disabled, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105"

    const variants = {
      default: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 rounded-full shadow-lg hover:shadow-xl",
      primary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 rounded-full shadow-lg hover:shadow-xl",
      outline: "border-2 border-purple-600 bg-transparent text-purple-600 hover:bg-purple-600 hover:text-white focus:ring-purple-500 rounded-full shadow-md hover:shadow-lg",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-purple-500 rounded-md",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 rounded-full shadow-lg hover:shadow-xl",
    }

    const sizes = {
      default: "h-10 px-6 py-2",
      sm: "h-8 px-4 text-sm",
      lg: "h-12 px-8 text-lg",
      icon: "h-10 w-10",
    }

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    return (
      <button ref={ref} className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button }
