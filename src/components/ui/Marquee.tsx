import React from 'react';

interface MarqueeProps {
  items?: string[];
  speed?: 'normal' | 'fast' | 'slow';
  className?: string;
}

export function Marquee({
  items = [
    '★ NEW EP "CYBERNETIC_HEARTBREAK_V2" STREAMING EVERYWHERE ★',
    '+++ NEXT LIVE SHOW: SEOUL UNDERGROUND WAREHOUSE DEC 14 +++',
    '★ WELCOME TO MIMI CONESO\'S OFFICIAL CYBER CORNER (EST. 2007) ★',
    '+++ REMEMBER TO SIGN THE GUESTBOOK & ADD TO YOUR TOP 8 +++',
    '★ DOWNLOAD PREVIEW TRACKS IN WINAMP STEREO HI-FI 44.1kHz ★',
  ],
  className = '',
}: MarqueeProps) {
  const content = items.join('     ');

  return (
    <div
      className={`overflow-hidden whitespace-nowrap bg-[#1B1722] border-y border-[#FF3DAE]/30 py-1.5 font-mono text-xs select-none ${className}`}
    >
      <div className="animate-marquee flex gap-8">
        <span className="text-[#62E9FF] font-bold tracking-wider">
          {content}
        </span>
        <span className="text-[#FF3DAE] font-bold tracking-wider">
          {content}
        </span>
      </div>
    </div>
  );
}
