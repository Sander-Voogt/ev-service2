"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
      data-testid="register-page"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Registreren bij RIC Holland
        </h1>
        <p className="text-gray-600 text-sm">
          Maak een account aan om toegang te krijgen tot groothandelsprijzen.
        </p>
      </div>

      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Bedrijfsnaam"
              name="company"
              required
              autoComplete="organization"
              data-testid="company-input"
            />
            <Input
              label="KVK nummer"
              name="kvk"
              required
              data-testid="kvk-input"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Voornaam"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <Input
              label="Achternaam"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
          </div>
          <Input
            label="E-mailadres"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Telefoonnummer"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Wachtwoord"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />

        <p className="text-center text-gray-500 text-xs mt-6">
          Door te registreren gaat u akkoord met onze{" "}
          <LocalizedClientLink
            href="/privacy-policy"
            className="text-gray-900 hover:underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          en{" "}
          <LocalizedClientLink
            href="/algemene-voorwaarden"
            className="text-gray-900 hover:underline"
          >
            Algemene voorwaarden
          </LocalizedClientLink>
          .
        </p>

        <SubmitButton className="w-full mt-6 bg-gray-900 hover:bg-gray-800" data-testid="register-button">
          Registreren
        </SubmitButton>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <span className="text-gray-600 text-sm">
          Heeft u al een account?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="text-gray-900 font-medium hover:underline"
          >
            Inloggen
          </button>
        </span>
      </div>
    </div>
  )
}

export default Register
