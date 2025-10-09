export async function retrieveCartClient() {
  try {
    const res = await fetch("/api/cart")
    if (!res.ok) return null
    const data = await res.json()
    return data.cart
  } catch {
    return null
  }
}
