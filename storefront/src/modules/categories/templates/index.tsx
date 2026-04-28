import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ChevronRight } from "lucide-react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
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
    <div className="bg-page">
      <div className="content-container py-6 sm:py-8" data-testid="category-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12.5px] text-text-muted mb-4 overflow-x-auto">
          <LocalizedClientLink href="/" className="hover:text-jade transition-colors">
            Home
          </LocalizedClientLink>
          {parents.map((parent) => (
            <span key={parent.id} className="flex items-center gap-1.5 whitespace-nowrap">
              <ChevronRight className="w-3 h-3 text-[#a5b3bb]" />
              <LocalizedClientLink
                href={`/categories/${parent.handle}`}
                className="hover:text-jade transition-colors"
              >
                {parent.name}
              </LocalizedClientLink>
            </span>
          ))}
          <ChevronRight className="w-3 h-3 text-[#a5b3bb]" />
          <span className="text-text-base font-medium whitespace-nowrap">{category.name}</span>
        </nav>

        {/* Header */}
        <header className="mb-6 max-w-[760px]">
          <h1 className="display-lg text-text-base" data-testid="category-page-title">
            {category.name}
          </h1>
          {category.description && (
            <p className="lede mt-2.5">{category.description}</p>
          )}
        </header>

        {/* Optional banner description */}
        {category?.metadata?.ModelBannerDescription && (
          <div className="surface-panel p-5 mb-6">
            <SafeHtml
              className="prose prose-sm max-w-none"
              html={(category.metadata.ModelBannerDescription as any).html}
            />
          </div>
        )}

        {/* Subcategories chips */}
        {category.category_children && category.category_children.length > 0 && (
          <div className="mb-6">
            <p className="eyebrow-muted mb-2.5">Subcategorieën</p>
            <div className="flex flex-wrap gap-2">
              {category.category_children.map((c) => (
                <InteractiveLink
                  key={c.id}
                  href={`/categories/${c.handle}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-full border border-border-base bg-surface hover:border-jade hover:text-jade transition-colors"
                >
                  {c.name}
                </InteractiveLink>
              ))}
            </div>
          </div>
        )}

        {/* Product grid — full width, no empty sidebar */}
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>

        {/* Main description (SEO content) */}
        {category?.metadata?.maindescription && (
          <div className="mt-12 surface-card p-6 sm:p-8">
            <span className="eyebrow">Meer informatie</span>
            <h2 className="display-sm mt-1.5 mb-4 text-text-base">
              Over {category.name}
            </h2>
            <SafeHtml
              className="prose prose-sm max-w-none"
              html={(category.metadata.maindescription as any).html}
            />
          </div>
        )}
      </div>
    </div>
  )
}
