import InteractiveLink from "@modules/common/components/interactive-link"
import Footer from "@modules/layout/templates/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default async function NotFound() {
  return (
    <>
    <Nav />
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">Pagina niet gevonden</h1>
      <p className="text-small-regular text-ui-fg-base">
        De pagina die u probeert te bezoeken bestaat niet.
      </p>
      <InteractiveLink href="/">Ga naar de homepagina</InteractiveLink>
    </div>
    <Footer />
    </>
  )
}
