import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-5" data-testid="order-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-neutral-900" data-testid="order-display-id">
              Bestelling #{order.display_id}
            </p>
            <p className="text-sm text-gray-500" data-testid="order-created-at">
              {new Date(order.created_at).toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900" data-testid="order-amount">
            {convertToLocale({
              amount: order.total,
              currency_code: order.currency_code,
            })}
          </p>
          <p className="text-sm text-gray-500">
            {numberOfLines} {numberOfLines === 1 ? "artikel" : "artikelen"}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
        {order.items?.slice(0, 3).map((i) => {
          return (
            <div
              key={i.id}
              className="flex flex-col gap-2"
              data-testid="order-item"
            >
              <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
                <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
              </div>
              <div className="text-xs text-gray-700">
                <span className="font-medium line-clamp-1" data-testid="item-title">
                  {i.title}
                </span>
                <span className="text-gray-500"> x<span data-testid="item-quantity">{i.quantity}</span></span>
              </div>
            </div>
          )
        })}
        {numberOfProducts > 3 && (
          <div className="rounded-lg border border-gray-200 bg-white flex flex-col items-center justify-center aspect-square">
            <span className="text-lg font-semibold text-gray-600">
              +{numberOfProducts - 3}
            </span>
            <span className="text-xs text-gray-500">meer</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <LocalizedClientLink
          href={`/account/orders/details/${order.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          data-testid="order-details-link"
        >
          Details bekijken
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
