import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Inloggen",
  description: "Login in uw EV Service account",
}

export default function Login() {
  return <LoginTemplate />
}
