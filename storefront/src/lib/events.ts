export const CART_UPDATED_EVENT = "cart_updated"

export const dispatchCartUpdated = () => {
  if (typeof window !== "undefined") {
    console.log('asdfasdfasdfasdfasdfasdf')
    window.dispatchEvent(new Event(CART_UPDATED_EVENT))
  }
}

export const onCartUpdated = (callback: () => void) => {
  if (typeof window !== "undefined") {
    window.addEventListener(CART_UPDATED_EVENT, callback)
    return () => window.removeEventListener(CART_UPDATED_EVENT, callback)
  }
}
