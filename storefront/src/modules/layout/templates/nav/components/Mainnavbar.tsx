"use client"
import { retrieveCart, enrichLineItems } from "@lib/data/cart"
import { listRegions } from "@lib/data/regions"
import { StoreRegion, HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Logo, navLink } from "@modules/common/components/reusable-nav-elements"
import { useEffect, useRef, useState } from "react"
import {
  Cable,
  Plug,
  Zap,
  Wrench,
  ArrowLeftRight,
  Home,
  Building2,
  Users,
  HardHat,
  Store,
  Boxes,
  ChevronRight,
  ChevronDown,
  LucideIcon,
} from "lucide-react"

type MenuItem = {
  href: string
  title: string
  desc: string
  icon: LucideIcon
}

const laadkabelItems: MenuItem[] = [
  {
    href: "/categories/laadkabel-type-2",
    title: "Laadkabel Type 2",
    desc: "Voor de meeste moderne EV's in Europa",
    icon: Cable,
  },
  {
    href: "/categories/laadkabel-type-1",
    title: "Laadkabel Type 1",
    desc: "Voor oudere modellen, o.a. Aziatische EV's",
    icon: Cable,
  },
  {
    href: "/categories/mobiele-autolader",
    title: "Mobiele autoladers",
    desc: "Laden onderweg via stopcontact",
    icon: Zap,
  },
  {
    href: "/categories/laadkabel-accessoires",
    title: "Laadkabel accessoires",
    desc: "Houders, tassen en beschermkappen",
    icon: Boxes,
  },
  {
    href: "/categories/laadkabel-verloopkabel",
    title: "Verloopkabels",
    desc: "Type 1 ↔ Type 2 adapters",
    icon: ArrowLeftRight,
  },
]

const laadpaalItems: MenuItem[] = [
  {
    href: "/categories/laadpaal-thuis",
    title: "Laadpaal Thuis",
    desc: "Slim laden in je eigen oprit",
    icon: Home,
  },
  {
    href: "/categories/laadpaal-zakelijk",
    title: "Laadpaal Zakelijk",
    desc: "Voor bedrijfspand en vloot",
    icon: Building2,
  },
  {
    href: "/categories/laadpaal-vve",
    title: "Laadpaal VvE",
    desc: "Voor gedeelde parkeerplaatsen",
    icon: Users,
  },
  {
    href: "/categories/laadpaal-accessoires",
    title: "Laadpaal accessoires",
    desc: "Houders, kabels en uitbreidingen",
    icon: Plug,
  },
  {
    href: "/categories/installatie-toebehoren",
    title: "Installatie toebehoren",
    desc: "Voor de monteur — alles erbij",
    icon: Wrench,
  },
]

const zakelijkItems: MenuItem[] = [
  {
    href: "/installatie-service",
    title: "Bedrijven en VvE",
    desc: "Complete installatie van laadinfra",
    icon: Building2,
  },
  {
    href: "/voor-installateurs",
    title: "Voor installateurs",
    desc: "Vakkundige partner voor monteurs",
    icon: HardHat,
  },
  {
    href: "/voor-wederverkopers",
    title: "Voor wederverkopers",
    desc: "Inkoopvoordeel voor partners",
    icon: Store,
  },
]

