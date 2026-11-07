'use client';

import React, { useState } from 'react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import {
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ListMusic,
  Disc,
} from 'lucide-react';
import { Playlist } from './Playlist';

interface MusicPlayerProps {
  className?: string;
  showPlaylistInitially?: boolean;
}

export function MusicPlayer({
  className = '',
  showPlaylistInitially = true,
}: MusicPlayerProps) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    eqBars,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    setVolume,
    toggleMute,
  } = useMusicPlayer();

  const [showPlaylist, setShowPlaylist] = useState<boolean>(showPlaylistInitially);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercent = parseFloat(e.target.value);
    const newTime = (newPercent / 100) * duration;
    seekTo(newTime);
  };

  return (
    <div
      className={`winamp-panel rounded-sm p-2.5 text-[#EDE9F2] font-mono select-none ${className}`}
    >
      {/* Top Title Bar of Winamp */}
      <div className="bg-gradient-to-r from-[#201A2C] via-[#35254A] to-[#1A1424] px-2 py-1 rounded-t-xs border-b border-[#4E3F66] flex items-center justify-between text-[11px] mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Disc className={`w-3.5 h-3.5 text-[#FF3DAE] ${isPlaying ? 'animate-spin' : ''}`} />
          <span className="font-bold text-[#FF3DAE] tracking-wider truncate">
            WINAMP 2.91 - {currentTrack.artist}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-[#62E9FF] font-pixel shrink-0">
          <span className="hidden sm:inline">192KBPS</span>
          <span>44.1KHZ</span>
        </div>
      </div>

      {/* Main Display Unit (Green / Cyan LCD Screen) */}
      <div className="bg-[#091512] border-2 border-[#1E3B33] rounded-xs p-2.5 mb-2.5 shadow-inner">
        <div className="flex flex-col gap-2">
          {/* LCD Top Row: Time & Bitrate */}
          <div className="flex items-center justify-between font-mono">
            {/* Big 7-Segment Digital Clock */}
            <div className="flex items-baseline gap-1 text-[#62E9FF] drop-shadow-[0_0_6px_#62E9FF]">
              <span className="text-[10px] text-[#A9A0B5]">TIME</span>
              <span className="text-xl sm:text-2xl font-black font-mono tracking-widest">
                {formatTime(currentTime)}
              </span>
              <span className="text-[10px] text-[#A9A0B5]">
                / {formatTime(duration)}
              </span>
            </div>

            {/* EQ Spectrum Visualizer */}
            <div className="flex items-end gap-1 h-7 px-2 py-0.5 bg-[#040C0A] border border-[#16332B] rounded-xs">
              {eqBars.map((height, i) => (
                <div
                  key={i}
                  className="w-1.5 sm:w-2 bg-[#122B23] h-full flex flex-col justify-end"
                >
                  <div
                    className="w-full transition-all duration-75"
                    style={{
                      height: `${height}%`,
                      backgroundColor:
                        height > 75
                          ? '#FF3DAE'
                          : height > 45
                          ? '#B7FF67'
                          : '#62E9FF',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* LCD Marquee Track Name */}
          <div className="bg-[#040C0A] border border-[#183B32] px-2 py-1 text-xs text-[#B7FF67] font-bold tracking-wide truncate flex items-center justify-between">
            <span className="truncate">
              {isPlaying ? '▶' : '■'} {currentTrack.title} ({currentTrack.genre || 'Digitalcore'})
            </span>
            <span className="text-[10px] text-[#62E9FF] font-pixel shrink-0 ml-2">
              STEREO
            </span>
          </div>

          {/* Interactive Progress Bar */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progressPercent}
              onChange={handleSeek}
              className="w-full h-2 bg-[#040C0A] rounded-none appearance-none cursor-pointer accent-[#FF3DAE]"
              title="Seek track"
            />
          </div>
        </div>
      </div>

      {/* Control Buttons & Volume Section */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#1C1624] p-2 border border-[#322840] rounded-xs">
        {/* Playback Transport Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={prevTrack}
            className="p-1.5 bg-[#2C2338] hover:bg-[#FF3DAE] text-white hover:text-[#111016] border-t border-l border-[#4F4163] border-b border-r border-[#140F1C] active:translate-y-px transition-colors cursor-pointer"
            title="Previous Track"
            type="button"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={togglePlay}
            className={`px-3 py-1.5 flex items-center gap-1 font-bold text-xs border-t border-l border-b border-r active:translate-y-px transition-colors cursor-pointer ${
              isPlaying
                ? 'bg-[#B7FF67] text-[#0F2405] border-[#E0FFBA] border-b-[#477A13] border-r-[#477A13]'
                : 'bg-[#FF3DAE] text-[#111016] border-[#FFA0D6] border-b-[#780041] border-r-[#780041] hover:bg-[#ff5bb9]'
            }`}
            title={isPlaying ? 'Pause' : 'Play'}
            type="button"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              if (isPlaying) togglePlay();
              seekTo(0);
            }}
            className="p-1.5 bg-[#2C2338] hover:bg-[#62E9FF] text-white hover:text-[#111016] border-t border-l border-[#4F4163] border-b border-r border-[#140F1C] active:translate-y-px transition-colors cursor-pointer"
            title="Stop Track"
            type="button"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>

          <button
            onClick={nextTrack}
            className="p-1.5 bg-[#2C2338] hover:bg-[#FF3DAE] text-white hover:text-[#111016] border-t border-l border-[#4F4163] border-b border-r border-[#140F1C] active:translate-y-px transition-colors cursor-pointer"
            title="Next Track"
            type="button"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Volume & Playlist Toggles */}
        <div className="flex items-center gap-3">
          {/* Volume Control */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleMute}
              className="text-[#A9A0B5] hover:text-[#FF3DAE] cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
              type="button"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#62E9FF]" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-14 sm:w-18 h-1.5 bg-[#0C0913] rounded-none appearance-none cursor-pointer accent-[#62E9FF]"
              title="Volume"
            />
            <span className="text-[10px] text-[#A9A0B5] w-6 text-right">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>

          {/* Playlist Toggle Button */}
          <button
            onClick={() => setShowPlaylist((prev) => !prev)}
            className={`px-2 py-1 flex items-center gap-1 text-[11px] font-bold border-t border-l border-[#4F4163] border-b border-r border-[#140F1C] active:translate-y-px transition-colors cursor-pointer ${
              showPlaylist
                ? 'bg-[#A46BFF] text-[#111016]'
                : 'bg-[#2C2338] text-[#EDE9F2] hover:bg-[#3D314E]'
            }`}
            type="button"
          >
            <ListMusic className="w-3.5 h-3.5" />
            <span>LIST</span>
          </button>
        </div>
      </div>

      {/* Embedded / Collapsible Playlist Window */}
      {showPlaylist && (
        <div className="mt-2 pt-2 border-t border-[#31273F]">
          <Playlist />
        </div>
      )}
    </div>
  );
}
