"use client";

import React, { useState } from "react";
import {
  initialWatchAds,
  initialTelegramTasks,
  initialExclusiveTasks,
  initialPartnerTasks,
} from "../data/mockData";
import { api } from "../lib/api";

export default function TasksTab({ user, initData, onUserUpdate, onToast }) {
  const [activeCategory, setActiveCategory] = useState("daily");
  const [watchingId, setWatchingId] = useState(null);
  const [verifyingId, setVerifyingId] = useState(null);

  // Slot/completion counts now live on the user document (persisted in MongoDB)
  const watchAds = initialWatchAds.map((ad) => ({
    ...ad,
    completedSlots: user.completedAdSlots?.[ad.id] || 0,
  }));
  const telegramTasks = initialTelegramTasks.map((t) => ({
    ...t,
    completed: (user.completedTelegramTasks || []).includes(t.id),
  }));

  const categories = [
    { id: "daily", label: "Daily" },
    { id: "social", label: "Social" },
    { id: "exclusive", label: "Exclusive" },
    { id: "partner", label: "Partner" },
  ];

  const handleWatchAd = (ad) => {
    if (ad.completedSlots >= ad.totalSlots || watchingId) return;
    setWatchingId(ad.id);

    setTimeout(async () => {
      try {
        const data = await api.watchAd(initData, ad.id);
        onUserUpdate(data.user);
        onToast(`🎉 Watched ${ad.title} Ad (+${data.reward} points)`);
      } catch (err) {
        onToast(err.message || "Failed, try again");
      } finally {
        setWatchingId(null);
      }
    }, 2200);
  };

  const handleVerifyTelegram = (task) => {
    if (task.completed || verifyingId) return;
    setVerifyingId(task.id);

    setTimeout(async () => {
      try {
        const data = await api.verifyTelegramTask(initData, task.id);
        onUserUpdate(data.user);
        onToast(`🎉 Verified ${task.title} (+${data.reward.toFixed(2)})`);
      } catch (err) {
        onToast(err.message || "Failed, try again");
      } finally {
        setVerifyingId(null);
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4 px-4 pb-4 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col pt-1">
        <h1 className="text-2xl font-black text-white tracking-tight">Tasks</h1>
        <p className="text-xs text-neutral-400 font-semibold mt-0.5">
          Complete activities and grow your points
        </p>
      </div>

      {/* 4 Category Tabs (3D Tactile Design with Gold Dot) */}
      <div className="grid grid-cols-4 gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative py-3 px-2 rounded-2xl text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                isActive
                  ? "bg-gradient-to-b from-[#312510] to-[#1a1409] border border-yellow-400 text-yellow-300 shadow-[0_4px_0_#78350f,0_8px_15px_rgba(0,0,0,0.5)]"
                  : "btn-3d-dark text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <span>{cat.label}</span>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,1)]" />
            </button>
          );
        })}
      </div>

      {/* DAILY TAB: 3D WATCH & EARN CARDS */}
      {activeCategory === "daily" && (
        <div className="flex flex-col gap-3.5 mt-1">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-neutral-400 tracking-wider uppercase">
              WATCH & EARN
            </span>
            <div className="flex-1 h-[1px] bg-neutral-800/80" />
          </div>

          <div className="flex flex-col gap-3">
            {watchAds.map((ad) => {
              const isWatching = watchingId === ad.id;
              const isDone = ad.completedSlots >= ad.totalSlots;
              const progressPercent = (ad.completedSlots / ad.totalSlots) * 100;

              return (
                <div
                  key={ad.id}
                  className="card-3d rounded-3xl p-4 flex items-center justify-between gap-3 shadow-md"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {/* Brand 3D Icon */}
                    {ad.id === "adsgram" ? (
                      <div className="w-12 h-12 rounded-2xl bg-[#2563eb] shadow-[0_4px_10px_rgba(37,99,235,0.4)] flex items-center justify-center flex-shrink-0 border border-blue-400/40">
                        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 19.5h5l2.5-4.5h5l2.5 4.5h5L12 2zm0 6l3.2 5.5h-6.4L12 8z" />
                        </svg>
                      </div>
                    ) : ad.id === "monetag" ? (
                      <div className="w-12 h-12 rounded-2xl bg-[#a3e635] shadow-[0_4px_10px_rgba(163,230,53,0.3)] flex items-center justify-center flex-shrink-0 p-1 border border-lime-400/40">
                        <span className="text-[10px] font-black text-black tracking-tighter leading-none text-center">
                          monetag
                        </span>
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-[#f97316] shadow-[0_4px_10px_rgba(249,115,22,0.4)] flex items-center justify-center flex-shrink-0 border border-orange-400/40">
                        <span className="text-sm font-black text-white">AD</span>
                      </div>
                    )}

                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="text-white font-black text-sm tracking-tight truncate">
                        {ad.title}
                      </h3>
                      <span className="text-[11px] text-neutral-400 font-semibold">
                        {ad.subtitle}
                      </span>

                      {/* 3D Progress Bar */}
                      <div className="w-full max-w-[130px] my-1">
                        <div className="w-full h-1.5 bg-[#0a0805] rounded-full overflow-hidden border border-yellow-500/20 shadow-inner">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-neutral-400 font-bold mt-0.5 block">
                          {ad.completedSlots} of {ad.totalSlots} done
                        </span>
                      </div>

                      {/* Reward (Points) */}
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-amber-400">🪙</span>
                        <span className="text-yellow-400 font-black">+{ad.rewardCoins}</span>
                        <span className="text-neutral-400 text-[11px] font-semibold">· {ad.rewardText}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3D Watch Button */}
                  <button
                    onClick={() => handleWatchAd(ad)}
                    disabled={isDone || isWatching}
                    className={`py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-wide transition-all flex-shrink-0 ${
                      isDone
                        ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/50"
                        : isWatching
                        ? "bg-yellow-500/50 text-black cursor-wait animate-pulse"
                        : "btn-3d-gold cursor-pointer"
                    }`}
                  >
                    {isDone ? (
                      "DONE"
                    ) : isWatching ? (
                      <div className="flex items-center gap-1.5">
                        <svg className="animate-spin h-3.5 w-3.5 text-black" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>...</span>
                      </div>
                    ) : (
                      "Watch"
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SOCIAL TAB: 3D TELEGRAM TASKS */}
      {activeCategory === "social" && (
        <div className="flex flex-col gap-3.5 mt-1">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-neutral-400 tracking-wider uppercase">
              TELEGRAM TASKS
            </span>
            <div className="flex-1 h-[1px] bg-neutral-800/80" />
          </div>

          <div className="flex flex-col gap-3">
            {telegramTasks.map((task) => {
              const isVerifying = verifyingId === task.id;
              return (
                <div
                  key={task.id}
                  className="card-3d rounded-3xl p-4 flex flex-col gap-3 shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#19150e] border border-yellow-500/40 flex items-center justify-center flex-shrink-0 shadow-inner">
                      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#229ED9] fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.93-1.28 4.88-2.12 5.86-2.54 2.79-1.16 3.37-1.36 3.75-1.37.08 0 .27.02.39.12.1.08.13.2.14.28 0 .07.01.2 0 .33z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1">
                      <h3 className="text-white font-black text-sm">{task.title}</h3>
                      <span className="text-xs text-neutral-400 font-semibold">{task.subtitle}</span>
                      <span className="text-xs font-black text-yellow-400 mt-0.5">
                        +{task.reward.toFixed(2)} Points
                      </span>
                    </div>

                    {task.completed && (
                      <span className="text-emerald-400 font-black text-xs bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/40">
                        ✓ Done
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <a
                      href={task.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-full btn-3d-dark text-yellow-400 font-black text-xs text-center uppercase tracking-wider transition-all"
                    >
                      JOIN CHANNEL
                    </a>

                    <button
                      onClick={() => handleVerifyTelegram(task)}
                      disabled={task.completed || isVerifying}
                      className={`py-2.5 px-3 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                        task.completed
                          ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/40"
                          : isVerifying
                          ? "bg-yellow-500/50 text-black cursor-wait animate-pulse"
                          : "btn-3d-gold cursor-pointer"
                      }`}
                    >
                      {task.completed ? "COMPLETED" : isVerifying ? "VERIFYING..." : "VERIFY"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EXCLUSIVE TAB */}
      {activeCategory === "exclusive" && (
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-neutral-400 tracking-wider uppercase">
              EXCLUSIVE ACHIEVEMENTS
            </span>
            <div className="flex-1 h-[1px] bg-neutral-800/80" />
          </div>

          {initialExclusiveTasks.map((ex) => (
            <div
              key={ex.id}
              className="card-3d rounded-3xl p-4 flex items-center justify-between shadow-md"
            >
              <div>
                <h3 className="text-white font-black text-sm">{ex.title}</h3>
                <span className="text-xs text-neutral-400 block font-semibold">{ex.subtitle}</span>
                <span className="text-xs font-black text-yellow-400 mt-1 block">
                  🪙 +{ex.reward} Points · Progress: {ex.progress}
                </span>
              </div>
              <button className="py-2 px-4 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-400 text-xs font-bold uppercase">
                IN PROGRESS
              </button>
            </div>
          ))}
        </div>
      )}

      {/* PARTNER TAB */}
      {activeCategory === "partner" && (
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-neutral-400 tracking-wider uppercase">
              PARTNER PROJECTS
            </span>
            <div className="flex-1 h-[1px] bg-neutral-800/80" />
          </div>

          {initialPartnerTasks.map((pt) => (
            <div
              key={pt.id}
              className="card-3d rounded-3xl p-4 flex items-center justify-between shadow-md"
            >
              <div>
                <h3 className="text-white font-black text-sm">{pt.title}</h3>
                <span className="text-xs text-neutral-400 block font-semibold">{pt.subtitle}</span>
                <span className="text-xs font-black text-yellow-400 mt-1 block">
                  🪙 +{pt.reward} Points
                </span>
              </div>
              <a
                href={pt.link}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-5 rounded-full btn-3d-gold text-xs font-black uppercase"
              >
                OPEN
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
