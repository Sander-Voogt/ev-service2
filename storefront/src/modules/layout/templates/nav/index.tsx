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
import {iArrowRightMini} from "@medusajs/icons"
import { Suspense } from "react"
import NavSub from "./components/NavSub"
import { clx } from "@medusajs/ui"
import CountrySelect from "@modules/checkout/components/country-select"
import CountrySelect2 from "./components/CountrySelect2"
import LanguageDropdown from "./components/CountrySelect2"
import TopBar from "@modules/layout/components/header/newsite"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white shadow-md">
            <TopBar/>
      
      <InfoBar currentRegion={regions[0]} /> 
      
      <div className="sticky top-0 inset-x-0 z-50">
        <header className="bg-white">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between py-5 px-4 gap-4 md:gap-8">
            <MainNavBar />
            <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <NavSub />
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg border border-green-200 bg-white hover:shadow transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-600" title="Winkelwagen">
              <CartButton />
            </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

const InfoBar = (  { currentRegion }: { currentRegion?: StoreRegion }) => {
  // console.log('asdfasdf', currentRegion)
  const iso2 = currentRegion?.countries?.[0]?.iso_2
  const displayName = currentRegion?.countries?.[0]?.display_name
  const regionFlag = (
    <span className="flex items-center gap-2 rounded-lg px-2 py-1 text-xs font-medium text-green-900">
      <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded bg-white/90 ring-1 ring-green-900/5">
        <img
          src={`https://flagcdn.com/24x18/${iso2}.png`}
          alt={`${displayName} flag`}
          className="w-full h-full object-cover"
        />
      </span>
    </span>
  )

  return (
    <>
      <div className="w-full border-b border-green-200/70 bg-gradient-to-b from-green-50 via-emerald-50/40 to-green-50 text-xs text-green-900 shadow-sm lg:text-sm">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-2 px-4 py-1.5">
          <div className="hidden items-center gap-2 sm:flex lg:gap-4">
            <a
              href="mailto:klantenservice@evservice.eu"
              className="flex items-center gap-1 whitespace-nowrap font-medium transition-colors hover:text-green-950"
            >
              <IconMail className="shrink-0" />
              <span className="hidden md:inline">klantenservice@evservice.eu</span>
              <span className="md:hidden">Service</span>
            </a>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <LocalizedClientLink href="/klantenservice" className={`${navLink} hidden lg:block`}>
              Klantenservice
            </LocalizedClientLink>
            <a
              href="/account"
              className="flex items-center gap-1 whitespace-nowrap rounded px-1 font-semibold transition-colors hover:text-green-950 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
            >
              <IconUser className="shrink-0" />
              <span className="hidden sm:inline">Login</span>
            </a>
            <LanguageDropdown />
          </div>
        </div>
      </div>
    </>
  )
}
