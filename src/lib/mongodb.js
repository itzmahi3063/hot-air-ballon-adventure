import { MongoClient } from "mongodb";

// Cached across hot-reloads (dev) and warm serverless invocations (prod)
let clientPromise = global._mongoClientPromise;
let indexesEnsured = false;

async function getClientPromise() {
  if (clientPromise) return clientPromise;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI নেই। Local dev এর জন্য .env.local ফাইলে যোগ করুন, আর Vercel এ Project Settings → Environment Variables এ যোগ করুন।"
    );
  }

  const client = new MongoClient(uri, {});
  clientPromise = client.connect();
  global._mongoClientPromise = clientPromise;
  return clientPromise;
}

export async function getDb() {
  const client = await getClientPromise();
  const db = client.db(process.env.MONGODB_DB || "telegram_mini_app");

  if (!indexesEnsured) {
    indexesEnsured = true;
    // Idempotent - safe to call every cold start
    db.collection("users")
      .createIndex({ telegramId: 1 }, { unique: true })
      .catch(() => {});
  }

  return db;
}
