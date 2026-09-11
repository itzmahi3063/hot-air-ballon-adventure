# 📱 Telegram Mini App (TMA) - Dark Gold & Cyber Purple

একটি সম্পূর্ণ রেডি-টু-ইউজ টেলিগ্রাম মিনি অ্যাপ (Telegram Mini App), যা আপনার দেওয়া ৪টি স্ক্রিনশটের ডিজাইন, রঙ এবং UI ইলিমেন্ট অনুসরণ করে তৈরি করা হয়েছে।

---

## 🌟 মূল ফিচারসমূহ (Features):

1. **Home Tab (গোল্ডেন লাক্সারি থিম):**
   - প্রোফাইল তথ্য (`ADBD LAB (Developer)`, `@AppDeveloper99`), জ্বলজ্বলে গোল্ডেন ব্যালেন্স কাউন্টার।
   - ৪টি স্ট্যাটাস কার্ড: `SPINS`, `USDT`, `GEMS`, `REFERS`।
   - কেন্দ্রে ৩ডি স্টাইলের গোল্ডেন ট্রেজার চেস্ট (Chest) এবং তার চারপাশে ৬টি অ্যাকশন বাটন: `Watch Ads`, `Tasks`, `Refer`, `Spin`, `Wallet`, `Profile`।
   - `🔑 17 Keys` ব্যাজ এবং `🏆 Tap to Open Chest` বাটন (ক্লিক করলে কি ব্যবহার করে রিওয়ার্ড আনলক হয়)।
   - `Invite Friends` ব্যানার (LIFETIME কমিশন ট্যাগসহ)।

2. **Earn Tab (টেলিগ্রাম টাস্ক ও ভিডিও অ্যাডস):**
   - **Telegram Tasks:** চ্যানেলে জয়েন করার জন্য `JOIN CHANNEL` বাটন এবং রিওয়ার্ড নেওয়ার জন্য `VERIFY` বাটন (ভেরিফাই অ্যানিমেশনসহ)।
   - **Video Ads (Task Desk):** Monetag ও Adsterra-এর মতো অ্যাড দেখার অপশন ও বোনাস পয়েন্ট/কি নেওয়ার সুবিধা।

3. **Lucky Spin Modal (নিয়ন পার্পল থিম):**
   - ৮টি রঙের সেগমেন্টসহ ফুল ইন্টারঅ্যাক্টিভ স্পিন হুইল।
   - রিওয়ার্ড: `$0.50 USDT`, `100 Gems`, `200 Points`, `500 Points`, `$0.10 USDT`, `50 Gems`, `2 Spins`, `1 000 Points`।
   - সেন্ট্রাল 777 স্লট লোগো এবং রিয়েল ফিজিক্স স্পিনিং অ্যানিমেশন ও উইনিং সেলিব্রেশন কনফেটি!

4. **Refer Tab (রেফার ও ইনভাইট):**
   - পারসোনাল রেফারাল লিংক এবং ১-ক্লিক `Copy Link` ও `Share to Telegram` বাটন।
   - Tier 1 (20%) এবং Tier 2 (10%) কমিশন আর্নিং হিস্ট্রি।

5. **Wallet Tab (উইথড্র ও ব্যালেন্স):**
   - ব্যালেন্স ওভারভিউ এবং আনুমানিক টাকা (BDT) হিসাব।
   - উইথড্র মেথড: **USDT (TON Network)**, **Binance Pay**, **bKash**, **Nagad**, **Payeer**।
   - উইথড্র রিকোয়েস্ট ফর্ম ও হিস্ট্রি।

---

## 🛠️ সব বাটন ও ডেটা সহজে পরিবর্তন করার উপায়:

আপনার নিজের চ্যানেল লিংক, নাম, টাস্ক বা রিওয়ার্ড পরিবর্তন করার জন্য শুধু এই ফাইলটি এডিট করবেন:
📁 **`src/data/mockData.js`**

সেখানে খুব সহজভাবে সব কিছু আলাদা করে দেওয়া আছে:
- `initialUserData`: ব্যালেন্স, ইউজারনেম, কি, ইত্যাদি।
- `initialTelegramTasks`: আপনার টেলিগ্রাম চ্যানেল ও গ্রুপের লিংক এবং রিওয়ার্ড এমাউন্ট।
- `initialVideoAds`: আপনার অ্যাড নেটওয়ার্কের নাম ও পয়েন্ট।
- `spinWheelSegments`: স্পিন হুইলের প্রাইজ ও কালার।
- `withdrawalMethods`: উইথড্র অপশন এবং মিনিমাম লিমিট।

---

## 🚀 GitHub Repo তৈরি এবং Vercel-এ Deploy করার নিয়ম:

### ১. GitHub-এ আপলোড:
1. আপনার ব্রাউজারে [GitHub.com](https://github.com) এ লগইন করে একটি নতুন Repository তৈরি করুন (যেমন: `telegram-mini-app`)।
2. আপনার প্রোজেক্ট ফোল্ডারে টার্মিনাল খুলে কমান্ডগুলো চালান:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Telegram Mini App UI"
   git branch -M main
   git remote add origin https://github.com/আপনার-ইউজারনেম/telegram-mini-app.git
   git push -u origin main
   ```

### ২. Vercel-এ Deploy করা:
1. [Vercel.com](https://vercel.com) এ আপনার GitHub অ্যাকাউন্ট দিয়ে লগইন করুন।
2. **"Add New Project"** এ ক্লিক করে আপনার GitHub Repo টি সিলেক্ট করুন।
3. Framework Preset হিসেবে **Next.js** স্বয়ংক্রিয়ভাবে থাকবে।
4. **"Deploy"** বাটনে ক্লিক করুন। মাত্র ১ মিনিটের মধ্যে আপনার মিনি অ্যাপ লাইভ হয়ে যাবে এবং একটি লিংক (`https://telegram-mini-app-xxx.vercel.app`) পাবেন!

### ৩. Telegram Bot-এ Mini App যুক্ত করা:
1. টেলিগ্রামে `@BotFather` এ যান।
2. `/newapp` বা `/mybots` লিখে আপনার বট সিলেক্ট করুন।
3. **Bot Settings** -> **Menu Button** -> **Configure Menu Button** এ গিয়ে আপনার Vercel-এর লাইভ লিংকটি পেস্ট করে দিন।
4. ব্যস! এখন টেলিগ্রামে যে কেউ আপনার বটের মেনু বাটনে ক্লিক করলেই অ্যাপটি ওপেন হবে!
