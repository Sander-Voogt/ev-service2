import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postcode = searchParams.get("postcode");
  const number = searchParams.get("number");

  if (!postcode || !number) {
    return NextResponse.json(
      { error: "postcode en number zijn verplicht" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://json.api-postcode.nl?postcode=${postcode}&number=${number}`,
      {
        headers: {
          "token": 'f4748a15-04da-4f8a-8635-f4bda32d30db', // zet je token in .env
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
