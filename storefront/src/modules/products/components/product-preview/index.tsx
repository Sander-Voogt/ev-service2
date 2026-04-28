import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({ product: pricedProduct })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div
        data-testid="product-wrapper"
        className="relative bg-surface rounded-[14px] overflow-hidden border border-border-base transition-all duration-200 hover:border-jade hover:shadow-[0_12px_32px_-12px_rgba(50,173,106,0.30)] hover:-translate-y-0.5"
      >
        <div className="aspect-square overflow-hidden bg-page-soft relative">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="square"
            isFeatured={isFeatured}
          />
        </div>

        <div className="p-3.5 sm:p-4">
          <h3
            className="text-[13.5px] font-medium text-text-base leading-snug line-clamp-2 min-h-[2.6em] group-hover:text-jade transition-colors"
            data-testid="product-title"
          >
            {product.title}
          </h3>

          <div className="mt-2.5 flex items-end justify-between">
            <div className="text-[15px] font-semibold text-text-base">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
            <span className="text-[11px] font-medium text-jade group-hover:underline">
              Bekijk
            </span>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
