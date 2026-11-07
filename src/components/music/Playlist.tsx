'use client';

import React from 'react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Track } from '@/types';
import { Play, Volume2 } from 'lucide-react';

export function Playlist() {
  const { playlist, currentTrack, isPlaying, playTrack } = useMusicPlayer();

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-[#14101A] border border-[#2B2338] text-xs font-mono">
      {/* Playlist Header */}
      <div className="bg-[#1F1929] px-2.5 py-1 text-[11px] text-[#A46BFF] font-bold border-b border-[#2B2338] flex items-center justify-between">
        <span>WINAMP PLAYLIST [{playlist.length} TRACKS]</span>
        <span className="text-[#62E9FF]">180BPM / STEREO</span>
      </div>

      {/* Playlist Items */}
      <div className="divide-y divide-[#201A2B] max-h-48 overflow-y-auto">
        {playlist.map((track: Track, idx: number) => {
          const isSelected = track.id === currentTrack.id;

          return (
            <button
              key={track.id}
              onClick={() => playTrack(track)}
              className={`w-full px-2.5 py-1.5 flex items-center justify-between text-left transition-colors cursor-pointer group ${
                isSelected
                  ? 'bg-[#FF3DAE]/20 text-[#62E9FF]'
                  : 'hover:bg-[#251D30] text-[#EDE9F2]/80 hover:text-white'
              }`}
              type="button"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] text-[#A9A0B5] w-4 shrink-0 font-pixel">
                  {idx + 1}.
                </span>
                <div className="truncate">
                  <span
                    className={`font-bold ${
                      isSelected ? 'text-[#FF3DAE]' : 'group-hover:text-[#62E9FF]'
                    }`}
                  >
                    {track.title}
                  </span>
                  <span className="text-[10px] text-[#A9A0B5] ml-1.5 hidden sm:inline">
                    - {track.artist}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-2">
                {isSelected && isPlaying ? (
                  <span className="text-[#B7FF67] flex items-center gap-1 text-[10px]">
                    <Volume2 className="w-3 h-3 animate-pulse" />
                    PLAYING
                  </span>
                ) : (
                  <span className="text-[10px] text-[#A9A0B5] group-hover:text-[#EDE9F2]">
                    <Play className="w-2.5 h-2.5 inline mr-1 opacity-0 group-hover:opacity-100" />
                    {formatTime(track.duration)}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Playlist Footer info */}
      <div className="bg-[#191422] px-2.5 py-1 text-[10px] text-[#A9A0B5] border-t border-[#2B2338] flex items-center justify-between">
        <span>TOTAL TIME: 16:51</span>
        <span className="text-[#B7FF67]">LIVE SYNTH PREVIEW ENABLED</span>
      </div>
    </div>
  );
}
