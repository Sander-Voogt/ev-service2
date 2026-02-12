import { sdk } from "@lib/config";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const body = await request.json()
  console.log(body, body.email)
  console.log("Triggering password reset for email:", body.email)
    let status = false

    const authmaken = await sdk.client.fetch("/store/custom/reset-password", {
      method: "POST",
      body: {
        email: body.email
      }
    })

    console.log("Response from password reset API:", authmaken) 
    sdk.auth.resetPassword("customer", "emailpass", {
        identifier: body.email,
    }).then(() => {
        status = true
      console.log("If an account exists with the specified email, it'll receive instructions to reset the password.")
    })
    .catch((error) => {
      console.log(error.message)
    })
    .finally(() => {

    })

    return NextResponse.json(status) 
}