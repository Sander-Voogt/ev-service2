import { NextResponse } from "next/server";
import api from "@lib/ghost";

export async function GET() {
  try {
    const posts = await api.posts.browse({
      limit: "all",
      include: ["tags", "authors"],
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
