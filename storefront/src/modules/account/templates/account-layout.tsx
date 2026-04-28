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
  if (!customer) {
    return (
      <div className="bg-white" data-testid="account-page">
        {children}
      </div>
    )
  }

  return (
    <div className="bg-page-soft min-h-[80vh]" data-testid="account-page">
      <div className="content-container py-6 sm:py-10">
        <header className="mb-7">
          <span className="eyebrow-muted">Mijn Account</span>
          <h1 className="display-lg mt-2 text-text-base">
            Welkom terug, {customer.first_name}
          </h1>
          <p className="lede mt-2 max-w-[480px]">
            Beheer je profiel, adressen en bestellingen op één plek.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AccountNav customer={customer} />
          </div>

          <div className="surface-card p-4 sm:p-6">{children}</div>
        </div>

        <div className="mt-8 surface-tinted p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-[15px] font-semibold text-text-base">
              Hulp nodig?
            </h3>
            <p className="text-[13.5px] text-text-muted mt-1">
              Bekijk onze klantenservice of neem contact met ons op.
            </p>
          </div>
          <div className="flex gap-2">
            <LocalizedClientLink
              href="/klantenservice"
              className="btn-secondary"
            >
              Klantenservice
            </LocalizedClientLink>
            <LocalizedClientLink href="/contact" className="btn-primary">
              Contact
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
