"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";

export default function ChestModal({ user, onClose, onOpenChest }) {
  const [isOpening, setIsOpening] = useState(false);
  const [openedReward, setOpenedReward] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleOpen = async () => {
    if (user.keys <= 0 || isOpening) return;
    setErrorMsg(null);
    setIsOpening(true);

    // Server picks the reward and deducts the key
    let reward;
    try {
      reward = await onOpenChest();
    } catch (err) {
      setIsOpening(false);
      setErrorMsg(err.message || "Failed to open, try again");
      return;
    }

    setTimeout(() => {
      setIsOpening(false);
      setOpenedReward(reward);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch (e) {}
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-sm card-3d rounded-3xl p-6 flex flex-col items-center text-center shadow-gold-glow relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <h3 className="text-xl font-black text-yellow-400 tracking-tight">
          3D Golden Treasure Chest
        </h3>
        <p className="text-xs text-yellow-600/90 font-bold mt-1">
          Requires 1 Key to unlock exclusive rewards
        </p>

        {/* 3D Chest Illustration */}
        <div className="my-4 relative flex items-center justify-center">
          {openedReward ? (
            <div className="text-7xl filter drop-shadow-[0_10px_25px_rgba(250,204,21,0.7)] animate-bounce">
              👑
            </div>
          ) : (
            <div className="animate-float-3d filter drop-shadow-[0_10px_25px_rgba(250,204,21,0.6)]">
              <img
                src="/treasure-chest.webp"
                alt="Treasure Chest"
                className={`w-36 h-auto object-contain transition-transform duration-300 ${isOpening ? "animate-spin" : ""}`}
              />
            </div>
          )}
        </div>

        {/* 3D Key Balance Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full card-3d-sm text-xs text-yellow-400 mb-4 shadow-inner">
          <span className="text-base">🔑</span>
          <span className="font-black">{user.keys} Keys available</span>
        </div>

        {openedReward ? (
          <div className="flex flex-col items-center gap-3 w-full animate-scaleUp">
            <span className="text-xs text-emerald-400 font-black uppercase tracking-wider">
              REWARD UNLOCKED!
            </span>
            <div className="py-3 px-6 rounded-2xl bg-yellow-500/10 border border-yellow-500 text-yellow-300 font-black text-xl flex items-center gap-2 shadow-inner">
              <span>{openedReward.icon}</span>
              <span>{openedReward.label}</span>
            </div>
            <button
              onClick={onClose}
              className="mt-2 w-full py-3.5 rounded-full btn-3d-gold text-xs font-black uppercase tracking-wider"
            >
              COLLECT & CLOSE
            </button>
          </div>
        ) : (
          <>
          {errorMsg && (
            <span className="mb-3 text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-full px-3 py-1.5">
              {errorMsg}
            </span>
          )}
          <button
            onClick={handleOpen}
            disabled={user.keys <= 0 || isOpening}
            className={`w-full py-4 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              user.keys <= 0 || isOpening
                ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700"
                : "btn-3d-gold"
            }`}
          >
            {isOpening ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>OPENING CHEST...</span>
              </div>
            ) : (
              <>
                <span>🔑</span>
                <span>OPEN WITH 1 KEY</span>
              </>
            )}
          </button>
          </>
        )}
      </div>
    </div>
  );
}
