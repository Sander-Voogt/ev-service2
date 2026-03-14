import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { cartId: string } }
) {
  const { cartId } = await params

  try {
    const res = await fetch(
      `${process.env.MEDUSA_BACKEND_URL}/store/carts/${cartId}`,
      {
        headers: {
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
        },
      }
    )

    if (!res.ok) {
      const error = await res.text()
      return NextResponse.json({ error }, { status: res.status })
    }

    const data = await res.json()

    return NextResponse.json(data)
  } catch (err) {
    console.error("Route error:", err)
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    )
  }
}