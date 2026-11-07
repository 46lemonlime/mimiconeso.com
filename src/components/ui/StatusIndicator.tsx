import React from 'react';

interface StatusIndicatorProps {
  status?: 'online' | 'away' | 'in-studio';
  label?: string;
  className?: string;
}

export function StatusIndicator({
  status = 'online',
  label,
  className = '',
}: StatusIndicatorProps) {
  const statusColors = {
    online: 'bg-[#B7FF67] shadow-[0_0_8px_#B7FF67]',
    away: 'bg-[#FFB703] shadow-[0_0_8px_#FFB703]',
    'in-studio': 'bg-[#FF3DAE] shadow-[0_0_8px_#FF3DAE]',
  };

  const defaultLabels = {
    online: 'ONLINE NOW',
    away: 'AWAY (BRB)',
    'in-studio': 'IN STUDIO (180 BPM)',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#111016]/90 border border-[#2B2338] font-mono text-[11px] font-bold text-[#EDE9F2] ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            status === 'online' ? 'bg-[#B7FF67]' : 'bg-[#FF3DAE]'
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${statusColors[status]}`}
        />
      </span>
      <span className="tracking-wider uppercase">{label || defaultLabels[status]}</span>
    </div>
  );
}
