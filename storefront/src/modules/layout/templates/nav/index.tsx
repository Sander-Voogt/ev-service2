import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  IconPhone,
  IconMail,
  IconUser,
  IconCart,
  IconSearch,
  Logo,
  navLink,
} from "@modules/common/components/reusable-nav-elements";

// MainNavBar
const MainNavBar = () => (
  <nav className="hidden md:flex items-center gap-8">
    <LocalizedClientLink href="/" className={navLink}>Car Brands</LocalizedClientLink>
    <div className="relative group">
      {/* Main Menu Item */}
      <LocalizedClientLink
        href="#buy-charging-station"
        className={`${navLink} flex items-center gap-1`}
      >
        Charging
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
          <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
        </svg>
      </LocalizedClientLink>

      {/* First Level Dropdown */}
      <div className="absolute left-0 top-full mt-2 min-w-[180px] bg-white border border-green-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        
        {/* Charging Stations submenu */}
        <div className="relative group/sub">
          <LocalizedClientLink
            href="#charging-stations"
            className="block px-4 py-2 hover:bg-green-50 text-green-900 flex items-center justify-between"
          >
            Charging Stations
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
              <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
            </svg>
          </LocalizedClientLink>

          {/* Submenu Level 2 */}
          <div className="absolute left-full top-0 ml-2 min-w-[220px] bg-white border border-green-100 rounded-lg shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-20">
            <LocalizedClientLink href="/charging-stations/home" className="block px-4 py-2 hover:bg-green-50 text-green-900">
              Charging station at home
            </LocalizedClientLink>
            <LocalizedClientLink href="/charging-stations/business" className="block px-4 py-2 hover:bg-green-50 text-green-900">
              Charging station for business
            </LocalizedClientLink>
            <LocalizedClientLink href="/charging-stations/vve" className="block px-4 py-2 hover:bg-green-50 text-green-900">
              Charging station VvE
            </LocalizedClientLink>
            <LocalizedClientLink href="/charging-stations/accessories" className="block px-4 py-2 hover:bg-green-50 text-green-900">
              Charging station accessories
            </LocalizedClientLink>
            <LocalizedClientLink href="/charging-stations/installation-accessories" className="block px-4 py-2 hover:bg-green-50 text-green-900">
              Installation accessories
            </LocalizedClientLink>
          </div>
        </div>

        {/* Charging Cables submenu */}
        <div className="relative group/sub">
          <LocalizedClientLink
            href="#charging-cables"
            className="block px-4 py-2 hover:bg-green-50 text-green-900 flex items-center justify-between"
          >
            Charging Cables
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
              <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
            </svg>
          </LocalizedClientLink>

          {/* Submenu Level 2 */}
          <div className="absolute left-full top-0 ml-2 min-w-[220px] bg-white border border-green-100 rounded-lg shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-20">
            <LocalizedClientLink href="/charging-cables/type-2" className="block px-4 py-2 hover:bg-green-50 text-green-900">
              Charging cables type 2
            </LocalizedClientLink>
            <LocalizedClientLink href="/charging-cables/type-1" className="block px-4 py-2 hover:bg-green-50 text-green-900">
              Charging cables type 1
            </LocalizedClientLink>
            <LocalizedClientLink href="/charging-cables/mobile-car-chargers" className="block px-4 py-2 hover:bg-green-50 text-green-900">
              Mobile car chargers
            </LocalizedClientLink>
            <LocalizedClientLink href="/charging-cables/accessories" className="block px-4 py-2 hover:bg-green-50 text-green-900">
              Charging cable accessories
            </LocalizedClientLink>
            <LocalizedClientLink href="/charging-cables/extension-cables" className="block px-4 py-2 hover:bg-green-50 text-green-900">
              Extension cables
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>

    <LocalizedClientLink href="#charging-installation" className={navLink}>Charging station installation</LocalizedClientLink>
    <LocalizedClientLink href="/blog" className={navLink}>Blog</LocalizedClientLink>
    <LocalizedClientLink href="#selection-aid" className={navLink}>Customer Service</LocalizedClientLink>
    <div className="relative group">
      <LocalizedClientLink href="#commercial" className={`${navLink} flex items-center gap-1`}>
      Commercial
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
        <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
      </svg>
      </LocalizedClientLink>
      <div className="absolute left-0 top-full mt-2 min-w-[260px] bg-white border border-green-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
      <LocalizedClientLink href="/commercial/companies" className="block px-4 py-3 hover:bg-green-50 text-green-900 border-b border-dotted border-green-200">
        Companies and homeowners' associations
      </LocalizedClientLink>
      <LocalizedClientLink href="/commercial/installers" className="block px-4 py-3 hover:bg-green-50 text-green-900 border-b border-dotted border-green-200">
        For Installers
      </LocalizedClientLink>
      <LocalizedClientLink href="/commercial/resellers" className="block px-4 py-3 hover:bg-green-50 text-green-900">
        For Resellers
      </LocalizedClientLink>
      </div>
    </div>
  </nav>
)

// CartSummary
const CartSummary = () => (
  <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg">
    <IconCart />
    <span className="text-xs font-medium">0 ITEMS</span>
    <span className="text-sm font-bold text-green-700">€0.00</span>
  </div>
)

//Info Bar
const InfoBar = ({ currentRegion }: { currentRegion?: StoreRegion }) => {
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
    <div className="w-full bg-gradient-to-r from-green-50 via-white to-green-50 text-sm text-green-900 border-b border-green-100 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-1.5 px-4">
        <div className="flex items-center gap-4">
          <a href="tel:0851304170" className="flex items-center gap-1 font-medium hover:text-green-700">
            <IconPhone />
            <span>085 130 4170</span>
          </a>
          <a href="mailto:info@evservice.com" className="flex items-center gap-1 font-medium hover:text-green-700">
            <IconMail />
            <span>info@evservice.com</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a href="#login" className="flex items-center gap-2 font-semibold hover:text-green-700">
            <IconUser />
            <span className="hidden sm:inline">Login</span>
          </a>
          {regionFlag}
        </div>
      </div>
    </div>
  )
}

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  // For demo, pick the first region as "current"
  const currentRegion = regions?.[0]

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white shadow-md">
      <InfoBar currentRegion={currentRegion} />
      <header className="bg-white">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between py-5 px-4 gap-8">
          <LocalizedClientLink href="/" className="shrink-0 hover:opacity-80">
            <Logo />
          </LocalizedClientLink>
          <MainNavBar />
          <div className="flex items-center gap-5">
            <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-50" aria-label="Search">
              <IconSearch />
            </button>
            <CartSummary />
          </div>
        </div>
      </header>
    </div>
  )
}