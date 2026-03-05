"use client"

import { useFormStatus } from "react-dom"

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
      type="submit"
    >
      {pending ? "Opslaan..." : "Opslaan"}
    </button>
  )
}