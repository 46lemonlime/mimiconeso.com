'use client';

import React, { useState } from 'react';
import { INITIAL_GUESTBOOK_DATA } from '@/data/guestbook';
import { GuestbookEntry } from '@/types';
import { RetroWindow } from '@/components/ui/RetroWindow';
import { PixelButton } from '@/components/ui/PixelButton';
import { MessageSquare, Send, Sparkles, User, Heart } from 'lucide-react';

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(INITIAL_GUESTBOOK_DATA);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      author: author.trim(),
      message: message.trim(),
      timestamp: 'Just now (Cyberspace Local Time)',
      avatarColor: '#FF3DAE',
      badge: 'NEW VISITOR',
    };

    setEntries([newEntry, ...entries]);
    setAuthor('');
    setMessage('');
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 4000);
  };

  return (
    <div className="space-y-4 font-mono">
      {/* Sign the Guestbook Form */}
      <RetroWindow
        title="SIGN MIMI'S CYBER GUESTBOOK"
        icon="✍"
        badge="PUBLIC LEDGER"
        variant="magenta"
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <p className="text-xs text-[#A9A0B5] leading-relaxed">
            leave a transmission for mimi! say hi, tell her your favorite track, request a live show in your city, or drop your myspace url. rawr xD
          </p>

          {successNotice && (
            <div className="p-2.5 bg-[#B7FF67] text-[#0F2405] text-xs font-bold border border-[#578E18] flex items-center justify-between animate-bounce">
              <span>★ Transmission broadcasted to cyberspace! Thx 4 signing! &lt;3</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#62E9FF] mb-1">
                YOUR CYBER HANDLE / NAME:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. xx_trance_angel_07"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-[#110E17] border border-[#3A2F4C] focus:border-[#FF3DAE] px-3 py-1.5 text-xs text-white outline-none rounded-xs placeholder:text-[#EDE9F2]/30"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#A46BFF] mb-1">
                YOUR WEBSITE / PROFILE (OPTIONAL):
              </label>
              <input
                type="text"
                placeholder="myspace.com/yourname"
                className="w-full bg-[#110E17] border border-[#3A2F4C] focus:border-[#A46BFF] px-3 py-1.5 text-xs text-white outline-none rounded-xs placeholder:text-[#EDE9F2]/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#B7FF67] mb-1">
              MESSAGE / COMMENT:
            </label>
            <textarea
              required
              rows={3}
              placeholder="thx 4 the add!! luv ur new track so much!! &lt;3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#110E17] border border-[#3A2F4C] focus:border-[#B7FF67] p-2.5 text-xs text-white outline-none rounded-xs placeholder:text-[#EDE9F2]/30 resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="text-[10px] text-[#A9A0B5]">
              * Messages appear instantly (in-memory demo, ready for backend API)
            </span>
            <PixelButton
              variant="pink"
              size="md"
              type="submit"
              icon={<Send className="w-3.5 h-3.5" />}
            >
              BROADCAST MESSAGE
            </PixelButton>
          </div>
        </form>
      </RetroWindow>

      {/* Guestbook Entries Stream */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-[#A9A0B5] px-1">
          <span>SHOWING {entries.length} TRANSMISSIONS</span>
          <span className="text-[#62E9FF]">SORT: MOST RECENT</span>
        </div>

        <div className="divide-y divide-[#2B2338] border border-[#2B2338] bg-[#16111F]">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-3.5 sm:p-4 hover:bg-[#1E172A] transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-[#111016]"
                    style={{ backgroundColor: entry.avatarColor }}
                  >
                    ★
                  </div>
                  <span className="text-xs font-bold text-white hover:text-[#62E9FF]">
                    {entry.author}
                  </span>
                  {entry.badge && (
                    <span className="font-pixel text-[8px] px-1.5 py-0.5 bg-[#251B38] text-[#B7FF67] border border-[#B7FF67]/40">
                      {entry.badge}
                    </span>
                  )}
                </div>

                <span className="text-[10px] text-[#A9A0B5] shrink-0">
                  {entry.timestamp}
                </span>
              </div>

              <p className="text-xs text-[#EDE9F2]/90 leading-relaxed pl-7">
                {entry.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
