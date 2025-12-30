"use client"

import dynamic from "next/dynamic"

// Hier mag het wél!
const ClientNav = dynamic(() => import("./ClientNav"), {
  ssr: false,
  loading: () => (
    <div className="max-w-screen-xl mx-auto py-5 px-4">
      <span>Loading navigation...</span>
    </div>
  ),
})

export default function ClientNavWrapper({ regions }) {
  return <ClientNav regions={regions} />
}
