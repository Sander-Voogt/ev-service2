"use client" // include with Next.js 13+

import { sdk } from "@lib/config"
import { useMemo, useState } from "react"

export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  // for other than Next.js
  const searchParams = useMemo(() => {
    if (typeof window === "undefined") {
      return
    }

    return new URLSearchParams(
      window.location.search
    )
  }, [])
  const token = useMemo(() => {
    return searchParams?.get("token")
  }, [searchParams])
  const email = useMemo(() => {
    return searchParams?.get("email")
  }, [searchParams])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    if (!token) {
      return
    }
    if (!password) {
      alert("Password is required")
      return
    }
    setLoading(true)

    sdk.auth.updateProvider("customer", "emailpass", {
      email,
      password,
    }, token)
    .then(() => {
      alert("Password reset successfully!")
    })
    .catch((error) => {
      alert(`Couldn't reset password: ${error.message}`)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Password</label>
      <input 
        placeholder="Password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Reset Password
      </button>
    </form>
  )
}