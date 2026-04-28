"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Button from "@modules/common/components/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import { UserPlus } from "lucide-react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction, isPending] = useActionState(signup, null)

  return (
    <div className="surface-feature p-7 sm:p-8" data-testid="register-page">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-jade/10 text-jade flex items-center justify-center mx-auto mb-3.5">
          <UserPlus className="w-[22px] h-[22px]" strokeWidth={1.75} />
        </div>
        <h1 className="display-md text-text-base">Account aanmaken</h1>
        <p className="text-[13.5px] text-text-muted mt-1.5 leading-relaxed">
          Maak een account voor toegang tot zakelijke prijzen.
        </p>
      </div>

      <form action={formAction} className="flex flex-col">
        <div className="flex flex-col gap-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Input
              label="Bedrijfsnaam"
              name="company"
              required
              autoComplete="organization"
              data-testid="company-input"
            />
            <Input label="KVK nummer" name="kvk" required data-testid="kvk-input" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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

        {message && (
          <div className="mt-3 p-2.5 bg-[#fef2f2] border border-[#fecaca] rounded-md text-[12.5px] text-[#b91c1c] animate-fade-in">
            {message}
          </div>
        )}

        <p className="text-center text-[11.5px] text-text-muted mt-3 leading-relaxed">
          Door te registreren gaat u akkoord met onze{" "}
          <LocalizedClientLink
            href="/privacy-policy"
            className="text-text-base hover:underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          en{" "}
          <LocalizedClientLink
            href="/pagina/algemene-voorwaarden"
            className="text-text-base hover:underline"
          >
            Algemene voorwaarden
          </LocalizedClientLink>
          .
        </p>

        <Button
          variant="primary"
          size="md"
          fullWidth
          type="submit"
          disabled={isPending}
          isLoading={isPending}
          data-testid="register-button"
          className="mt-4"
        >
          Registreren
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-border-soft text-center">
        <p className="text-[13px] text-text-muted">
          Heeft u al een account?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="text-jade font-medium hover:underline"
          >
            Inloggen
          </button>
        </p>
      </div>
    </div>
  )
}

export default Register
