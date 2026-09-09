const { MongoClient } = require("mongodb");

// IMPORTANT: the connection string lives ONLY in the MONGODB_URI environment
// variable (set in Vercel Project Settings -> Environment Variables, and in
// your local .env file which is gitignored). Never hardcode it here or
// anywhere else in the repo — that env var is the only place it should live.
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "hab_balloon";

if (!uri) {
  console.warn("[HAB] MONGODB_URI is not set — database calls will fail until it is configured.");
}

let cachedClient = null;
let cachedDb = null;

async function getDb() {
  if (cachedDb) return cachedDb;
  if (!uri) throw new Error("MONGODB_URI environment variable is not set");

  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      maxPoolSize: 5,
    });
    await cachedClient.connect();
  }
  cachedDb = cachedClient.db(dbName);
  return cachedDb;
}

module.exports = { getDb };
