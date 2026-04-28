"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

const STORAGE_KEY = "ev-theme"

type Theme = "light" | "dark"

type Size = "sm" | "md"

const sizeClasses: Record<Size, { box: string; icon: string }> = {
  sm: { box: "w-7 h-7", icon: "w-[14px] h-[14px]" },
  md: { box: "w-9 h-9", icon: "w-4 h-4" },
}

const ThemeToggle = ({
  className = "",
  size = "md",
}: {
  className?: string
  size?: Size
}) => {
  const s = sizeClasses[size]
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const initial: Theme = root.classList.contains("dark") ? "dark" : "light"
    setTheme(initial)
    setMounted(true)
  }, [])

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    const root = document.documentElement
    root.classList.toggle("dark", next === "dark")
    root.setAttribute("data-mode", next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Schakel naar lichte modus" : "Schakel naar donkere modus"}
      className={`relative inline-flex items-center justify-center ${s.box} rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-jade hover:text-jade transition-all ${className}`}
    >
      <Sun
        className={`${s.icon} absolute transition-all ${
          mounted && theme === "dark" ? "opacity-0 scale-75 rotate-90" : "opacity-100 scale-100 rotate-0"
        }`}
        strokeWidth={2}
      />
      <Moon
        className={`${s.icon} absolute transition-all ${
          mounted && theme === "dark" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-90"
        }`}
        strokeWidth={2}
      />
    </button>
  )
}

export default ThemeToggle
