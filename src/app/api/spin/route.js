import { NextResponse } from "next/server";
import { authenticate, sanitizeUser } from "../../../lib/apiAuth";
import { spinWheelSegments } from "../../../data/mockData";

export async function POST(req) {
  try {
    const { initData } = await req.json();
    const auth = await authenticate(initData);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const { users, userDoc, telegramId } = auth;
    if ((userDoc.spins || 0) <= 0) {
      return NextResponse.json({ error: "No spins left" }, { status: 400 });
    }

    const index = Math.floor(Math.random() * spinWheelSegments.length);
    const result = spinWheelSegments[index];

    const inc = { spins: -1 };
    if (result.type === "usdt") inc.usdt = result.value;
    if (result.type === "points") inc.points = result.value;
    if (result.type === "spins") inc.spins += result.value;

    await users.updateOne({ telegramId }, { $inc: inc, $set: { updatedAt: new Date() } });

    const updated = await users.findOne({ telegramId });
    return NextResponse.json({ user: sanitizeUser(updated), result, index });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
