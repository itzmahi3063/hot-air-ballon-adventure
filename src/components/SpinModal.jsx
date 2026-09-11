"use client";

import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { spinWheelSegments } from "../data/mockData";

export default function SpinModal({ user, onClose, onSpin }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winItem, setWinItem] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const wheelRef = useRef(null);

  const numSegments = spinWheelSegments.length;
  const segmentAngle = 360 / numSegments;

  const handleSpin = async () => {
    if (isSpinning || user.spins <= 0) return;

    setErrorMsg(null);
    setIsSpinning(true);
    setWinItem(null);

    // The server decides the result (so it can't be manipulated client-side)
    let serverResult;
    try {
      serverResult = await onSpin();
    } catch (err) {
      setIsSpinning(false);
      setErrorMsg(err.message || "Spin failed, try again");
      return;
    }

    const { result: winningSegment, index: winningIndex } = serverResult;

    const extraRotations = 360 * (5 + Math.floor(Math.random() * 3));
    const targetDegree = extraRotations + (360 - (winningIndex * segmentAngle + segmentAngle / 2));

    const finalRotation = rotation + targetDegree;
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWinItem(winningSegment);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070312]/95 backdrop-blur-md flex flex-col items-center justify-between p-4 overflow-y-auto no-scrollbar animate-fadeIn">
      {/* Top Header & Back Button */}
      <div className="w-full max-w-md flex items-center justify-between pt-2">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-black text-purple-200 hover:bg-purple-900 active:scale-95 transition-all shadow-md"
        >
          <span>✕</span>
          <span>Back</span>
        </button>

        <div className="text-center">
          <h1 className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 flex items-center gap-1.5 justify-center filter drop-shadow-[0_0_12px_rgba(217,70,239,0.5)]">
            <span>✨</span>
            <span>LUCKY SPIN</span>
            <span>✨</span>
          </h1>
          <p className="text-[11px] text-purple-300/80 font-semibold">
            Spin the 3D wheel & win real rewards
          </p>
        </div>

        <div className="w-16" />
      </div>

      {/* 4 Stats Cards (3D Tactile Design - GEMS replaced with POINTS) */}
      <div className="w-full max-w-md grid grid-cols-2 gap-2.5 my-3">
        {/* Points */}
        <div className="bg-[#150d2e] border border-purple-500/30 rounded-2xl p-3 flex items-center gap-3 shadow-[0_5px_0_#0a0518,0_10px_15px_rgba(0,0,0,0.5)]">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl filter drop-shadow-[0_2px_4px_rgba(250,204,21,0.5)]">
            🪙
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-purple-300/90 font-black uppercase tracking-wider">
              POINTS
            </span>
            <span className="text-white font-black text-sm tracking-tight">
              {user.points.toLocaleString()}
            </span>
          </div>
        </div>

        {/* USDT */}
        <div className="bg-[#150d2e] border border-purple-500/30 rounded-2xl p-3 flex items-center gap-3 shadow-[0_5px_0_#0a0518,0_10px_15px_rgba(0,0,0,0.5)]">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-xl filter drop-shadow-[0_2px_4px_rgba(52,211,153,0.5)]">
            💵
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-purple-300/90 font-black uppercase tracking-wider">
              USDT
            </span>
            <span className="text-white font-black text-sm tracking-tight truncate">
              ${user.usdt.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Spins Left */}
        <div className="bg-[#150d2e] border border-purple-500/30 rounded-2xl p-3 flex items-center gap-3 shadow-[0_5px_0_#0a0518,0_10px_15px_rgba(0,0,0,0.5)]">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl filter drop-shadow-[0_2px_4px_rgba(217,70,239,0.5)]">
            🎰
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-purple-300/90 font-black uppercase tracking-wider">
              SPINS LEFT
            </span>
            <span className="text-white font-black text-sm tracking-tight">
              {user.spins}
            </span>
          </div>
        </div>

        {/* Keys */}
        <div className="bg-[#150d2e] border border-purple-500/30 rounded-2xl p-3 flex items-center gap-3 shadow-[0_5px_0_#0a0518,0_10px_15px_rgba(0,0,0,0.5)]">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-xl filter drop-shadow-[0_2px_4px_rgba(250,204,21,0.5)]">
            🔑
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-purple-300/90 font-black uppercase tracking-wider">
              KEYS
            </span>
            <span className="text-yellow-400 font-black text-sm tracking-tight">
              {user.keys}
            </span>
          </div>
        </div>
      </div>

      {/* 3D Wheel Area with Pointer */}
      <div className="relative w-72 h-72 my-2 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-fuchsia-600/25 blur-3xl animate-pulse" />

        {/* Top 3D Pointer Needle */}
        <div className="absolute -top-3 z-30 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[24px] border-t-pink-500 filter drop-shadow-[0_5px_10px_rgba(236,72,153,0.9)]" />
        </div>

        {/* 3D Embossed Rotating Wheel */}
        <div
          ref={wheelRef}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 4.5s cubic-bezier(0.15, 0.9, 0.2, 1)" : "none",
          }}
          className="relative w-64 h-64 rounded-full border-4 border-purple-400/60 shadow-[0_10px_30px_rgba(217,70,239,0.5),inset_0_0_15px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {spinWheelSegments.map((seg, i) => {
              const startAngle = i * segmentAngle;
              const endAngle = startAngle + segmentAngle;

              const x1 = 100 + 100 * Math.cos((Math.PI * startAngle) / 180);
              const y1 = 100 + 100 * Math.sin((Math.PI * startAngle) / 180);
              const x2 = 100 + 100 * Math.cos((Math.PI * endAngle) / 180);
              const y2 = 100 + 100 * Math.sin((Math.PI * endAngle) / 180);

              const textAngle = startAngle + segmentAngle / 2;
              const textRad = (Math.PI * textAngle) / 180;
              const textX = 100 + 64 * Math.cos(textRad);
              const textY = 100 + 64 * Math.sin(textRad);

              return (
                <g key={i}>
                  <path
                    d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                    fill={seg.color}
                    stroke="#0b061a"
                    strokeWidth="1.5"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill={seg.textColor}
                    fontSize="7"
                    fontWeight="900"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                  >
                    {seg.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* 3D Central Dome with 777 logo */}
          <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gradient-to-b from-[#2a1354] to-[#0f0722] border-2 border-pink-400 shadow-[0_4px_10px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center z-20">
            <span className="text-xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">🎰</span>
          </div>
        </div>
      </div>

      {/* 3D Spin Button */}
      <div className="w-full max-w-md flex flex-col items-center gap-2 pb-4">
        <button
          onClick={handleSpin}
          disabled={isSpinning || user.spins <= 0}
          className={`w-full py-4 rounded-full text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
            isSpinning || user.spins <= 0
              ? "bg-purple-950/60 text-purple-400/40 cursor-not-allowed border border-purple-500/20"
              : "btn-3d-purple"
          }`}
        >
          <span className="text-lg">🎰</span>
          <span>{isSpinning ? "SPINNING..." : "SPIN NOW"}</span>
        </button>

        <span className="text-xs font-bold text-purple-300/80">
          {user.spins} spins remaining
        </span>

        {errorMsg && (
          <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-full px-3 py-1">
            {errorMsg}
          </span>
        )}
      </div>

      {/* 3D Winner Popup */}
      {winItem && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-xs bg-[#190e38] border-2 border-pink-500 rounded-3xl p-6 flex flex-col items-center text-center shadow-[0_15px_35px_rgba(217,70,239,0.6)]">
            <span className="text-5xl animate-bounce">🎉</span>
            <h3 className="text-xl font-black text-white mt-2">Congratulations!</h3>
            <p className="text-xs text-purple-300 font-semibold mt-1">You won:</p>
            <div className="my-3.5 py-2.5 px-6 rounded-2xl bg-pink-500/20 border border-pink-500 text-pink-300 font-black text-xl shadow-inner">
              {winItem.label}
            </div>
            <button
              onClick={() => setWinItem(null)}
              className="w-full py-3 rounded-full btn-3d-purple text-xs font-black uppercase tracking-wider"
            >
              CLAIM REWARD
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
