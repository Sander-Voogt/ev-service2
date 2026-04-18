import { redirect } from "next/navigation"

export default function LogoutPage() {
  // Client-side logout will be handled by a logout action
  // This page exists for the link to work
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Uitloggen...</p>
    </div>
  )
}