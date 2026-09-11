"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import HomeTab from "../components/HomeTab";
import TasksTab from "../components/TasksTab";
import ReferTab from "../components/ReferTab";
import WalletTab from "../components/WalletTab";
import SpinModal from "../components/SpinModal";
import ChestModal from "../components/ChestModal";
import ProfileModal from "../components/ProfileModal";
import { initialUserData } from "../data/mockData";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState(initialUserData);

  // Modals state
  const [showSpinModal, setShowSpinModal] = useState(false);
  const [showChestModal, setShowChestModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Telegram WebApp initial expansion
  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      try {
        tg.ready();
        tg.expand();
        if (tg.initDataUnsafe?.user) {
          const u = tg.initDataUnsafe.user;
          setUser((prev) => ({
            ...prev,
            name: `${u.first_name || ""} ${u.last_name || ""}`.trim() || prev.name,
            username: u.username ? `@${u.username}` : prev.username,
          }));
        }
      } catch (e) {
        console.log("Telegram SDK initialization:", e);
      }
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // General Reward Earned Handler (Watch Ads or Telegram tasks)
  const handleRewardEarned = (reward) => {
    setUser((prev) => ({
      ...prev,
      points: prev.points + Math.round(reward.coins || 0),
      balance: prev.balance + (reward.coins || 0),
    }));
    showToast(`🎉 ${reward.label}`);
  };

  // Spin Wheel Result Handler (GEMS replaced with POINTS)
  const handleSpinResult = (item) => {
    setUser((prev) => {
      let nextUsdt = prev.usdt;
      let nextPoints = prev.points;
      let nextSpins = Math.max(0, prev.spins - 1);

      if (item.type === "usdt") nextUsdt += item.value;
      if (item.type === "points") nextPoints += item.value;
      if (item.type === "spins") nextSpins += item.value;

      return {
        ...prev,
        usdt: nextUsdt,
        points: nextPoints,
        spins: nextSpins,
      };
    });
  };

  // Chest Reward Handler (GEMS replaced with POINTS)
  const handleChestReward = (reward) => {
    setUser((prev) => {
      let nextUsdt = prev.usdt;
      let nextPoints = prev.points;
      let nextSpins = prev.spins;

      if (reward.type === "usdt") nextUsdt += reward.amount;
      if (reward.type === "points") nextPoints += reward.amount;
      if (reward.type === "spins") nextSpins += reward.amount;

      return {
        ...prev,
        keys: Math.max(0, prev.keys - 1),
        usdt: nextUsdt,
        points: nextPoints,
        spins: nextSpins,
      };
    });
    showToast(`Unlocked 3D Chest: ${reward.label}!`);
  };

  // Withdrawal Submit Handler
  const handleWithdrawSubmit = (withdrawal) => {
    setUser((prev) => ({
      ...prev,
      usdt: Math.max(0, prev.usdt - withdrawal.amount),
    }));
    showToast(`Withdrawal requested: $${withdrawal.amount} via ${withdrawal.method}`);
  };

  return (
    <div className="flex flex-col min-h-screen relative select-none">
      {/* Top Header */}
      <Header
        user={user}
        onProfileClick={() => setShowProfileModal(true)}
      />

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
            onRewardEarned={handleRewardEarned}
          />
        )}

        {activeTab === "refer" && (
          <ReferTab
            user={user}
            onInviteBonus={() => {}}
          />
        )}

        {activeTab === "wallet" && (
          <WalletTab
            user={user}
            onWithdrawSubmit={handleWithdrawSubmit}
          />
        )}
      </div>

      {/* Modals */}
      {showSpinModal && (
        <SpinModal
          user={user}
          onClose={() => setShowSpinModal(false)}
          onSpinResult={handleSpinResult}
        />
      )}

      {showChestModal && (
        <ChestModal
          user={user}
          onClose={() => setShowChestModal(false)}
          onRewardClaimed={handleChestReward}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          user={user}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* Bottom 4-Item Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
