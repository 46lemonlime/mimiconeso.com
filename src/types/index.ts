export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  releaseYear: number;
  audioUrl?: string; // Optional real audio URL
  bpm?: number;
  genre?: string;
  synthPreset?: 'hyperpop-arp' | 'cyber-trance' | 'digital-glitch' | 'chiptune-bass' | 'ambient-pad';
}

export interface Release {
  id: string;
  title: string;
  type: 'Album' | 'EP' | 'Single' | 'Mixtape';
  year: number;
  coverImage: string;
  catalogNumber: string;
  description: string;
  trackCount: number;
  tracks: string[]; // Track titles
  streamingLinks: {
    spotify?: string;
    bandcamp?: string;
    soundcloud?: string;
    appleMusic?: string;
  };
  cassetteAvailable?: boolean;
}

export interface EventDate {
  id: string;
  date: string;
  dayOfWeek: string;
  city: string;
  venue: string;
  country: string;
  status: 'available' | 'sold-out' | 'limited' | 'rsvp-only';
  ticketLink?: string;
  lineupNotes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Photography' | 'Artwork' | 'Video Still' | 'Graphic';
  date: string;
  caption: string;
  imageUrl: string;
  aspectRatio?: 'square' | 'wide' | 'tall';
}

export interface Friend {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  statusQuote: string;
  role: string;
  url: string;
}

export interface GuestbookEntry {
  id: string;
  author: string;
  website?: string;
  message: string;
  timestamp: string;
  avatarColor: string;
  badge?: string;
}

export interface ArtistProfileData {
  name: string;
  stageName: string;
  handle: string;
  tagline: string;
  bio: string[];
  location: string;
  genres: string[];
  mood: string;
  onlineStatus: 'online' | 'away' | 'in-studio';
  extendedNetworkText: string;
  viewsCount: number;
  friendCount: number;
  influences: string[];
  gearList: string[];
  whoIdLikeToMeet: string;
  contactLinks: {
    label: string;
    url: string;
    icon: string;
  }[];
}
