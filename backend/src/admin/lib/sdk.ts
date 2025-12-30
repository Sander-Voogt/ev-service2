import Medusa from "@medusajs/js-sdk"
import { debug } from "util"

export const sdk = new Medusa({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})
  // baseUrl: process.env.VITE_BACKEND_URL || "/",  // Werkt in Vite (VITE_ prefix) en Node
  // debug: process.env.NODE_ENV === "development",  // Standaard Node/Vite dev check (DEV -> NODE_ENV)

