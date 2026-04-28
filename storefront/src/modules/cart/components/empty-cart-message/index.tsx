import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ShoppingBag, ArrowRight } from "lucide-react"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-16 px-4 flex flex-col justify-center items-center w-full max-w-[520px]"
      data-testid="empty-cart-message"
    >
      <div className="surface-tinted p-9 sm:p-10 text-center w-full">
        <div className="w-14 h-14 rounded-full bg-jade/10 text-jade flex items-center justify-center mx-auto mb-5">
          <ShoppingBag className="w-6 h-6" strokeWidth={1.75} />
        </div>
        <h1 className="display-md text-text-base">Je winkelwagen is leeg</h1>
        <p className="text-[14px] text-text-muted mt-2.5 leading-relaxed max-w-[360px] mx-auto">
          Bekijk ons assortiment laadkabels en laadpalen voor jouw elektrische
          auto.
        </p>
        <LocalizedClientLink
          href="/store"
          className="btn-primary mt-6 inline-flex"
        >
          Bekijk producten
          <ArrowRight className="w-4 h-4" />
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
