"use client"

import { useParams, usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  const navItems = [
    {
      href: "/account",
      label: "Overzicht",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
      testId: "overview-link"
    },
    {
      href: "/account/profile",
      label: "Profiel",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      testId: "profile-link"
    },
    {
      href: "/account/addresses",
      label: "Adressen",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      testId: "addresses-link"
    },
    {
      href: "/account/orders",
      label: "Bestellingen",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
      testId: "orders-link"
    },
  ]

  const isActive = (href: string) => {
    const currentPath = route?.split(countryCode)[1] || ""
    if (href === "/account") {
      return currentPath === "/account" || currentPath === "/account/"
    }
    return currentPath.startsWith(href)
  }

  return (
    <div>
      {/* Mobile Navigation */}
      <div className="lg:hidden" data-testid="mobile-account-nav">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Mobile Header */}
          <div className="bg-gray-900 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {customer?.first_name?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <p className="text-white font-semibold">{customer?.first_name} {customer?.last_name}</p>
                <p className="text-white/70 text-sm">{customer?.email}</p>
              </div>
            </div>
          </div>

          {/* Mobile Nav Items */}
          <nav className="divide-y divide-gray-100">
            {navItems.map((item) => (
              <LocalizedClientLink
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between p-4 transition-colors ${
                  isActive(item.href)
                    ? "bg-gray-100 text-gray-900 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                data-testid={item.testId}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </LocalizedClientLink>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-between p-4 w-full text-red-600 hover:bg-red-50 transition-colors"
              data-testid="logout-button"
            >
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <span className="font-medium">Uitloggen</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block" data-testid="account-nav">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* User Info Header */}
          <div className="bg-gray-900 p-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {customer?.first_name?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  {customer?.first_name} {customer?.last_name}
                </p>
                <p className="text-white/70 text-sm">{customer?.email}</p>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-3">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <LocalizedClientLink
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.href)
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    data-testid={item.testId}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>

            {/* Logout Button */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-600 hover:bg-red-50 transition-colors"
                data-testid="logout-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <span className="font-medium">Uitloggen</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default AccountNav
