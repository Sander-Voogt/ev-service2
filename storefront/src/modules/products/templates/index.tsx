import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import { sendGTMEvent } from "@next/third-parties/google"
import ProductViewEvent from "./product-events/ProductViewEvent"
import { Faq } from "./Faq"
import { ProCon } from "./Procon"
import ProductDescription from "@modules/common/components/rendertiptap"
import { Specs } from "./Specs"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  console.log('ddd', product.custom)

//     const html = renderContent(product?.custom?.maindescription)

//   console.log("DB content:", product?.custom?.maindescription)
// console.log("Rendered HTML:", renderContent(product?.custom?.maindescription))

  return (
    <>
      <ProductViewEvent product={product} />
      <div className="w-full small:w-auto small:flex-1 mb-8 small:mb-0 py-6 content-container">
          <ProductInfo product={product} />
      </div>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        
        <div className="flex w-full gap-x-8">
          <div className="block w-3/5 relative">
            <ImageGallery images={product?.images || []} />
          </div>
          <div className="flex flex-col w-2/5 small:sticky small:top-48 small:py-0  w-full py-8 gap-y-12 flex-1">
            {/* <ProductTabs product={product} /> */}
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="container w-1/2">
      <ProCon data={product.custom} />
      </div>
      <div className="content-container">
      <ProductDescription html={product.custom.maindescription_html} />
      <Specs data={product.custom} />
      <Faq data={product.custom.faq}/>
     </div>
      <div
        className="w-full small:w-auto small:flex-1 mb-8 small:mb-0 py-6 text-left"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <div className="content-container flex flex-col small:flex-row small:items-start py-6 relative">
            <RelatedProducts product={product} countryCode={countryCode} />
          </div>
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
