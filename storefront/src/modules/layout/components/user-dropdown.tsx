"use client"

import { useState, useRef, useEffect } from "react"
import { clx } from "@medusajs/ui"
import Link from "next/link"

type UserDropdownProps = {
  customer: {
    first_name: string
    last_name: string
    email: string
  }
}

const UserDropdown = ({ customer }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const displayName = customer.first_name && customer.last_name
    ? `${customer.first_name} ${customer.last_name}`
    : customer.email

  const menuItems = [
    {
      label: "Mijn Account",
      href: "/account",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: "Bestellingen",
      href: "/account/orders",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      label: "Adressen",
      href: "/account/addresses",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      label: "Uitloggen",
      href: "/logout",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      isLogout: true
    }
  ]

  const ChevronIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 font-semibold text-gray-700 hover:text-green-700 transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 rounded-lg px-3 py-2 bg-white hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 border-2 border-gray-200 hover:border-green-300 shadow-sm hover:shadow-md"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:inline max-w-[100px] truncate text-sm">
          {displayName}
        </span>
        <ChevronIcon className={clx(
          "w-4 h-4 transition-transform duration-300 text-green-700",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-3xl border-2 border-green-100 py-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User info header */}
          <div className="px-4 py-3 border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-base shadow-md">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {customer.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={clx(
                  "flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all duration-200",
                  "text-gray-700 hover:text-white",
                  "hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700",
                  "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600 rounded-lg mx-2",
                  item.isLogout && "text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700"
                )}
                onClick={() => setIsOpen(false)}
              >
                <div className={clx(
                  "p-1.5 rounded-lg transition-colors duration-200",
                  item.isLogout ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"
                )}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <p className="text-xs text-center text-gray-600">
              Ingelogd als <span className="font-semibold text-green-700">{displayName}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDropdown