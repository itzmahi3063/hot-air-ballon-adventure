"use client";

import React from "react";

export default function HomeTab({
  user,
  onOpenChest,
  onOpenSpin,
  onOpenTasks,
  onOpenRefer,
  onOpenWallet,
  onOpenProfile,
}) {
  return (
    <div className="flex flex-col gap-5 px-4 animate-fadeIn">
      {/* 4 Stats Cards Grid - 3D Tactile Design (GEMS replaced with POINTS) */}
      <div className="grid grid-cols-4 gap-2.5">
        {/* 1. Spins */}
        <div 
          onClick={onOpenSpin}
          className="card-3d-sm rounded-2xl p-2.5 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all group"
        >
          <div className="text-xl leading-none mb-1 group-hover:scale-110 transition-transform filter drop-shadow-[0_2px_4px_rgba(217,70,239,0.5)]">
            🎰
          </div>
          <span className="text-white font-black text-xs tracking-tight">{user.spins}</span>
          <span className="text-[9px] font-bold text-yellow-500/90 tracking-wider uppercase mt-0.5">SPINS</span>
        </div>

        {/* 2. USDT */}
        <div 
          onClick={onOpenWallet}
          className="card-3d-sm rounded-2xl p-2.5 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all group"
        >
          <div className="text-base font-black text-emerald-400 mb-0.5 filter drop-shadow-[0_2px_4px_rgba(52,211,153,0.5)]">
            ₮
          </div>
          <span className="text-white font-black text-[11px] tracking-tight truncate max-w-full">
            ${user.usdt.toFixed(4)}
          </span>
          <span className="text-[9px] font-bold text-yellow-500/90 tracking-wider uppercase mt-0.5">USDT</span>
        </div>

        {/* 3. POINTS (Replaced GEMS as requested) */}
        <div 
          onClick={onOpenChest}
          className="card-3d-sm rounded-2xl p-2.5 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all group"
        >
          <div className="text-xl leading-none mb-1 group-hover:scale-110 transition-transform filter drop-shadow-[0_2px_4px_rgba(250,204,21,0.6)]">
            🪙
          </div>
          <span className="text-yellow-400 font-black text-xs tracking-tight">
            {user.points.toLocaleString()}
          </span>
          <span className="text-[9px] font-bold text-yellow-500/90 tracking-wider uppercase mt-0.5">POINTS</span>
        </div>

        {/* 4. Refers */}
        <div 
          onClick={onOpenRefer}
          className="card-3d-sm rounded-2xl p-2.5 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all group"
        >
          <div className="text-xl leading-none mb-1 group-hover:scale-110 transition-transform filter drop-shadow-[0_2px_4px_rgba(56,189,248,0.5)]">
            👥
          </div>
          <span className="text-white font-black text-xs tracking-tight">{user.refers}</span>
          <span className="text-[9px] font-bold text-yellow-500/90 tracking-wider uppercase mt-0.5">REFERS</span>
        </div>
      </div>

      {/* Center 3D Interactive Chest & Surrounding 3D Action Buttons */}
      <div className="relative py-2 flex flex-col items-center justify-center">
        {/* Background 3D Ambient Golden Lighting & Radial Glow (Warm Shade) */}
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-amber-500/30 via-yellow-400/25 to-amber-600/20 blur-3xl pointer-events-none -z-0 animate-pulse" />
        <div className="absolute w-52 h-52 rounded-full bg-yellow-500/25 blur-2xl pointer-events-none -z-0" />

        {/* 3-Column 3D Layout */}
        <div className="w-full flex items-center justify-between z-10 px-1">
          {/* Left Column (3D Pushable Buttons) */}
          <div className="flex flex-col gap-3.5">
            {/* Watch Ads */}
            <button
              onClick={onOpenTasks}
              className="w-14 h-14 btn-3d-dark rounded-2xl flex flex-col items-center justify-center gap-0.5 cursor-pointer group"
            >
              <span className="text-lg filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform">📺</span>
              <span className="text-[9px] font-bold text-yellow-300/90 leading-tight text-center px-0.5">
                Watch Ads
              </span>
            </button>

            {/* Tasks */}
            <button
              onClick={onOpenTasks}
              className="w-14 h-14 btn-3d-dark rounded-2xl flex flex-col items-center justify-center gap-0.5 cursor-pointer group"
            >
              <span className="text-lg filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform">✈️</span>
              <span className="text-[9px] font-bold text-yellow-300/90 leading-tight text-center px-0.5">
                Tasks
              </span>
            </button>

            {/* Refer */}
            <button
              onClick={onOpenRefer}
              className="w-14 h-14 btn-3d-dark rounded-2xl flex flex-col items-center justify-center gap-0.5 cursor-pointer group"
            >
              <span className="text-lg filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform">🎁</span>
              <span className="text-[9px] font-bold text-yellow-300/90 leading-tight text-center px-0.5">
                Refer
              </span>
            </button>
          </div>

          {/* Center 3D Isometric Golden Treasure Chest Model */}
          <div 
            onClick={onOpenChest}
            className="flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-all"
          >
            <div className="relative w-52 h-44 flex items-center justify-center">
              {/* 3D Chest Floor Ambient Glow & Shadow */}
              <div className="absolute bottom-1 w-40 h-8 bg-yellow-500/20 rounded-full blur-lg pointer-events-none" />
              <div className="absolute bottom-1 w-32 h-6 bg-black/60 rounded-full blur-md pointer-events-none" />

              {/* Seamless WebP Treasure Chest with Radial Mask to guarantee NO square box edges */}
              <div 
                className="relative z-10 animate-float-3d filter drop-shadow-[0_12px_28px_rgba(250,204,21,0.55)] group-hover:scale-105 transition-transform duration-300"
                style={{
                  WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 95%)",
                  maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 95%)",
                }}
              >
                <img
                  src="/treasure-chest.webp"
                  alt="Golden Treasure Chest"
                  className="w-48 h-auto object-contain select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* Right Column (3D Pushable Buttons) */}
          <div className="flex flex-col gap-3.5">
            {/* Spin */}
            <button
              onClick={onOpenSpin}
              className="w-14 h-14 btn-3d-dark rounded-2xl flex flex-col items-center justify-center gap-0.5 cursor-pointer group"
            >
              <span className="text-lg filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform">🎰</span>
              <span className="text-[9px] font-bold text-yellow-300/90 leading-tight text-center px-0.5">
                Spin
              </span>
            </button>

            {/* Wallet */}
            <button
              onClick={onOpenWallet}
              className="w-14 h-14 btn-3d-dark rounded-2xl flex flex-col items-center justify-center gap-0.5 cursor-pointer group"
            >
              <span className="text-lg filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform">💳</span>
              <span className="text-[9px] font-bold text-yellow-300/90 leading-tight text-center px-0.5">
                Wallet
              </span>
            </button>

            {/* Profile */}
            <button
              onClick={onOpenProfile}
              className="w-14 h-14 btn-3d-dark rounded-2xl flex flex-col items-center justify-center gap-0.5 cursor-pointer group"
            >
              <span className="text-lg filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform">👤</span>
              <span className="text-[9px] font-bold text-yellow-300/90 leading-tight text-center px-0.5">
                Profile
              </span>
            </button>
          </div>
        </div>

        {/* 3D Metallic Keys Badge */}
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full card-3d-sm text-xs shadow-inner">
          <span className="text-sm">🔑</span>
          <span className="text-yellow-400 font-black tracking-wide">{user.keys}</span>
          <span className="text-yellow-600/90 font-bold text-[11px] uppercase">Keys Available</span>
        </div>

        {/* Giant 3D Glowing Golden Button (Tap to Open Chest) */}
        <button
          onClick={onOpenChest}
          className="mt-4 w-full py-4 px-6 rounded-full btn-3d-gold flex items-center justify-center gap-2.5 text-sm tracking-wider uppercase cursor-pointer"
        >
          <span className="text-lg">🏆</span>
          <span>Tap to Open Chest</span>
        </button>
      </div>

      {/* 3D Invite Friends Promo Banner Card */}
      <div 
        onClick={onOpenRefer}
        className="relative card-3d rounded-3xl p-4.5 overflow-hidden cursor-pointer hover:border-yellow-400/60 active:scale-98 transition-all group"
      >
        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
          LIFETIME
        </div>

        <div className="flex items-center gap-4">
          {/* 3D Gift Box Graphic */}
          <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-yellow-600/10 rounded-2xl border border-yellow-500/30 group-hover:rotate-6 transition-transform shadow-inner">
            <span className="text-3xl filter drop-shadow-[0_4px_8px_rgba(244,63,94,0.6)]">🎁</span>
          </div>

          <div className="flex flex-col">
            <h2 className="text-yellow-400 font-black text-base tracking-tight leading-tight">
              Invite Friends
            </h2>
            <span className="text-[10px] text-yellow-600/90 font-bold tracking-widest uppercase mt-0.5">
              EARN LIFETIME COMMISSION
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-yellow-500/15 flex items-center justify-between text-xs">
          <span className="text-yellow-200/90 font-bold">Up to 30% Forever</span>
          <span className="text-yellow-400 font-black group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  );
}
