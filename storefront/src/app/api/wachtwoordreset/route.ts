import { sdk } from "@lib/config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body, body.email);

  let getidentities: any = null;

  try {
    // Fout bij fetch wordt gevangen
    getidentities = await sdk.client.fetch(`/store/auth-identities?email=${body.email}`);
    console.log(getidentities);
  } catch (error) {
    console.warn("Kon identities niet ophalen, maar ga door:", error);
    // eventueel: getidentities = null;
  }

  let status = false;

  try {
    await sdk.auth.resetPassword("customer", "emailpass", {
      identifier: body.email,
    });
    status = true;
    console.log(
      "If an account exists with the specified email, it'll receive instructions to reset the password."
    );
  } catch (error: any) {
    console.log("Reset password error:", error.message);
  }

  return NextResponse.json({ status });
}
