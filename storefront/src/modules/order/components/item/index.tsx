"use client"

import { Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  console.log("rendering item", item)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        console.log(err)
        setError('Extra product niet meer in voorraad of limiet van product per winkelwagen bereikt. Neem contact op met info@richolland.nl als u meer van dit product wilt bestellen.')
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  if (type === "preview") {
    return (
      <div className="flex items-center gap-x-3 py-3">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-50"
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
        <div className="flex-1 min-w-0">
          <Text
            className="text-sm font-medium text-gray-900 truncate"
            data-testid="product-title"
          >
            {item.product_title}
          </Text>
          <LineItemOptions
            variant={item.variant}
            data-testid="product-variant"
          />
        </div>
        <div className="flex flex-col items-end flex-shrink-0">
          <span className="text-xs text-gray-500">{item.quantity}x</span>
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-x-4 p-4 sm:p-6" data-testid="product-row">
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-50 hover:opacity-90 transition-opacity"
      >
        <Thumbnail
          thumbnail={item.thumbnail}
          images={item.variant?.product?.images}
          size="square"
        />
      </LocalizedClientLink>

      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-x-4">
          <div className="min-w-0">
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="hover:underline"
            >
              <Text
                className="text-sm sm:text-base font-semibold text-gray-900 truncate"
                data-testid="product-title"
              >
                {item.product_title}
              </Text>
            </LocalizedClientLink>
            <LineItemOptions
              variant={item.variant}
              data-testid="product-variant"
            />
          </div>
          <div className="flex-shrink-0 text-right">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
            <div className="hidden sm:block">
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-x-2">
            {updating ? (
              <div className="flex items-center justify-center w-24 h-9">
                <Spinner />
              </div>
            ) : (
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    if (item.quantity > 1) {
                      changeQuantity(item.quantity - 1)
                    }
                  }}
                  disabled={item.quantity <= 1}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Verlaag aantal"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span
                  className="w-10 h-9 flex items-center justify-center text-sm font-semibold text-gray-900 border-x border-gray-200 bg-gray-50"
                  data-testid="product-quantity"
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => {
                    if (item.quantity < maxQuantity) {
                      changeQuantity(item.quantity + 1)
                    }
                  }}
                  disabled={item.quantity >= maxQuantity}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Verhoog aantal"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <DeleteButton
            id={item.id}
            data-testid="product-delete-button"
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <span className="text-xs hidden sm:inline">Verwijderen</span>
          </DeleteButton>
        </div>
        <ErrorMessage error={error} data-testid="product-error-message" />
      </div>
    </div>
  )
}

export default Item
