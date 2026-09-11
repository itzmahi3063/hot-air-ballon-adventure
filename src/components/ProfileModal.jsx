"use client";

import React from "react";

export default function ProfileModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-sm card-3d rounded-3xl p-6 shadow-gold-glow flex flex-col items-center text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white text-base font-bold"
        >
          ✕
        </button>

        {/* 3D Embossed Avatar */}
        <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-yellow-600 via-yellow-400 to-amber-200 shadow-[0_8px_20px_rgba(250,204,21,0.5)] my-2">
          <div className="w-full h-full rounded-full bg-[#161208] flex items-center justify-center border-2 border-yellow-500/60">
            <svg className="w-10 h-10 text-emerald-400 filter drop-shadow-[0_2px_4px_rgba(52,211,153,0.6)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0001s.4482-.9997.9993-.9997c.5516 0 .9997.4482.9997.9997 0 .5515-.4481 1.0001-.9997 1.0001m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0001s.4482-.9997.9993-.9997c.5516 0 .9997.4482.9997.9997 0 .5515-.4481 1.0001-.9997 1.0001m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5682.1522l-2.0227 3.503C15.5902 8.4116 13.8533 8.125 12 8.125c-1.8533 0-3.5902.2866-5.1319.8248L4.8454 5.4468a.416.416 0 00-.5682-.1522.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3333 14.8021.3333 19h23.3334c0-4.1979-2.3556-7.8133-5.7874-9.6786"/>
            </svg>
          </div>
        </div>

        <h3 className="text-lg font-black text-white">{user.name}</h3>
        <span className="text-xs text-yellow-400 font-black">{user.username}</span>

        <span className="mt-2 text-[10px] font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm">
          VERIFIED USER ✓
        </span>

        {/* 3D Stats List (GEMS replaced with POINTS) */}
        <div className="w-full grid grid-cols-2 gap-2.5 my-4 text-left">
          <div className="p-3 rounded-2xl bg-[#0f0d08] border border-yellow-500/20 shadow-inner flex flex-col">
            <span className="text-[10px] text-neutral-400 font-bold uppercase">Total Balance</span>
            <span className="text-sm font-black text-yellow-400">{user.balance}</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#0f0d08] border border-yellow-500/20 shadow-inner flex flex-col">
            <span className="text-[10px] text-neutral-400 font-bold uppercase">USDT Assets</span>
            <span className="text-sm font-black text-white">${user.usdt.toFixed(4)}</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#0f0d08] border border-yellow-500/20 shadow-inner flex flex-col">
            <span className="text-[10px] text-neutral-400 font-bold uppercase">Points</span>
            <span className="text-sm font-black text-yellow-400">{user.points.toLocaleString()}</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#0f0d08] border border-yellow-500/20 shadow-inner flex flex-col">
            <span className="text-[10px] text-neutral-400 font-bold uppercase">Treasure Keys</span>
            <span className="text-sm font-black text-white">{user.keys}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full btn-3d-gold text-xs font-black uppercase tracking-wider cursor-pointer"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}
