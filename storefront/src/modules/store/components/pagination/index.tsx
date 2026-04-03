"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Pagination({
  page,
  totalPages,
  totalProducts,
  productsPerPage = 12,
  'data-testid': dataTestid
}: {
  page: number
  totalPages: number
  totalProducts?: number
  productsPerPage?: number
  'data-testid'?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Helper function to generate an array of numbers within a range
  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  // Calculate product range
  const startProduct = (page - 1) * productsPerPage + 1
  const endProduct = Math.min(page * productsPerPage, totalProducts || page * productsPerPage)

  // Function to render a page button
  const renderPageButton = (p: number) => (
    <button
      key={p}
      onClick={() => handlePageChange(p)}
      disabled={p === page}
      className={`
        w-10 h-10 rounded-lg font-semibold transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600
        ${p === page
          ? 'bg-green-700 text-white cursor-default'
          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-50 hover:text-green-700'
        }
      `}
    >
      {p}
    </button>
  )

  // Function to render ellipsis
  const renderEllipsis = (key: string) => (
    <span key={key} className="px-2 py-2 text-gray-500">
      ...
    </span>
  )

  // Function to render page buttons based on the current page and total pages
  const renderPageButtons = () => {
    const buttons = []

    if (totalPages <= 7) {
      // Show all pages
      buttons.push(
        ...arrayRange(1, totalPages).map((p) => renderPageButton(p))
      )
    } else {
      // Handle different cases for displaying pages and ellipses
      if (page <= 4) {
        // Show 1, 2, 3, 4, 5, ..., lastpage
        buttons.push(
          ...arrayRange(1, 5).map((p) => renderPageButton(p))
        )
        buttons.push(renderEllipsis("ellipsis1"))
        buttons.push(renderPageButton(totalPages))
      } else if (page >= totalPages - 3) {
        // Show 1, ..., lastpage - 4, lastpage - 3, lastpage - 2, lastpage - 1, lastpage
        buttons.push(renderPageButton(1))
        buttons.push(renderEllipsis("ellipsis2"))
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) =>
            renderPageButton(p)
          )
        )
      } else {
        // Show 1, ..., page - 1, page, page + 1, ..., lastpage
        buttons.push(renderPageButton(1))
        buttons.push(renderEllipsis("ellipsis3"))
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) =>
            renderPageButton(p)
          )
        )
        buttons.push(renderEllipsis("ellipsis4"))
        buttons.push(renderPageButton(totalPages))
      }
    }

    return buttons
  }

  // Render the component
  return (
    <div className="w-full mt-12" data-testid={dataTestid}>
      {/* Product Counter */}
      {totalProducts && (
        <div className="text-center text-sm text-gray-600 mb-6">
          Showing {startProduct}-{endProduct} of {totalProducts} products
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mb-6">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`
            h-10 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600
            ${page === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
              : 'bg-green-700 text-white hover:bg-green-800'
            }
          `}
          title="Previous page"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden small:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {renderPageButtons()}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`
            h-10 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600
            ${page === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
              : 'bg-green-700 text-white hover:bg-green-800'
            }
          `}
          title="Next page"
        >
          <span className="hidden small:inline">Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
