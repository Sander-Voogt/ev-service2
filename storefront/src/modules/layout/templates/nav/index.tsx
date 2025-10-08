

import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import MainNavBar from "./components/Mainnavbar"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { IconCart } from "@modules/common/components/reusable-nav-elements"
import { Suspense } from "react"
import { InfoBar } from "./components/Components"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white shadow-md">
      <InfoBar currentRegion={regions[0]} />
      <div className="sticky top-0 inset-x-0 z-50">
        <header className="bg-white">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between py-5 px-4 gap-4 md:gap-8">
            <MainNavBar />
            <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <div className="hidden small:flex items-center gap-x-6 h-full">
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Zoeken
                </LocalizedClientLink>
              </div>

              <div className="flex items-center gap-2 px-2 py-1 rounded-lg border border-green-200 bg-white hover:shadow transition-shadow">
                <div className="relative">
                  <IconCart />
                </div>
                <div className="flex flex-col ml-1">
                  <span className="text-xs font-semibold text-green-900">
                    Winkelwagen
                  </span>
                  <span className="text-xs text-green-default font-bold">
                    <Suspense
                      fallback={
                        <LocalizedClientLink
                          className="hover:text-ui-fg-base flex gap-2"
                          href="/cart"
                          data-testid="nav-cart-link"
                        >
                          Winkelwagen (0)
                        </LocalizedClientLink>
                      }
                    >
                      <CartButton />
                    </Suspense>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}
