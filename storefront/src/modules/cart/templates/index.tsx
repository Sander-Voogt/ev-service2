import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="bg-page-soft min-h-[60vh]">
      <div className="content-container py-8 sm:py-12" data-testid="cart-container">
        <header className="mb-7">
          <span className="eyebrow-muted">Winkelwagen</span>
          <h1 className="display-lg mt-2 text-text-base">
            {cart?.items?.length
              ? `${cart.items.length} ${
                  cart.items.length === 1 ? "artikel" : "artikelen"
                } in je winkelwagen`
              : "Je winkelwagen"}
          </h1>
        </header>

        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-5">
            <div className="flex flex-col gap-y-4">
              {!customer && (
                <div className="surface-card p-4">
                  <SignInPrompt />
                </div>
              )}
              <div className="surface-card overflow-hidden">
                <ItemsTemplate cart={cart} />
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col gap-y-4 lg:sticky lg:top-24">
                {cart && cart.region && (
                  <div className="surface-card p-5 sm:p-6">
                    <h2 className="text-[14px] font-semibold text-text-base mb-4">
                      Besteloverzicht
                    </h2>
                    <Summary cart={cart as any} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
