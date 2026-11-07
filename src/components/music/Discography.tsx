'use client';

import React from 'react';
import Image from 'next/image';
import { RELEASES_DATA } from '@/data/releases';
import { TRACKS_DATA } from '@/data/tracks';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Play, Disc3, Radio } from 'lucide-react';

export function Discography() {
  const { playTrack } = useMusicPlayer();

  const handlePlayRelease = (releaseId: string) => {
    // Map release to first track or matching track
    const trackMap: Record<string, string> = {
      'rel-01': 'track-01',
      'rel-02': 'track-03',
      'rel-03': 'track-04',
      'rel-04': 'track-02',
    };
    const targetId = trackMap[releaseId] || 'track-01';
    const foundTrack = TRACKS_DATA.find((t) => t.id === targetId);
    if (foundTrack) {
      playTrack(foundTrack);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {RELEASES_DATA.map((rel) => (
        <div
          key={rel.id}
          className="group bg-[#16121E] border border-[#2B2338] hover:border-[#FF3DAE] p-3 rounded-xs flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(255,61,174,0.2)]"
        >
          <div>
            {/* Jewel Case Art */}
            <div className="relative aspect-square w-full rounded-xs overflow-hidden border border-[#3E3350] bg-[#0C0814] mb-3">
              <Image
                src={rel.coverImage}
                alt={rel.title}
                width={300}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Jewel Case overlay & Play button on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111016]/90 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-3">
                <button
                  onClick={() => handlePlayRelease(rel.id)}
                  className="w-full py-1.5 bg-[#FF3DAE] hover:bg-[#ff5bb9] text-[#111016] font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:translate-y-px cursor-pointer"
                  type="button"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  LISTEN IN WINAMP
                </button>
              </div>

              {/* Format Badge Top Right */}
              <div className="absolute top-2 right-2 font-pixel text-[8px] px-1.5 py-0.5 bg-[#111016]/90 text-[#62E9FF] border border-[#62E9FF]/40 shadow-sm">
                {rel.type}
              </div>
            </div>

            {/* Release Info */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#A9A0B5] mb-1">
              <span>{rel.year}</span>
              <span className="text-[#B7FF67]">{rel.catalogNumber}</span>
            </div>

            <h4 className="font-mono text-sm font-bold text-white group-hover:text-[#FF3DAE] transition-colors uppercase truncate">
              {rel.title}
            </h4>

            <p className="font-mono text-[11px] text-[#A9A0B5] line-clamp-2 mt-1 leading-relaxed">
              {rel.description}
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-[#251D30] flex items-center justify-between text-[10px] font-mono text-[#A9A0B5]">
            <span className="flex items-center gap-1 text-[#A46BFF]">
              <Disc3 className="w-3 h-3" />
              {rel.trackCount} Tracks
            </span>
            {rel.cassetteAvailable ? (
              <span className="text-[#B7FF67]">Cassette Available</span>
            ) : (
              <span className="text-[#62E9FF] flex items-center gap-1">
                <Radio className="w-3 h-3" /> Digital Stream
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
