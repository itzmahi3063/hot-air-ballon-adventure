import { NextResponse } from "next/server";
import { authenticate, sanitizeUser } from "../../../lib/apiAuth";

export async function POST(req) {
  try {
    const { initData } = await req.json();
    const auth = await authenticate(initData);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    return NextResponse.json({ user: sanitizeUser(auth.userDoc) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
