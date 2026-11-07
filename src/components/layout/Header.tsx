'use client';

import React from 'react';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { Sparkles, Disc, Radio, Tv, Volume2 } from 'lucide-react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';

interface HeaderProps {
  crtActive: boolean;
  toggleCRT: () => void;
}

export function Header({ crtActive, toggleCRT }: HeaderProps) {
  const { isPlaying, togglePlay, currentTrack } = useMusicPlayer();

  return (
    <header className="bg-[#140F1E] border-b border-[#2C223A] pt-3 pb-2 px-3 sm:px-6 relative select-none">
      {/* Top Cyber Metadata Bar */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#A9A0B5] mb-2 border-b border-[#20182E] pb-1.5">
        <div className="flex items-center gap-3">
          <StatusIndicator status="online" label="MIMI IS ONLINE" />
          <span className="hidden sm:inline text-[#2B2338]">|</span>
          <span className="hidden sm:inline text-[#62E9FF]">
            IP: 192.168.0.7 (Cyberspace Node)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* CRT toggle */}
          <button
            onClick={toggleCRT}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] font-bold border transition-colors cursor-pointer ${
              crtActive
                ? 'bg-[#B7FF67] text-[#0F2405] border-[#B7FF67]'
                : 'bg-[#21192E] text-[#EDE9F2] border-[#3B2F4E] hover:border-[#62E9FF]'
            }`}
            type="button"
          >
            <Tv className="w-3 h-3" />
            <span>CRT SCANLINES: {crtActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Quick Sound preview trigger */}
          <button
            onClick={togglePlay}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] font-bold border transition-colors cursor-pointer ${
              isPlaying
                ? 'bg-[#FF3DAE] text-[#111016] border-[#FF3DAE] animate-pulse'
                : 'bg-[#21192E] text-[#62E9FF] border-[#3B2F4E] hover:border-[#FF3DAE]'
            }`}
            type="button"
          >
            <Volume2 className="w-3 h-3" />
            <span>{isPlaying ? 'AUDIO: PLAYING' : 'AUDIO: MUTED'}</span>
          </button>
        </div>
      </div>

      {/* Main Logo & Cyber Header Area */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-2 gap-3">
        {/* Brand / Logo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="text-[#FF3DAE] text-xl animate-spin">★</span>
            <a
              href="#home"
              className="font-pixel text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF3DAE] via-[#A46BFF] to-[#62E9FF] tracking-wider hover-glitch"
            >
              M1M1 // CONESO
            </a>
            <span className="text-[#62E9FF] text-xl animate-spin">★</span>
          </div>
          <p className="font-mono text-xs text-[#A9A0B5] mt-1 flex items-center gap-1.5">
            <span className="text-[#B7FF67] font-bold">EST. 2007</span>
            <span>—</span>
            <span>UNDERGROUND HYPERPOP & DIGITALCORE ARCHIVE</span>
          </p>
        </div>

        {/* Vintage Badges / Header Decor */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-[10px]">
          <div className="p-2 bg-[#1B1428] border border-[#3E2E55] text-right">
            <div className="text-[#FF3DAE] font-bold flex items-center justify-end gap-1">
              <Disc className="w-3 h-3 text-[#FF3DAE]" />
              NOW LOADED:
            </div>
            <div className="text-[#62E9FF] max-w-[180px] truncate">
              {currentTrack.title}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
