import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'pink' | 'purple' | 'cyan' | 'green' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function PixelButton({
  variant = 'pink',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}: PixelButtonProps) {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-1 font-mono tracking-wider',
    md: 'text-xs px-4 py-1.5 font-mono font-bold tracking-wide',
    lg: 'text-sm px-6 py-2.5 font-mono font-bold tracking-wider',
  };

  const variantStyles = {
    pink: 'bg-[#FF3DAE] text-[#111016] border-t-2 border-l-2 border-[#FFA1D6] border-b-2 border-r-2 border-[#8A0051] hover:bg-[#ff5bb9] active:border-t-[#8A0051] active:border-l-[#8A0051] active:border-b-[#FFA1D6] active:border-r-[#FFA1D6]',
    purple: 'bg-[#A46BFF] text-[#111016] border-t-2 border-l-2 border-[#D4BCFF] border-b-2 border-r-2 border-[#5421A8] hover:bg-[#b587ff] active:border-t-[#5421A8] active:border-l-[#5421A8] active:border-b-[#D4BCFF] active:border-r-[#D4BCFF]',
    cyan: 'bg-[#62E9FF] text-[#0B1724] border-t-2 border-l-2 border-[#B8F6FF] border-b-2 border-r-2 border-[#166F8A] hover:bg-[#85efff] active:border-t-[#166F8A] active:border-l-[#166F8A] active:border-b-[#B8F6FF] active:border-r-[#B8F6FF]',
    green: 'bg-[#B7FF67] text-[#0F2405] border-t-2 border-l-2 border-[#E1FFBD] border-b-2 border-r-2 border-[#578E18] hover:bg-[#c6ff85] active:border-t-[#578E18] active:border-l-[#578E18] active:border-b-[#E1FFBD] active:border-r-[#E1FFBD]',
    gray: 'bg-[#2B2338] text-[#EDE9F2] border-t-2 border-l-2 border-[#4E4161] border-b-2 border-r-2 border-[#15101C] hover:bg-[#392F4A] active:border-t-[#15101C] active:border-l-[#15101C] active:border-b-[#4E4161] active:border-r-[#4E4161]',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 transition-colors select-none cursor-pointer active:translate-y-px ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
