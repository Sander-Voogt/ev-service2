import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              Markt-Parasol.nl
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Zoeken
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
               <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/offerte-aanvragen"
                data-testid="nav-account-link"
              >
                Offerte aanvragen
              </LocalizedClientLink>
                             <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/contact"
                data-testid="nav-account-link"
              >
                Contact
              </LocalizedClientLink>
            </div>
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
          </div>
        </nav>
      </header>
    </div>
  )
}

const InfoBar = () => {
  // { currentRegion }: { currentRegion?: StoreRegion }
  // const iso2 = currentRegion?.countries?.[0]?.iso_2
  // const displayName = currentRegion?.countries?.[0]?.display_name
  // const regionFlag = (
  //   <span className="flex items-center gap-2 px-2 py-1 rounded-lg text-green-900 text-xs font-medium">
  //     <span className="w-5 h-5 flex items-center justify-center rounded overflow-hidden bg-white">
  //       <img
  //         src={`https://flagcdn.com/24x18/${iso2}.png`}
  //         alt={`${displayName} flag`}
  //         className="w-full h-full object-cover"
  //       />
  //     </span>
  //   </span>
  // )

  return (
    <>
      <div className="w-full bg-gradient-to-r from-green-light via-white to-green-light text-sm text-green-900 border-b border-green-100 shadow-sm">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center py-1.5 px-4">
          <div className="flex items-center gap-4 hidden sm:flex">
            <a
              href="tel:0851304170"
              className="flex items-center gap-1 font-medium hover:text-green-default"
            >
              <IconPhone />
              <span>085 130 4170</span>
            </a>
            <a
              href="mailto:info@evservice.com"
              className="flex items-center gap-1 font-medium hover:text-green-default"
            >
              <IconMail />
              <span>info@evservice.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <LocalizedClientLink href="/klantenservice" className={navLink}>
              Klantenservice
            </LocalizedClientLink>
            <a
              href="#login"
              className="flex items-center gap-2 font-semibold hover:text-green-default"
            >
              <IconUser />
              <span className="hidden sm:inline">Login</span>
            </a>
            {/* {regionFlag} */}
          </div>
        </div>
      </div>
    </>
  )
}
