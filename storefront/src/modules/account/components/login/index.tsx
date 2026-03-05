import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
      data-testid="login-page"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Welkom terug
        </h1>
        <p className="text-gray-600 text-sm">
          Log in om de prijzen te zien en een bestelling te plaatsen.
        </p>
      </div>

      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
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
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton
          data-testid="sign-in-button"
          className="w-full mt-6 bg-gray-900 hover:bg-gray-800"
        >
          Inloggen
        </SubmitButton>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <span className="text-gray-600 text-sm">
          Nog geen account?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="text-gray-900 font-medium hover:underline"
            data-testid="register-button"
          >
            Registreren
          </button>
        </span>
        <br/>
        <a
          href="/wachtwoord-vergeten"
          className="text-gray-900 font-medium hover:underline"
          data-testid="forgot-password-link"
        >
          Wachtwoord vergeten
        </a>
      </div>
    </div>
  )
}

export default Login
