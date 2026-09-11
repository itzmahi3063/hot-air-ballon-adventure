"use client";

import React, { useState } from "react";

export default function EarnTab({ tasks, onCompleteTask, videoAds, onWatchAd }) {
  const [activeSubSection, setActiveSubSection] = useState("telegram"); // 'telegram' | 'ads'
  const [verifyingId, setVerifyingId] = useState(null);
  const [watchingId, setWatchingId] = useState(null);

  const handleVerify = (task) => {
    if (task.completed) return;
    setVerifyingId(task.id);
    // Simulate verification delay (2.5 seconds)
    setTimeout(() => {
      onCompleteTask(task);
      setVerifyingId(null);
    }, 2200);
  };

  const handleWatch = (ad) => {
    setWatchingId(ad.id);
    setTimeout(() => {
      onWatchAd(ad);
      setWatchingId(null);
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-4 px-4 animate-fadeIn">
      {/* Sub-navigation pills (Telegram Tasks & Watch Ads) */}
      <div className="flex items-center gap-2 p-1 bg-[#14120c] rounded-full border border-yellow-500/20">
        <button
          onClick={() => setActiveSubSection("telegram")}
          className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSubSection === "telegram"
              ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-md shadow-yellow-500/20"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <span>✈️</span>
          <span>Telegram Tasks</span>
        </button>
        <button
          onClick={() => setActiveSubSection("ads")}
          className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSubSection === "ads"
              ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-md shadow-yellow-500/20"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <span>📺</span>
          <span>Video Ads</span>
        </button>
      </div>

      {activeSubSection === "telegram" ? (
        <div className="flex flex-col gap-4">
          {/* Header (Matches Image 2) */}
          <div className="flex flex-col items-center justify-center pt-2 text-center">
            <h2 className="text-xl font-black text-yellow-400 flex items-center gap-2 tracking-tight">
              <span>✈️</span>
              <span>Telegram Tasks</span>
            </h2>
            <p className="text-xs text-yellow-600/80 font-medium mt-1">
              Complete tasks & earn rewards
            </p>
          </div>

          {/* Task Cards List (Matches Image 2) */}
          <div className="flex flex-col gap-3.5">
            {tasks.map((task) => {
              const isVerifying = verifyingId === task.id;
              return (
                <div
                  key={task.id}
                  className="bg-[#14120c] border border-yellow-500/30 rounded-2xl p-4 flex flex-col gap-3.5 shadow-md shadow-black/40 relative overflow-hidden group hover:border-yellow-400/50 transition-all"
                >
                  {/* Top info row */}
                  <div className="flex items-center gap-3">
                    {/* Telegram Icon Box with Gold Border */}
                    <div className="w-12 h-12 rounded-xl bg-[#19150e] border border-yellow-500/50 flex items-center justify-center shadow-inner flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#229ED9] fill-current ml-[-1px]" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.93-1.28 4.88-2.12 5.86-2.54 2.79-1.16 3.37-1.36 3.75-1.37.08 0 .27.02.39.12.1.08.13.2.14.28 0 .07.01.2 0 .33z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1">
                      <h3 className="text-white font-bold text-sm tracking-tight">
                        {task.title}
                      </h3>
                      <span className="text-xs text-yellow-600/90 font-medium">
                        {task.subtitle}
                      </span>
                      <span className="text-xs font-black text-yellow-400 mt-0.5">
                        {task.reward.toFixed(2)} Reward
                      </span>
                    </div>

                    {task.completed && (
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-xs font-bold">
                        ✓
                      </div>
                    )}
                  </div>

                  {/* Buttons Row (Matches Image 2) */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {/* Join Channel Button */}
                    <a
                      href={task.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-full bg-[#18140c] border border-yellow-500/40 hover:bg-[#201b10] active:scale-95 text-yellow-400 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-sm"
                    >
                      JOIN CHANNEL
                    </a>

                    {/* Verify Button */}
                    <button
                      onClick={() => handleVerify(task)}
                      disabled={task.completed || isVerifying}
                      className={`py-2.5 px-4 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        task.completed
                          ? "bg-neutral-800/80 text-neutral-500 cursor-not-allowed border border-neutral-700/40"
                          : isVerifying
                          ? "bg-yellow-500/50 text-black cursor-wait animate-pulse"
                          : "gold-gradient-btn active:scale-95"
                      }`}
                    >
                      {task.completed ? (
                        <span>COMPLETED</span>
                      ) : isVerifying ? (
                        <div className="flex items-center gap-1">
                          <svg className="animate-spin h-3.5 w-3.5 text-black" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>VERIFYING...</span>
                        </div>
                      ) : (
                        <span>VERIFY</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Video Ads Section (Matches Image 1) */
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center pt-2 text-center">
            <h2 className="text-xl font-black text-yellow-400 flex items-center gap-2 tracking-tight">
              <span>🪙</span>
              <span>Task Desk / Ads</span>
            </h2>
            <p className="text-xs text-yellow-600/80 font-medium mt-1">
              Watch sponsored ads to earn extra Points & Keys
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            {videoAds.map((ad) => {
              const isWatching = watchingId === ad.id;
              return (
                <div
                  key={ad.id}
                  className="bg-[#14120c] border border-yellow-500/30 rounded-2xl p-4 flex flex-col gap-3 shadow-md relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="text-2xl">📺</div>
                      <div>
                        <h3 className="text-white font-bold text-sm tracking-tight">{ad.provider}</h3>
                        <span className="text-xs text-yellow-400 font-bold">{ad.rewardText}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${ad.badgeColor}`}>
                      {ad.badge}
                    </span>
                  </div>

                  <button
                    onClick={() => handleWatch(ad)}
                    disabled={isWatching}
                    className="w-full py-3 rounded-full gold-gradient-btn text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                  >
                    {isWatching ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin h-3.5 w-3.5 text-black" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>LOADING AD...</span>
                      </div>
                    ) : (
                      <>
                        <span>▶</span>
                        <span>WATCH AD TO EARN</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
