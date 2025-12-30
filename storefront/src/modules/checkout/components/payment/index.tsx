"use client"

import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import Divider from "@modules/common/components/divider"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useContext, useEffect, useState } from "react"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js"
import { StripeContext } from "../payment-wrapper"
import { RadioGroup } from "@headlessui/react"
import PaymentContainer from "@modules/checkout/components/payment-container"

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

  // Filter betaalmethoden op basis van klanttype
  const filteredPaymentMethods = availablePaymentMethods.filter((item) => {
    // pp_system_default (achteraf betalen) alleen voor zakelijke klanten
    if (item.id === "pp_system_default") {
      return isBusinessCustomer
    }
    // Alle andere betaalmethoden (inclusief Stripe) voor iedereen
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
    if (
      !activeSession &&
      isOpen &&
      selectedPaymentMethod !== "pp_system_default" &&
      selectedPaymentMethod !== ""
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
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          Betaalmethode
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              data-testid="edit-payment-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && filteredPaymentMethods?.length > 0 && (
            <>
              {/* Toon radio group alleen als er meerdere betaalmethoden zijn */}
              {filteredPaymentMethods.length > 1 && (
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
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment method
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            size="large"
            className="mt-6"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={isSubmitDisabled()}
            data-testid="submit-payment-button"
          >
            Verder
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession && selectedPaymentMethod ? (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Payment method
                </Text>
                <Text
                  className="txt-medium text-ui-fg-subtle"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[activeSession?.provider_id]?.title ||
                    activeSession?.provider_id}
                </Text>
              </div>
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Payment details
                </Text>
                <div
                  className="flex gap-2 txt-medium text-ui-fg-subtle items-center"
                  data-testid="payment-details-summary"
                >
                  <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <Text>
                    {selectedPaymentMethod === "pp_system_default"
                      ? "Pay on invoice"
                      : "Another step may appear"}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment method
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          ) : null}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment