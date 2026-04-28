"use client"

import { InstantSearch } from "react-instantsearch-hooks-web"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import Hit from "@modules/search/components/hit"
import Hits from "@modules/search/components/hits"
import SearchBox from "@modules/search/components/search-box"
import { useEffect, useRef } from "react"

export default function SearchModal() {
  const router = useRouter()
  const searchRef = useRef(null)

  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === searchRef.current) {
      router.back()
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick)
    return () => window.removeEventListener("click", handleOutsideClick)
  }, [])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.back()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <div className="relative z-[75]">
      <div className="fixed inset-0 bg-[#0f1d24]/60 backdrop-blur-sm h-screen w-screen" />
      <div className="fixed inset-0 px-4 sm:p-0" ref={searchRef}>
        <div className="flex flex-col justify-start w-full h-full items-center text-left">
          <InstantSearch
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
          >
            <div
              className="flex absolute flex-col h-fit w-full max-w-2xl left-1/2 -translate-x-1/2 top-16 sm:top-24"
              data-testid="search-modal-container"
            >
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-border-soft">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border-soft">
                  <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
                  <div className="flex-1">
                    <SearchBox />
                  </div>
                </div>
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                  <Hits hitComponent={Hit} />
                </div>
              </div>
              <p className="text-center text-[11.5px] text-white/70 mt-3">
                Druk op <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white">Esc</kbd> om te sluiten
              </p>
            </div>
          </InstantSearch>
        </div>
      </div>
    </div>
  )
}
