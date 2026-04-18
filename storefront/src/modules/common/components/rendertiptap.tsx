"use client"

import createDOMPurify from "dompurify"

const DOMPurify = typeof window !== "undefined" ? createDOMPurify(window) : null

type Props = {
  html: {
    maindescription_html?: string
  }
}

export default function ProductDescription({ html }: Props) {
  if (!html?.maindescription_html) return null

  const sanitizedContent = DOMPurify ? DOMPurify.sanitize(html.maindescription_html) : html.maindescription_html

  return (
     <section className="bg-white dark:bg-gray-900">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Beschrijving
        </h2>
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
    </section>
  )
}
