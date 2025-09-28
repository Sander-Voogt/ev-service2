"use client"

import { Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Column, Columns } from "./Columns"


import React, { useEffect, useState } from "react"

type Props = {
  content?: string
}

function renderContent(value?: any): string {
  if (!value) return ""

  console.log(typeof value)
  console.log(JSON.parse(value))

  try {
    const json = typeof value === "string" ? JSON.parse(value) : value

    const editor = new Editor({
      extensions: [StarterKit, Columns, Column],
      content: json,
    })

    return editor.getHTML()
  } catch (err) {
    console.error("renderContent kon JSON niet parsen:", err, value)
    return typeof value === "string" ? value : ""
  }
}


export function ProductDescription({ content }: Props) {
  const [html, setHtml] = useState<string>("") // client-side HTML

  useEffect(() => {
    if (!content) return

    try {
      const json = JSON.parse(content)

      const editor = new Editor({
        extensions: [StarterKit, Columns, Column],
        content: json,
      })

      setHtml(editor.getHTML())
    } catch (err) {
      console.error("Kon JSON niet parsen:", err)
      setHtml(content) // fallback oude HTML
    }
  }, [content])

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
