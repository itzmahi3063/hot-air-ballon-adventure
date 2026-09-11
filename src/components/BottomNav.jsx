"use client";

import React from "react";

export default function BottomNav({ activeTab, onSelectTab }) {
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: (active) => (
        <svg
          className={`w-6 h-6 transition-all duration-300 ${active ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" : "text-neutral-500"}`}
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? "0" : "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
      ),
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: (active) => (
        <svg
          className={`w-6 h-6 transition-all duration-300 ${active ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" : "text-neutral-500"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Clipboard with checkmark (Matches screenshot Tasks icon) */}
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill={active ? "currentColor" : "none"} />
          <path d="m9 14 2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "refer",
      label: "Refer",
      icon: (active) => (
        <svg
          className={`w-6 h-6 transition-all duration-300 ${active ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" : "text-neutral-500"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M12 8v13" />
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
          <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
        </svg>
      ),
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: (active) => (
        <svg
          className={`w-6 h-6 transition-all duration-300 ${active ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" : "text-neutral-500"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="w-full max-w-md bg-[#0e0c08]/95 backdrop-blur-md border-t border-yellow-500/20 px-6 py-2 flex items-center justify-between pointer-events-auto shadow-2xl">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="flex flex-col items-center justify-center gap-1 py-1 px-3 transition-transform active:scale-90"
            >
              {item.icon(isActive)}
              <span
                className={`text-[11px] font-semibold tracking-tight transition-colors duration-200 ${
                  isActive
                    ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)] font-bold"
                    : "text-neutral-500"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
