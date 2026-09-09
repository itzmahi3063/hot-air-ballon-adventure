const { callTelegramApi } = require("../lib/telegram");

const APP_URL = process.env.APP_URL; // e.g. https://your-vercel-app.vercel.app
const BOT_USERNAME = process.env.BOT_USERNAME || "hotairballon_bot";
const APP_SHORTNAME = process.env.APP_SHORTNAME || "Play";

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).send("HAB bot webhook is alive");
  }

  try {
    const update = req.body;
    const msg = update.message;

    if (msg && msg.text && msg.text.startsWith("/start")) {
      const chatId = msg.chat.id;
      const miniAppLink = `https://t.me/${BOT_USERNAME}/${APP_SHORTNAME}`;

      await callTelegramApi("sendMessage", {
        chat_id: chatId,
        text: "🎈 Welcome to Hot Air Balloon!\nRide the air currents, earn HAB Coin, and cash out to USDT.",
        reply_markup: {
          inline_keyboard: [[{ text: "🎈 Open Hot Air Balloon", url: miniAppLink }]],
        },
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[HAB] /api/bot error", err);
    return res.status(200).json({ ok: true }); // always 200 so Telegram doesn't retry-storm
  }
};
