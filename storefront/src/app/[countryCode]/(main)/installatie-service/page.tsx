"use client"
import Script from "next/script"

export default function InstallatieService() {
  return (
    <>
      <div className="flex flex-row max-w-7xl mx-auto">
          <iframe
            style={{ border: "none", width: "100%", height: "800px" }}
            id="my-form-9dbnns"
            src="https://form.evservice.eu/forms/ev-service-offerte-3pstb8"
          ></iframe>
          <Script
            src="https://form.evservice.eu/widgets/iframe.min.js"
            strategy="afterInteractive"
            onLoad={() => {
              if (typeof window !== "undefined" && window.initEmbed) {
                window.initEmbed("my-form-9dbnns")
              }
            }}
          />
        </div>
    </>
  )
}
