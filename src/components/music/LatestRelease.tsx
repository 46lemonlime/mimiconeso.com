'use client';

import React from 'react';
import Image from 'next/image';
import { RELEASES_DATA } from '@/data/releases';
import { TRACKS_DATA } from '@/data/tracks';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { PixelButton } from '@/components/ui/PixelButton';
import { Play, Disc, ExternalLink, Sparkles } from 'lucide-react';

export function LatestRelease() {
  const featured = RELEASES_DATA[0];
  const { playTrack, currentTrack, isPlaying } = useMusicPlayer();

  const handlePlayFirstTrack = () => {
    playTrack(TRACKS_DATA[0]);
  };

  return (
    <div className="relative bg-[#181322] border-2 border-[#FF3DAE] p-4 sm:p-5 shadow-[0_0_20px_rgba(255,61,174,0.25)]">
      {/* Top Banner Tag */}
      <div className="absolute -top-3 left-4 bg-[#FF3DAE] text-[#111016] px-3 py-0.5 font-pixel text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 shadow-md">
        <Sparkles className="w-3 h-3" />
        LATEST TRANSMISSION // 2007
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-2">
        {/* Album Artwork & Jewel Case Effect */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative group w-full max-w-[280px] aspect-square rounded-xs overflow-hidden border-2 border-[#62E9FF] shadow-[0_0_15px_rgba(98,233,255,0.3)] bg-[#0C0814]">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              width={280}
              height={280}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Jewel Case Glass Glare Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

            {/* Play Overlay Button */}
            <button
              onClick={handlePlayFirstTrack}
              className="absolute inset-0 bg-[#111016]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 cursor-pointer"
              type="button"
            >
              <div className="w-14 h-14 rounded-full bg-[#FF3DAE] flex items-center justify-center text-[#111016] shadow-lg transform group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 fill-current translate-x-0.5" />
              </div>
              <span className="font-pixel text-[10px] text-[#B7FF67] bg-[#111016] px-2 py-1 border border-[#B7FF67]">
                PLAY IN WINAMP
              </span>
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between w-full max-w-[280px] font-mono text-[11px] text-[#A9A0B5] bg-[#120E1A] px-2.5 py-1 border border-[#2B2338]">
            <span>CAT: {featured.catalogNumber}</span>
            <span className="text-[#B7FF67] font-bold">180kbps MP3</span>
          </div>
        </div>

        {/* Release Metadata & Tracklist */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-pixel text-[9px] px-2 py-0.5 bg-[#A46BFF] text-[#111016] font-bold">
                {featured.type}
              </span>
              <span className="font-mono text-xs text-[#62E9FF]">
                YEAR: {featured.year}
              </span>
              {featured.cassetteAvailable && (
                <span className="font-mono text-[10px] text-[#B7FF67] bg-[#1B2918] px-2 py-0.5 border border-[#B7FF67]/40">
                  CASSETTE TAPE (LIMITED RUN)
                </span>
              )}
            </div>

            <h3 className="font-mono text-2xl font-black text-white tracking-wide uppercase hover-glitch">
              {featured.title}
            </h3>

            <p className="font-mono text-xs text-[#EDE9F2]/80 mt-2 leading-relaxed">
              {featured.description}
            </p>

            {/* Tracklist Preview */}
            <div className="mt-4 bg-[#120E1A] border border-[#2B2338] p-2.5">
              <div className="font-mono text-[11px] font-bold text-[#A46BFF] mb-2 flex items-center justify-between">
                <span>TRACKLIST ({featured.trackCount} CUTS)</span>
                <span className="text-[10px] text-[#A9A0B5]">CLICK TO PLAY</span>
              </div>

              <div className="space-y-1 font-mono text-xs">
                {TRACKS_DATA.slice(0, 5).map((t, idx) => {
                  const isCurrent = currentTrack.id === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => playTrack(t)}
                      className={`w-full text-left px-2 py-1 flex items-center justify-between group rounded-xs transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#FF3DAE]/20 text-[#62E9FF] font-bold'
                          : 'hover:bg-[#251D33] text-[#EDE9F2]/90'
                      }`}
                      type="button"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[10px] text-[#A9A0B5]">0{idx + 1}.</span>
                        <span className="truncate group-hover:text-[#FF3DAE]">
                          {t.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#A9A0B5] shrink-0 ml-2">
                        {isCurrent && isPlaying ? (
                          <span className="text-[#B7FF67]">▶ NOW PLAYING</span>
                        ) : (
                          `${Math.floor(t.duration / 60)}:${(t.duration % 60)
                            .toString()
                            .padStart(2, '0')}`
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons & Streaming Outlinks */}
          <div className="mt-4 pt-3 border-t border-[#2B2338] flex flex-wrap items-center justify-between gap-2.5">
            <PixelButton
              variant="pink"
              size="md"
              icon={<Play className="w-4 h-4 fill-current" />}
              onClick={handlePlayFirstTrack}
            >
              PLAY EP IN WINAMP
            </PixelButton>

            <div className="flex items-center gap-2 font-mono text-xs">
              <a
                href={featured.streamingLinks.bandcamp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-[#241B33] text-[#62E9FF] hover:bg-[#62E9FF] hover:text-[#111016] border border-[#62E9FF]/50 transition-colors flex items-center gap-1"
              >
                <Disc className="w-3 h-3" />
                Bandcamp
              </a>
              <a
                href={featured.streamingLinks.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-[#241B33] text-[#FF3DAE] hover:bg-[#FF3DAE] hover:text-[#111016] border border-[#FF3DAE]/50 transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                SoundCloud
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
