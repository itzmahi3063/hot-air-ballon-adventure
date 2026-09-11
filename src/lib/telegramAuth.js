import crypto from "crypto";

/**
 * Verifies the `initData` string that Telegram WebApp sends to the client.
 * Docs: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 *
 * Returns { user, startParam, authDate } on success, or null if invalid/expired.
 */
export function verifyTelegramInitData(initData, botToken) {
  if (!initData || !botToken) return null;

  try {
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    if (!hash) return null;
    params.delete("hash");

    const pairs = [];
    for (const [key, value] of params.entries()) {
      pairs.push(`${key}=${value}`);
    }
    pairs.sort();
    const dataCheckString = pairs.join("\n");

    const secretKey = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();
    const computedHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");

    // timing-safe compare
    const a = Buffer.from(computedHash, "hex");
    const b = Buffer.from(hash, "hex");
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return null;
    }

    const authDate = Number(params.get("auth_date") || 0);
    const now = Math.floor(Date.now() / 1000);
    // reject data older than 24h
    if (authDate && now - authDate > 86400) {
      return null;
    }

    const userStr = params.get("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const startParam = params.get("start_param") || null;

    if (!user || !user.id) return null;

    return { user, startParam, authDate };
  } catch (e) {
    return null;
  }
}
