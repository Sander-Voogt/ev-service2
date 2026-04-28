import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import MainNavBar from "./components/Mainnavbar"
import ThemeToggle from "@modules/common/components/theme-toggle"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
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
import UserDropdown from "@modules/layout/components/user-dropdown"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const customer = await retrieveCustomer().catch(() => null)


  return (
    <div className="sticky top-0 inset-x-0 z-50 shadow-md" style={{ backgroundColor: "var(--page-bg)" }}>
            <TopBar/>

      <InfoBar currentRegion={regions[0]} customer={customer} />

      <div className="sticky top-0 inset-x-0 z-50">
        <header style={{ backgroundColor: "var(--page-bg)", borderBottom: "1px solid var(--border-soft)" }}>
          <div className="max-w-screen-xl mx-auto flex items-center justify-between py-5 px-4 gap-4 md:gap-8">
            <MainNavBar />
            <div className="flex items-center gap-x-4 h-full flex-1 basis-0 justify-end">
              <NavSub />
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg border hover:shadow transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-jade" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }} title="Winkelwagen">
              <CartButton />
            </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

const InfoBar = ({ currentRegion, customer }: { currentRegion?: StoreRegion, customer: any }) => {
  // console.log('asdfasdf', currentRegion)
  const iso2 = currentRegion?.countries?.[0]?.iso_2
  const displayName = currentRegion?.countries?.[0]?.display_name
  const regionFlag = (
    <span className="flex items-center gap-2 px-2 py-1 rounded-lg text-green-900 text-xs font-medium">
      <span className="w-5 h-5 flex items-center justify-center rounded overflow-hidden bg-white">
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
      <div
        className="w-full text-xs lg:text-sm shadow-sm"
        style={{
          backgroundColor: "var(--page-bg-tinted)",
          color: "var(--text)",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        <div className="max-w-screen-xl mx-auto flex justify-between items-center py-1.5 px-4 gap-2">
          <div className="flex items-center gap-2 lg:gap-4 hidden sm:flex">
            <a
              href="mailto:klantenservice@evservice.eu"
              className="flex items-center gap-1 font-medium hover:text-jade transition-colors whitespace-nowrap"
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
            {customer ? (
              <UserDropdown customer={customer} />
            ) : (
              <a
                href="/account"
                className="flex items-center gap-1 font-semibold hover:text-jade transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jade rounded px-1"
              >
                <IconUser className="shrink-0" />
                <span className="hidden sm:inline">Login</span>
              </a>
            )}
            <ThemeToggle size="sm" />
            <LanguageDropdown />
          </div>
        </div>
      </div>
    </>
  )
}
