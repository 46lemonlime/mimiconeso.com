import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  tag?: string;
  variant?: 'pink' | 'purple' | 'cyan' | 'green';
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  tag,
  variant = 'pink',
  className = '',
}: SectionTitleProps) {
  const accentColors = {
    pink: 'text-[#FF3DAE] border-[#FF3DAE]',
    purple: 'text-[#A46BFF] border-[#A46BFF]',
    cyan: 'text-[#62E9FF] border-[#62E9FF]',
    green: 'text-[#B7FF67] border-[#B7FF67]',
  };

  return (
    <div className={`flex flex-col gap-1 mb-4 select-none ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-[#FF3DAE] text-xs">★</span>
        <h2 className={`font-mono font-black text-lg md:text-xl tracking-wider uppercase hover-glitch flex items-center gap-2 text-[#EDE9F2]`}>
          <span className={accentColors[variant].split(' ')[0]}>//</span>
          <span>{title}</span>
        </h2>
        {tag && (
          <span className="ml-auto font-pixel text-[9px] px-2 py-0.5 rounded-xs bg-[#241B33] text-[#62E9FF] border border-[#62E9FF]/40">
            {tag}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="font-mono text-xs text-[#A9A0B5] pl-5 flex items-center gap-1.5">
          <span className="text-[#B7FF67]">↳</span> {subtitle}
        </p>
      )}
      <div className="w-full h-px bg-gradient-to-r from-[#FF3DAE] via-[#A46BFF] to-transparent mt-1 opacity-60" />
    </div>
  );
}
