"use client" // include with Next.js 13+

import { sdk } from "@lib/config"
import { useState } from "react"

export default function RequestResetPassword() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    if (!email) {
      alert("Email is required")
      return
    }
    setLoading(true)

    fetch('/api/wachtwoordreset', {
        method: "POST",
        body: JSON.stringify({email: email})
    })
    .then((res) => {
      
    })
    .catch((error) => {
      alert(error.message)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input 
        placeholder="Email" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Request Password Reset
      </button>
    </form>
  )
}