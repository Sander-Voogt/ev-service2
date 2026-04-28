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
import { ProCon } from "./Procon"
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

  return (
    <>
      <ProductViewEvent product={product} />

      {/* Main product section */}
      <section className="bg-white">
        <div
          className="content-container py-8 sm:py-10"
          data-testid="product-container"
        >
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Gallery */}
            <div className="lg:col-span-7">
              <div className="surface-card p-3 sm:p-4">
                <ImageGallery2 images={product?.images || []} />
              </div>
            </div>

            {/* Info + actions */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <ProductInfo product={product} />
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
      </section>

      {/* Pros/cons + specs */}
      <section className="bg-page-soft border-y border-border-soft">
        <div className="content-container section-pad">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="surface-card p-5 sm:p-6">
              <span className="eyebrow">Voor- & nadelen</span>
              <h3 className="display-sm mt-1.5 mb-4 text-text-base">
                Wat te verwachten
              </h3>
              <ProCon data={product.custom} />
            </div>
            <div className="surface-card p-5 sm:p-6">
              <span className="eyebrow">Specificaties</span>
              <h3 className="display-sm mt-1.5 mb-4 text-text-base">
                Technische details
              </h3>
              <Specs data={product.custom} />
            </div>
          </div>
        </div>
      </section>

      {/* Description + FAQ */}
      <section className="bg-white">
        <div className="content-container-narrow section-pad">
          <span className="eyebrow">Productinformatie</span>
          <h2 className="display-md mt-1.5 mb-5 text-text-base">Beschrijving</h2>
          <div className="prose prose-sm max-w-none">
            <ProductDescription html={product.custom} />
          </div>
          <div className="mt-10">
            <Faq data={product.custom?.faq} />
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="bg-page-soft border-t border-border-soft">
        <div className="content-container section-pad">
          <div className="mb-6">
            <span className="eyebrow">Aanbevolen</span>
            <h2 className="display-md mt-1.5 text-text-base">
              Misschien ook interessant
            </h2>
          </div>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </section>
    </>
  )
}

export default ProductTemplate
