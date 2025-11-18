"use client"
import { retrieveCart, enrichLineItems } from "@lib/data/cart"
import { listRegions } from "@lib/data/regions"
import { StoreRegion, HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Logo, navLink } from "@modules/common/components/reusable-nav-elements"
import { useEffect, useRef, useState } from "react"

// Hamburger and Close icons for the mobile menu
const IconHamburger = () => (
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

const IconClose = () => (
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

// MainNavBar (remains mostly the same, but with responsive classes)
export default function MainNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
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
      <Navbar />

      <div
        className={`fixed inset-0 z-[90] bg-black bg-opacity-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 w-[85%] max-w-sm h-full z-[100] bg-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <MobileNavBar onClose={() => setIsMobileMenuOpen(false)} />
      </div>
    </>
  )
}

const Navbar = () => (
  <nav className="hidden md:flex items-center gap-8">
    <LocalizedClientLink href="/auto" className={navLink}>
      Automerken
    </LocalizedClientLink>

    <div className="relative group">
      <LocalizedClientLink
        href="/categories/laadkabels"
        className={`${navLink} flex items-center gap-1`}
      >
        Laadkabels
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
          <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
        </svg>
      </LocalizedClientLink>
      <div className="absolute left-0 top-full mt-2 min-w-[260px] bg-white border border-green-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <LocalizedClientLink
          href="/categories/laadkabel-type-1"
          className="block px-4 py-3 hover:bg-green-light text-green-900 border-b border-dotted border-green-200"
        >
          Laadkabel Type 1
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/categories/laadkabel-type-2"
          className="block px-4 py-3 hover:bg-green-light text-green-900 border-b border-dotted border-green-200"
        >
          Laadkabel Type 2
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/categories/mobiele-autolader"
          className="block px-4 py-3 hover:bg-green-light text-green-900"
        >
          Mobiele autoladers
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/categories/laadkabel-accessoires"
          className="block px-4 py-3 hover:bg-green-light text-green-900"
        >
          Laadkable accesoires
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/categories/laadkabel-verloopkabel"
          className="block px-4 py-3 hover:bg-green-light text-green-900"
        >
          Verloopkabels
        </LocalizedClientLink>
      </div>
    </div>

    <div className="relative group">
      <LocalizedClientLink
        href="/categories/laadpalen"
        className={`${navLink} flex items-center gap-1`}
      >
        Laadpalen
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
          <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
        </svg>
      </LocalizedClientLink>
      <div className="absolute left-0 top-full mt-2 min-w-[260px] bg-white border border-green-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <LocalizedClientLink
          href="/categories/laadpaal-thuis"
          className="block px-4 py-3 hover:bg-green-light text-green-900 border-b border-dotted border-green-200"
        >
          Laadpaal Thuis
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/categories/laadpaal-zakelijk"
          className="block px-4 py-3 hover:bg-green-light text-green-900 border-b border-dotted border-green-200"
        >
          Laadpaal Zakelijk
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/categories/laadpaal-vve"
          className="block px-4 py-3 hover:bg-green-light text-green-900"
        >
          Laadpaal VVE
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/categories/laadpaal-accessoires"
          className="block px-4 py-3 hover:bg-green-light text-green-900"
        >
          Laadpaal accesoires
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/categories/installatie-toebehoren"
          className="block px-4 py-3 hover:bg-green-light text-green-900"
        >
          Installatie toebehoren
        </LocalizedClientLink>
      </div>
    </div>
    <LocalizedClientLink href="/installatie-service" className={navLink}>
      Laadpaal installatie
    </LocalizedClientLink>

    <div className="relative group">
      <LocalizedClientLink
        href="/zakelijk"
        className={`${navLink} flex items-center gap-1`}
      >
        Zakelijk
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
          <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
        </svg>
      </LocalizedClientLink>
      <div className="absolute left-0 top-full mt-2 min-w-[260px] bg-white border border-green-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <LocalizedClientLink
          href="/installatie-service"
          className="block px-4 py-3 hover:bg-green-light text-green-900 border-b border-dotted border-green-200"
        >
          Bedrijven en VVE
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/voor-installateurs"
          className="block px-4 py-3 hover:bg-green-light text-green-900 border-b border-dotted border-green-200"
        >
          Voor installateurs
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/voor-wederverkopers"
          className="block px-4 py-3 hover:bg-green-light text-green-900"
        >
          Voor wederverkopers
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
      <LocalizedClientLink
        href="/auto"
        className="py-3 text-lg font-medium text-green-900 hover:bg-green-50"
        onClick={onClose}
      >
        Automerken
      </LocalizedClientLink>
      <div className="relative w-full">
        <details className="w-full">
          <summary className="py-3 text-lg font-medium text-green-900 list-none flex items-center justify-between hover:bg-green-50">
            Laden
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              className="transform transition-transform details-open:rotate-180"
            >
              <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
            </svg>
          </summary>
          <div className="flex flex-col pl-4 mt-2">
            <details className="w-full">
              <summary className="py-2 text-base font-medium text-green-700 list-none flex items-center justify-between hover:bg-green-50">
                Laadpalen
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="transform transition-transform details-open:rotate-180"
                >
                  <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
                </svg>
              </summary>
              <div className="flex flex-col pl-4 mt-2">
                <LocalizedClientLink
                  href="/categories/laadpaal-thuis"
                  className="py-2 text-sm text-green-900 hover:bg-green-50"
                  onClick={onClose}
                >
                  Laadpaal Thuis
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/categories/laadpaal-zakelijk"
                  className="py-2 text-sm text-green-900 hover:bg-green-50"
                  onClick={onClose}
                >
                  Laadpaal Zakelijke
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/categories/laadpaal-vve"
                  className="py-2 text-sm text-green-900 hover:bg-green-50"
                  onClick={onClose}
                >
                  Laadpaal VVE
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/categories/laadpaal-accessoires"
                  className="py-2 text-sm text-green-900 hover:bg-green-50"
                  onClick={onClose}
                >
                  Laadpaal accesoires
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/categories/installatie-toebehoren"
                  className="py-2 text-sm text-green-900 hover:bg-green-50"
                  onClick={onClose}
                >
                  Installatie toebehoren
                </LocalizedClientLink>
              </div>
            </details>
            <details className="w-full mt-2">
              <summary
                className="py-2 text-base font-medium text-green-700 list-none flex items-center justify-between hover:bg-green-50"
                onClick={onClose}
              >
                Charging Cables
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="transform transition-transform details-open:rotate-180"
                >
                  <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
                </svg>
              </summary>
              <div className="flex flex-col pl-4 mt-2">
                <LocalizedClientLink
                  href="/charging-cables/type-2"
                  className="py-2 text-sm text-green-900 hover:bg-green-50"
                  onClick={onClose}
                >
                  Charging cables type 2
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/charging-cables/type-1"
                  className="py-2 text-sm text-green-900 hover:bg-green-50"
                  onClick={onClose}
                >
                  Charging cables type 1
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/charging-cables/mobile-car-chargers"
                  className="py-2 text-sm text-green-900 hover:bg-green-50"
                  onClick={onClose}
                >
                  Mobile car chargers
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/charging-cables/accessories"
                  className="py-2 text-sm text-green-900 hover:bg-green-50"
                  onClick={onClose}
                >
                  Charging cable accessories
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/charging-cables/extension-cables"
                  className="py-2 text-sm text-green-900 hover:bg-green-50"
                  onClick={onClose}
                >
                  Extension cables
                </LocalizedClientLink>
              </div>
            </details>
          </div>
        </details>
      </div>
      <LocalizedClientLink
        href="/installatie-service"
        className="py-3 text-lg font-medium text-green-900 hover:bg-green-50"
        onClick={onClose}
      >
        Laadpaal installatie
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/blog"
        className="py-3 text-lg font-medium text-green-900 hover:bg-green-50"
        onClick={onClose}
      >
        Blog
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/klantenservice"
        className="py-3 text-lg font-medium text-green-900 hover:bg-green-50"
        onClick={onClose}
      >
        Klantenservice
      </LocalizedClientLink>
      <div className="relative w-full">
        <details className="w-full">
          <summary
            className="py-3 text-lg font-medium text-green-900 list-none flex items-center justify-between hover:bg-green-50"
            onClick={onClose}
          >
            Zakelijk
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              className="transform transition-transform details-open:rotate-180"
            >
              <path d="M8 10l4 4 4-4" stroke="#22C55E" strokeWidth="2" />
            </svg>
          </summary>
          <div className="flex flex-col pl-4 mt-2">
            <LocalizedClientLink
              href="/installatie-service"
              className="py-2 text-sm text-green-900 hover:bg-green-50"
              onClick={onClose}
            >
              Bedrijven en VVE
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/voor-installateurs"
              className="py-2 text-sm text-green-900 hover:bg-green-50"
              onClick={onClose}
            >
              Voor installateurs
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/voor-wederverkopers"
              className="py-2 text-sm text-green-900 hover:bg-green-50"
              onClick={onClose}
            >
              Voor wederverkopers
            </LocalizedClientLink>
          </div>
        </details>
      </div>
    </nav>
  </div>
)
