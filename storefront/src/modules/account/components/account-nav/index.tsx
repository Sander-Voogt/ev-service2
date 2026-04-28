"use client"

import { useParams, usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"
import { LayoutGrid, User, MapPin, Package, LogOut, ChevronRight } from "lucide-react"

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
    { href: "/account", label: "Overzicht", icon: LayoutGrid, testId: "overview-link" },
    { href: "/account/profile", label: "Profiel", icon: User, testId: "profile-link" },
    { href: "/account/addresses", label: "Adressen", icon: MapPin, testId: "addresses-link" },
    { href: "/account/orders", label: "Bestellingen", icon: Package, testId: "orders-link" },
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
      {/* Mobile */}
      <div className="lg:hidden surface-card overflow-hidden" data-testid="mobile-account-nav">
        <div className="bg-[#0f1d24] p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-jade/20 text-[#B0CB31] flex items-center justify-center text-[15px] font-semibold">
            {customer?.first_name?.charAt(0) || "U"}
          </div>
          <div className="min-w-0">
            <p className="text-white text-[13.5px] font-semibold truncate">
              {customer?.first_name} {customer?.last_name}
            </p>
            <p className="text-white/60 text-[12px] truncate">{customer?.email}</p>
          </div>
        </div>
        <nav className="divide-y divide-border-soft">
          {navItems.map((item) => (
            <LocalizedClientLink
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 transition-colors ${
                isActive(item.href)
                  ? "bg-jade/10 text-jade font-semibold"
                  : "text-text-muted hover:bg-page-soft"
              }`}
              data-testid={item.testId}
            >
              <span className="flex items-center gap-2.5 text-[13.5px]">
                <item.icon className="w-4 h-4" strokeWidth={1.75} />
                {item.label}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#a5b3bb]" />
            </LocalizedClientLink>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-4 py-3 w-full text-[13.5px] text-[#c2410c] hover:bg-[#fff7ed]"
            data-testid="logout-button"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.75} />
            <span>Uitloggen</span>
          </button>
        </nav>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block surface-card overflow-hidden" data-testid="account-nav">
        <div className="bg-[#0f1d24] p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-jade/20 text-[#B0CB31] flex items-center justify-center text-[16px] font-semibold">
            {customer?.first_name?.charAt(0) || "U"}
          </div>
          <div className="min-w-0">
            <p className="text-white text-[14px] font-semibold truncate">
              {customer?.first_name} {customer?.last_name}
            </p>
            <p className="text-white/60 text-[12px] truncate">{customer?.email}</p>
          </div>
        </div>

        <nav className="p-2">
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <LocalizedClientLink
                  href={item.href}
                  className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-md text-[13.5px] transition-colors ${
                    isActive(item.href)
                      ? "bg-jade/10 text-jade font-semibold before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[3px] before:rounded-full before:bg-jade"
                      : "text-text-muted hover:bg-page-soft"
                  }`}
                  data-testid={item.testId}
                >
                  <item.icon className="w-4 h-4" strokeWidth={1.75} />
                  <span>{item.label}</span>
                </LocalizedClientLink>
              </li>
            ))}
          </ul>

          <div className="mt-2 pt-2 border-t border-border-soft">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-md w-full text-[13.5px] text-[#c2410c] hover:bg-[#fff7ed] transition-colors"
              data-testid="logout-button"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.75} />
              <span>Uitloggen</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default AccountNav
