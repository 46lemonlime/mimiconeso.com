'use client';

import React from 'react';
import { RETRO_BADGES } from '@/data/badges';
import { Sparkles, ArrowUp, Heart, Disc } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E0A16] border-t-2 border-[#FF3DAE] pt-8 pb-12 px-4 select-none font-mono text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Retro Webring Box */}
        <div className="bg-[#171122] border-2 border-[#62E9FF] p-4 text-center max-w-2xl mx-auto shadow-[0_0_15px_rgba(98,233,255,0.15)]">
          <div className="font-pixel text-[10px] text-[#FF3DAE] mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            ★ THE UNDERGROUND HYPERPOP & DIGITALCORE WEBRING ★
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <p className="text-xs text-[#A9A0B5] mb-3">
            You are browsing site #404 in the Cyber Underground Ring. Owned by Mimi Coneso.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold">
            <a
              href="#music"
              className="px-2.5 py-1 bg-[#231A32] text-[#62E9FF] hover:bg-[#62E9FF] hover:text-[#111016] border border-[#62E9FF]/50 transition-colors"
            >
              &lt;&lt; PREV SITE
            </a>
            <span className="text-[#A46BFF] hidden sm:inline">[ RING HUB ]</span>
            <a
              href="#random"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="px-2.5 py-1 bg-[#231A32] text-[#B7FF67] hover:bg-[#B7FF67] hover:text-[#111016] border border-[#B7FF67]/50 transition-colors"
            >
              RANDOM SITE ?
            </a>
            <span className="text-[#A46BFF] hidden sm:inline">[ RING HUB ]</span>
            <a
              href="#visuals"
              className="px-2.5 py-1 bg-[#231A32] text-[#62E9FF] hover:bg-[#62E9FF] hover:text-[#111016] border border-[#62E9FF]/50 transition-colors"
            >
              NEXT SITE &gt;&gt;
            </a>
          </div>
        </div>

        {/* 88x31 Retro Badges Showcase */}
        <div>
          <div className="text-center font-mono text-[11px] text-[#A9A0B5] mb-3 flex items-center justify-center gap-2">
            <span>★ CYBER BUTTONS &amp; AFFILIATES (88x31) ★</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 max-w-4xl mx-auto">
            {RETRO_BADGES.map((b) => (
              <div
                key={b.id}
                className="w-[88px] h-[31px] border flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-transform"
                style={{
                  backgroundColor: b.bgColor,
                  borderColor: b.accentColor,
                  color: b.textColor,
                }}
                title={`${b.label} - ${b.sublabel}`}
              >
                <span className="font-pixel text-[7px] leading-tight font-bold tracking-tight">
                  {b.label}
                </span>
                <span
                  className="font-mono text-[8px] font-black leading-tight"
                  style={{ color: b.accentColor }}
                >
                  {b.sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor Hit Counter (Odometer style) */}
        <div className="flex flex-col items-center justify-center gap-2 pt-2">
          <span className="text-[10px] text-[#A9A0B5] tracking-widest uppercase">
            SIMULATED CYBER VISITOR COUNTER:
          </span>
          <div className="flex items-center border-2 border-[#54436E] bg-black p-1 shadow-inner">
            {['0', '4', '8', '2', '9', '1'].map((digit, idx) => (
              <div
                key={idx}
                className="w-5 h-7 bg-[#1A1A1A] text-[#B7FF67] border-x border-[#333] font-mono text-sm font-black flex items-center justify-center mx-0.5 shadow-sm"
              >
                {digit}
              </div>
            ))}
          </div>
          <span className="text-[9px] text-[#EDE9F2]/50 italic">
            * hits logged since May 14, 2007
          </span>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="border-t border-[#251D33] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#A9A0B5] text-[11px]">
          <div className="text-center sm:text-left space-y-1">
            <p className="flex items-center justify-center sm:justify-start gap-1">
              <span>(C) 2003-2007, 2026</span>
              <span className="text-[#FF3DAE] font-bold">MIMI CONESO</span>
              <span>— ALL RIGHTS RESERVED IN CYBERSPACE.</span>
            </p>
            <p className="text-[10px] text-[#EDE9F2]/60">
              Best viewed in 1024x768 resolution with 32-bit color & headphones plugged in.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F172C] hover:bg-[#FF3DAE] text-[#62E9FF] hover:text-[#111016] border border-[#3E2E55] transition-colors cursor-pointer"
            type="button"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>[ RETURN TO TOP ]</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
