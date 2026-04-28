import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="bg-surface">
      <div
        className="content-container py-6 sm:py-8"
        data-testid="category-container"
      >
        <header className="mb-6 max-w-[760px]">
          <span className="eyebrow">Webshop</span>
          <h1 className="display-lg mt-1 text-text-base" data-testid="store-page-title">
            Alle producten
          </h1>
          <p className="lede mt-2.5">
            Het volledige assortiment laadkabels, laadpalen en accessoires.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <RefinementList sortBy={sort} />
          </aside>
          <div className="lg:col-span-9">
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
