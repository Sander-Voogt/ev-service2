import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { User, MapPin, Package, ChevronRight, ShoppingBag } from "lucide-react"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const profileCompletion = getProfileCompletion(customer)

  const stats = [
    {
      icon: User,
      label: "Profiel",
      value: `${profileCompletion}%`,
      meta: "voltooid",
      href: "/account/profile",
      cta: "Profiel bewerken",
      progress: profileCompletion,
      testId: "customer-profile-completion",
      dataValue: profileCompletion,
    },
    {
      icon: MapPin,
      label: "Adressen",
      value: `${customer?.addresses?.length || 0}`,
      meta: "opgeslagen",
      href: "/account/addresses",
      cta: "Adressen beheren",
      testId: "addresses-count",
      dataValue: customer?.addresses?.length || 0,
    },
    {
      icon: Package,
      label: "Bestellingen",
      value: `${orders?.length || 0}`,
      meta: "totaal",
      href: "/account/orders",
      cta: "Alle bestellingen",
    },
  ]

  return (
    <div data-testid="overview-page-wrapper">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
        {stats.map((s) => (
          <div key={s.label} className="surface-panel p-4">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-8 h-8 rounded-full bg-jade/10 text-jade flex items-center justify-center">
                <s.icon className="w-3.5 h-3.5" strokeWidth={1.75} />
              </span>
              <h3 className="text-[12.5px] font-semibold text-text-base">
                {s.label}
              </h3>
            </div>
            <div className="flex items-end gap-1.5">
              <span
                className="text-[24px] font-semibold text-text-base leading-none tracking-tight"
                {...(s.testId ? { "data-testid": s.testId, "data-value": s.dataValue } : {})}
              >
                {s.value}
              </span>
              <span className="text-[12px] text-text-muted mb-0.5">{s.meta}</span>
            </div>
            {typeof s.progress === "number" && (
              <div className="mt-2.5 h-1 bg-[#eef1f3] rounded-full overflow-hidden">
                <div
                  className="h-full bg-jade transition-all duration-500"
                  style={{ width: `${s.progress}%` }}
                />
              </div>
            )}
            <LocalizedClientLink
              href={s.href}
              className="btn-link text-[12px] mt-3"
            >
              {s.cta}
              <ChevronRight className="w-3 h-3" />
            </LocalizedClientLink>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-semibold text-text-base">
            Recente bestellingen
          </h2>
          {orders && orders.length > 0 && (
            <LocalizedClientLink
              href="/account/orders"
              className="btn-link text-[12px]"
            >
              Bekijk alles
            </LocalizedClientLink>
          )}
        </div>

        <ul className="space-y-2" data-testid="orders-wrapper">
          {orders && orders.length > 0 ? (
            orders.slice(0, 5).map((order) => (
              <li key={order.id} data-testid="order-wrapper" data-value={order.id}>
                <LocalizedClientLink
                  href={`/account/orders/details/${order.id}`}
                  className="block surface-panel p-3.5 hover:border-jade/40 hover:bg-white transition-all"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-9 h-9 rounded-full bg-jade/10 text-jade flex items-center justify-center flex-shrink-0">
                        <Package className="w-4 h-4" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <p
                          className="text-[13.5px] font-semibold text-text-base truncate"
                          data-testid="order-id"
                          data-value={order.display_id}
                        >
                          Bestelling #{order.display_id}
                        </p>
                        <p
                          className="text-[12px] text-text-muted"
                          data-testid="order-created-date"
                        >
                          {new Date(order.created_at).toLocaleDateString("nl-NL", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className="text-[13.5px] font-semibold text-text-base"
                        data-testid="order-amount"
                      >
                        {convertToLocale({
                          amount: order.total,
                          currency_code: order.currency_code,
                        })}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#a5b3bb]" />
                    </div>
                  </div>
                </LocalizedClientLink>
              </li>
            ))
          ) : (
            <li className="surface-panel py-10 text-center">
              <span className="inline-flex w-12 h-12 rounded-full bg-jade/10 text-jade items-center justify-center mb-3.5">
                <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <p
                className="text-[13.5px] text-text-muted mb-3"
                data-testid="no-orders-message"
              >
                Je hebt nog geen bestellingen geplaatst.
              </p>
              <LocalizedClientLink href="/store" className="btn-primary inline-flex">
                Start met winkelen
              </LocalizedClientLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0
  if (!customer) return 0
  if (customer.email) count++
  if (customer.first_name && customer.last_name) count++
  if (customer.phone) count++
  const billingAddress = customer.addresses?.find((addr) => addr.is_default_billing)
  if (billingAddress) count++
  return (count / 4) * 100
}

export default Overview
