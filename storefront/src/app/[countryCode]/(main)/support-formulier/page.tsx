"use client"
import Script from "next/script"

export default function SupportForm() {
  return (
    <div className="bg-white">
      <div className="content-container py-6 sm:py-10">
        <header className="mb-6 max-w-[640px]">
          <span className="eyebrow">Support</span>
          <h1 className="display-lg mt-1 text-text-base">Supportformulier</h1>
          <p className="lede mt-2.5">
            Vul het formulier in. Onze technische specialisten nemen zo snel
            mogelijk contact met je op.
          </p>
        </header>

        <div className="surface-card overflow-hidden">
          <iframe
            id="markt-parasolnl-offerte-aanvraag-hfhk31"
            src="https://form.evservice.eu/forms/ev-service-offerte-3pstb8"
            style={{ border: "none", width: "100%", minHeight: "1400px" }}
          />
        </div>

        <Script
          src="https://form.evservice.eu/widgets/iframe.min.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof window !== "undefined" && (window as any).initEmbed) {
              ;(window as any).initEmbed("markt-parasolnl-offerte-aanvraag-hfhk31")
            }
          }}
        />
      </div>
    </div>
  )
}
