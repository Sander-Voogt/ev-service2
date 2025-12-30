
 // baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  // debug: import.meta.env.DEV,
  // baseUrl: process.env.VITE_BACKEND_URL || "/",  // Werkt in Vite (VITE_ prefix) en Node
  // debug: process.env.NODE_ENV === "development",  // Standaard Node/Vite dev check (DEV -> NODE_ENV)

import Medusa from "@medusajs/js-sdk"

export const sdk = new Medusa({
  baseUrl: process.env.VITE_BACKEND_URL || "/",  // Werkt in Vite (VITE_ prefix) en Node
  debug: process.env.NODE_ENV === "development",  // Standaard Node/Vite dev check (DEV -> NODE_ENV)
  auth: {
    type: "session",
  },
})