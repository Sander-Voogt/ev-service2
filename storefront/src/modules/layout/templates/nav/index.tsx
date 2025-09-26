"use client";

import { listRegions } from "@lib/data/regions"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { StoreRegion, HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useRef } from 'react';
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
  <div className="fixed inset-0 z-[100] bg-white flex flex-col items-start p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out">
    <div className="w-full flex justify-end">
      <button onClick={onClose} aria-label="Close mobile menu" className="p-2 text-green-700 hover:text-green-900 transition-colors">
        <IconClose />
      </button>
    </div>
    <nav className="flex flex-col w-full text-left mt-8">
      {/* Main Nav Links */}
      <LocalizedClientLink href="/auto" className="py-4 px-2 text-xl font-semibold text-green-900 border-b border-gray-100 hover:bg-green-50 transition-colors">
        Car Brands
      </LocalizedClientLink>

      {/* Nested Details/Dropdowns */}
      <div className="relative w-full">
        <details className="w-full">
          <summary className="py-4 px-2 text-xl font-semibold text-green-900 list-none flex items-center justify-between border-b border-gray-100 hover:bg-green-50 transition-colors">
            Charging
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="transform transition-transform details-open:rotate-180">
              <path d="M8 10l4 4 4-4" stroke="#10B981" strokeWidth="2" />
            </svg>
          </summary>
          <div className="flex flex-col pl-6 mt-2 pb-2 bg-gray-50 rounded-md">
            {/* Sub-Details for Charging Stations */}
            <details className="w-full">
              <summary className="py-3 text-lg font-medium text-green-800 list-none flex items-center justify-between border-b border-gray-100 hover:bg-green-100 transition-colors">
                Charging Stations
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="transform transition-transform details-open:rotate-180">
                  <path d="M8 10l4 4 4-4" stroke="#10B981" strokeWidth="2" />
                </svg>
              </summary>
              <div className="flex flex-col pl-4 mt-2">
                <LocalizedClientLink href="/charging-stations/home" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Charging station at home</LocalizedClientLink>
                <LocalizedClientLink href="/charging-stations/business" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Charging station for business</LocalizedClientLink>
                <LocalizedClientLink href="/charging-stations/vve" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Charging station VvE</LocalizedClientLink>
                <LocalizedClientLink href="/charging-stations/accessories" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Charging station accessories</LocalizedClientLink>
                <LocalizedClientLink href="/charging-stations/installation-accessories" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Installation accessories</LocalizedClientLink>
              </div>
            </details>
            {/* Sub-Details for Charging Cables */}
            <details className="w-full mt-2">
              <summary className="py-3 text-lg font-medium text-green-800 list-none flex items-center justify-between border-b border-gray-100 hover:bg-green-100 transition-colors">
                Charging Cables
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="transform transition-transform details-open:rotate-180">
                  <path d="M8 10l4 4 4-4" stroke="#10B981" strokeWidth="2" />
                </svg>
              </summary>
              <div className="flex flex-col pl-4 mt-2">
                <LocalizedClientLink href="/charging-cables/type-2" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Charging cables type 2</LocalizedClientLink>
                <LocalizedClientLink href="/charging-cables/type-1" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Charging cables type 1</LocalizedClientLink>
                <LocalizedClientLink href="/charging-cables/mobile-car-chargers" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Mobile car chargers</LocalizedClientLink>
                <LocalizedClientLink href="/charging-cables/accessories" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Charging cable accessories</LocalizedClientLink>
                <LocalizedClientLink href="/charging-cables/extension-cables" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Extension cables</LocalizedClientLink>
              </div>
            </details>
          </div>
        </details>
      </div>

      {/* Remaining Top-Level Links */}
      <LocalizedClientLink href="#charging-installation" className="py-4 px-2 text-xl font-semibold text-green-900 border-b border-gray-100 hover:bg-green-50 transition-colors">
        Charging station installation
      </LocalizedClientLink>
      <LocalizedClientLink href="/blog" className="py-4 px-2 text-xl font-semibold text-green-900 border-b border-gray-100 hover:bg-green-50 transition-colors">
        Blog
      </LocalizedClientLink>
      <LocalizedClientLink href="#selection-aid" className="py-4 px-2 text-xl font-semibold text-green-900 border-b border-gray-100 hover:bg-green-50 transition-colors">
        Customer Service
      </LocalizedClientLink>

      {/* Commercial Dropdown */}
      <div className="relative w-full">
        <details className="w-full">
          <summary className="py-4 px-2 text-xl font-semibold text-green-900 list-none flex items-center justify-between border-b border-gray-100 hover:bg-green-50 transition-colors">
            Commercial
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="transform transition-transform details-open:rotate-180">
              <path d="M8 10l4 4 4-4" stroke="#10B981" strokeWidth="2" />
            </svg>
          </summary>
          <div className="flex flex-col pl-6 mt-2 pb-2 bg-gray-50 rounded-md">
            <LocalizedClientLink href="/commercial/companies" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              Companies and homeowners' associations
            </LocalizedClientLink>
            <LocalizedClientLink href="/commercial/installers" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              For Installers
            </LocalizedClientLink>
            <LocalizedClientLink href="/commercial/resellers" className="py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              For Resellers
            </LocalizedClientLink>
          </div>
        </details>
      </div>
    </nav>
  </div>
);


