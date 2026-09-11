import { NextResponse } from "next/server";
import { authenticate, sanitizeUser } from "../../../lib/apiAuth";
import { chestRewards } from "../../../data/mockData";

export async function POST(req) {
  try {
    const { initData } = await req.json();
    const auth = await authenticate(initData);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const { users, userDoc, telegramId } = auth;
    if ((userDoc.keys || 0) <= 0) {
      return NextResponse.json({ error: "No keys left" }, { status: 400 });
    }

    const reward = chestRewards[Math.floor(Math.random() * chestRewards.length)];

    const inc = { keys: -1 };
    if (reward.type === "usdt") inc.usdt = reward.amount;
    if (reward.type === "points") inc.points = reward.amount;
    if (reward.type === "spins") inc.spins = reward.amount;

    await users.updateOne({ telegramId }, { $inc: inc, $set: { updatedAt: new Date() } });

    const updated = await users.findOne({ telegramId });
    return NextResponse.json({ user: sanitizeUser(updated), reward });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
