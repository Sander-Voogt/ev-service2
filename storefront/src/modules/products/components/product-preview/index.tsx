import { Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Button from "@modules/common/components/button"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
// import { sendGTMEvent } from "@next/third-parties/google"

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

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div
        data-testid="product-wrapper"
        className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
      >
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="square"
            isFeatured={isFeatured}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        <div className="p-5">
          <div className="flex flex-col gap-3">
            <Text
              className="text-gray-900 text-lg font-semibold group-hover:text-emerald-700 transition-colors duration-200"
              data-testid="product-title"
            >
              {product.title}
            </Text>
            <div className="flex items-center gap-x-2 text-lg font-semibold text-emerald-700">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="mt-4"
            data-testid="add-product-button"
          >
            Bekijken
          </Button>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
