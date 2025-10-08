import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import MainNavBar from "./components/Mainnavbar"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  IconCart,
  IconMail,
  IconPhone,
  IconUser,
  navLink,
} from "@modules/common/components/reusable-nav-elements"
import { Suspense } from "react"
import NavSub from "./components/NavSub"

export default async function Nav() {
  // const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  // currentRegion={regions[0]} 
  
  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white shadow-md">
      <InfoBar /> 
      <div className="sticky top-0 inset-x-0 z-50">
        <header className="bg-white">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between py-5 px-4 gap-4 md:gap-8">
            <MainNavBar />
            <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <NavSub />
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
