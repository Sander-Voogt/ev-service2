import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <Heading level="h2" className="text-xl font-black text-gray-900">
          Heeft u al een account?
        </Heading>
        <Text className="text-sm text-gray-600 mt-1">
          <span className="font-semibold text-green-700">Login</span> om sneller af te rekenen en uw bestellingen te bekijken
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0 h-11"
            data-testid="sign-in-button"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Inloggen
            </span>
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
