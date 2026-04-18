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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-300/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 text-center p-8 max-w-lg mx-auto">
        {/* Premium loading animation */}
        {status === "checking" && (
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto relative">
              {/* Outer spinning ring */}
              <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-green-600 rounded-full animate-spin"></div>

              {/* Inner pulsing circle */}
              <div className="absolute inset-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Premium success animation */}
        {status === "success" && (
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Confetti effect */}
              <div className="absolute inset-0 animate-ping opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-400 rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* Premium error animation */}
        {(status === "failed" || status === "timeout") && (
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Premium card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] shadow-3xl p-10 border border-green-100">
          <h1 className="text-4xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {status === "success"
              ? "Betaling Gelukt!"
              : status === "failed" || status === "timeout"
              ? "Oeps... Er ging iets mis"
              : "Even geduld..."}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {message}
          </p>

          {/* Premium trust indicators */}
          {status === "success" && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-700 text-center">Bevestiging</p>
              </div>
              <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-700 text-center">Beveiligd</p>
              </div>
              <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-700 text-center">Email Verzonden</p>
              </div>
            </div>
          )}

          {/* Premium progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-1000 ${
              status === "success" ? "bg-gradient-to-r from-green-500 to-emerald-600 w-full" :
              status === "failed" || status === "timeout" ? "bg-gradient-to-r from-red-500 to-rose-600 w-full" :
              "bg-gradient-to-r from-green-500 to-emerald-600 w-2/3 animate-pulse"
            }`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
