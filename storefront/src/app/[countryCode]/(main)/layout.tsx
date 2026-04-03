import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:bg-white focus:px-4 focus:py-2 focus:text-lg focus:font-semibold focus:underline"
      >
        Ga naar hoofdinhoud
      </a>
      <Nav />
      <main id="main-content">{props.children}</main>
      <Footer />
    </>
  )
}
