"use client"

import React, { useState, useRef, useEffect } from "react"

interface DropdownMenuProps {
  children: React.ReactNode
}

interface DropdownMenuTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

interface DropdownMenuContentProps {
  align?: "start" | "end"
  children: React.ReactNode
}

interface DropdownMenuItemProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

const DropdownMenuContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children }) => {
  const { setIsOpen } = React.useContext(DropdownMenuContext)

  return <div onClick={() => setIsOpen(true)}>{children}</div>
}

const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ align = "start", children }) => {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, setIsOpen])

  if (!isOpen) return null

  const alignmentClasses = align === "end" ? "right-0" : "left-0"

  return (
    <div
      ref={contentRef}
      className={`absolute z-50 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg ${alignmentClasses}`}
    >
      <div className="py-1">{children}</div>
    </div>
  )
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ children, onClick, className = "" }) => {
  const { setIsOpen } = React.useContext(DropdownMenuContext)

  const handleClick = () => {
    onClick?.()
    setIsOpen(false)
  }

  return (
    <button
      className={`flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }
