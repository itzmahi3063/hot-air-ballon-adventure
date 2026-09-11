"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import HomeTab from "../components/HomeTab";
import TasksTab from "../components/TasksTab";
import ReferTab from "../components/ReferTab";
import WalletTab from "../components/WalletTab";
import SpinModal from "../components/SpinModal";
import ChestModal from "../components/ChestModal";
import ProfileModal from "../components/ProfileModal";
import { api } from "../lib/api";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState(null);
  const [initData, setInitData] = useState(null);
  const [authStatus, setAuthStatus] = useState("loading"); // loading | ok | no-telegram | error
  const [authErrorMsg, setAuthErrorMsg] = useState("");

  // Modals state
  const [showSpinModal, setShowSpinModal] = useState(false);
  const [showChestModal, setShowChestModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  // Telegram WebApp init + real authentication against the backend
  useEffect(() => {
    async function boot() {
      if (typeof window === "undefined") return;

      const tg = window.Telegram?.WebApp;

      if (!tg || !tg.initData) {
        // Not opened inside Telegram - real rewards need Telegram auth
        setAuthStatus("no-telegram");
        return;
      }

      try {
        tg.ready();
        tg.expand();
      } catch (e) {
        // ignore
      }

      try {
        const raw = tg.initData;
        setInitData(raw);
        const data = await api.authenticate(raw);
        setUser(data.user);
        setAuthStatus("ok");
      } catch (err) {
        setAuthStatus("error");
        setAuthErrorMsg(err.message || "Authentication failed");
      }
    }

    boot();
  }, []);

  const handleUserUpdate = useCallback((updatedUser) => {
    setUser(updatedUser);
  }, []);

  // Spin Wheel - server decides the result
  const handleSpin = useCallback(async () => {
    const data = await api.spin(initData);
    setUser(data.user);
    return { result: data.result, index: data.index };
  }, [initData]);

  // Chest - server decides the reward
  const handleOpenChest = useCallback(async () => {
    const data = await api.openChest(initData);
    setUser(data.user);
    showToast(`Unlocked 3D Chest: ${data.reward.label}!`);
    return data.reward;
  }, [initData, showToast]);

  // Withdrawal
  const handleWithdrawSubmit = useCallback(
    async ({ methodId, amount, address }) => {
      const data = await api.withdraw(initData, methodId, amount, address);
      setUser(data.user);
      showToast(`Withdrawal requested: $${amount}`);
    },
    [initData, showToast]
  );

  // ---- Loading / gating screens ----

  if (authStatus === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-center px-6">
        <div className="w-10 h-10 border-4 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin" />
        <p className="text-sm text-neutral-400 font-semibold">Loading...</p>
      </div>
    );
  }

  if (authStatus === "no-telegram") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-center px-6">
        <span className="text-4xl">🔒</span>
        <h2 className="text-white font-black text-lg">এই অ্যাপটি Telegram এর ভেতরে খুলুন</h2>
        <p className="text-xs text-neutral-400 font-semibold max-w-xs">
          রিয়েল পয়েন্ট, USDT এবং rewards পেতে এই Mini App টি আপনার Telegram Bot থেকে খুলতে হবে।
        </p>
      </div>
    );
  }

  if (authStatus === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-center px-6">
        <span className="text-4xl">⚠️</span>
        <h2 className="text-white font-black text-lg">Login করা যায়নি</h2>
        <p className="text-xs text-rose-400 font-semibold max-w-xs">{authErrorMsg}</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen relative select-none">
      {/* Top Header */}
      <Header user={user} onProfileClick={() => setShowProfileModal(true)} />

      {/* Floating 3D Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full btn-3d-gold text-xs shadow-2xl animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Main Tab Content */}
      <div className="flex-1 mt-1">
        {activeTab === "home" && (
          <HomeTab
            user={user}
            onOpenChest={() => setShowChestModal(true)}
            onOpenSpin={() => setShowSpinModal(true)}
            onOpenTasks={() => setActiveTab("tasks")}
            onOpenRefer={() => setActiveTab("refer")}
            onOpenWallet={() => setActiveTab("wallet")}
            onOpenProfile={() => setShowProfileModal(true)}
          />
        )}

        {activeTab === "tasks" && (
          <TasksTab
            user={user}
            initData={initData}
            onUserUpdate={handleUserUpdate}
            onToast={showToast}
          />
        )}

        {activeTab === "refer" && <ReferTab user={user} onInviteBonus={() => {}} />}

        {activeTab === "wallet" && (
          <WalletTab user={user} onWithdrawSubmit={handleWithdrawSubmit} />
        )}
      </div>

      {/* Modals */}
      {showSpinModal && (
        <SpinModal user={user} onClose={() => setShowSpinModal(false)} onSpin={handleSpin} />
      )}

      {showChestModal && (
        <ChestModal
          user={user}
          onClose={() => setShowChestModal(false)}
          onOpenChest={handleOpenChest}
        />
      )}

      {showProfileModal && (
        <ProfileModal user={user} onClose={() => setShowProfileModal(false)} />
      )}

      {/* Bottom 4-Item Navigation Bar */}
      <BottomNav activeTab={activeTab} onSelectTab={(tab) => setActiveTab(tab)} />
    </div>
  );
}
