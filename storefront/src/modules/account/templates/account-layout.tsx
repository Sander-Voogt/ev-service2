import React from "react"
import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  // If no customer, render a simple centered layout for login/register
  if (!customer) {
    return (
      <div className="bg-gray-50 min-h-[80vh]" data-testid="account-page">
        {children}
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-[80vh]" data-testid="account-page">
      <div className="content-container py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Mijn Account</h1>
          <p className="text-gray-600 mt-1">
            Welkom terug, <span className="text-gray-900 font-medium">{customer.first_name}</span>
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <AccountNav customer={customer} />
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 sm:mt-10 lg:mt-12 p-4 sm:p-6 bg-white rounded-xl border border-gray-200 text-center">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Hulp nodig?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Bekijk onze FAQ of neem contact met ons op.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <LocalizedClientLink
              href="/faq"
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              FAQ
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/contact"
              className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Contact
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
