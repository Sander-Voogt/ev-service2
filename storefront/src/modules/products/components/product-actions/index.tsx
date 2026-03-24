"use client"

import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import Divider from "@modules/common/components/divider"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/product-actions/option-select"

import MobileActions from "./mobile-actions"
import ProductPrice from "../product-price"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons"
import { dispatchCartUpdated } from "@lib/events"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (variantOptions: any) => {
  return variantOptions?.reduce(
    (acc: Record<string, string | undefined>, varopt: any) => {
      if (
        varopt.option &&
        varopt.value !== null &&
        varopt.value !== undefined
      ) {
        acc[varopt.option.title] = varopt.value
      }
      return acc
    },
    {}
  )
}

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  // Preselect cheapest variant (or the only one)
  useEffect(() => {
    if (!product.variants || product.variants.length === 0) return

    // als er maar 1 variant is -> die selecteren
    if (product.variants.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
      return
    }

    // anders -> goedkoopste variant bepalen
    const cheapestVariant = product.variants.reduce((cheapest, current) => {
      const cheapestPrice = cheapest?.prices?.[0]?.amount ?? Infinity
      const currentPrice = current?.prices?.[0]?.amount ?? Infinity
      return currentPrice < cheapestPrice ? current : cheapest
    })

    if (cheapestVariant) {
      const variantOptions = optionsAsKeymap(cheapestVariant.options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [title]: value,
    }))
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

   try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })
    } catch (error: any) {
      const cleanedMessage = error.message.replace(
        /^Error setting up the request:\s*/,
        ""
      )
    }

    setIsAdding(false)
  }

  return (
    <>
      <aside className="border border-gray-200 p-6 bg-white h-fit">
        <h3 className="font-semibold text-lg mb-5 text-gray-900">Kies je opties</h3>

        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.title ?? ""]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={handleAddToCart}
          disabled={!inStock || !selectedVariant || !!disabled || isAdding}
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant
            ? "Selecteer variant"
            : !inStock
            ? "Niet op voorraad"
            : "In winkelwagen"}
        </Button>

        <ul className="text-xs text-gray-700 mt-5 space-y-2">
          <li className="flex items-center gap-2">
            <span>⭐</span>
            <span>Klanten beoordelen ons met 9.0</span>
          </li>
          <li className="flex items-center gap-2">
            <span>🚚</span>
            <span>Gratis verzending vanaf €100,-</span>
          </li>
          <li className="flex items-center gap-2">
            <span>🔄</span>
            <span>30 dagen retourrecht</span>
          </li>
          <li className="flex items-center gap-2">
            <span>🛡️</span>
            <span>Minimaal 2 jaar garantie</span>
          </li>
        </ul>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </aside>
    </>
  )
}
