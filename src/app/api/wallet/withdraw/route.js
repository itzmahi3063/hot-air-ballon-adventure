import { NextResponse } from "next/server";
import { authenticate, sanitizeUser } from "../../../../lib/apiAuth";
import { withdrawalMethods } from "../../../../data/mockData";

export async function POST(req) {
  try {
    const { initData, methodId, amount, address } = await req.json();
    const auth = await authenticate(initData);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const { db, users, userDoc, telegramId } = auth;

    const method = withdrawalMethods.find((m) => m.id === methodId);
    if (!method) return NextResponse.json({ error: "Unknown withdrawal method" }, { status: 400 });

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      return NextResponse.json({ error: "Please enter a valid amount" }, { status: 400 });
    }
    if (numAmount > userDoc.usdt) {
      return NextResponse.json({ error: "Insufficient USDT balance" }, { status: 400 });
    }
    if (numAmount < method.min) {
      return NextResponse.json(
        { error: `Minimum withdrawal is $${method.min} USDT` },
        { status: 400 }
      );
    }
    if (!address || !address.trim()) {
      return NextResponse.json({ error: "Please enter your wallet or account number" }, { status: 400 });
    }

    await db.collection("withdrawals").insertOne({
      telegramId,
      method: method.name,
      amount: numAmount,
      address: address.trim(),
      status: "pending",
      createdAt: new Date(),
    });

    await users.updateOne(
      { telegramId },
      { $inc: { usdt: -numAmount }, $set: { updatedAt: new Date() } }
    );

    const updated = await users.findOne({ telegramId });
    return NextResponse.json({ user: sanitizeUser(updated) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
