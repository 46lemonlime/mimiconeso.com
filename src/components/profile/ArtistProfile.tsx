'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ARTIST_DATA } from '@/data/artist';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { PixelButton } from '@/components/ui/PixelButton';
import {
  Mail,
  UserPlus,
  MessageCircle,
  Star,
  Share2,
  MapPin,
  Music,
  Eye,
  Users,
  Sparkles,
  Heart,
  Check,
} from 'lucide-react';

export function ArtistProfile() {
  const [friendRequested, setFriendRequested] = useState<boolean>(false);
  const [favorited, setFavorited] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showTempToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddFriend = () => {
    setFriendRequested(true);
    showTempToast('Friend Request sent to Mimi Coneso! <3');
  };

  const handleFavorite = () => {
    setFavorited(!favorited);
    showTempToast(!favorited ? 'Added to your favorites list!' : 'Removed from favorites');
  };

  return (
    <div className="bg-[#171220] border-2 border-[#FF3DAE] p-3 sm:p-4 rounded-xs shadow-[0_0_20px_rgba(255,61,174,0.18)]">
      {/* Toast popup */}
      {notification && (
        <div className="mb-3 px-3 py-1.5 bg-[#B7FF67] text-[#0F2405] font-mono text-xs font-bold border border-[#578E18] flex items-center justify-between animate-bounce">
          <span>★ {notification}</span>
          <span className="text-[10px]">rawr xD</span>
        </div>
      )}

      {/* Artist Profile Header Name */}
      <div className="border-b-2 border-[#FF3DAE] pb-2 mb-3">
        <h1 className="font-mono font-black text-2xl sm:text-3xl text-white tracking-wide uppercase hover-glitch flex items-center gap-2">
          <span>{ARTIST_DATA.stageName}</span>
          <span className="text-[#FF3DAE] text-base animate-pulse">★</span>
        </h1>
        <p className="font-mono text-xs text-[#62E9FF] mt-0.5">
          {ARTIST_DATA.tagline}
        </p>
      </div>

      {/* Main Avatar + Basic Info Row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Profile Picture with Y2K Border */}
        <div className="relative w-44 sm:w-48 aspect-square shrink-0 mx-auto sm:mx-0 border-2 border-[#62E9FF] shadow-[0_0_12px_rgba(98,233,255,0.35)] bg-[#0A0712] rounded-xs overflow-hidden">
          <Image
            src="/images/profile/mimi-avatar.svg"
            alt={ARTIST_DATA.name}
            width={200}
            height={200}
            className="w-full h-full object-cover"
            priority
          />
          {/* Subtle online stamp badge */}
          <div className="absolute top-2 right-2 font-pixel text-[8px] px-1.5 py-0.5 bg-[#111016]/90 text-[#B7FF67] border border-[#B7FF67]">
            ONLINE
          </div>
        </div>

        {/* Profile Details (MySpace bio column) */}
        <div className="flex-1 font-mono text-xs space-y-2">
          {/* Status & Mood */}
          <div className="bg-[#120E1A] border border-[#2B2338] p-2 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[#A9A0B5]">STATUS:</span>
              <StatusIndicator status="online" label="Online Now" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#A9A0B5]">MOOD:</span>
              <span className="text-[#FF3DAE] font-bold flex items-center gap-1">
                <Heart className="w-3 h-3 fill-current text-[#FF3DAE]" />
                {ARTIST_DATA.mood}
              </span>
            </div>
          </div>

          {/* Demographic metadata */}
          <div className="space-y-1 text-[#EDE9F2]/90 bg-[#140F1E] border border-[#261E33] p-2">
            <p className="flex items-center gap-1.5">
              <span className="text-[#A46BFF] font-bold">Female, 21</span>
            </p>
            <p className="flex items-center gap-1.5 text-[#A9A0B5]">
              <MapPin className="w-3 h-3 text-[#62E9FF] shrink-0" />
              <span>{ARTIST_DATA.location}</span>
            </p>
            <p className="flex items-center gap-1.5 text-[#A9A0B5]">
              <Eye className="w-3 h-3 text-[#B7FF67] shrink-0" />
              <span>Profile Views: {ARTIST_DATA.viewsCount.toLocaleString()}</span>
            </p>
            <p className="flex items-center gap-1.5 text-[#A9A0B5]">
              <Users className="w-3 h-3 text-[#FF3DAE] shrink-0" />
              <span>Friends Network: {ARTIST_DATA.friendCount} Cyberfriends</span>
            </p>
          </div>

          {/* Genre Badges */}
          <div className="pt-1">
            <div className="text-[10px] text-[#A9A0B5] mb-1 font-bold flex items-center gap-1">
              <Music className="w-3 h-3 text-[#62E9FF]" />
              GENRES / SOUNDTAGS:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ARTIST_DATA.genres.map((g) => (
                <span
                  key={g}
                  className="font-pixel text-[8px] px-1.5 py-0.5 bg-[#251B38] text-[#B7FF67] border border-[#B7FF67]/40"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* "In Your Extended Network" MySpace Banner */}
      <div className="bg-[#120E1A] border border-[#B7FF67]/60 p-2 text-center font-mono text-xs text-[#B7FF67] mb-3 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span className="font-bold">{ARTIST_DATA.extendedNetworkText}</span>
        <Sparkles className="w-3.5 h-3.5" />
      </div>

      {/* Classic MySpace Contact Box */}
      <div className="bg-[#100D18] border border-[#2B2338] p-2.5 rounded-xs">
        <div className="font-mono text-[11px] font-bold text-[#62E9FF] border-b border-[#2B2338] pb-1 mb-2 flex items-center justify-between">
          <span>CONTACTING MIMI CONESO</span>
          <span className="text-[9px] text-[#A9A0B5]">MYSPACE 2007 INTERFACE</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
          <a
            href="#guestbook"
            className="flex items-center gap-1.5 p-1.5 bg-[#1A1424] hover:bg-[#FF3DAE] hover:text-[#111016] text-[#EDE9F2] border border-[#352747] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#FF3DAE]" />
            <span className="truncate">Send Message</span>
          </a>

          <button
            onClick={handleAddFriend}
            className={`flex items-center gap-1.5 p-1.5 border transition-colors cursor-pointer text-left ${
              friendRequested
                ? 'bg-[#B7FF67] text-[#0F2405] border-[#B7FF67]'
                : 'bg-[#1A1424] hover:bg-[#62E9FF] hover:text-[#111016] text-[#EDE9F2] border-[#352747]'
            }`}
            type="button"
          >
            {friendRequested ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <UserPlus className="w-3.5 h-3.5 text-[#62E9FF]" />
            )}
            <span className="truncate">
              {friendRequested ? 'Friend Added!' : 'Add to Friends'}
            </span>
          </button>

          <a
            href="aim:goim?screenname=mimi_digital_07"
            onClick={(e) => {
              e.preventDefault();
              showTempToast('AIM screen name: mimi_digital_07');
            }}
            className="flex items-center gap-1.5 p-1.5 bg-[#1A1424] hover:bg-[#B7FF67] hover:text-[#111016] text-[#EDE9F2] border border-[#352747] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#B7FF67]" />
            <span className="truncate">Instant Msg (AIM)</span>
          </a>

          <button
            onClick={handleFavorite}
            className={`flex items-center gap-1.5 p-1.5 border transition-colors cursor-pointer text-left ${
              favorited
                ? 'bg-[#FF3DAE] text-[#111016] border-[#FF3DAE]'
                : 'bg-[#1A1424] hover:bg-[#A46BFF] hover:text-[#111016] text-[#EDE9F2] border-[#352747]'
            }`}
            type="button"
          >
            <Star className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : 'text-[#A46BFF]'}`} />
            <span className="truncate">{favorited ? 'Favorited ★' : 'Add to Favs'}</span>
          </button>

          <a
            href="#music"
            className="flex items-center gap-1.5 p-1.5 bg-[#1A1424] hover:bg-[#62E9FF] hover:text-[#111016] text-[#EDE9F2] border border-[#352747] transition-colors"
          >
            <Music className="w-3.5 h-3.5 text-[#62E9FF]" />
            <span className="truncate">Listen Tracks</span>
          </a>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                showTempToast('Profile URL copied to clipboard!');
              }
            }}
            className="flex items-center gap-1.5 p-1.5 bg-[#1A1424] hover:bg-[#FF3DAE] hover:text-[#111016] text-[#EDE9F2] border border-[#352747] transition-colors cursor-pointer"
            type="button"
          >
            <Share2 className="w-3.5 h-3.5 text-[#FF3DAE]" />
            <span className="truncate">Copy Profile</span>
          </button>
        </div>

        {/* MySpace Profile URL */}
        <div className="mt-2.5 pt-2 border-t border-[#231A30] flex items-center justify-between text-[11px] font-mono text-[#A9A0B5]">
          <span>MySpace URL:</span>
          <span className="text-[#62E9FF] underline decoration-dotted">
            http://www.myspace.com/mimiconeso
          </span>
        </div>
      </div>
    </div>
  );
}
