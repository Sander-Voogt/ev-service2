import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SearchResultsTemplateProps = {
  query: string
  ids: string[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}

const SearchResultsTemplate = ({
  query,
  ids,
  sortBy,
  page,
  countryCode,
}: SearchResultsTemplateProps) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div className="bg-white">
      <div className="content-container py-6 sm:py-8">
        <div className="flex items-end justify-between mb-6 pb-4 border-b border-border-soft">
          <div>
            <span className="eyebrow-muted">Zoekresultaten voor</span>
            <h1 className="display-md mt-1 text-text-base">
              “{decodeURI(query)}”{" "}
              <span className="text-text-muted font-normal text-[14px] ml-1">
                ({ids.length})
              </span>
            </h1>
          </div>
          <LocalizedClientLink
            href="/store"
            className="btn-link"
          >
            Wis zoekopdracht
          </LocalizedClientLink>
        </div>

        {ids.length > 0 ? (
          <div className="grid lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-3">
              <RefinementList sortBy={sortBy || "created_at"} search />
            </aside>
            <div className="lg:col-span-9">
              <PaginatedProducts
                productsIds={ids}
                sortBy={sortBy}
                page={pageNumber}
                countryCode={countryCode}
              />
            </div>
          </div>
        ) : (
          <div className="surface-panel py-16 text-center">
            <p className="text-[14px] text-text-muted">
              Geen resultaten voor “{decodeURI(query)}”.
            </p>
            <LocalizedClientLink href="/store" className="btn-link mt-4 inline-flex">
              Bekijk alle producten
            </LocalizedClientLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResultsTemplate
