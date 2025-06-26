import type React from "react"

interface AlertProps {
  children: React.ReactNode
  variant?: "default" | "destructive"
  className?: string
}

const Alert: React.FC<AlertProps> = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-50 border-blue-200 text-blue-800",
    destructive: "bg-red-50 border-red-200 text-red-800",
  }

  return <div className={`relative w-full rounded-lg border p-4 ${variants[variant]} ${className}`}>{children}</div>
}

const AlertDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return <div className={`text-sm [&_p]:leading-relaxed ${className}`}>{children}</div>
}

export { Alert, AlertDescription }
