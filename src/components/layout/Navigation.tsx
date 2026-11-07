'use client';

import React, { useState } from 'react';
import { Sparkles, Radio, Disc, User, Camera, Calendar, MessageSquare, Terminal } from 'lucide-react';

interface NavigationProps {
  activeSection?: string;
}

export function Navigation({ activeSection = 'home' }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '[ HOME ]', href: '#home', icon: Terminal },
    { label: '[ MUSIC ]', href: '#music', icon: Disc },
    { label: '[ ABOUT ]', href: '#about', icon: User },
    { label: '[ VISUALS ]', href: '#visuals', icon: Camera },
    { label: '[ LIVE ]', href: '#live', icon: Calendar },
    { label: '[ FRIENDS ]', href: '#friends', icon: Sparkles },
    { label: '[ GUESTBOOK ]', href: '#guestbook', icon: MessageSquare },
  ];

  return (
    <nav className="bg-[#191424] border-b-2 border-[#FF3DAE] font-mono text-xs select-none sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between h-11">
        {/* Retro Navigation Links Desktop */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2.5 py-1 text-[#EDE9F2] hover:text-[#111016] hover:bg-[#FF3DAE] border border-transparent hover:border-[#FFA0D6] transition-colors font-bold tracking-wider"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="px-2.5 py-1 bg-[#2C213D] text-[#FF3DAE] border border-[#FF3DAE] text-xs font-bold font-mono"
            type="button"
          >
            {mobileMenuOpen ? '✕ CLOSE' : '☰ MENU'}
          </button>
        </div>

        {/* Quick Station Info / Live Ticker */}
        <div className="flex items-center gap-2 text-[11px] text-[#62E9FF]">
          <span className="hidden sm:inline text-[#A9A0B5]">CYBER FEED:</span>
          <span className="font-pixel text-[9px] bg-[#110E17] text-[#B7FF67] px-2 py-0.5 border border-[#B7FF67]/50 animate-pulse">
            180 BPM
          </span>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#15101F] border-t border-[#342747] px-4 py-3 divide-y divide-[#2B2138]">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-sm text-[#EDE9F2] hover:text-[#FF3DAE] font-bold"
              >
                <Icon className="w-4 h-4 text-[#62E9FF]" />
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
