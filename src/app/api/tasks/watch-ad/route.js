import { NextResponse } from "next/server";
import { authenticate, sanitizeUser } from "../../../../lib/apiAuth";
import { initialWatchAds } from "../../../../data/mockData";

export async function POST(req) {
  try {
    const { initData, adId } = await req.json();
    const auth = await authenticate(initData);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const { users, userDoc, telegramId } = auth;
    const ad = initialWatchAds.find((a) => a.id === adId);
    if (!ad) return NextResponse.json({ error: "Unknown ad" }, { status: 400 });

    const currentCount = userDoc.completedAdSlots?.[adId] || 0;
    if (currentCount >= ad.totalSlots) {
      return NextResponse.json({ error: "Today's slots are already completed" }, { status: 400 });
    }

    const nextCount = currentCount + 1;

    await users.updateOne(
      { telegramId },
      {
        $set: {
          [`completedAdSlots.${adId}`]: nextCount,
          updatedAt: new Date(),
        },
        $inc: {
          points: ad.rewardCoins,
          balance: ad.rewardCoins,
        },
      }
    );

    const updated = await users.findOne({ telegramId });

    return NextResponse.json({
      user: sanitizeUser(updated),
      reward: ad.rewardCoins,
      slotsCompleted: nextCount,
      totalSlots: ad.totalSlots,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
