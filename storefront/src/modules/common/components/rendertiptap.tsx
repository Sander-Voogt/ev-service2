"use client"

import { useEffect, useState } from "react"
import DOMPurify from "isomorphic-dompurify"

type Props = {
  html: {
    maindescription_html?: string
  }
}

export default function ProductDescription({ html }: Props) {
  const [sanitized, setSanitized] = useState<string | null>(null)

  useEffect(() => {
    if (!html?.maindescription_html) return
    setSanitized(DOMPurify.sanitize(html.maindescription_html))
  }, [html])

  if (!sanitized) return null

  return (
    <section className="bg-white dark:bg-gray-900">
      <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        Beschrijving
      </h2>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    </section>
  )
}