// CartSummary
const CartSummary = ({ cart }: { cart?: HttpTypes.StoreCart | null }) => {
  const totalItems = cart?.items?.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0) || 0
  
  // Handle total amount calculation - cart.total should be in cents
  let totalAmount = "0.00"
  if (cart?.total !== null && cart?.total !== undefined) {
    totalAmount = (cart.total ).toFixed(2)
  }
  
  // Debug logging to see what we're getting
  console.log('Cart data in CartSummary:', {
    cart,
    totalItems,
    cartTotal: cart?.total,
    calculatedAmount: totalAmount,
    items: cart?.items
  })
  
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-lg border border-green-200 bg-white hover:shadow transition-shadow">
      <div className="relative">
        <IconCart />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow min-w-[18px] text-center">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </div>
      <div className="flex flex-col ml-1">
        <span className="text-xs font-semibold text-green-900">Cart</span>
        <span className="text-xs text-green-700 font-bold">€{totalAmount}</span>
      </div>
    </div>
  )
}

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
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showSearch) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        searchButtonRef.current &&
        searchButtonRef.current.contains(event.target as Node)
      ) {
        return;
      }
      if (
        searchInputRef.current &&
        searchInputRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setShowSearch(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  useEffect(() => {
    listRegions().then((regions: StoreRegion[]) => setRegions(regions));
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await retrieveCart();
        console.log('Fetched cart data:', cartData);
        if (cartData?.items?.length) {
          const enrichedItems = await enrichLineItems(cartData.items, cartData.region_id!);
          cartData.items = enrichedItems as HttpTypes.StoreCartLineItem[];
        }
        setCart(cartData);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        setCart(null);
      }
    };
    
    // Fetch cart on initial load
    fetchCart();
    
    // Add event listener for storage changes (when cart is updated in other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'medusa-cart-id' || e.key === null) {
        fetchCart();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Add custom event listener for cart updates within the same tab
    const handleCartUpdate = () => {
      fetchCart();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Refresh when user comes back to the tab
    const handleFocus = () => {
      fetchCart();
    };
    
    window.addEventListener('focus', handleFocus);
    
    // Simple interval check every 5 seconds, but only when page is visible
    const intervalId = setInterval(() => {
      if (!document.hidden) {
        fetchCart();
      }
    }, 5000);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('focus', handleFocus);
      clearInterval(intervalId);
    };
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
              <button
                ref={searchButtonRef}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-50"
                aria-label="Search"
                onClick={() => setShowSearch((prev) => !prev)}
              >
                <IconSearch />
              </button>
              <LocalizedClientLink href="/cart" className="flex items-center">
                <CartSummary cart={cart} />
              </LocalizedClientLink>
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

      {/* Accordion search input below navbar, above hero section with smooth transitions */}
      <div
        className={`w-full flex justify-center transition-all duration-300 ease-in-out ${showSearch ? 'max-h-40 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'} bg-white border-b border-green-200 shadow`}
        style={{ overflow: 'hidden' }}
      >
        <div className="w-full max-w-screen-xl px-4" style={{ transition: 'padding 0.3s' }}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            className={`w-full px-3 py-2 border border-green-100 rounded focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300 ${showSearch ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.3s' }}
          />
        </div>
      </div>
    </div>
  );
}