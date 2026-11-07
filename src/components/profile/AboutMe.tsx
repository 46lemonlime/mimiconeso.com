'use client';

import React from 'react';
import { ARTIST_DATA } from '@/data/artist';
import { RetroWindow } from '@/components/ui/RetroWindow';
import { Sliders, Sparkles, Terminal } from 'lucide-react';

export function AboutMe() {
  return (
    <div className="space-y-4">
      {/* Mimi's Bio Window */}
      <RetroWindow
        title="ABOUT MIMI CONESO // BIOGRAPHY"
        icon="★"
        badge="VERIFIED CYBERCORE"
        variant="magenta"
      >
        <div className="font-mono text-xs sm:text-sm text-[#EDE9F2] space-y-3 leading-relaxed">
          {ARTIST_DATA.bio.map((paragraph, idx) => (
            <p key={idx} className="text-[#EDE9F2]/90">
              {paragraph}
            </p>
          ))}

          {/* Personality Statement Quote */}
          <div className="my-3 p-3 bg-[#130E1C] border-l-4 border-[#FF3DAE] text-xs font-mono text-[#62E9FF] italic">
            &quot;cyberspace is the only place where broken 180bpm synths make complete emotional sense. if my tracks hurt your laptop speakers, that means they are working correctly.&quot;
            <span className="block text-[#A9A0B5] not-italic mt-1 text-[11px]">
              — Mimi, posted from Akihabara Internet Cafe #404
            </span>
          </div>
        </div>
      </RetroWindow>

      {/* Two Column Subsections: Who I'd like to meet & Gear / Setup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Who I'd Like To Meet */}
        <RetroWindow
          title="WHO I'D LIKE TO MEET"
          icon="♥"
          variant="purple"
        >
          <div className="font-mono text-xs text-[#EDE9F2]/90 space-y-2">
            <p className="leading-relaxed">{ARTIST_DATA.whoIdLikeToMeet}</p>
            <div className="pt-2 border-t border-[#2B2338] text-[11px] text-[#A9A0B5]">
              <span className="text-[#B7FF67] font-bold">CURRENT OBSESSIONS:</span> DDR arcade cabinets, neon hair dye, 56k dialup handshake samples, lightscribe CD burners.
            </div>
          </div>
        </RetroWindow>

        {/* Hardware & Gear setup */}
        <RetroWindow
          title="STUDIO RIG & HARDWARE"
          icon="⌨"
          variant="cyan"
        >
          <div className="space-y-1.5 font-mono text-xs">
            {ARTIST_DATA.gearList.map((gear, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[#EDE9F2]/90 bg-[#140F1E] px-2 py-1 border border-[#231A33]"
              >
                <Terminal className="w-3 h-3 text-[#62E9FF] shrink-0" />
                <span className="truncate">{gear}</span>
              </div>
            ))}
          </div>
        </RetroWindow>
      </div>

      {/* Musical Influences Window */}
      <RetroWindow
        title="SONIC INFLUENCES & INSPIRATIONS"
        icon="♪"
        variant="green"
      >
        <div className="flex flex-wrap gap-2">
          {ARTIST_DATA.influences.map((inf, i) => (
            <span
              key={i}
              className="font-mono text-xs px-2.5 py-1 bg-[#162013] text-[#B7FF67] border border-[#B7FF67]/50 rounded-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#B7FF67]" />
              {inf}
            </span>
          ))}
        </div>
      </RetroWindow>
    </div>
  );
}
