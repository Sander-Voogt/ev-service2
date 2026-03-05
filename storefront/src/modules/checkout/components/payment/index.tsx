"use client"

import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useContext, useEffect, useState } from "react"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js"
import { StripeContext } from "../payment-wrapper"
import { RadioGroup } from "@headlessui/react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )
  const stripeReady = useContext(StripeContext)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stripeComplete, setStripeComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")

  const stripe = stripeReady ? useStripe() : null
  const elements = stripeReady ? useElements() : null

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const businesscustomers = process.env.NEXT_PUBLIC_BUSINESSCUSTOMERGROUP || ""
  const businessGroupId = businesscustomers

  // Check of de klant een zakelijke klant is
  const isBusinessCustomer = cart?.customer?.groups?.some(
    (group: any) => group.id === businessGroupId
  )

  console.log("Is business customer:", isBusinessCustomer)

  // Filter betaalmethoden op basis van klanttype
  const filteredPaymentMethods = availablePaymentMethods.filter((method) => {
    if (method.id === "pp_system_default") {
      // Alleen zakelijke klanten mogen pp_system_default gebruiken
      return isBusinessCustomer
    }

    // if (method.id === "pp_stripe_stripe") {
    //   // Zakelijke klanten mogen pp_stripe_stripe **niet** gebruiken
    //   return !isBusinessCustomer
    // }

    // Alle andere betaalmethoden zijn voor iedereen beschikbaar
    return true
  })

  const handlePaymentElementChange = async (
    event: StripePaymentElementChangeEvent
  ) => {
    if (event.value.type) {
      setSelectedPaymentMethod(event.value.type)
    }

    setStripeComplete(event.complete)

    if (event.complete) {
      setError(null)
    }
  }

  const handlePaymentMethodChange = async (value: string) => {
    setSelectedPaymentMethod(value)
    setError(null)

    // Reset stripe complete state when switching payment methods
    if (value === "pp_system_default") {
      setStripeComplete(false)
    }
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Als pp_system_default (achteraf betalen) is geselecteerd
      if (selectedPaymentMethod === "pp_system_default") {
        // Initieer de payment session voor achteraf betalen
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })

        // Ga direct naar review stap
        router.push(pathname + "?" + createQueryString("step", "review"), {
          scroll: false,
        })
        return
      }

      // Voor Stripe betalingen
      if (!stripe || !elements) {
        setError("Payment processing not ready. Please try again.")
        return
      }

      await elements.submit().catch((err) => {
        console.error(err)
        setError(err.message || "An error occurred with the payment")
        return
      })

      router.push(pathname + "?" + createQueryString("step", "review"), {
        scroll: false,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const initStripe = async () => {
    try {
      // Initieer alleen Stripe als dat de geselecteerde methode is
      if (selectedPaymentMethod !== "pp_system_default") {
        await initiatePaymentSession(cart, {
          provider_id: "pp_stripe_stripe",
        })
      }
    } catch (err) {
      console.error("Failed to initialize Stripe session:", err)
      setError("Failed to initialize payment. Please try again.")
    }
  }

  // Auto-selecteer betaalmethode als er maar één beschikbaar is
  useEffect(() => {
    if (filteredPaymentMethods.length === 1 && !selectedPaymentMethod) {
      const singleMethod = filteredPaymentMethods[0].id
      setSelectedPaymentMethod(singleMethod)
    }
  }, [filteredPaymentMethods, selectedPaymentMethod])

  useEffect(() => {
    // console.log('dddd', activeSession['provider_id'] !== "pp_stripe_stripe", isStripeFunc(activeSession?.provider_id),
    //   isOpen,
    //   selectedPaymentMethod )
    if (
      !isStripeFunc(activeSession?.provider_id) &&
      isOpen &&
      selectedPaymentMethod !== "pp_system_default"
    ) {
      initStripe()
    }
  }, [cart, isOpen, activeSession, selectedPaymentMethod])

  useEffect(() => {
    setError(null)
  }, [isOpen])

  // Bepaal of de continue knop disabled moet zijn
  const isSubmitDisabled = () => {
    if (paidByGiftcard) return false
    if (!selectedPaymentMethod) return true

    // Voor achteraf betalen is geen Stripe validatie nodig
    if (selectedPaymentMethod === "pp_system_default") return false

    // Voor Stripe betalingen wel
    return !stripeComplete || !stripe || !elements
  }

  const showStripePaymentElement =
    selectedPaymentMethod !== "pp_system_default" &&
    selectedPaymentMethod !== "" &&
    stripeReady

  console.log(availablePaymentMethods)

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h2
          className={clx(
            "text-xl font-bold text-gray-900 flex items-center gap-x-2",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          Betaalmethode
          {!isOpen && paymentReady && (
            <CheckCircleSolid className="text-green-600" />
          )}
        </h2>
        {!isOpen && paymentReady && (
          <button
            onClick={handleEdit}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-x-1"
            data-testid="edit-payment-button"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Bewerken
          </button>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && filteredPaymentMethods?.length > 0 && (
            <>
              {/* Toon radio group alleen als er meerdere betaalmethoden zijn */}
              {filteredPaymentMethods.length > 1 && filteredPaymentMethods.find(m => m.id === 'pp_stripe_stripe') ? (
                <div className="mb-5">
                  <RadioGroup
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    {filteredPaymentMethods
                      .sort((a, b) => (a.id > b.id ? 1 : -1))
                      .map((paymentMethod) => (
                        <PaymentContainer
                          paymentInfoMap={paymentInfoMap}
                          paymentProviderId={paymentMethod.id}
                          key={paymentMethod.id}
                          selectedPaymentOptionId={selectedPaymentMethod}
                        />
                      ))}
                  </RadioGroup>
                </div>
              ): (
                 <div className="mb-5">
                  <RadioGroup
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    {filteredPaymentMethods
                      .sort((a, b) => (a.id > b.id ? 1 : -1))
                      .map((paymentMethod) => (
                        <PaymentContainer
                          paymentInfoMap={paymentInfoMap}
                          paymentProviderId={paymentMethod.id}
                          key={paymentMethod.id}
                          selectedPaymentOptionId={selectedPaymentMethod}
                        />
                      ))}
                  </RadioGroup>
                </div>
              )}

              {/* Toon Stripe Payment Element alleen als een Stripe methode is geselecteerd */}
              {showStripePaymentElement && (
                <div className="mt-5 transition-all duration-150 ease-in-out">
                  <PaymentElement
                    onChange={handlePaymentElementChange}
                    options={{
                      layout: "accordion",
                    }}
                  />
                </div>
              )}
            </>
          )}

          {paidByGiftcard && (
            <div className="flex flex-col w-1/3">
              <span className="txt-medium-plus text-gray-900 mb-1">
                Betaalmethode
              </span>
              <span
                className="txt-medium text-gray-500"
                data-testid="payment-method-summary"
              >
                Cadeaubon
              </span>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading || isSubmitDisabled()}
            className="mt-6 w-full bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg py-3 font-medium uppercase tracking-wide transition-colors"
            data-testid="submit-payment-button"
          >
            {isLoading ? "Laden..." : "Verder"}
          </button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession && selectedPaymentMethod ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Betaalmethode
                  </span>
                  <span
                    className="text-sm text-gray-900 font-medium"
                    data-testid="payment-method-summary"
                  >
                    {paymentInfoMap[activeSession?.provider_id]?.title ||
                      activeSession?.provider_id}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Betaalgegevens
                  </span>
                  <div
                    className="flex gap-2 text-sm text-gray-600 items-center"
                    data-testid="payment-details-summary"
                  >
                    <div className="flex items-center h-7 w-fit p-1.5 bg-gray-200 rounded">
                      {paymentInfoMap[selectedPaymentMethod]?.icon || (
                        <CreditCard />
                      )}
                    </div>
                    <span>
                      {selectedPaymentMethod === "pp_system_default"
                        ? "Betaal op factuur"
                        : "U wordt doorgestuurd naar de betaalpagina"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Betaalmethode
                </span>
                <span
                  className="text-sm text-gray-900 font-medium"
                  data-testid="payment-method-summary"
                >
                  Cadeaubon
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Payment
