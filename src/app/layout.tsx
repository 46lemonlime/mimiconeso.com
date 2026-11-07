import type { Metadata } from 'next';
import { Press_Start_2P, Space_Mono, Outfit } from 'next/font/google';
import './globals.css';
import { MusicPlayerProvider } from '@/context/MusicPlayerContext';

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '★ M1M1 CONESO ★ — Official Cyber Artist Portal (2007-2026)',
  description: 'Underground hyperpop, digitalcore & 180bpm cyber rave tracks from the depths of cyberspace. Rediscovered early-2000s artist portfolio & custom MySpace profile.',
  keywords: ['hyperpop', 'digitalcore', 'breakcore', 'Y2K', 'cybercore', 'mimi coneso', 'myspace 2007', 'winamp'],
  icons: {
    icon: '/images/profile/mimi-avatar.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${spaceMono.variable} ${outfit.variable} scroll-smooth`}
    >
      <body className="bg-[#111016] text-[#EDE9F2] selection:bg-[#FF3DAE] selection:text-white min-h-screen flex flex-col font-sans">
        <MusicPlayerProvider>
          {children}
        </MusicPlayerProvider>
      </body>
    </html>
  );
}
