import { getDb } from "./mongodb";
import { verifyTelegramInitData } from "./telegramAuth";

/**
 * Verifies initData and loads the matching user document.
 * Every protected API route calls this first.
 */
export async function authenticate(initData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return { error: "সার্ভারে TELEGRAM_BOT_TOKEN সেট করা নেই", status: 500 };
  }

  const verified = verifyTelegramInitData(initData, botToken);
  if (!verified || !verified.user) {
    return { error: "Invalid Telegram authentication", status: 401 };
  }

  const db = await getDb();
  const users = db.collection("users");
  const userDoc = await users.findOne({ telegramId: verified.user.id });

  if (!userDoc) {
    return { error: "User not found - call /api/auth first", status: 404 };
  }

  return { db, users, userDoc, telegramId: verified.user.id, tgUser: verified.user };
}

export function sanitizeUser(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return rest;
}
