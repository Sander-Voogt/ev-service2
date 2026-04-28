import { getProductsListWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
}) {
  const queryParams: PaginatedProductsParams = { limit: 12 }

  if (collectionId) queryParams["collection_id"] = [collectionId]
  if (categoryId) queryParams["category_id"] = [categoryId]
  if (productsIds) queryParams["id"] = productsIds
  if (sortBy === "created_at") queryParams["order"] = "created_at"

  const region = await getRegion(countryCode)
  if (!region) return null

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-text-muted">
          <span className="font-semibold text-text-base">{count}</span>{" "}
          {count === 1 ? "product" : "producten"}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="surface-panel py-16 text-center">
          <p className="text-[14px] text-text-muted">
            Geen producten gevonden.
          </p>
        </div>
      ) : (
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
          data-testid="products-list"
        >
          {products.map((p) => (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="pt-6 border-t border-border-soft">
          <Pagination
            data-testid="product-pagination"
            page={page}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  )
}
