"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  /** Animation variant. Default: "up" */
  variant?: "up" | "left" | "right" | "scale" | "fade"
  /** Delay in ms */
  delay?: number
  /** Animate only once. Default: true */
  once?: boolean
  /** Additional className applied to the wrapper */
  className?: string
  /** Wrapper element. Default: "div" */
  as?: keyof JSX.IntrinsicElements
}

const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  once = true,
  className = "",
  as = "div",
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [once])

  const Tag = as as any
  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-visible={visible ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  )
}

export default Reveal
