import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="nl" data-mode="light">
      <GoogleTagManager gtmId="GTM-KPNGTRPD" />
      <link rel="alternate" href={`${process.env.NEXT_PUBLIC_BASE_URL}/nl/`} hrefLang="nl-nl" />
      <link rel="alternate" href={`${process.env.NEXT_PUBLIC_BASE_URL}/be/`} hrefLang="nl-be" />
      <link rel="alternate" href={`${process.env.NEXT_PUBLIC_BASE_URL}/nl/`} hrefLang="x-default" />
      <meta name="robots" content="noindex"></meta>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
