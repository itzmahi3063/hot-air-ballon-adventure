"use client";

import React, { useState } from "react";
import { withdrawalMethods } from "../data/mockData";

export default function WalletTab({ user, onWithdrawSubmit }) {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(withdrawalMethods[0]);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);

    if (isNaN(amount) || amount <= 0) {
      setStatusMessage({ type: "error", text: "Please enter a valid amount" });
      return;
    }
    if (amount > user.usdt) {
      setStatusMessage({ type: "error", text: "Insufficient USDT balance" });
      return;
    }
    if (amount < selectedMethod.min) {
      setStatusMessage({ type: "error", text: `Minimum withdrawal is $${selectedMethod.min} USDT` });
      return;
    }
    if (!walletAddress.trim()) {
      setStatusMessage({ type: "error", text: "Please enter your wallet or account number" });
      return;
    }

    onWithdrawSubmit({
      method: selectedMethod.name,
      amount,
      address: walletAddress,
      date: new Date().toLocaleDateString(),
    });

    setStatusMessage({ type: "success", text: "Withdrawal request submitted successfully!" });
    setTimeout(() => {
      setShowWithdrawModal(false);
      setStatusMessage(null);
      setWithdrawAmount("");
      setWalletAddress("");
    }, 1800);
  };

  return (
    <div className="flex flex-col gap-4 px-4 animate-fadeIn">
      {/* 3D Wallet Balance Overview Card */}
      <div className="card-3d rounded-3xl p-5 shadow-gold-glow flex flex-col gap-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-yellow-400 tracking-wider uppercase">
            Available Balance
          </span>
          <span className="text-xs font-black px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm">
            Active
          </span>
        </div>

        <div>
          <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-1.5 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            <span>${user.usdt.toFixed(4)}</span>
            <span className="text-sm font-black text-yellow-400">USDT</span>
          </div>
          <span className="text-[11px] text-neutral-400 font-semibold mt-0.5 block">
            ≈ ৳{(user.usdt * 122).toFixed(2)} BDT (Estimated)
          </span>
        </div>

        {/* Currency Breakdown (POINTS instead of GEMS) */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-yellow-500/15">
          <div className="bg-[#0f0d08] p-3 rounded-2xl border border-yellow-500/20 shadow-inner flex items-center gap-2.5">
            <span className="text-xl">🪙</span>
            <div className="flex flex-col">
              <span className="text-[9px] text-neutral-400 font-black uppercase">Points</span>
              <span className="text-xs font-black text-yellow-400">{user.points.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-[#0f0d08] p-3 rounded-2xl border border-yellow-500/20 shadow-inner flex items-center gap-2.5">
            <span className="text-xl">🔑</span>
            <div className="flex flex-col">
              <span className="text-[9px] text-neutral-400 font-black uppercase">Keys</span>
              <span className="text-xs font-black text-white">{user.keys} Keys</span>
            </div>
          </div>
        </div>

        {/* 3D Withdraw Trigger Button */}
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="w-full py-3.5 rounded-full btn-3d-gold text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>💸</span>
          <span>REQUEST WITHDRAWAL</span>
        </button>
      </div>

      {/* 3D Recent Activity */}
      <div className="card-3d rounded-3xl p-4 flex flex-col gap-3">
        <h3 className="text-xs font-black text-yellow-400 uppercase tracking-wider">
          Recent Activity
        </h3>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#1a160f] border border-yellow-500/10 text-xs shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🎁</span>
              <div>
                <span className="font-bold text-white block">Welcome Bonus</span>
                <span className="text-[10px] text-neutral-400">Account setup reward</span>
              </div>
            </div>
            <span className="text-emerald-400 font-black">+$10.00 USDT</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#1a160f] border border-yellow-500/10 text-xs shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🪙</span>
              <div>
                <span className="font-bold text-white block">Watch Ad Reward</span>
                <span className="text-[10px] text-neutral-400">Adsgram video clip</span>
              </div>
            </div>
            <span className="text-yellow-400 font-black">+500 Points</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#1a160f] border border-yellow-500/10 text-xs shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🎰</span>
              <div>
                <span className="font-bold text-white block">Lucky Spin</span>
                <span className="text-[10px] text-neutral-400">Wheel prize</span>
              </div>
            </div>
            <span className="text-purple-400 font-black">+$0.50 USDT</span>
          </div>
        </div>
      </div>

      {/* 3D Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-sm card-3d rounded-3xl p-5 shadow-gold-glow flex flex-col gap-4 relative">
            <div className="flex items-center justify-between pb-2 border-b border-yellow-500/20">
              <h3 className="text-base font-black text-yellow-400">Withdraw Funds</h3>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-neutral-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-neutral-300">Select Payout Method:</label>
              <div className="grid grid-cols-2 gap-2">
                {withdrawalMethods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMethod(m)}
                    className={`p-2.5 rounded-2xl border text-xs font-black flex items-center gap-2 transition-all text-left ${
                      selectedMethod.id === m.id
                        ? "bg-yellow-500/25 border-yellow-400 text-yellow-300 shadow-md"
                        : "bg-[#18150e] border-yellow-500/20 text-neutral-400 hover:border-yellow-500/40"
                    }`}
                  >
                    <span>{m.icon}</span>
                    <span className="truncate">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-neutral-300 font-bold">Amount (USDT):</span>
                <span className="text-yellow-500/90 font-black">Min: ${selectedMethod.min}</span>
              </div>
              <input
                type="number"
                step="0.01"
                placeholder={`Min $${selectedMethod.min}`}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full p-3 rounded-2xl bg-[#0e0c08] border border-yellow-500/30 text-white font-black text-sm focus:outline-none focus:border-yellow-400 shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-neutral-300">
                Wallet Address / Mobile Number:
              </label>
              <input
                type="text"
                placeholder={selectedMethod.placeholder}
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full p-3 rounded-2xl bg-[#0e0c08] border border-yellow-500/30 text-white text-xs focus:outline-none focus:border-yellow-400 font-mono shadow-inner"
              />
            </div>

            {statusMessage && (
              <div
                className={`p-2.5 rounded-2xl text-xs font-black text-center ${
                  statusMessage.type === "success"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <button
              onClick={handleWithdraw}
              className="w-full py-3.5 rounded-full btn-3d-gold text-xs font-black uppercase tracking-wider mt-1 cursor-pointer"
            >
              CONFIRM WITHDRAWAL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
