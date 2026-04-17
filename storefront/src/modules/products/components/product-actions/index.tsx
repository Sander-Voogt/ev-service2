"use client"

import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import { Star, Truck, RefreshCw, Shield } from "lucide-react"
import Divider from "@modules/common/components/divider"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/product-actions/option-select"

import MobileActions from "./mobile-actions"
import ProductPrice from "../product-price"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
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

  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [title]: value,
    }))
  }

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    if (selectedVariant?.allow_backorder) {
      return true
    }

    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

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
      <aside className="bg-white rounded-[2rem] shadow-2xl border-2 border-gray-100 p-10 overflow-hidden relative h-fit">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900">Choose Options</h3>
              <p className="text-gray-600 text-sm">Customize your selection</p>
            </div>
          </div>

          <div>
            {(product.variants?.length ?? 0) > 1 && (
              <div className="flex flex-col gap-y-6">
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
                <Divider className="my-6" />
              </div>
            )}
          </div>

          <ProductPrice product={product} variant={selectedVariant} />

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleAddToCart}
            disabled={!inStock || !selectedVariant || !!disabled || isAdding}
            isLoading={isAdding}
            data-testid="add-product-button"
            className="mt-8 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-black py-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            {!selectedVariant
              ? "Select variant"
              : !inStock
              ? "Out of stock"
              : "Add to cart"}
          </Button>

          {/* Premium trust badges */}
          <div className="mt-10 p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border border-green-200">
            <h4 className="text-lg font-black text-gray-900 mb-6 text-center">Why choose us?</h4>
            <ul className="space-y-4">
              {[
                { icon: <Star className="w-5 h-5" />, title: "Top Rated", desc: "4.9/5 customer rating" },
                { icon: <Truck className="w-5 h-5" />, title: "Free Shipping", desc: "On orders over €100" },
                { icon: <RefreshCw className="w-5 h-5" />, title: "Easy Returns", desc: "30-day return policy" },
                { icon: <Shield className="w-5 h-5" />, title: "Warranty", desc: "Minimum 2 years" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

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