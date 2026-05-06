"use server"
import React, { Suspense } from "react"
import ProductActions from "@modules/products/components/product-actions"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import ProductViewEvent from "./product-events/ProductViewEvent"
import { Faq } from "./Faq"
import { ProCon, hasNotValue } from "./Procon"
import ProductDescription from "@modules/common/components/rendertiptap"
import { Specs } from "./Specs"
import ImageGallery2 from "../components/image-gallery/gallery2"

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

  const custom = product.custom
  const showProCon =
    !hasNotValue(custom, "pros") || !hasNotValue(custom, "cons")
  const showSpecs =
    !hasNotValue(custom, "soort_kabel") ||
    !hasNotValue(custom, "certificering") ||
    !hasNotValue(custom, "waterbestendigheid")
  const showHighlights = showProCon || showSpecs
  const faq = custom?.faq
  const showFaq = Array.isArray(faq) && faq.length > 0
  const showDescription = Boolean(custom?.maindescription_html)
  const showDetailBlock = showDescription || showFaq

  return (
    <>
      <ProductViewEvent product={product} />
      <div className="w-full small:w-auto small:flex-1 mb-1 small:mb-0 py-6 content-container">
        <ProductInfo product={product} />
      </div>
      <div
        className="content-container flex flex-col lg:flex-row lg:items-start py-6 relative"
        data-testid="product-container"
      >
<div className="flex flex-col lg:flex-row gap-x-8 gap-y-12 w-full">          {/* Image gallery */}
          <div className="w-full lg:w-2/5 relative">
            <ImageGallery2 images={product?.images || []} />
          </div>

          {/* Product actions */}
  <div className="w-full lg:w-2/6 flex flex-col lg:sticky lg:top-48 lg:py-0 py-8 gap-y-12">            <Suspense
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

      {showHighlights && (
        <section className="content-container py-10 sm:py-14">
          <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm dark:border-gray-700/80 dark:bg-gray-950/40">
            <div
              className={`grid grid-cols-1 divide-y divide-gray-200/90 dark:divide-gray-700/80 ${
                showProCon && showSpecs
                  ? "lg:grid-cols-2 lg:divide-x lg:divide-y-0"
                  : ""
              }`}
            >
              {showProCon && (
                <div className="p-6 sm:p-8 lg:p-10">
                  <ProCon data={custom} />
                </div>
              )}
              {showSpecs && (
                <div className="p-6 sm:p-8 lg:p-10">
                  <Specs data={custom} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      {showDetailBlock && (
        <section className="content-container py-10 sm:py-14">
          <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm dark:border-gray-700/80 dark:bg-gray-950/40">
            <div className="grid grid-cols-1 divide-y divide-gray-200/90 dark:divide-gray-700/80">
              {showDescription && (
                <div className="p-6 sm:p-8 lg:p-10">
                  <ProductDescription html={custom} />
                </div>
              )}
              {showFaq && (
                <div className="p-6 sm:p-8 lg:p-10">
                  <Faq data={faq} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
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
