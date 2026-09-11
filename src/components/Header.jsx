"use client";

import React from "react";

export default function Header({ user, onProfileClick }) {
  return (
    <header className="w-full pt-4 pb-3 px-4 flex flex-col gap-3">
      {/* Top Telegram mini app close indicator */}
      <div className="flex items-center justify-between text-white/50 text-xs pb-1 border-b border-white/5">
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
          <span className="text-sm font-bold">✕</span>
          <span>Close</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="cursor-pointer hover:text-white">⌄</span>
          <span className="cursor-pointer hover:text-white font-bold">⋮</span>
        </div>
      </div>

      {/* Main Profile & Balance Bar (Matches Image 4) */}
      <div className="flex items-center justify-between">
        {/* Profile Info */}
        <div 
          onClick={onProfileClick}
          className="flex items-center gap-3 cursor-pointer group active:scale-98 transition-transform"
        >
          {/* Avatar with gold glow */}
          <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-yellow-600 via-yellow-400 to-amber-200 shadow-gold-sm">
            <div className="w-full h-full rounded-full bg-[#161208] flex items-center justify-center overflow-hidden border border-yellow-500/40">
              {/* Android Robot logo with ADBD text */}
              <div className="flex flex-col items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0001s.4482-.9997.9993-.9997c.5516 0 .9997.4482.9997.9997 0 .5515-.4481 1.0001-.9997 1.0001m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0001s.4482-.9997.9993-.9997c.5516 0 .9997.4482.9997.9997 0 .5515-.4481 1.0001-.9997 1.0001m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5682.1522l-2.0227 3.503C15.5902 8.4116 13.8533 8.125 12 8.125c-1.8533 0-3.5902.2866-5.1319.8248L4.8454 5.4468a.416.416 0 00-.5682-.1522.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3333 14.8021.3333 19h23.3334c0-4.1979-2.3556-7.8133-5.7874-9.6786"/>
                </svg>
                <span className="text-[8px] font-black text-white leading-none tracking-tighter mt-0.5">ADBD</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-white font-bold text-sm tracking-tight flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
              {user.name}
            </h1>
            <span className="text-xs text-yellow-500/80 font-medium">
              {user.username}
            </span>
          </div>
        </div>

        {/* Balance Counter */}
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-yellow-500/90 font-bold tracking-widest uppercase">
            BALANCE
          </span>
          <span className="text-2xl font-black text-yellow-400 tracking-tight drop-shadow-[0_0_12px_rgba(250,204,21,0.4)]">
            {Number(user.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </header>
  );
}
