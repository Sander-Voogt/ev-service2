"use client"

import { Button, Heading, Input, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { sdk } from "@lib/config"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()
  const [reference, setReference] = useState("")
  const isOpen = searchParams.get("step") === "review"
  const [loading, setLoading] = useState(false)

  const updateCartReference = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!cart) {
      return
    }

    e.preventDefault()
    setLoading(true)

    sdk.store.cart
      .update(cart.id, {
        // merge with existing metadata if needed
        metadata: {
          ...(cart.metadata || {}),
          reference,
        },
      })
      .finally(() => setLoading(false))
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-white">
      <p>Indien u voor uw eigen administratie een referentie wilt meegeven aan deze bestelling.</p>
      <div className="flex flex-row gap-4">
        <Input
          type="text"
          placeholder="Referentie nummer"
          value={reference}
          disabled={!cart}
          onChange={(e) => setReference(e.target.value)}
        />
        <Button
        disabled={!cart || loading}
        onClick={updateCartReference}
      >
        Referentie opslaan
      </Button>
      </div>
      <hr className="my-6" />
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Algemene Voorwaarden
        </Heading>
      </div>
      
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Door op de knop Bestelling plaatsen te klikken, bevestigt u
                akkoord gaat met onze algemene voorwaarden
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  )
}

export default Review
