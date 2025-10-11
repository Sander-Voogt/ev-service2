"use client"
import { updateRegion } from "@lib/data/cart"
import React, { useState, useRef, useEffect } from "react"

export default function LanguageDropdown({ initial = "nl" }) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
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

  const languages = [
    { code: "nl", label: "Nederland", href: "/nl" },
    { code: "be", label: "België", href: "/be" },
  ]

  const current = languages.find((l) => l.code === initial) || languages[0]

  const handleSelect = async (countryCode) => {
    setOpen(false)
    const pathname = window.location.pathname
    const newPath = pathname.replace(/^\/(nl|be)(?=\/|$)/, `/${countryCode}`)

    try {
      await updateRegion(countryCode, newPath.replace(/^\//, ""))
    } catch (err) {
      console.error("Error updating region:", err)
      window.location.href = `/${countryCode}${pathname.replace(
        /^\/(nl|be)/,
        ""
      )}`
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 bg-white text-sm font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Flag code={current.code} />
        <span className="min-w-[72px] text-left">{current.label}</span>
        <svg
          className={`h-4 w-4 transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
          className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md border bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999]"
        >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex w-full items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                  lang.code === current.code ? "font-semibold" : ""
                }`}
              >
                <Flag code={lang.code} />
                <span className="truncate">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
