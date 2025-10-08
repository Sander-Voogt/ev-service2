'use client'
import { listRegions } from "@lib/data/regions"
import { StoreRegion, HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useRef, Suspense } from "react"
import {
  IconPhone,
  IconMail,
  IconUser,
  IconCart,
  IconSearch,
  Logo,
  navLink,
} from "@modules/common/components/reusable-nav-elements"

// Hamburger and Close icons for the mobile menu
export const IconHamburger = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke="#10B981"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconClose = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="#10B981"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// MobileNavBar - New component for the mobile menu
export const MobileNavBar = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] bg-white flex flex-col items-start p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out">
    <div className="w-full flex justify-end">
      <button
        onClick={onClose}
        aria-label="Close mobile menu"
        className="p-2 text-green-default hover:text-green-900 transition-colors"
      >
        <IconClose />
      </button>
    </div>
    <nav className="flex flex-col w-full text-left mt-8">
      {/* Main Nav Links */}
      <LocalizedClientLink
        href="/auto"
        className="py-4 px-2 text-xl font-semibold text-green-900 border-b border-gray-100 hover:bg-green-light transition-colors"
      >
        Car Brands
      </LocalizedClientLink>

      {/* Nested Details/Dropdowns */}
      <div className="relative w-full">
        <details className="w-full">
          <summary className="py-4 px-2 text-xl font-semibold text-green-900 list-none flex items-center justify-between border-b border-gray-100 hover:bg-green-light transition-colors">
            Charging
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              className="transform transition-transform details-open:rotate-180"
            >
              <path d="M8 10l4 4 4-4" stroke="#10B981" strokeWidth="2" />
            </svg>
          </summary>
          <div className="flex flex-col pl-6 mt-2 pb-2 bg-gray-50 rounded-md">
            {/* Sub-Details for Charging Stations */}
            <details className="w-full">
              <summary className="py-3 text-lg font-medium text-green-800 list-none flex items-center justify-between border-b border-gray-100 hover:bg-green-100 transition-colors">
                Charging Stations
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="transform transition-transform details-open:rotate-180"
                >
                  <path d="M8 10l4 4 4-4" stroke="#10B981" strokeWidth="2" />
                </svg>
              </summary>
              <div className="flex flex-col pl-4 mt-2">
                <LocalizedClientLink
                  href="/charging-stations/home"
                  className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Charging station at home
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/charging-stations/business"
                  className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Charging station for business
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/charging-stations/vve"
                  className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Charging station VvE
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/charging-stations/accessories"
                  className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Charging station accessories
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/charging-stations/installation-accessories"
                  className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Installation accessories
                </LocalizedClientLink>
              </div>
            </details>
            {/* Sub-Details for Charging Cables */}
            <details className="w-full mt-2">
              <summary className="py-3 text-lg font-medium text-green-800 list-none flex items-center justify-between border-b border-gray-100 hover:bg-green-100 transition-colors">
                Charging Cables
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="transform transition-transform details-open:rotate-180"
                >
                  <path d="M8 10l4 4 4-4" stroke="#10B981" strokeWidth="2" />
                </svg>
              </summary>
              <div className="flex flex-col pl-4 mt-2">
                <LocalizedClientLink
                  href="/charging-cables/type-2"
                  className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Charging cables type 2
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/charging-cables/type-1"
                  className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Charging cables type 1
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/charging-cables/mobile-car-chargers"
                  className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Mobile car chargers
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/charging-cables/accessories"
                  className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Charging cable accessories
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/charging-cables/extension-cables"
                  className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Extension cables
                </LocalizedClientLink>
              </div>
            </details>
          </div>
        </details>
      </div>

      {/* Remaining Top-Level Links */}
      <LocalizedClientLink
        href="#charging-installation"
        className="py-4 px-2 text-xl font-semibold text-green-900 border-b border-gray-100 hover:bg-green-light transition-colors"
      >
        Charging station installation
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/blog"
        className="py-4 px-2 text-xl font-semibold text-green-900 border-b border-gray-100 hover:bg-green-light transition-colors"
      >
        Blog
      </LocalizedClientLink>
      <LocalizedClientLink
        href="#selection-aid"
        className="py-4 px-2 text-xl font-semibold text-green-900 border-b border-gray-100 hover:bg-green-light transition-colors"
      >
        Customer Service
      </LocalizedClientLink>

      {/* Commercial Dropdown */}
      <div className="relative w-full">
        <details className="w-full">
          <summary className="py-4 px-2 text-xl font-semibold text-green-900 list-none flex items-center justify-between border-b border-gray-100 hover:bg-green-light transition-colors">
            Commercial
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              className="transform transition-transform details-open:rotate-180"
            >
              <path d="M8 10l4 4 4-4" stroke="#10B981" strokeWidth="2" />
            </svg>
          </summary>
          <div className="flex flex-col pl-6 mt-2 pb-2 bg-gray-50 rounded-md">
            <LocalizedClientLink
              href="/commercial/companies"
              className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Companies and homeowners' associations
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/commercial/installers"
              className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              For Installers
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/commercial/resellers"
              className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              For Resellers
            </LocalizedClientLink>
          </div>
        </details>
      </div>
    </nav>
  </div>
)

// CartSummary
export const CartSummary = ({ cart }: { cart?: HttpTypes.StoreCart | null }) => {
  const totalItems =
    cart?.items?.reduce(
      (sum: number, item: any) => sum + (item.quantity || 0),
      0
    ) || 0

  // Handle total amount calculation - cart.total should be in cents
  let totalAmount = "0.00"
  if (cart?.total !== null && cart?.total !== undefined) {
    totalAmount = cart.total.toFixed(2)
  }

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-lg border border-green-200 bg-white hover:shadow transition-shadow">
      <div className="relative">
        <IconCart />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow min-w-[18px] text-center">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </div>
      <div className="flex flex-col ml-1">
        <span className="text-xs font-semibold text-green-900">Winkelwagen</span>
        <span className="text-xs text-green-default font-bold">
          €{totalAmount}
        </span>
      </div>
    </div>
  )
}

// Info Bar
export const InfoBar = ({ currentRegion }: { currentRegion?: StoreRegion }) => {
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
            {regionFlag}
          </div>
        </div>
      </div>
    </>
  )
}