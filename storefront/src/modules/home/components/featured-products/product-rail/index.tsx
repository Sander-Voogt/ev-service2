import { HttpTypes } from "@medusajs/types"
import { ArrowRight } from "lucide-react"

import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { products } = collection

  if (!products) return null

  return (
    <section className="content-container section-pad">
      <div className="flex items-end justify-between mb-7">
        <div>
          <span className="eyebrow">Uitgelicht</span>
          <h2 className="display-lg mt-2 text-text-base">{collection.title}</h2>
        </div>
        <LocalizedClientLink
          href="/store"
          className="btn-link hidden sm:inline-flex"
        >
          Bekijk alle producten
          <ArrowRight className="w-3.5 h-3.5" />
        </LocalizedClientLink>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.map((product) => (
          <li key={product.id}>
            {/* @ts-ignore */}
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </section>
  )
}
