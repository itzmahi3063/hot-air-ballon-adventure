// Initial User Profile & Balances (Updated: GEMS replaced with POINTS)
export const initialUserData = {
  name: "ADBD LAB (Developer)",
  username: "@AppDeveloper99",
  avatarText: "ADBD",
  balance: 10108.16,
  spins: 15,
  usdt: 60.0005,
  points: 14710, // Replaced GEMS with POINTS as requested
  refers: 0,
  keys: 17,
};

// Daily Watch & Earn Ad Tasks
export const initialWatchAds = [
  {
    id: "adsgram",
    title: "Adsgram",
    subtitle: "Watch Adsgram ad",
    totalSlots: 10,
    completedSlots: 0,
    rewardCoins: 500,
    rewardText: "watch a clip",
    iconBg: "bg-[#2563eb]",
    iconText: "A",
    type: "adsgram",
  },
  {
    id: "monetag",
    title: "Monetag",
    subtitle: "Watch Monetag ad",
    totalSlots: 10,
    completedSlots: 0,
    rewardCoins: 400,
    rewardText: "watch a clip",
    iconBg: "bg-[#a3e635]",
    iconText: "monetag",
    type: "monetag",
  },
  {
    id: "adsterra",
    title: "Adsterra",
    subtitle: "Watch Adsterra video",
    totalSlots: 10,
    completedSlots: 0,
    rewardCoins: 350,
    rewardText: "watch a clip",
    iconBg: "bg-[#f97316]",
    iconText: "Ad",
    type: "adsterra",
  },
];

export const initialVideoAds = initialWatchAds;

// Social Telegram Tasks
export const initialTelegramTasks = [
  {
    id: "task-1",
    title: "ADBD LAB (Developer)",
    subtitle: "Join our channel/group",
    reward: 15.00,
    link: "https://t.me/telegram",
    completed: false,
    verified: false,
  },
  {
    id: "task-2",
    title: "Work Star",
    subtitle: "Join our channel/group",
    reward: 125.00,
    link: "https://t.me/telegram",
    completed: false,
    verified: false,
  },
  {
    id: "task-3",
    title: "Work Star uk",
    subtitle: "Join our channel/group",
    reward: 102.00,
    link: "https://t.me/telegram",
    completed: false,
    verified: false,
  },
  {
    id: "task-4",
    title: "Crypto Community Hub",
    subtitle: "Join our announcement channel",
    reward: 50.00,
    link: "https://t.me/telegram",
    completed: false,
    verified: false,
  }
];

// Exclusive Tasks
export const initialExclusiveTasks = [
  {
    id: "ex-1",
    title: "Invite 5 Active Friends",
    subtitle: "Earn exclusive bonus keys & USDT",
    reward: 500.00,
    progress: "0 / 5",
    completed: false,
  },
  {
    id: "ex-2",
    title: "Spin Wheel 20 Times",
    subtitle: "Unlock master spinner badge",
    reward: 1000.00,
    progress: "15 / 20",
    completed: false,
  }
];

// Partner Tasks
export const initialPartnerTasks = [
  {
    id: "pt-1",
    title: "Ton Station Bot",
    subtitle: "Launch & connect TON wallet",
    reward: 200.00,
    completed: false,
    link: "https://t.me/telegram",
  },
  {
    id: "pt-2",
    title: "Major Bot Partner",
    subtitle: "Check partner Telegram bot",
    reward: 180.00,
    completed: false,
    link: "https://t.me/telegram",
  }
];

// Lucky Spin Wheel Segments (Updated: Gems replaced with Points)
export const spinWheelSegments = [
  { label: "$0.50 USDT", value: 0.50, type: "usdt", color: "#f97316", textColor: "#ffffff" },
  { label: "100 Points", value: 100, type: "points", color: "#10b981", textColor: "#ffffff" },
  { label: "200 Points", value: 200, type: "points", color: "#ec4899", textColor: "#ffffff" },
  { label: "500 Points", value: 500, type: "points", color: "#f43f5e", textColor: "#ffffff" },
  { label: "$0.10 USDT", value: 0.10, type: "usdt", color: "#eab308", textColor: "#1f1402" },
  { label: "50 Points", value: 50, type: "points", color: "#06b6d4", textColor: "#ffffff" },
  { label: "2 Spins", value: 2, type: "spins", color: "#3b82f6", textColor: "#ffffff" },
  { label: "1 000 Points", value: 1000, type: "points", color: "#8b5cf6", textColor: "#ffffff" },
];

// 3D Treasure Chest Rewards (server picks randomly when a key is used)
export const chestRewards = [
  { type: "usdt", amount: 0.15, label: "+$0.15 USDT", icon: "💵" },
  { type: "points", amount: 800, label: "+800 POINTS", icon: "🪙" },
  { type: "points", amount: 450, label: "+450 POINTS", icon: "🪙" },
  { type: "spins", amount: 3, label: "+3 SPINS", icon: "🎰" },
];

// Referral Settings
export const referralConfig = {
  commissionPercent: 30,
  tier1: 20,
  tier2: 10,
  botUsername: "YourBotName_bot",
};

// Withdrawal Methods
export const withdrawalMethods = [
  { id: "ton", name: "USDT (TON Network)", min: 5.0, icon: "💎", placeholder: "Enter TON / USDT wallet address" },
  { id: "binance", name: "Binance Pay ID", min: 5.0, icon: "🟡", placeholder: "Enter Binance Pay ID" },
  { id: "bkash", name: "bKash (BD)", min: 3.0, icon: "🌸", placeholder: "Enter bKash Personal Number (01XXXXXXXXX)" },
  { id: "nagad", name: "Nagad (BD)", min: 3.0, icon: "🟠", placeholder: "Enter Nagad Personal Number (01XXXXXXXXX)" },
  { id: "payeer", name: "Payeer Wallet", min: 2.0, icon: "🅿️", placeholder: "Enter Payeer Account (P12345678)" },
];
