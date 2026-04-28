import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"
import { User } from "lucide-react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction, isPending] = useActionState(login, null)

  return (
    <div className="surface-feature p-7 sm:p-8" data-testid="login-page">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-jade/10 text-jade flex items-center justify-center mx-auto mb-3.5">
          <User className="w-[22px] h-[22px]" strokeWidth={1.75} />
        </div>
        <h1 className="display-md text-text-base">Welkom terug</h1>
        <p className="text-[13.5px] text-text-muted mt-1.5 leading-relaxed">
          Log in om je prijzen en bestellingen te zien.
        </p>
      </div>

      <form action={formAction}>
        <div className="flex flex-col gap-y-2.5">
          <Input
            label="E-mailadres"
            name="email"
            type="email"
            title="Voer een geldig e-mailadres in."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Wachtwoord"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>

        {message && (
          <div className="mt-3 p-2.5 bg-[#fef2f2] border border-[#fecaca] rounded-md text-[12.5px] text-[#b91c1c] animate-fade-in">
            {message}
          </div>
        )}

        <Button
          variant="primary"
          size="md"
          fullWidth
          type="submit"
          disabled={isPending}
          isLoading={isPending}
          data-testid="sign-in-button"
          className="mt-4"
        >
          Inloggen
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-border-soft text-center space-y-2">
        <p className="text-[13px] text-text-muted">
          Nog geen account?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="text-jade font-medium hover:underline"
            data-testid="register-button"
          >
            Registreren
          </button>
        </p>
        <a
          href="/wachtwoord-vergeten"
          className="block text-[12.5px] text-text-muted hover:text-jade hover:underline"
          data-testid="forgot-password-link"
        >
          Wachtwoord vergeten?
        </a>
      </div>
    </div>
  )
}

export default Login
