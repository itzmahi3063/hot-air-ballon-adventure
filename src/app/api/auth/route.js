import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { verifyTelegramInitData } from "../../../lib/telegramAuth";
import { defaultUserFields, REFERRAL_BONUS_POINTS } from "../../../lib/userDefaults";
import { sanitizeUser } from "../../../lib/apiAuth";

export async function POST(req) {
  try {
    const { initData } = await req.json();
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      return NextResponse.json(
        { error: "সার্ভারে TELEGRAM_BOT_TOKEN সেট করা নেই" },
        { status: 500 }
      );
    }

    const verified = verifyTelegramInitData(initData, botToken);
    if (!verified || !verified.user) {
      return NextResponse.json({ error: "Invalid Telegram authentication" }, { status: 401 });
    }

    const { user: tgUser, startParam } = verified;
    const db = await getDb();
    const users = db.collection("users");

    let userDoc = await users.findOne({ telegramId: tgUser.id });

    if (!userDoc) {
      let referredBy = null;
      if (startParam && startParam.startsWith("ref_")) {
        const refId = Number(startParam.replace("ref_", ""));
        if (!isNaN(refId) && refId !== tgUser.id) referredBy = refId;
      }

      const newUser = {
        telegramId: tgUser.id,
        name: `${tgUser.first_name || ""} ${tgUser.last_name || ""}`.trim() || "Player",
        username: tgUser.username ? `@${tgUser.username}` : "",
        avatarText: (tgUser.first_name || "P").slice(0, 4).toUpperCase(),
        referredBy,
        completedAdSlots: { adsgram: 0, monetag: 0, adsterra: 0 },
        completedTelegramTasks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        ...defaultUserFields,
      };

      await users.insertOne(newUser);
      userDoc = newUser;

      if (referredBy) {
        await users.updateOne(
          { telegramId: referredBy },
          {
            $inc: { refers: 1, points: REFERRAL_BONUS_POINTS },
            $set: { updatedAt: new Date() },
          }
        );
      }
    } else {
      await users.updateOne(
        { telegramId: tgUser.id },
        {
          $set: {
            name: `${tgUser.first_name || ""} ${tgUser.last_name || ""}`.trim() || userDoc.name,
            username: tgUser.username ? `@${tgUser.username}` : userDoc.username,
            updatedAt: new Date(),
          },
        }
      );
      userDoc = await users.findOne({ telegramId: tgUser.id });
    }

    return NextResponse.json({ user: sanitizeUser(userDoc) });
  } catch (err) {
    console.error("auth error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
