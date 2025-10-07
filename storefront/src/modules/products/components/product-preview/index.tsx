import { Button, Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { sendGTMEvent } from "@next/third-parties/dist/google/gtm"

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
      className="group"
      onClick={() =>
        sendGTMEvent({
          event: "view_item",
          ecommerce: {
            currency: "EUR",
            value: cheapestPrice,
            items: [
              {
                item_id: product?.variants[0].sku,
                item_name: product.title,
                price: cheapestPrice,
                quantity: 1,
                item_variant: product?.variants[0].title,
              },
            ],
          },
        })
      }
    >
      <div
        data-testid="product-wrapper"
        className="border border-solid border-gray bg-green-50 p-4"
      >
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="square"
          isFeatured={isFeatured}
        />
        <div className="flex flex-col txt-compact-medium mt-4 justify-between">
          <Text
            className="text-ui-fg-subtle text-lg font-semibold"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="flex text-lg items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
        <Button
          variant="primary"
          className="w-full h-10 mt-4"
          data-testid="add-product-button"
        >
          Bekijken
        </Button>
      </div>
    </LocalizedClientLink>
  )
}
