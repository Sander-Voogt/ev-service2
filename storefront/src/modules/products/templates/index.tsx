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

      {/* Premium product header */}
      <div className="bg-gradient-to-br from-gray-50 via-green-50/30 to-white py-12 border-b border-gray-200">
        <div className="content-container">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Premium main product section */}
      <div className="bg-white py-16">
        <div
          className="content-container flex flex-col lg:flex-row lg:items-start gap-12 relative"
          data-testid="product-container"
        >
          <div className="flex flex-col lg:flex-row gap-12 w-full">
            {/* Premium image gallery */}
            <div className="w-full lg:w-2/5 relative">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-[2.5rem] p-4 shadow-2xl border border-gray-200">
                <ImageGallery2 images={product?.images || []} />
              </div>
            </div>

            {/* Premium product actions */}
            <div className="w-full lg:w-2/5 flex flex-col gap-8">
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
      </div>

      {/* Premium product details section */}
      <div className="bg-gradient-to-br from-gray-50 to-green-50/30 py-16">
        <div className="content-container">
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-12 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 border border-green-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Pros & Cons</h3>
                <ProCon data={product.custom} />
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Specifications</h3>
                <Specs data={product.custom} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium description and FAQ */}
      <div className="bg-white py-16">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-[2.5rem] shadow-2xl p-12 border border-gray-200">
              <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8">
                Product Description
              </h2>
              <ProductDescription html={product.custom} />
              <div className="mt-12">
                <Faq data={product.custom?.faq} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium related products */}
      <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50/30 py-16">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              You May Also Like
            </h2>
            <p className="text-xl text-gray-600">
              Explore similar products from our collection
            </p>
          </div>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default ProductTemplate