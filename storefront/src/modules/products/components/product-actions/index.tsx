"use client"

import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react"
import Divider from "@modules/common/components/divider"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/product-actions/option-select"

import MobileActions from "./mobile-actions"
import ProductPrice from "../product-price"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (variantOptions: any) =>
  variantOptions?.reduce(
    (acc: Record<string, string | undefined>, varopt: any) => {
      if (varopt.option && varopt.value !== null && varopt.value !== undefined) {
        acc[varopt.option.title] = varopt.value
      }
      return acc
    },
    {}
  )

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  useEffect(() => {
    if (!product.variants || product.variants.length === 0) return

    if (product.variants.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
      return
    }

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
    if (!product.variants || product.variants.length === 0) return
    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({ ...prev, [title]: value }))
  }

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) return true
    if (selectedVariant?.allow_backorder) return true
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
      // Surfaced via toast/event in addToCart
    }
    setIsAdding(false)
  }

  const trustItems = [
    { icon: Truck, label: "Voor 22:00 besteld, morgen geleverd" },
    { icon: ShieldCheck, label: "2 jaar garantie" },
    { icon: RefreshCw, label: "30 dagen retourrecht" },
    { icon: Headphones, label: "Gratis advies via WhatsApp" },
  ]

  return (
    <>
      <aside ref={actionsRef} className="surface-card p-5 sm:p-6">
        <ProductPrice product={product} variant={selectedVariant} />

        {(product.variants?.length ?? 0) > 1 && (
          <div className="mt-5 flex flex-col gap-y-4">
            {(product.options || []).map((option) => (
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
            ))}
            <Divider className="my-2" />
          </div>
        )}

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          disabled={!inStock || !selectedVariant || !!disabled || isAdding}
          isLoading={isAdding}
          data-testid="add-product-button"
          className="mt-5"
        >
          {!selectedVariant
            ? "Selecteer variant"
            : !inStock
            ? "Niet op voorraad"
            : "In winkelmandje"}
        </Button>

        <ul className="mt-5 pt-5 border-t border-border-soft grid grid-cols-1 gap-2.5">
          {trustItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2.5 text-[12.5px] text-text-muted"
            >
              <item.icon className="w-4 h-4 text-jade flex-shrink-0" strokeWidth={1.75} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </aside>

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
    </>
  )
}
