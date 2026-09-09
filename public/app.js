// ===== CONFIG =====
const BOT_USERNAME = "hotairballon_bot";
const APP_SHORTNAME = "Play";

// ===== TELEGRAM WEBAPP INIT =====
const tg = window.Telegram ? window.Telegram.WebApp : null;
if (tg) {
  tg.ready();
  tg.expand();
}

const tgUser = tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? tg.initDataUnsafe.user : null;

// ===== STATE =====
let profile = {
  uid: tgUser ? String(tgUser.id) : "000000000",
  name: tgUser ? [tgUser.first_name, tgUser.last_name].filter(Boolean).join(" ") : "Guest",
  avatar: tgUser && tgUser.photo_url ? tgUser.photo_url : "",
  habBalance: 0,
  usdtWithdrawable: 0,
  totalEarned: 0,
  referrals: 0,
  withdrawals: 0,
  bestScore: null,
  friends: { total: 0, valid: 0, earnings: 0, commission: 0 }
};

// ===== TAB NAVIGATION =====
const views = {
  home: document.getElementById("view-home"),
  task: document.getElementById("view-task"),
  game: document.getElementById("view-game"),
  friends: document.getElementById("view-friends"),
  profile: document.getElementById("view-profile"),
};
const navButtons = document.querySelectorAll(".nav-btn");

function showTab(tab) {
  Object.entries(views).forEach(([key, el]) => {
    el.classList.toggle("hidden", key !== tab);
  });
  navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-tab]").forEach((el) => {
  el.addEventListener("click", () => showTab(el.dataset.tab));
});

// placeholder rows not built yet (withdraw modal, ads network, wallet page, etc.)
document.querySelectorAll("[data-nav]").forEach((el) => {
  el.addEventListener("click", () => {
    if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
    toast("Coming soon");
  });
});

// ===== TASK PILL TABS =====
document.querySelectorAll("[data-task-tab]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-task-tab]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    // task lists per category will be wired up once the task system is built
  });
});

// ===== TOAST =====
let toastTimer = null;
function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.style.cssText =
      "position:fixed;left:50%;bottom:96px;transform:translateX(-50%);background:rgba(20,33,48,0.95);border:1px solid rgba(120,200,190,0.25);color:#eef4f2;padding:10px 18px;border-radius:999px;font-size:12.5px;z-index:99;transition:opacity .2s;";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = "1";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.style.opacity = "0"), 1600);
}

// ===== RENDER PROFILE =====
function renderProfile() {
  const initials = (profile.name || "?").trim().charAt(0).toUpperCase();
  const avatarSrc =
    profile.avatar ||
    `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#1c3a33"/><text x="50%" y="56%" font-size="34" fill="#34d9ad" text-anchor="middle" font-family="sans-serif">${initials}</text></svg>`
    )}`;

  document.getElementById("pfAvatar").src = avatarSrc;
  document.getElementById("pfName").textContent = profile.name;
  document.getElementById("pfUid").textContent = profile.uid;
  document.getElementById("pfUid2").textContent = profile.uid;
  document.getElementById("pfCoin").textContent = formatNum(profile.habBalance);

  document.getElementById("habBalance").textContent = formatNum(profile.habBalance);
  document.getElementById("usdAfterFee").textContent = `$${feeAdjusted(profile.habBalance).toFixed(4)} after Convert (5% fee)`;
  document.getElementById("usdtWithdrawable").textContent = `$${profile.usdtWithdrawable.toFixed(4)}`;

  document.getElementById("statEarned").textContent = formatNum(profile.totalEarned);
  document.getElementById("statReferrals").textContent = formatNum(profile.referrals);
  document.getElementById("statWithdrawals").textContent = formatNum(profile.withdrawals);

  document.getElementById("bestScore").textContent = profile.bestScore || "—";

  document.getElementById("prAvatar").src = avatarSrc;
  document.getElementById("prName").textContent = profile.name;
  document.getElementById("prUid").textContent = profile.uid;

  document.getElementById("frTotal").textContent = formatNum(profile.friends.total);
  document.getElementById("frValid").textContent = formatNum(profile.friends.valid);
  document.getElementById("frEarnings").innerHTML = `${formatNum(profile.friends.earnings)} <small>HAB</small>`;
  document.getElementById("frCommission").innerHTML = `${formatNum(profile.friends.commission)} <small>HAB</small>`;

  const link = `https://t.me/${BOT_USERNAME}/${APP_SHORTNAME}?startapp=${profile.uid}`;
  document.getElementById("refLink").textContent = link;
}

function formatNum(n) {
  return Number(n || 0).toLocaleString("en-US");
}
// 50,000 HAB = $1, minus 5% convert fee
function feeAdjusted(hab) {
  const usd = (hab || 0) / 50000;
  return usd * 0.95;
}

// ===== REFERRAL LINK ACTIONS =====
function getRefLink() {
  return `https://t.me/${BOT_USERNAME}/${APP_SHORTNAME}?startapp=${profile.uid}`;
}

async function copyRefLink() {
  const link = getRefLink();
  try {
    await navigator.clipboard.writeText(link);
    toast("Link copied");
  } catch (e) {
    toast(link);
  }
}

document.getElementById("copyLinkBtn").addEventListener("click", copyRefLink);
document.getElementById("copyRefBtn").addEventListener("click", copyRefLink);

document.getElementById("shareRefBtn").addEventListener("click", () => {
  const link = getRefLink();
  const text = "🎈 Join Hot Air Balloon and earn HAB Coin with me!";
  if (tg && tg.openTelegramLink) {
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`);
  } else {
    copyRefLink();
  }
});

// ===== WITHDRAW / PLAY / LOGOUT =====
document.getElementById("withdrawBtn").addEventListener("click", () => toast("Withdraw flow coming soon"));
document.getElementById("playBtn").addEventListener("click", () => toast("Game launching soon"));
document.getElementById("logoutBtn").addEventListener("click", () => {
  if (tg && tg.close) tg.close();
});
document.getElementById("closeBtn").addEventListener("click", () => {
  if (tg && tg.close) tg.close();
});
document.getElementById("bellBtn").addEventListener("click", () => toast("No new notifications"));

// ===== LOAD PROFILE FROM BACKEND =====
async function loadProfile() {
  if (!tg || !tg.initData) {
    renderProfile();
    return;
  }
  try {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: tg.initData }),
    });
    if (!res.ok) throw new Error("bad response");
    const data = await res.json();
    profile = { ...profile, ...data };
  } catch (e) {
    console.warn("[HAB] profile load failed, using local Telegram data", e);
  }
  renderProfile();
}

renderProfile();
loadProfile();
