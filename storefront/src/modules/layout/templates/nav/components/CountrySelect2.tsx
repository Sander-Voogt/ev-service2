"use client"
import { useParams } from "next/dist/client/components/navigation";
import React, { useState, useRef, useEffect } from "react"

// LanguageDropdown
// - TailwindCSS-only styling
// - Met vlag-icoontjes per land (inline SVG)
// - Klik op land: navigeert naar /nl of /be

export default function LanguageDropdown() {
    const params = useParams<{ countryCode: string;  }>()
    const initial = params.countryCode
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

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        style={{ zIndex: "1000" }}
        className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 bg-white text-sm font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {/* <Globe className="h-4 w-4" /> */}
        {/* {current.label} */}
        <Flag code={current.code} />
        {/* <span className="min-w-[72px] text-left"></span>  */}
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
              <a
                key={lang.code}
                href={lang.href}
                role="menuitem"
                className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                  lang.code === current.code ? "font-semibold" : ""
                }`}
                onClick={() => setOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setOpen(false)
                  }
                }}
              >
                <Flag code={lang.code} />
                <span className="truncate">{lang.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
