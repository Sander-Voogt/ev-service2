"use client"

import DOMPurify from "isomorphic-dompurify"

type SafeHtmlProps = {
  html: string | undefined | null
  className?: string
  as?: keyof JSX.IntrinsicElements
}

/**
 * Client component that renders HTML content safely by sanitizing it
 * with DOMPurify before rendering. This ensures all HTML from external
 * sources (Ghost CMS, Medusa API, TipTap) is sanitized against XSS.
 */
export default function SafeHtml({
  html,
  className,
  as: Tag = "div",
}: SafeHtmlProps) {
  if (!html) return null

  // Sanitize HTML using DOMPurify to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(html)

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}
