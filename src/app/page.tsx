'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Marquee } from '@/components/ui/Marquee';
import { SectionTitle } from '@/components/ui/SectionTitle';

// Profile & Community
import { ArtistProfile } from '@/components/profile/ArtistProfile';
import { AboutMe } from '@/components/profile/AboutMe';
import { Friends } from '@/components/profile/Friends';

// Music
import { MusicPlayer } from '@/components/music/MusicPlayer';
import { LatestRelease } from '@/components/music/LatestRelease';
import { Discography } from '@/components/music/Discography';

// Archive & Activities
import { VisualArchive } from '@/components/gallery/VisualArchive';
import { EventsList } from '@/components/events/EventsList';
import { Guestbook } from '@/components/guestbook/Guestbook';

export default function HomePage() {
  const [crtActive, setCrtActive] = useState<boolean>(true);

  return (
    <div className={`relative min-h-screen bg-[#111016] text-[#EDE9F2] ${crtActive ? 'crt-overlay' : ''}`}>
      {/* Top Header */}
      <Header
        crtActive={crtActive}
        toggleCRT={() => setCrtActive(!crtActive)}
      />

      {/* Retro Navigation */}
      <Navigation />

      {/* Cyber Marquee Ticker */}
      <Marquee />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6" id="home">
        {/* Asymmetrical 2-Column Early Internet / MySpace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT COLUMN (MySpace Profile & Winamp) ================= */}
          <div className="lg:col-span-4 space-y-6">
            {/* Hero Artist Profile Box */}
            <ArtistProfile />

            {/* Embedded Winamp Audio Deck */}
            <div id="player" className="space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#A9A0B5] px-1">
                <span className="text-[#62E9FF] font-bold">★ CYBER AUDIO DECK</span>
                <span>WINAMP v2.91</span>
              </div>
              <MusicPlayer />
            </div>

            {/* MySpace Friends Space (Top 8) */}
            <div id="friends">
              <Friends />
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Releases, Bio, Gallery, Events, Guestbook) ================= */}
          <div className="lg:col-span-8 space-y-8">
            {/* Featured Latest Release */}
            <section id="latest-release">
              <SectionTitle
                title="LATEST RELEASE"
                subtitle="CYBERNETIC_HEARTBREAK_V2 [EP] OUT NOW"
                tag="HOT RELEASE"
                variant="pink"
              />
              <LatestRelease />
            </section>

            {/* Biography & Persona */}
            <section id="about">
              <SectionTitle
                title="ABOUT ME"
                subtitle="TRANSMISSIONS FROM CYBERSPACE & SHIBUYA"
                tag="PROFILE DATA"
                variant="purple"
              />
              <AboutMe />
            </section>

            {/* Complete Discography */}
            <section id="music">
              <SectionTitle
                title="DISCOGRAPHY & ARCHIVE"
                subtitle="CATALOG OF RELEASES, TAPES & EPS (2004-2007)"
                tag="4 RELEASES"
                variant="cyan"
              />
              <Discography />
            </section>

            {/* Visual Archive */}
            <section id="visuals">
              <SectionTitle
                title="VISUAL ARCHIVE"
                subtitle="CYBER-SHOT DSC-T10 PHOTOS, FLYERS & MINIDV STILLS"
                tag="6 ARTIFACTS"
                variant="green"
              />
              <VisualArchive />
            </section>

            {/* Live Tour Dates */}
            <section id="live">
              <SectionTitle
                title="LIVE TRANSMISSIONS // TOUR DATES"
                subtitle="UNDERGROUND RAVES, WAREHOUSES & MATRIX VIRTUAL STREAMS"
                tag="2007-2008 TOUR"
                variant="pink"
              />
              <EventsList />
            </section>

            {/* Guestbook Section */}
            <section id="guestbook">
              <SectionTitle
                title="CYBER GUESTBOOK"
                subtitle="LEAVE A PUBLIC COMMENT FOR MIMI CONESO"
                tag="SIGN GUESTBOOK"
                variant="cyan"
              />
              <Guestbook />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
