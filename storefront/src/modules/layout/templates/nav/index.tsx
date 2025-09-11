"use client";

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState } from 'react';
import {
  IconPhone,
  IconMail,
  IconUser,
  IconCart,
  IconSearch,
  Logo,
  navLink,
} from "@modules/common/components/reusable-nav-elements";

// Hamburger and Close icons for the mobile menu
const IconHamburger = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M4 12H20M4 18H20" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// MainNavBar (remains mostly the same, but with responsive classes)
const MainNavBar = () => (
  <nav className="hidden md:flex items-center gap-8">
    <LocalizedClientLink href="/auto" className={navLink}>Car Brands</LocalizedClientLink>
    <div className="relative group">
      <LocalizedClientLink
        href="#buy-charging-station"
        className={`${navLink} flex items-center gap-1`}
      >
        Charging
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
          <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
        </svg>
      </LocalizedClientLink>
      <div className="absolute left-0 top-full mt-2 min-w-[180px] bg-white border border-green-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
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

// MobileNavBar - New component for the mobile menu
const MobileNavBar = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] bg-white flex flex-col items-start p-6 overflow-y-auto">
    <div className="w-full flex justify-end">
      <button onClick={onClose} aria-label="Close mobile menu" className="p-2">
        <IconClose />
      </button>
    </div>
    <nav className="flex flex-col w-full text-left mt-6">
      <LocalizedClientLink href="/auto" className="py-3 text-lg font-medium text-green-900 hover:bg-green-50">
        Car Brands
      </LocalizedClientLink>
      <div className="relative w-full">
        <details className="w-full">
          <summary className="py-3 text-lg font-medium text-green-900 list-none flex items-center justify-between hover:bg-green-50">
            Charging
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="transform transition-transform details-open:rotate-180">
              <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
            </svg>
          </summary>
          <div className="flex flex-col pl-4 mt-2">
            <details className="w-full">
              <summary className="py-2 text-base font-medium text-green-700 list-none flex items-center justify-between hover:bg-green-50">
                Charging Stations
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="transform transition-transform details-open:rotate-180">
                  <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
                </svg>
              </summary>
              <div className="flex flex-col pl-4 mt-2">
                <LocalizedClientLink href="/charging-stations/home" className="py-2 text-sm text-green-900 hover:bg-green-50">Charging station at home</LocalizedClientLink>
                <LocalizedClientLink href="/charging-stations/business" className="py-2 text-sm text-green-900 hover:bg-green-50">Charging station for business</LocalizedClientLink>
                <LocalizedClientLink href="/charging-stations/vve" className="py-2 text-sm text-green-900 hover:bg-green-50">Charging station VvE</LocalizedClientLink>
                <LocalizedClientLink href="/charging-stations/accessories" className="py-2 text-sm text-green-900 hover:bg-green-50">Charging station accessories</LocalizedClientLink>
                <LocalizedClientLink href="/charging-stations/installation-accessories" className="py-2 text-sm text-green-900 hover:bg-green-50">Installation accessories</LocalizedClientLink>
              </div>
            </details>
            <details className="w-full mt-2">
              <summary className="py-2 text-base font-medium text-green-700 list-none flex items-center justify-between hover:bg-green-50">
                Charging Cables
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="transform transition-transform details-open:rotate-180">
                  <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
                </svg>
              </summary>
              <div className="flex flex-col pl-4 mt-2">
                <LocalizedClientLink href="/charging-cables/type-2" className="py-2 text-sm text-green-900 hover:bg-green-50">Charging cables type 2</LocalizedClientLink>
                <LocalizedClientLink href="/charging-cables/type-1" className="py-2 text-sm text-green-900 hover:bg-green-50">Charging cables type 1</LocalizedClientLink>
                <LocalizedClientLink href="/charging-cables/mobile-car-chargers" className="py-2 text-sm text-green-900 hover:bg-green-50">Mobile car chargers</LocalizedClientLink>
                <LocalizedClientLink href="/charging-cables/accessories" className="py-2 text-sm text-green-900 hover:bg-green-50">Charging cable accessories</LocalizedClientLink>
                <LocalizedClientLink href="/charging-cables/extension-cables" className="py-2 text-sm text-green-900 hover:bg-green-50">Extension cables</LocalizedClientLink>
              </div>
            </details>
          </div>
        </details>
      </div>
      <LocalizedClientLink href="#charging-installation" className="py-3 text-lg font-medium text-green-900 hover:bg-green-50">
        Charging station installation
      </LocalizedClientLink>
      <LocalizedClientLink href="/blog" className="py-3 text-lg font-medium text-green-900 hover:bg-green-50">
        Blog
      </LocalizedClientLink>
      <LocalizedClientLink href="#selection-aid" className="py-3 text-lg font-medium text-green-900 hover:bg-green-50">
        Customer Service
      </LocalizedClientLink>
      <div className="relative w-full">
        <details className="w-full">
          <summary className="py-3 text-lg font-medium text-green-900 list-none flex items-center justify-between hover:bg-green-50">
            Commercial
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="transform transition-transform details-open:rotate-180">
              <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
            </svg>
          </summary>
          <div className="flex flex-col pl-4 mt-2">
            <LocalizedClientLink href="/commercial/companies" className="py-2 text-sm text-green-900 hover:bg-green-50">
              Companies and homeowners' associations
            </LocalizedClientLink>
            <LocalizedClientLink href="/commercial/installers" className="py-2 text-sm text-green-900 hover:bg-green-50">
              For Installers
            </LocalizedClientLink>
            <LocalizedClientLink href="/commercial/resellers" className="py-2 text-sm text-green-900 hover:bg-green-50">
              For Resellers
            </LocalizedClientLink>
          </div>
        </details>
      </div>
    </nav>
  </div>
);


// CartSummary
const CartSummary = () => (
  <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg">
    <IconCart />
    <span className="text-xs font-medium hidden md:inline">0 ITEMS</span>
    <span className="text-sm font-bold text-green-700">€0.00</span>
  </div>
)

// Info Bar
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
        <div className="flex items-center gap-4 hidden sm:flex">
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


import { useEffect } from "react";

export default function Nav() {
  const [regions, setRegions] = useState<StoreRegion[] | undefined>(undefined);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    listRegions().then((regions: StoreRegion[]) => setRegions(regions));
  }, []);

  const currentRegion = regions?.[0];

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white shadow-md">
      <InfoBar currentRegion={currentRegion} />
      <header className="bg-white">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between py-5 px-4 gap-4 md:gap-8">
          <div className="flex items-center">
            {/* Mobile menu button, visible only on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-50 shrink-0"
              aria-label="Open mobile menu"
            >
              <IconHamburger />
            </button>
            <LocalizedClientLink href="/" className="shrink-0 hover:opacity-80">
              <Logo />
            </LocalizedClientLink>
          </div>
          <MainNavBar />
          <div className="flex items-center gap-3 md:gap-5">
            <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-50" aria-label="Search">
              <IconSearch />
            </button>
            <CartSummary />
          </div>
        </div>
      </header>

      {/* Mobile nav overlay, conditionally rendered */}
      <div
        className={`fixed inset-0 z-[90] bg-black bg-opacity-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } md:hidden`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 w-[85%] max-w-sm h-full z-[100] bg-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <MobileNavBar onClose={() => setIsMobileMenuOpen(false)} />
      </div>

    </div>
  );
}