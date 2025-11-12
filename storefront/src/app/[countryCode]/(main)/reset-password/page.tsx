"use client" // include with Next.js 13+

import { sdk } from "@lib/config"
import { POST } from "app/api/wachtwoordreset/route"
import { useMemo, useState } from "react"

export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  // for other than Next.js
  const searchParams = useMemo(() => {
    if (typeof window === "undefined") {
      return
    }

    return new URLSearchParams(window.location.search)
  }, [])
  const token = useMemo(() => {
    return searchParams?.get("token")
  }, [searchParams])
  const email = useMemo(() => {
    return searchParams?.get("email")
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!token) {
      return
    }
    if (!password) {
      alert("Password is required")
      return
    }
    setLoading(true)

    fetch("/api/setpassword", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        token: token,
      }),
    })
      .then(() => {
        alert("Wachtwoord gewijzigd. U kunt nu inloggen met uw nieuwe wachtwoord")
      })
      .catch((error) => {
        alert(`Wachtwoord kan niet worden gereset: ${error.message}`)
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
    Nieuw wachtwoord instellen
  </h2>

  <div className="flex flex-col space-y-2">
    <label
      htmlFor="password"
      className="text-sm font-medium text-gray-700"
    >
      Nieuw wachtwoord
    </label>
    <input
      id="password"
      type="password"
      placeholder="••••••••"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400"
      required
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className={`w-full py-2 rounded-lg text-white font-medium transition-colors
      ${loading
        ? "bg-[#22c55e] cursor-not-allowed"
        : "bg-[#22c55e] hover:bg-[#22c55e]"}
    `}
  >
    {loading ? "Bezig met resetten..." : "Reset wachtwoord"}
  </button>

  <p className="text-sm text-gray-500 text-center">
    Voer een nieuw wachtwoord in om je account te beveiligen.
  </p>
</form>

  )
}
