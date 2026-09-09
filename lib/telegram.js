const crypto = require("crypto");

// Bot token lives ONLY in the TELEGRAM_BOT_TOKEN environment variable.
// Get it from @BotFather and set it in Vercel Project Settings, never in code.
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

/**
 * Verifies Telegram WebApp initData against the bot token, per Telegram's
 * documented HMAC scheme, and returns the parsed user object if valid.
 * https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
function verifyInitData(initData) {
  if (!BOT_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN environment variable is not set");
  if (!initData) return null;

  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  params.delete("hash");

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");

  const secretKey = crypto.createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
  const computedHash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

  if (computedHash !== hash) return null;

  const userRaw = params.get("user");
  const user = userRaw ? JSON.parse(userRaw) : null;
  const startParam = params.get("start_param") || null;

  return { user, startParam };
}

async function callTelegramApi(method, payload) {
  if (!BOT_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN environment variable is not set");
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

module.exports = { verifyInitData, callTelegramApi };
