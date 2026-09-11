async function post(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  authenticate: (initData) => post("/api/auth", { initData }),
  getUser: (initData) => post("/api/user", { initData }),
  watchAd: (initData, adId) => post("/api/tasks/watch-ad", { initData, adId }),
  verifyTelegramTask: (initData, taskId) =>
    post("/api/tasks/verify-telegram", { initData, taskId }),
  spin: (initData) => post("/api/spin", { initData }),
  openChest: (initData) => post("/api/chest", { initData }),
  withdraw: (initData, methodId, amount, address) =>
    post("/api/wallet/withdraw", { initData, methodId, amount, address }),
};
