"use client"

import { useEffect, useState } from "react"
import DOMPurify from "isomorphic-dompurify"

type SafeHtmlProps = {
  html: string | undefined | null
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export default function SafeHtml({
  html,
  className,
  as: Tag = "div",
}: SafeHtmlProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState<string | null>(null)

  useEffect(() => {
    if (!html) return
    setSanitizedHtml(DOMPurify.sanitize(html))
  }, [html])

  if (!sanitizedHtml) return null

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}