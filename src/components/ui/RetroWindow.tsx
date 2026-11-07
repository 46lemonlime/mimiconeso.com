import React from 'react';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  icon?: string;
  badge?: string;
  variant?: 'magenta' | 'purple' | 'cyan' | 'green' | 'default';
  className?: string;
  headerClassName?: string;
  onClose?: () => void;
  onMinimize?: () => void;
}

export function RetroWindow({
  title,
  children,
  icon = '★',
  badge,
  variant = 'default',
  className = '',
  headerClassName = '',
  onClose,
  onMinimize,
}: RetroWindowProps) {
  const variantGradients = {
    magenta: 'from-[#FF3DAE] via-[#A46BFF] to-[#62E9FF] text-[#111016]',
    purple: 'from-[#A46BFF] via-[#7B3FE4] to-[#2B1B4A] text-white',
    cyan: 'from-[#62E9FF] via-[#3AB4E8] to-[#1C5B8C] text-[#0A1624]',
    green: 'from-[#B7FF67] via-[#7AC930] to-[#2A590F] text-[#0E1F07]',
    default: 'from-[#2C233D] via-[#3E3157] to-[#241C33] text-[#EDE9F2] border-b border-[#A46BFF]/40',
  };

  return (
    <div
      className={`retro-window rounded-sm overflow-hidden flex flex-col ${className}`}
    >
      {/* Title Bar */}
      <div
        className={`px-3 py-1.5 flex items-center justify-between select-none bg-gradient-to-r ${variantGradients[variant]} ${headerClassName}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-mono">{icon}</span>
          <span className="font-mono text-xs font-bold tracking-wider uppercase truncate">
            {title}
          </span>
          {badge && (
            <span className="text-[9px] font-pixel px-1.5 py-0.5 rounded-xs bg-[#111016]/80 text-[#B7FF67] border border-[#B7FF67]/60">
              {badge}
            </span>
          )}
        </div>

        {/* Windows 98/2000 style Window Buttons */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button
            onClick={onMinimize}
            className="w-4 h-4 bg-[#EDE9F2] hover:bg-[#62E9FF] text-[#111016] text-[10px] font-mono font-bold flex items-center justify-center border-t border-l border-white border-b border-r border-[#666] active:translate-y-px"
            title="Minimize"
            type="button"
          >
            _
          </button>
          <button
            className="w-4 h-4 bg-[#EDE9F2] hover:bg-[#62E9FF] text-[#111016] text-[10px] font-mono font-bold flex items-center justify-center border-t border-l border-white border-b border-r border-[#666] active:translate-y-px"
            title="Maximize"
            type="button"
          >
            □
          </button>
          <button
            onClick={onClose}
            className="w-4 h-4 bg-[#FF3DAE] hover:bg-red-600 text-white text-[10px] font-mono font-bold flex items-center justify-center border-t border-l border-[#ff8cd0] border-b border-r border-[#70003b] active:translate-y-px"
            title="Close"
            type="button"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-4 flex-1">{children}</div>
    </div>
  );
}
