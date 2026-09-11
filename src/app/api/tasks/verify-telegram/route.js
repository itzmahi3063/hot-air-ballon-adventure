import { NextResponse } from "next/server";
import { authenticate, sanitizeUser } from "../../../../lib/apiAuth";
import { initialTelegramTasks } from "../../../../data/mockData";

export async function POST(req) {
  try {
    const { initData, taskId } = await req.json();
    const auth = await authenticate(initData);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const { users, userDoc, telegramId } = auth;
    const task = initialTelegramTasks.find((t) => t.id === taskId);
    if (!task) return NextResponse.json({ error: "Unknown task" }, { status: 400 });

    if ((userDoc.completedTelegramTasks || []).includes(taskId)) {
      return NextResponse.json({ error: "Already completed" }, { status: 400 });
    }

    await users.updateOne(
      { telegramId },
      {
        $addToSet: { completedTelegramTasks: taskId },
        $inc: { points: task.reward, balance: task.reward },
        $set: { updatedAt: new Date() },
      }
    );

    const updated = await users.findOne({ telegramId });
    return NextResponse.json({ user: sanitizeUser(updated), reward: task.reward });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
