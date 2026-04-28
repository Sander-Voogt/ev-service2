import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Package, ChevronRight } from "lucide-react"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(
    () => order.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0,
    [order]
  )
  const numberOfProducts = useMemo(() => order.items?.length ?? 0, [order])

  return (
    <div className="surface-card p-4 sm:p-5" data-testid="order-card">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-jade/10 text-jade flex items-center justify-center">
            <Package className="w-4 h-4" strokeWidth={1.75} />
          </span>
          <div>
            <p
              className="text-[13.5px] font-semibold text-text-base"
              data-testid="order-display-id"
            >
              Bestelling #{order.display_id}
            </p>
            <p className="text-[12px] text-text-muted" data-testid="order-created-at">
              {new Date(order.created_at).toLocaleDateString("nl-NL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p
            className="text-[13.5px] font-semibold text-text-base"
            data-testid="order-amount"
          >
            {convertToLocale({
              amount: order.total,
              currency_code: order.currency_code,
            })}
          </p>
          <p className="text-[12px] text-text-muted">
            {numberOfLines} {numberOfLines === 1 ? "artikel" : "artikelen"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3.5">
        {order.items?.slice(0, 3).map((i) => (
          <div key={i.id} className="flex flex-col gap-1.5" data-testid="order-item">
            <div className="rounded-[10px] overflow-hidden border border-border-soft bg-page-soft">
              <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
            </div>
            <div className="text-[11.5px] text-text-muted">
              <span className="font-medium line-clamp-1" data-testid="item-title">
                {i.title}
              </span>
              <span className="text-[#8a9aa3]">
                {" "}
                ×<span data-testid="item-quantity">{i.quantity}</span>
              </span>
            </div>
          </div>
        ))}
        {numberOfProducts > 3 && (
          <div className="rounded-[10px] border border-border-soft bg-page-soft flex flex-col items-center justify-center aspect-square">
            <span className="text-[14px] font-semibold text-text-muted">
              +{numberOfProducts - 3}
            </span>
            <span className="text-[11px] text-[#8a9aa3]">meer</span>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-3 border-t border-border-soft">
        <LocalizedClientLink
          href={`/account/orders/details/${order.id}`}
          className="btn-link text-[12.5px]"
          data-testid="order-details-link"
        >
          Details bekijken
          <ChevronRight className="w-3.5 h-3.5" />
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
