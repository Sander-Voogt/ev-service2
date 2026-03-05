"use client"

import { useSearchParams } from "next/navigation"

const steps = [
  { key: "address", label: "Gegevens", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
  { key: "delivery", label: "Verzending", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
  { key: "payment", label: "Betaling", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { key: "review", label: "Overzicht", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
]

const stepOrder = ["address", "delivery", "payment", "review"]

const CheckoutProgress = () => {
  const searchParams = useSearchParams()
  const currentStep = searchParams.get("step") || "address"
  const currentIndex = stepOrder.indexOf(currentStep)

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 py-5 px-4 sm:px-8">
      <div className="flex items-center justify-between max-w-xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex
          const isActive = index === currentIndex
          const isUpcoming = index > currentIndex

          return (
            <div key={step.key} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`
                    w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted ? "bg-green-600 text-white shadow-sm" : ""}
                    ${isActive ? "bg-gray-900 text-white shadow-md ring-4 ring-gray-900/10" : ""}
                    ${isUpcoming ? "bg-gray-100 text-gray-400" : ""}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                  )}
                </div>
                <span
                  className={`
                    text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors duration-200
                    ${isCompleted ? "text-green-700" : ""}
                    ${isActive ? "text-gray-900" : ""}
                    ${isUpcoming ? "text-gray-400" : ""}
                  `}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4 mb-5">
                  <div className="h-0.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        index < currentIndex ? "bg-green-500 w-full" : "bg-transparent w-0"
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CheckoutProgress