const DropdownMenu = ({
  items,
  alignRight = false,
}: {
  items: MenuItem[]
  alignRight?: boolean
}) => (
  <div
    className={`absolute top-full ${
      alignRight ? "right-0" : "left-0"
    } pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50`}
  >
    <div className="w-[340px] bg-surface border border-border-base rounded-[16px] shadow-[0_24px_60px_-20px_rgba(15,29,36,0.18),0_8px_20px_-8px_rgba(15,29,36,0.08)] p-2">
      {items.map((item) => (
        <LocalizedClientLink
          key={item.href}
          href={item.href}
          className="group/item flex items-start gap-3 p-3 rounded-[10px] hover:bg-page-soft transition-colors"
        >
          <span className="flex-shrink-0 w-9 h-9 rounded-full bg-jade/10 text-jade flex items-center justify-center group-hover/item:bg-jade group-hover/item:text-white transition-colors">
            <item.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-semibold text-text-base group-hover/item:text-jade transition-colors leading-tight">
              {item.title}
            </p>
            <p className="text-[12px] text-text-muted mt-0.5 leading-snug">
              {item.desc}
            </p>
          </div>
          <ChevronRight className="flex-shrink-0 w-4 h-4 text-[#a5b3bb] group-hover/item:text-jade group-hover/item:translate-x-0.5 transition-all mt-1" />
        </LocalizedClientLink>
      ))}
    </div>
  </div>
)

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
        {/* Mobile & Tablet menu button, visible only on mobile and tablet */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-jade/10 shrink-0 transition-all duration-200"
          aria-label="Open navigation menu"
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
        } lg:hidden`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 w-[85%] max-w-sm h-full z-[100] bg-surface transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <MobileNavBar onClose={() => setIsMobileMenuOpen(false)} />
      </div>
    </>
  )
}

const Navbar = () => (
  <nav className="hidden lg:flex items-center gap-7">
    <LocalizedClientLink href="/auto" className={navLink}>
      Automerken
    </LocalizedClientLink>

    <div className="relative group">
      <LocalizedClientLink
        href="/categories/laadkabels"
        className={`${navLink} flex items-center gap-1.5`}
      >
        Laadkabels
        <ChevronDown className="w-3.5 h-3.5 text-jade group-hover:rotate-180 transition-transform duration-200" strokeWidth={2.25} />
      </LocalizedClientLink>
      <DropdownMenu items={laadkabelItems} />
    </div>

    <div className="relative group">
      <LocalizedClientLink
        href="/categories/laadpalen"
        className={`${navLink} flex items-center gap-1.5`}
      >
        Laadpalen
        <ChevronDown className="w-3.5 h-3.5 text-jade group-hover:rotate-180 transition-transform duration-200" strokeWidth={2.25} />
      </LocalizedClientLink>
      <DropdownMenu items={laadpaalItems} />
    </div>

    <LocalizedClientLink href="/installatie-service" className={navLink}>
      Laadpaal installatie
    </LocalizedClientLink>

    <div className="relative group">
      <LocalizedClientLink
        href="/zakelijk"
        className={`${navLink} flex items-center gap-1.5`}
      >
        Zakelijk
        <ChevronDown className="w-3.5 h-3.5 text-jade group-hover:rotate-180 transition-transform duration-200" strokeWidth={2.25} />
      </LocalizedClientLink>
      <DropdownMenu items={zakelijkItems} />
    </div>
  </nav>
)

// MobileNavBar - New component for the mobile menu
const MobileNavBar = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] bg-surface flex flex-col items-start p-6 overflow-y-auto">
    <div className="w-full flex justify-end">
      <button onClick={onClose} aria-label="Close mobile menu" className="p-2">
        <IconClose />
      </button>
    </div>
    <nav className="flex flex-col w-full text-left mt-6">
      <LocalizedClientLink
        href="/auto"
        className="py-3 text-lg font-medium text-text-base hover:bg-jade/10"
        onClick={onClose}
      >
        Automerken
      </LocalizedClientLink>
      <div className="relative w-full">
        <details className="w-full">
          <summary className="py-3 text-lg font-medium text-text-base list-none flex items-center justify-between hover:bg-jade/10">
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
              <summary className="py-2 text-base font-medium text-jade list-none flex items-center justify-between hover:bg-jade/10">
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
                  className="py-2 text-sm text-text-base hover:bg-jade/10"
                  onClick={onClose}
                >
                  Laadpaal Thuis
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/categories/laadpaal-zakelijk"
                  className="py-2 text-sm text-text-base hover:bg-jade/10"
                  onClick={onClose}
                >
                  Laadpaal Zakelijke
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/categories/laadpaal-vve"
                  className="py-2 text-sm text-text-base hover:bg-jade/10"
                  onClick={onClose}
                >
                  Laadpaal VVE
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/categories/laadpaal-accessoires"
                  className="py-2 text-sm text-text-base hover:bg-jade/10"
                  onClick={onClose}
                >
                  Laadpaal accesoires
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/categories/installatie-toebehoren"
                  className="py-2 text-sm text-text-base hover:bg-jade/10"
                  onClick={onClose}
                >
                  Installatie toebehoren
                </LocalizedClientLink>
              </div>
            </details>
            <details className="w-full mt-2">
              <summary
                className="py-2 text-base font-medium text-jade list-none flex items-center justify-between hover:bg-jade/10"
              >
                Laadkabels
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
                  href="/categories/laadkabel-type-2"
                  className="py-2 text-sm text-text-base hover:bg-jade/10"
                  onClick={onClose}
                >
                  Laadkabel Type 2
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/categories/laadkabel-type-1"
                  className="py-2 text-sm text-text-base hover:bg-jade/10"
                  onClick={onClose}
                >
                  Laadkabel Type 1
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/categories/mobiele-autoladers"
                  className="py-2 text-sm text-text-base hover:bg-jade/10"
                  onClick={onClose}
                >
                  Mobiele autoladers
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/categories/laadkabel-accessoires"
                  className="py-2 text-sm text-text-base hover:bg-jade/10"
                  onClick={onClose}
                >
                  Laadkabel accessoires
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/categories/laadkabel-verloopkabel"
                  className="py-2 text-sm text-text-base hover:bg-jade/10"
                  onClick={onClose}
                >
                  Verloopkabels
                </LocalizedClientLink>
              </div>
            </details>
          </div>
        </details>
      </div>
      <LocalizedClientLink
        href="/installatie-service"
        className="py-3 text-lg font-medium text-text-base hover:bg-jade/10"
        onClick={onClose}
      >
        Laadpaal installatie
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/blog"
        className="py-3 text-lg font-medium text-text-base hover:bg-jade/10"
        onClick={onClose}
      >
        Blog
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/klantenservice"
        className="py-3 text-lg font-medium text-text-base hover:bg-jade/10"
        onClick={onClose}
      >
        Klantenservice
      </LocalizedClientLink>
      <div className="relative w-full">
        <details className="w-full">
          <summary
            className="py-3 text-lg font-medium text-text-base list-none flex items-center justify-between hover:bg-jade/10"
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
              className="py-2 text-sm text-text-base hover:bg-jade/10"
              onClick={onClose}
            >
              Bedrijven en VVE
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/voor-installateurs"
              className="py-2 text-sm text-text-base hover:bg-jade/10"
              onClick={onClose}
            >
              Voor installateurs
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/voor-wederverkopers"
              className="py-2 text-sm text-text-base hover:bg-jade/10"
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
