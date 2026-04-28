import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight } from "lucide-react"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="bg-page">
      <div className="content-container py-6 sm:py-8">
        <nav className="flex items-center gap-1.5 text-[12.5px] text-text-muted mb-4">
          <LocalizedClientLink href="/" className="hover:text-jade">Home</LocalizedClientLink>
          <ChevronRight className="w-3 h-3 text-[#a5b3bb]" />
          <LocalizedClientLink href="/store" className="hover:text-jade">Collecties</LocalizedClientLink>
          <ChevronRight className="w-3 h-3 text-[#a5b3bb]" />
          <span className="text-text-base font-medium">{collection.title}</span>
        </nav>

        <header className="mb-6 max-w-[760px]">
          <span className="eyebrow">Collectie</span>
          <h1 className="display-lg mt-1 text-text-base">{collection.title}</h1>
        </header>

        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
