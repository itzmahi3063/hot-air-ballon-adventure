# Telegram Mini App — Rewards, Tasks, Spin & Wallet

Next.js 14 (App Router) frontend + a real backend (Next.js API routes + MongoDB Atlas)
for a Telegram Mini App with daily ad-watch rewards, social tasks, a lucky-spin wheel,
a treasure chest, referrals, and USDT withdrawal requests.

## Architecture

- **Frontend:** `src/app`, `src/components` — Next.js client components, Telegram WebApp SDK.
- **Backend:** `src/app/api/*` — serverless API routes (auth, tasks, spin, chest, withdraw).
- **Database:** MongoDB Atlas (free tier) — `users` and `withdrawals` collections.
- **Auth:** Telegram Mini App `initData` is verified server-side with an HMAC signature
  (see `src/lib/telegramAuth.js`) using your bot token — so results can't be faked from
  the browser console. All game outcomes (spin result, chest reward) are decided **on the
  server**, never trusted from the client.

## 1. MongoDB Atlas setup (free)

1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Database Access → add a database user (username/password).
3. Network Access → Add IP Address → **Allow access from anywhere** (`0.0.0.0/0`) — required
   because Vercel serverless functions don't have a fixed IP.
4. Connect → Drivers → copy the connection string, it looks like:
   `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority`

## 2. Telegram Bot setup

1. You already have a bot token from **@BotFather**.
2. In @BotFather: `/mybots` → your bot → **Bot Settings → Menu Button** (or `/newapp`) →
   set the Mini App URL to your Vercel deployment URL (e.g. `https://your-app.vercel.app`).
3. Keep the bot token secret — never put it in frontend code, only in server env vars.

## 3. Environment variables

Copy `.env.example` to `.env.local` for local dev:

```
MONGODB_URI=mongodb+srv://...
MONGODB_DB=telegram_mini_app
TELEGRAM_BOT_TOKEN=123456789:AA...
```

On **Vercel**: Project → Settings → Environment Variables → add the same 3 keys
(for Production, Preview, and Development), then redeploy.

## 4. Run locally

```bash
npm install
npm run dev
```

Note: real API calls (auth, spin, tasks, etc.) require a valid Telegram `initData`,
so full end-to-end testing only works when opened inside Telegram via your bot's
Mini App button. Opening the raw URL in a normal browser will show a
"open this inside Telegram" screen — that's expected.

## 5. Deploy

1. Push this repo to GitHub (files at the repo root — `package.json` must sit at root).
2. Import the repo in Vercel → Framework auto-detected as Next.js.
3. Add the 3 environment variables above.
4. Deploy. Free (Hobby) plan is enough — no paid features are used.

## API routes

| Route                          | Method | Purpose                                      |
|---------------------------------|--------|-----------------------------------------------|
| `/api/auth`                     | POST   | Verify Telegram user, create/load their record |
| `/api/user`                     | POST   | Fetch current user                            |
| `/api/tasks/watch-ad`           | POST   | Grant reward for a watched ad (slot-limited)  |
| `/api/tasks/verify-telegram`    | POST   | Mark a Telegram-join task complete            |
| `/api/spin`                     | POST   | Server picks the spin result, deducts a spin  |
| `/api/chest`                    | POST   | Server picks the chest reward, deducts a key  |
| `/api/wallet/withdraw`          | POST   | Validates and records a withdrawal request    |

## Data model (MongoDB `users` collection)

```
telegramId, name, username, avatarText,
balance, spins, usdt, points, refers, keys,
referredBy, completedAdSlots: { adId: count },
completedTelegramTasks: [taskId, ...],
createdAt, updatedAt
```
