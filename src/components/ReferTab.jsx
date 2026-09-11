"use client";

import React, { useState } from "react";
import { referralConfig } from "../data/mockData";

export default function ReferTab({ user, onInviteBonus }) {
  const [copied, setCopied] = useState(false);

  // Generate invite link based on user or bot username
  const inviteLink = `https://t.me/${referralConfig.botUsername}?start=ref_${user.username.replace('@', '')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = encodeURIComponent(
      `🎁 Join this Telegram Mini App, complete tasks, spin the wheel, and earn rewards with me!\n\n${inviteLink}`
    );
    window.open(`https://t.me/share/url?url=${inviteLink}&text=${text}`, "_blank");
  };

  return (
    <div className="flex flex-col gap-4 px-4 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-[#17140b] to-[#120f08] border border-yellow-500/30 rounded-2xl p-4 overflow-hidden shadow-lg">
        <div className="absolute top-3 right-3 bg-yellow-400 text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          LIFETIME
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-3xl">
            🎁
          </div>
          <div>
            <h2 className="text-yellow-400 font-extrabold text-base tracking-tight">
              Invite Friends
            </h2>
            <p className="text-[10px] text-yellow-600 font-bold uppercase tracking-wider mt-0.5">
              EARN UP TO 30% COMMISSION
            </p>
          </div>
        </div>

        <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
          Invite your friends using your personal link and get instant commission on every task they complete!
        </p>
      </div>

      {/* Referral Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#14120c] border border-yellow-500/25 rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">
            Total Friends
          </span>
          <span className="text-xl font-black text-white mt-0.5">{user.refers}</span>
        </div>

        <div className="bg-[#14120c] border border-yellow-500/25 rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">
            Commission Earned
          </span>
          <span className="text-xl font-black text-yellow-400 mt-0.5">$0.00</span>
        </div>
      </div>

      {/* Referral Link Box */}
      <div className="bg-[#14120c] border border-yellow-500/30 rounded-2xl p-4 flex flex-col gap-3">
        <span className="text-xs font-bold text-neutral-300">Your Exclusive Invite Link</span>
        
        <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0b0a07] border border-yellow-500/20 text-xs text-yellow-300/90 truncate font-mono select-all">
          <span className="truncate flex-1">{inviteLink}</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={handleCopy}
            className="py-2.5 px-3 rounded-full bg-[#18140c] border border-yellow-500/40 hover:bg-[#221c10] active:scale-95 text-yellow-400 font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
          >
            <span>{copied ? "✓" : "📋"}</span>
            <span>{copied ? "COPIED!" : "COPY LINK"}</span>
          </button>

          <button
            onClick={handleShare}
            className="py-2.5 px-3 rounded-full gold-gradient-btn text-xs font-black uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
          >
            <span>✈️</span>
            <span>SHARE BOT</span>
          </button>
        </div>
      </div>

      {/* Commission Tiers breakdown */}
      <div className="bg-[#14120c] border border-yellow-500/25 rounded-2xl p-4 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
          Commission Structure
        </h3>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#18150d] border border-yellow-500/15 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">🥇</span>
              <div>
                <span className="font-bold text-white">Tier 1 (Direct Friends)</span>
                <p className="text-[10px] text-neutral-400">Friends who join using your link</p>
              </div>
            </div>
            <span className="text-yellow-400 font-black text-sm">20%</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#18150d] border border-yellow-500/15 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">🥈</span>
              <div>
                <span className="font-bold text-white">Tier 2 (Sub Friends)</span>
                <p className="text-[10px] text-neutral-400">Friends invited by your friends</p>
              </div>
            </div>
            <span className="text-yellow-400 font-black text-sm">10%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
