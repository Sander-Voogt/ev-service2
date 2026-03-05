import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import { HttpTypes } from "@medusajs/types"
import { AddCartReference } from "@modules/checkout/templates/checkout-summary/reference"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  console.log("cart in template", cart?.items)
  return (
    <div className="py-8 sm:py-12 bg-gray-50 min-h-screen">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-4 sm:gap-6 lg:gap-8">
            <div className="flex flex-col gap-y-4">
              {!customer && <SignInPrompt />}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <ItemsTemplate cart={cart} />
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-col gap-y-4 sticky top-20 lg:top-24">
                {cart && cart.region && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <Summary cart={cart as any} />
                  </div>
                )}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                  <AddCartReference />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
