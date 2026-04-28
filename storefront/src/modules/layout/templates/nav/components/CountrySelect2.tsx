"use client"
import { updateRegion } from "@lib/data/cart"
import React, { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const menuRef = useRef(null)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    function onDocClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onEsc)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onEsc)
    }
  }, [])

  const Flag = ({ code }) => {
    if (code === "nl") {
      return (
        <svg className="w-5 h-4" viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#21468B" />
          <rect width="3" height="1.33" fill="#FFF" />
          <rect width="3" height="0.67" fill="#AE1C28" />
        </svg>
      )
    }
    if (code === "be") {
      return (
        <svg className="w-5 h-4" viewBox="0 0 3 2">
          <rect width="1" height="2" x="0" fill="#000" />
          <rect width="1" height="2" x="1" fill="#FAE042" />
          <rect width="1" height="2" x="2" fill="#ED2939" />
        </svg>
      )
    }
    return null
  }

  const ChevronIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-9" />
    </svg>
  )

  const languages = [
    { code: "nl", label: "Nederland", href: "/nl" },
    { code: "be", label: "België", href: "/be" },
  ]

  // Fix hydration error by using Next.js pathname and mounted state
  const currentCode = mounted && pathname ? (pathname.startsWith("/be") ? "be" : "nl") : "nl"
  const current = languages.find((l) => l.code === currentCode) || languages[0]

  const handleSelect = async (countryCode) => {
    setOpen(false)
    // Use Next.js pathname instead of window.location
    const relativePath = pathname.replace(/^\/(nl|be)/, "").replace(/^\//, "")

    try {
      await updateRegion(countryCode, relativePath)
    } catch (err) {
      console.error("Error updating region:", err)
      window.location.href = `/${countryCode}/${relativePath}`
    }
  }

  // Calculate menu position when opening
  const updateMenuPosition = () => {
    if (buttonRef.current && open) {
      const rect = buttonRef.current.getBoundingClientRect()
      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.right - 224, // Width of menu (w-56 = 14rem = 224px)
      })
    }
  }

  useEffect(() => {
    if (open) {
      updateMenuPosition()
      // Update position on scroll and resize
      window.addEventListener('scroll', updateMenuPosition)
      window.addEventListener('resize', updateMenuPosition)
      return () => {
        window.removeEventListener('scroll', updateMenuPosition)
        window.removeEventListener('resize', updateMenuPosition)
      }
    }
  }, [open])

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 rounded-xl border-2 border-border-base px-3 py-2 bg-white text-sm font-semibold shadow-sm hover:shadow-lg hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 relative transition-all duration-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50"
      >
        <div className="w-6 h-5 rounded overflow-hidden border border-gray-200 shadow-sm">
          <Flag code={current.code} />
        </div>
        <span className="min-w-[72px] text-left text-gray-700">{current.label}</span>
        <ChevronIcon
          className={`h-4 w-4 transform transition-transform duration-300 text-jade ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{ top: 0, left: 0 }}
        >
          <div
            ref={menuRef}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-menu"
            className="pointer-events-auto absolute rounded-2xl border-2 border-border-base bg-white/95 backdrop-blur-xl shadow-3xl ring-2 ring-green-200 focus:outline-none w-56 animate-in fade-in slide-in-from-top-2 duration-200"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border-base bg-gradient-to-r from-green-50 to-emerald-50">
              <p className="text-sm font-bold text-gray-900">Kies uw land</p>
              <p className="text-xs text-gray-600">Selecteer uw regio voor taal en valuta</p>
            </div>

            {/* Menu items */}
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-sm text-left transition-all duration-200 mx-2 rounded-xl ${
                    lang.code === current.code
                      ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold shadow-md"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-jade font-semibold"
                  } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600`}
                >
                  <div className={`w-8 h-6 rounded overflow-hidden border shadow-sm ${
                    lang.code === current.code ? "border-white/30" : "border-gray-200"
                  }`}>
                    <Flag code={lang.code} />
                  </div>
                  <div className="flex-1">
                    <span className="block">{lang.label}</span>
                    {lang.code === currentCode && (
                      <span className={`text-xs ${
                        lang.code === current.code ? "text-green-100" : "text-green-600"
                      }`}>• Huidige selectie</span>
                    )}
                  </div>
                  {lang.code === currentCode && (
                    <svg className="w-5 h-5 text-green-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-border-base bg-gradient-to-r from-green-50 to-emerald-50">
              <p className="text-xs text-center text-gray-600">
                <span className="font-semibold text-jade">{current.label}</span> geselecteerd
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
