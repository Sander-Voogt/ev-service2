import { sdk } from "@lib/config";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const body = await request.json()
  console.log(body, body.email)
    let status = false
    sdk.auth.updateProvider("customer", "emailpass", {
      email: body.email,
      password: body.password,
    }, body.token).then(() => {
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