'use client';

import React, { useState } from 'react';
import { EVENTS_DATA } from '@/data/events';
import { PixelButton } from '@/components/ui/PixelButton';
import { Calendar, MapPin, Ticket, ExternalLink, Check } from 'lucide-react';

export function EventsList() {
  const [rsvpList, setRsvpList] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleRSVP = (eventId: string, venue: string) => {
    if (!rsvpList.includes(eventId)) {
      setRsvpList([...rsvpList, eventId]);
      setToastMsg(`RSVP confirmed for ${venue}! See u in the cyber pit ★`);
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sold-out':
        return (
          <span className="font-pixel text-[8px] px-2 py-0.5 bg-[#4A1525] text-[#FF4D8B] border border-[#FF4D8B]">
            SOLD OUT
          </span>
        );
      case 'limited':
        return (
          <span className="font-pixel text-[8px] px-2 py-0.5 bg-[#3B2F10] text-[#FFB703] border border-[#FFB703]">
            FEW TICKETS
          </span>
        );
      case 'rsvp-only':
        return (
          <span className="font-pixel text-[8px] px-2 py-0.5 bg-[#172D38] text-[#62E9FF] border border-[#62E9FF]">
            FREE VIRTUAL RSVP
          </span>
        );
      default:
        return (
          <span className="font-pixel text-[8px] px-2 py-0.5 bg-[#173012] text-[#B7FF67] border border-[#B7FF67]">
            ON SALE NOW
          </span>
        );
    }
  };

  return (
    <div className="space-y-3 font-mono">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="p-2.5 bg-[#B7FF67] text-[#0F2405] text-xs font-bold border border-[#578E18] flex items-center justify-between animate-bounce">
          <span>★ {toastMsg}</span>
          <span className="text-[10px]">180 BPM LIVE</span>
        </div>
      )}

      {/* Retro Event List */}
      <div className="divide-y divide-[#2B2338] border border-[#2B2338] bg-[#16111F]">
        {EVENTS_DATA.map((evt) => {
          const isRSVPed = rsvpList.includes(evt.id);

          return (
            <div
              key={evt.id}
              className="p-3.5 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:bg-[#1E172B] transition-colors"
            >
              {/* Date Box */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-14 bg-[#110E17] border border-[#FF3DAE] flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] text-[#FF3DAE] font-bold">
                    {evt.dayOfWeek}
                  </span>
                  <span className="text-sm font-black text-white">
                    {evt.date}
                  </span>
                </div>

                {/* Venue and City Details */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white hover:text-[#62E9FF] transition-colors flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#62E9FF] shrink-0" />
                      {evt.city}, {evt.country}
                    </span>
                    {getStatusBadge(evt.status)}
                  </div>
                  <div className="text-xs text-[#EDE9F2]/90 font-medium">
                    {evt.venue}
                  </div>
                  {evt.lineupNotes && (
                    <div className="text-[11px] text-[#A9A0B5] mt-0.5">
                      ↳ {evt.lineupNotes}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 self-end md:self-center">
                {evt.status === 'sold-out' ? (
                  <button
                    disabled
                    className="px-3 py-1.5 bg-[#2B2133] text-[#A9A0B5] text-xs font-bold border border-[#443550] cursor-not-allowed opacity-60"
                    type="button"
                  >
                    SOLD OUT
                  </button>
                ) : (
                  <PixelButton
                    variant={isRSVPed ? 'green' : 'pink'}
                    size="sm"
                    icon={
                      isRSVPed ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Ticket className="w-3.5 h-3.5" />
                      )
                    }
                    onClick={() => handleRSVP(evt.id, evt.venue)}
                  >
                    {isRSVPed ? 'YOU ARE RSVP\'D ★' : 'GET TICKETS / RSVP'}
                  </PixelButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
