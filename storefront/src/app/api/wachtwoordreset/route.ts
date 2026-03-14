import { sdk } from "@lib/config";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const body = await request.json()

  try {
    const authmaken = await sdk.client.fetch("/store/custom/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { email: body.email },
    })

    console.log("custom reset endpoint response:", authmaken)

    const resetResponse = await sdk.auth.resetPassword("customer", "emailpass", {
      identifier: body.email,
    })

    console.log("resetPassword response:", resetResponse)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.log("password reset error:", error)

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}