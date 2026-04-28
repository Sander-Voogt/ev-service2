"use client"

import { useMemo, useState } from "react"
import { Lock } from "lucide-react"

export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  const searchParams = useMemo(() => {
    if (typeof window === "undefined") return
    return new URLSearchParams(window.location.search)
  }, [])
  const token = useMemo(() => searchParams?.get("token"), [searchParams])
  const email = useMemo(() => searchParams?.get("email"), [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!token || !password) return

    setLoading(true)
    setMessage(null)

    fetch("/api/setpassword", {
      method: "POST",
      body: JSON.stringify({ email, password, token }),
    })
      .then(() => {
        setIsError(false)
        setMessage(
          "Wachtwoord gewijzigd. U kunt nu inloggen met uw nieuwe wachtwoord."
        )
      })
      .catch((error) => {
        setIsError(true)
        setMessage(`Wachtwoord kan niet worden gereset: ${error.message}`)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="bg-page-soft min-h-[80vh]">
      <div className="content-container py-10 sm:py-14 max-w-[440px]">
        <form onSubmit={handleSubmit} className="surface-card p-6 sm:p-7">
          <div className="text-center mb-5">
            <div className="w-11 h-11 rounded-full bg-jade/10 text-jade flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h1 className="display-sm text-text-base">Nieuw wachtwoord instellen</h1>
            <p className="text-[13px] text-text-muted mt-1">
              Voer een nieuw wachtwoord in om je account te beveiligen.
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-[12px] font-medium text-text-muted"
            >
              Nieuw wachtwoord
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-base"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-4"
          >
            {loading ? "Bezig met resetten..." : "Reset wachtwoord"}
          </button>

          {message && (
            <div
              className={`mt-4 p-2.5 rounded-md text-[12.5px] ${
                isError
                  ? "bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c]"
                  : "bg-[#f1f8e9] border border-jade/30 text-text-base"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
