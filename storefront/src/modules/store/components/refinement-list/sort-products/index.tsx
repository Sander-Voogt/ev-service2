"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Nieuwste",
  },
  {
    value: "price_asc",
    label: "Prijs: Laag → Hoog",
  },
  {
    value: "price_desc",
    label: "Prijs: Hoog → Laag",
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const currentLabel = sortOptions.find(opt => opt.value === sortBy)?.label || "Nieuwste"

  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
    setIsOpen(false)
  }

  return (
    <div className="w-full small:w-64 mb-6 small:mb-0" data-testid={dataTestId}>
      <div className="relative">
        {/* Sort Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full small:w-64 px-4 py-2.5 bg-surface border-2 border-border-base hover:border-jade rounded-lg flex items-center justify-between transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jade"
        >
          <span className="text-text-base font-medium text-sm">
            <span className="text-text-muted">Sorteer op: </span>
            <span className="text-jade font-semibold">{currentLabel}</span>
          </span>
          <ChevronDown
            className={`w-5 h-5 text-jade transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 w-full small:w-64 bg-surface border-2 border-border-base rounded-lg shadow-lg z-50 overflow-hidden">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleChange(option.value)}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                  sortBy === option.value
                    ? 'bg-jade/10 text-jade'
                    : 'text-text-base hover:bg-jade/10 hover:text-jade'
                }`}
              >
                {sortBy === option.value && (
                  <svg className="w-5 h-5 text-jade" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {!sortBy && option.value === 'created_at' && (
                  <svg className="w-5 h-5 text-jade" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SortProducts
