'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GALLERY_DATA } from '@/data/gallery';
import { GalleryItem } from '@/types';
import { RetroWindow } from '@/components/ui/RetroWindow';
import { Camera, Eye, X, ZoomIn, Calendar, Tag } from 'lucide-react';

export function VisualArchive() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Photography', 'Artwork', 'Video Still', 'Graphic'];

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-4">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#171220] p-2.5 border border-[#2B2338] font-mono text-xs">
        <div className="flex items-center gap-1.5 text-[#A9A0B5]">
          <Camera className="w-3.5 h-3.5 text-[#62E9FF]" />
          <span>FILTER ARCHIVE:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#FF3DAE] text-[#111016] font-bold shadow-sm'
                  : 'bg-[#251D33] text-[#EDE9F2]/80 hover:bg-[#342747] hover:text-white'
              }`}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative bg-[#15101E] border border-[#2F263E] hover:border-[#62E9FF] p-2.5 rounded-xs cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(98,233,255,0.25)] flex flex-col justify-between"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-video w-full rounded-xs overflow-hidden border border-[#3E3350] bg-[#0A0712] mb-2.5">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={400}
                height={260}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Timestamp watermarked look */}
              <div className="absolute bottom-1 right-2 font-mono text-[10px] font-bold text-[#FF9900] bg-black/60 px-1 rounded-xs">
                {item.date}
              </div>

              {/* Zoom overlay on hover */}
              <div className="absolute inset-0 bg-[#FF3DAE]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-[#111016]/80 text-[#62E9FF] p-2 rounded-full border border-[#62E9FF]">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Title & Category Info */}
            <div className="space-y-1 font-mono">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#62E9FF] bg-[#1B2735] px-1.5 py-0.5 border border-[#62E9FF]/40">
                  {item.category}
                </span>
                <span className="text-[#A9A0B5]">{item.date}</span>
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-[#FF3DAE] transition-colors truncate">
                {item.title}
              </h4>
              <p className="text-[11px] text-[#A9A0B5] line-clamp-2 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Preview Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <RetroWindow
              title={`PREVIEW // ${selectedItem.title}`}
              icon="🔍"
              badge={selectedItem.category}
              variant="cyan"
              onClose={() => setSelectedItem(null)}
            >
              <div className="space-y-4">
                {/* Large Preview */}
                <div className="relative aspect-video w-full rounded-xs overflow-hidden border-2 border-[#62E9FF] bg-[#0A0712]">
                  <Image
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Metadata & Details */}
                <div className="bg-[#120E1A] border border-[#2B2338] p-3 font-mono text-xs space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#251D30] pb-2 text-[#A9A0B5]">
                    <span className="flex items-center gap-1.5 text-[#62E9FF]">
                      <Tag className="w-3.5 h-3.5" />
                      CATEGORY: {selectedItem.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-[#B7FF67]">
                      <Calendar className="w-3.5 h-3.5" />
                      TIMESTAMP: {selectedItem.date}
                    </span>
                  </div>

                  <p className="text-[#EDE9F2] text-sm leading-relaxed">
                    {selectedItem.caption}
                  </p>

                  <div className="pt-2 text-[11px] text-[#A9A0B5] flex items-center justify-between">
                    <span>SOURCE: Sony Cyber-shot DSC-T10 / MiniDV Cassette</span>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-3 py-1 bg-[#FF3DAE] text-[#111016] font-bold hover:bg-[#ff5bb9] cursor-pointer"
                      type="button"
                    >
                      CLOSE PREVIEW
                    </button>
                  </div>
                </div>
              </div>
            </RetroWindow>
          </div>
        </div>
      )}
    </div>
  );
}
