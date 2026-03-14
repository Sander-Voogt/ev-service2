// app/checkout/return/page.tsx  (of pages/checkout/return.tsx)
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { sdk } from "@lib/config"
import { placeOrder } from "@lib/data/cart"

export default function PaymentReturnPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const cartId = searchParams.get("cart_id")
  const redirect_status = searchParams.get("redirect-status")
  const paymentIntent = searchParams.get("payment_intent") // optioneel, als je dit meestuurt

  const [status, setStatus] = useState<
    "checking" | "success" | "failed" | "timeout"
  >("checking")
  const [message, setMessage] = useState(
    "We controleren je betaling... even geduld aub."
  )

  useEffect(() => {
    if (redirect_status === "failed") {
      setStatus("failed")
      setMessage(
        "Er ging iets mis met de betaling. Je wordt terug naar de winkelwagen gestuurd."
      )
      setTimeout(
        () => router.push("/checkout?error=payment_issue&step=payment"),
        4000
      )
    }
    if (!cartId) {
      setStatus("failed")
      setMessage("Fout in afhandeling betaling. Neem contact op.")
      setTimeout(() => router.push("/nl/"), 8000)
      return
    }

    let attempts = 0
    const maxAttempts = 15 // ~30 seconden
    const intervalMs = 2000

    const poll = async () => {
      try {
        const res = await fetch(`/api/cart-status/${cartId}`)
        const { cart } = await res.json()

        // Check of payment session authorized/captured is
        const paymentSession = ["authorized", "captured", "completed"].includes(
          cart.payment_collection.status
        )
        const paymentSession2 = cart.payment_collection.status
        console.log("paymentsession", paymentSession, paymentSession2)

        if (paymentSession) {
          setStatus("success")
          setMessage("Betaling succesvol! Je wordt doorgestuurd...")

          // Optioneel: complete cart als dat nog niet gebeurd is (soms nodig bij manual capture)
          // await medusaClient.carts.complete(cartId)
          const order = await placeOrder(cartId)

          setTimeout(() => {
            router.push(`/order/confirmed/${order.id}`)
          }, 1500)
          return
        }

        // Gefaald?

        if (
          ["error", "canceled", "requires_payment_method"].includes(
            cart.payment_collection.status
          )
        ) {
          setStatus("failed")
          setMessage(
            "Er ging iets mis met de betaling. Je wordt terug naar de winkelwagen gestuurd."
          )
          setTimeout(
            () => router.push("/checkout?error=payment_issue&step=payment"),
            4000
          )
        }

        // Nog niet klaar → volgende poging
        if (attempts++ < maxAttempts) {
          setTimeout(poll, intervalMs)
        } else {
          setStatus("timeout")
          setMessage(
            "Het duurt langer dan verwacht. Controleer je order status later in je account."
          )
          // setTimeout(() => router.push("/account/orders"), 5000)
        }
      } catch (err) {
        console.error(err)
        setStatus("failed")
        setMessage(
          "Er ging iets mis met de betaling. Je wordt terug naar de winkelwagen gestuurd."
        )
        // setTimeout(() => router.push("/checkout?error=payment_issue&step=payment"), 4000)
      }
    }

    poll()
  }, [cartId, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        {status === "checking" && (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-6"></div>
        )}
        <h1 className="text-2xl font-bold mb-4">
          {status === "success"
            ? "Gelukt!"
            : status === "failed" || status === "timeout"
            ? "Oeps..."
            : "Even geduld..."}
        </h1>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}
