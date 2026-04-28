"use client"

import { useState } from "react"
import { KeyRound } from "lucide-react"

export default function RequestResetPassword() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setMessage(null)

    fetch("/api/wachtwoordreset", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.ok) {
          setIsError(false)
          setMessage("Resetlink is verstuurd naar je e-mailadres.")
        } else {
          setIsError(true)
          setMessage(
            "Resetlink kan niet worden verstuurd. Neem contact op via klantenservice@evservice.eu."
          )
        }
      })
      .catch(() => {
        setIsError(true)
        setMessage("Er is iets misgegaan. Probeer het opnieuw.")
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="bg-page-soft min-h-[80vh]">
      <div className="content-container py-10 sm:py-14 max-w-[440px]">
        <form onSubmit={handleSubmit} className="surface-card p-6 sm:p-7">
          <div className="text-center mb-5">
            <div className="w-11 h-11 rounded-full bg-jade/10 text-jade flex items-center justify-center mx-auto mb-3">
              <KeyRound className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h1 className="display-sm text-text-base">Wachtwoord vergeten</h1>
            <p className="text-[13px] text-text-muted mt-1">
              Vul je e-mailadres in en we sturen je een resetlink.
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-[12px] font-medium text-text-muted"
            >
              E-mailadres
            </label>
            <input
              id="email"
              type="email"
              placeholder="jouw@email.nl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-base"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-4"
          >
            {loading ? "Verzenden..." : "Vraag resetlink aan"}
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

          <p className="text-[12px] text-text-muted text-center mt-4">
            <a href="/account" className="text-jade hover:underline">
              Terug naar inloggen
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
