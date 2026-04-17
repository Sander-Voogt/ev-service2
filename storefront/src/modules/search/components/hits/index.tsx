import { clx } from "@medusajs/ui"
import React from "react"
import {
  UseHitsProps,
  useHits,
  useSearchBox,
} from "react-instantsearch-hooks-web"

import { ProductHit } from "../hit"
import ShowAll from "../show-all"

type HitsProps<THit> = React.ComponentProps<"div"> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element
  }

const Hits = ({
  hitComponent: Hit,
  className,
  ...props
}: HitsProps<ProductHit>) => {
  const { query } = useSearchBox()
  const { hits } = useHits(props)

  return (
    <div
      className={clx(
        "transition-[height,max-height,opacity] duration-500 ease-in-out",
        className,
        {
          "max-h-full opacity-100": !!query,
          "max-h-0 opacity-0": !query && !hits.length,
        }
      )}
    >
      <div className="space-y-8">
        {hits.length > 0 && (
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-gray-900">
              Search Results
              <span className="text-green-700 ml-2">({hits.length})</span>
            </h3>
          </div>
        )}

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          data-testid="search-results"
        >
          {hits.slice(0, 6).map((hit, index) => (
            <li
              key={index}
              className={clx("list-none", {
                "hidden sm:block": index > 2,
              })}
            >
              <Hit hit={hit as unknown as ProductHit} />
            </li>
          ))}
        </div>

        {hits.length > 0 && (
          <div className="pt-6 border-t-2 border-gray-200">
            <ShowAll />
          </div>
        )}
      </div>
    </div>
  )
}

export default Hits