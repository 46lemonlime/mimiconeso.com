'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Track } from '@/types';
import { TRACKS_DATA } from '@/data/tracks';
import { cyberSynth } from '@/lib/audioSynth';

interface MusicPlayerContextType {
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playlist: Track[];
  isPlayerOpen: boolean;
  eqBars: number[];
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seekTo: (time: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  togglePlayerOpen: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [playlist] = useState<Track[]>(TRACKS_DATA);
  const [currentTrack, setCurrentTrack] = useState<Track>(TRACKS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(TRACKS_DATA[0].duration);
  const [volume, setVolumeState] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(true);
  const [eqBars, setEqBars] = useState<number[]>([12, 28, 45, 70, 85, 60, 40, 25, 18, 10]);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize HTML audio element if track has real URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioElementRef.current = new Audio();
      audioElementRef.current.volume = volume;
    }
    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      if (cyberSynth) {
        cyberSynth.stop();
      }
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Sync duration when track changes
  useEffect(() => {
    setDuration(currentTrack.duration);
    setCurrentTime(0);
  }, [currentTrack]);

  // Handle Play/Pause logic
  const startPlayback = useCallback((track: Track) => {
    setIsPlaying(true);
    if (track.audioUrl && audioElementRef.current) {
      audioElementRef.current.src = track.audioUrl;
      audioElementRef.current.play().catch(() => {});
    } else if (cyberSynth) {
      cyberSynth.start(track.synthPreset || 'hyperpop-arp', track.bpm || 175);
      cyberSynth.setVolume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    if (cyberSynth) {
      cyberSynth.stop();
    }
  }, []);

  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    startPlayback(track);
  }, [startPlayback]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback(currentTrack);
    }
  }, [isPlaying, currentTrack, startPlayback, stopPlayback]);

  const nextTrack = useCallback(() => {
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(playlist[nextIndex]);
  }, [currentTrack, playlist, playTrack]);

  const prevTrack = useCallback(() => {
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playTrack(playlist[prevIndex]);
  }, [currentTrack, playlist, playTrack]);

  const seekTo = useCallback((time: number) => {
    setCurrentTime(time);
    if (audioElementRef.current && currentTrack.audioUrl) {
      audioElementRef.current.currentTime = time;
    }
  }, [currentTrack]);

  const setVolume = useCallback((newVol: number) => {
    setVolumeState(newVol);
    if (isMuted) setIsMuted(false);
    if (audioElementRef.current) {
      audioElementRef.current.volume = newVol;
    }
    if (cyberSynth) {
      cyberSynth.setVolume(newVol);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioElementRef.current) {
        audioElementRef.current.muted = next;
      }
      if (cyberSynth) {
        cyberSynth.setVolume(next ? 0 : volume);
      }
      return next;
    });
  }, [volume]);

  const togglePlayerOpen = useCallback(() => {
    setIsPlayerOpen((prev) => !prev);
  }, []);

  // Time ticker when playing
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, duration, nextTrack]);

  // Spectrum EQ bars animation
  useEffect(() => {
    let animId: number;
    const updateEQ = () => {
      if (isPlaying) {
        // Generate dynamic cyber EQ values
        const newBars = Array.from({ length: 10 }, (_, i) => {
          const base = 25 + Math.sin(Date.now() / 150 + i) * 20;
          const noise = Math.random() * 55;
          return Math.min(100, Math.max(10, Math.floor(base + noise)));
        });
        setEqBars(newBars);
      } else {
        setEqBars([8, 14, 18, 22, 25, 20, 16, 12, 10, 6]);
      }
      animId = requestAnimationFrame(updateEQ);
    };
    animId = requestAnimationFrame(updateEQ);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        playlist,
        isPlayerOpen,
        eqBars,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        seekTo,
        setVolume,
        toggleMute,
        togglePlayerOpen,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
}
