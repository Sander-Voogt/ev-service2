"use client" // include with Next.js 13+

import { sdk } from "@lib/config"
import { useState } from "react"

export default function RequestResetPassword() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      alert("Email is required")
      return
    }
    setLoading(true)

    fetch("/api/wachtwoordreset", {
      method: "POST",
      body: JSON.stringify({ email: email }),
    })
      .then((res) => {})
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow p-6 space-y-4 border border-gray-100"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Wachtwoord Reset
      </h2>

      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          E-mailadres
        </label>
        <input
          id="email"
          type="email"
          placeholder="jouw@email.nl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-lg text-white font-medium transition-colors
      ${
        loading
          ? "bg-[#22c55e] cursor-not-allowed"
          : "bg-[#22c55e] hover:bg-[#22c55e]"
      }
    `}
      >
        {loading ? "Verzenden..." : "Vraag resetlink aan"}
      </button>

      <p className="text-sm text-gray-500 text-center">
        Vul je e-mailadres in om een link te ontvangen waarmee je je wachtwoord
        kunt resetten.
      </p>
    </form>
  )
}
