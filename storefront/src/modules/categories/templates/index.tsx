import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import ProductDescription from "@modules/common/components/rendertiptap"
import SafeHtml from "@modules/common/components/safe-html"

export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category || !countryCode) notFound()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-white">
      <div
        className="flex flex-col small:flex-row small:items-start py-12 content-container"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} data-testid="sort-by-container" />
        <div className="w-full space-y-12">
          {/* Premium breadcrumb navigation */}
          <div className="flex flex-col gap-6">
            <nav className="flex items-center gap-3 text-sm overflow-x-auto">
              {parents &&
                parents.map((parent) => (
                  <span key={parent.id} className="flex items-center gap-3 whitespace-nowrap">
                    <LocalizedClientLink
                      className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-800 font-bold px-4 py-2 rounded-full transition-all duration-300"
                      href={`/categories/${parent.handle}`}
                      data-testid="sort-by-link"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      {parent.name}
                    </LocalizedClientLink>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                ))}
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-4 py-2 rounded-full font-black shadow-lg">
                {category.name}
              </div>
            </nav>

            {/* Premium category header */}
            <div className="relative bg-gradient-to-br from-green-600 via-emerald-700 to-green-800 rounded-[3rem] p-12 shadow-3xl overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 text-white">
                <h1 className="text-5xl lg:text-6xl font-black mb-4" data-testid="category-page-title">
                  {category.name}
                </h1>
                {category.description && (
                  <p className="text-xl text-green-100 leading-relaxed max-w-3xl">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Premium category banner description */}
          {category?.metadata?.ModelBannerDescription && (
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <SafeHtml
                    className="prose prose-lg max-w-none"
                    html={category.metadata.ModelBannerDescription.html}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Premium subcategories */}
          {category.category_children && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-[2.5rem] p-10 border-2 border-green-200">
              <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                Subcategories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.category_children?.map((c) => (
                  <InteractiveLink
                    key={c.id}
                    href={`/categories/${c.handle}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-green-400 group-hover:-translate-y-2">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
                          <div className="w-3 h-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-black text-gray-900 group-hover:text-green-700 transition-colors">
                            {c.name}
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">Explore products →</p>
                        </div>
                      </div>
                    </div>
                  </InteractiveLink>
                ))}
              </div>
            </div>
          )}

          {/* Premium product grid */}
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>

          {/* Premium main description */}
          {category?.metadata?.maindescription && (
            <div className="bg-gradient-to-br from-white to-green-50/30 rounded-[2.5rem] p-12 shadow-2xl border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4">More Information</h3>
                  <p className="text-gray-600 text-lg">Everything you need to know about this category</p>
                </div>
              </div>
              <SafeHtml
                className="prose prose-lg max-w-none"
                html={category.metadata.maindescription.html}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}