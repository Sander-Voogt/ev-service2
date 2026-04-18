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
import Button from "@modules/common/components/button"
import { CART_MAX_QUANTITY, SITE_CONFIG } from "@lib/site-config"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
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
        setError(`Extra product niet meer in voorraad of limiet van product per winkelwagen bereikt. Neem contact op met ${SITE_CONFIG.email.info} als u meer van dit product wilt bestellen.`)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQuantity = item.variant?.manage_inventory ? CART_MAX_QUANTITY : CART_MAX_QUANTITY

  if (type === "preview") {
    return (
      <tr className="border-b border-gray-100 last:border-0">
        <td className="py-3 px-2">
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
        </td>
        <td className="py-3 px-2">
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
        </td>
        <td className="py-3 px-2 text-right">
          <div className="flex flex-col items-end flex-shrink-0">
            <span className="text-xs text-gray-500">{item.quantity}x</span>
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </td>
      </tr>
    )
  }

  return (
    <div className="flex gap-x-6 p-6 sm:p-8 hover:bg-gradient-to-r hover:from-green-50/50 hover:to-transparent transition-all duration-300 group" data-testid="product-row">
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-green-50 hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 border-gray-100 group-hover:border-green-200"
      >
        <Thumbnail
          thumbnail={item.thumbnail}
          images={item.variant?.product?.images}
          size="square"
        />
      </LocalizedClientLink>

      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-x-4">
          <div className="min-w-0 flex-1">
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="group/link"
            >
              <Text
                className="text-base sm:text-lg font-black text-gray-900 group-hover/link:text-green-700 transition-colors duration-300"
                data-testid="product-title"
              >
                {item.product_title}
              </Text>
            </LocalizedClientLink>
            <LineItemOptions
              variant={item.variant}
              data-testid="product-variant"
              className="text-sm text-gray-500 mt-1"
            />
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-4 py-2 rounded-xl shadow-lg">
              <LineItemPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>
            <div className="hidden sm:block mt-2 text-xs text-gray-500">
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-x-3">
            {updating ? (
              <div className="flex items-center justify-center w-32 h-12 bg-green-50 rounded-xl">
                <Spinner />
              </div>
            ) : (
              <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-lg border-2 border-green-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (item.quantity > 1) {
                      changeQuantity(item.quantity - 1)
                    }
                  }}
                  disabled={item.quantity <= 1}
                  aria-label="Verlaag aantal"
                  className="border-r border-green-200 px-4 py-3 hover:bg-green-50 transition-colors disabled:opacity-50"
                >
                  <svg
                    className="w-5 h-5 text-green-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12H4"
                    />
                  </svg>
                </Button>
                <span
                  className="w-14 h-12 flex items-center justify-center text-lg font-black text-green-700 bg-green-50"
                  data-testid="product-quantity"
                >
                  {item.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (item.quantity < maxQuantity) {
                      changeQuantity(item.quantity + 1)
                    }
                  }}
                  disabled={item.quantity >= maxQuantity}
                  aria-label="Verhoog aantal"
                  className="border-l border-green-200 px-4 py-3 hover:bg-green-50 transition-colors disabled:opacity-50"
                >
                  <svg
                    className="w-5 h-5 text-green-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </Button>
              </div>
            )}
          </div>
          <DeleteButton
            id={item.id}
            data-testid="product-delete-button"
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm border border-red-200 hover:border-red-300 hover:shadow-md group"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="hidden sm:inline">Verwijderen</span>
          </DeleteButton>
        </div>
        <ErrorMessage error={error} data-testid="product-error-message" />
      </div>
    </div>
  )
}

export default Item
