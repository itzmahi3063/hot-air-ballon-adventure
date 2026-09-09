const { getDb } = require("../lib/db");
const { verifyInitData } = require("../lib/telegram");

const REFERRAL_JOIN_BONUS = 30; // HAB
const REFERRAL_TASK_BONUS = 280; // HAB
const REFERRAL_COMMISSION_PCT = 10;
const HAB_PER_USD = 50000;
const CONVERT_FEE_PCT = 5;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { initData } = req.body || {};
    const verified = verifyInitData(initData);
    if (!verified || !verified.user) {
      return res.status(401).json({ error: "Invalid Telegram init data" });
    }

    const { user, startParam } = verified;
    const uid = String(user.id);
    const db = await getDb();
    const users = db.collection("users");

    let doc = await users.findOne({ uid });

    if (!doc) {
      doc = {
        uid,
        name: [user.first_name, user.last_name].filter(Boolean).join(" ") || "Player",
        username: user.username || null,
        avatar: user.photo_url || null,
        habBalance: 0,
        totalEarned: 0,
        withdrawals: 0,
        bestScore: null,
        referredBy: startParam && startParam !== uid ? startParam : null,
        friends: { total: 0, valid: 0, earnings: 0, commission: 0 },
        createdAt: new Date(),
      };
      await users.insertOne(doc);

      // credit the referrer's join bonus, if applicable
      if (doc.referredBy) {
        await users.updateOne(
          { uid: doc.referredBy },
          {
            $inc: {
              habBalance: REFERRAL_JOIN_BONUS,
              totalEarned: REFERRAL_JOIN_BONUS,
              "friends.total": 1,
              "friends.earnings": REFERRAL_JOIN_BONUS,
            },
          }
        );
      }
    } else {
      // keep name/avatar fresh
      await users.updateOne(
        { uid },
        {
          $set: {
            name: [user.first_name, user.last_name].filter(Boolean).join(" ") || doc.name,
            username: user.username || doc.username,
            avatar: user.photo_url || doc.avatar,
          },
        }
      );
    }

    const habBalance = doc.habBalance || 0;
    const usd = (habBalance / HAB_PER_USD) * (1 - CONVERT_FEE_PCT / 100);

    return res.status(200).json({
      uid,
      name: doc.name,
      avatar: doc.avatar,
      habBalance,
      usdtWithdrawable: usd,
      totalEarned: doc.totalEarned || 0,
      referrals: doc.friends ? doc.friends.total : 0,
      withdrawals: doc.withdrawals || 0,
      bestScore: doc.bestScore,
      friends: doc.friends || { total: 0, valid: 0, earnings: 0, commission: 0 },
    });
  } catch (err) {
    console.error("[HAB] /api/user error", err);
    return res.status(500).json({ error: "Server error" });
  }
};
