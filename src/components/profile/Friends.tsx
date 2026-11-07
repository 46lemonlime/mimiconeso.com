'use client';

import React from 'react';
import Image from 'next/image';
import { FRIENDS_DATA } from '@/data/friends';
import { RetroWindow } from '@/components/ui/RetroWindow';
import { Heart, ExternalLink } from 'lucide-react';

export function Friends() {
  return (
    <RetroWindow
      title="MIMI'S FRIEND SPACE (TOP 8)"
      icon="♥"
      badge="849 FRIENDS TOTAL"
      variant="magenta"
    >
      <div className="font-mono text-xs mb-3 text-[#A9A0B5] flex items-center justify-between">
        <span>Mimi has <span className="text-[#FF3DAE] font-bold">849</span> friends in cyberspace.</span>
        <span className="text-[#62E9FF] underline cursor-pointer hover:text-[#FF3DAE]">
          [View All Friends]
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FRIENDS_DATA.map((friend) => (
          <div
            key={friend.id}
            className="group bg-[#15101E] border border-[#2B2338] hover:border-[#62E9FF] p-2 rounded-xs flex flex-col items-center text-center transition-all duration-150 hover:-translate-y-0.5"
          >
            {/* Friend Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-xs overflow-hidden border border-[#3E3250] group-hover:border-[#FF3DAE] bg-[#0A0712] mb-1.5 shadow-inner">
              <Image
                src={friend.avatar}
                alt={friend.name}
                width={96}
                height={96}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Friend Name Link */}
            <a
              href={friend.url}
              onClick={(e) => e.preventDefault()}
              className="font-mono text-xs font-bold text-[#62E9FF] group-hover:text-[#FF3DAE] transition-colors truncate max-w-full flex items-center gap-1"
            >
              <span className="truncate">{friend.name}</span>
            </a>

            {/* Role & Quote */}
            <span className="font-pixel text-[8px] text-[#A46BFF] mt-0.5">
              {friend.role}
            </span>

            <p className="font-mono text-[10px] text-[#EDE9F2]/70 italic mt-1 line-clamp-2 px-1">
              &quot;{friend.statusQuote}&quot;
            </p>
          </div>
        ))}
      </div>
    </RetroWindow>
  );
}
