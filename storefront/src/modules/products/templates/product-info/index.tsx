import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronLeft } from "lucide-react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="space-y-3">
      {product.collection && (
        <LocalizedClientLink
          href={`/collections/${product.collection.handle}`}
          className="inline-flex items-center gap-1 text-[12px] font-medium text-jade hover:text-[#247f4d]"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          {product.collection.title}
        </LocalizedClientLink>
      )}

      <h1
        className="display-md text-text-base"
        data-testid="product-title"
      >
        {product.title}
      </h1>

      {product.description && (
        <p
          className="text-[14px] text-text-muted leading-relaxed whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </p>
      )}
    </div>
  )
}

export default ProductInfo
