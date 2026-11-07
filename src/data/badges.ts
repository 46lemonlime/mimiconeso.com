export interface RetroBadge {
  id: string;
  label: string;
  sublabel: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
}

export const RETRO_BADGES: RetroBadge[] = [
  {
    id: 'badge-winamp',
    label: 'WINAMP',
    sublabel: 'IT WHIPS',
    bgColor: '#1B1722',
    accentColor: '#FF3DAE',
    textColor: '#FFFFFF',
  },
  {
    id: 'badge-netscape',
    label: 'NETSCAPE 4.0',
    sublabel: 'NOW',
    bgColor: '#003366',
    accentColor: '#62E9FF',
    textColor: '#EDE9F2',
  },
  {
    id: 'badge-hyperpop',
    label: 'HYPERPOP',
    sublabel: 'CERTIFIED',
    bgColor: '#4A154B',
    accentColor: '#FF3DAE',
    textColor: '#B7FF67',
  },
  {
    id: 'badge-notepad',
    label: 'MADE WITH',
    sublabel: 'NOTEPAD',
    bgColor: '#000080',
    accentColor: '#FFFFFF',
    textColor: '#FFFF00',
  },
  {
    id: 'badge-1024',
    label: 'VIEW IN',
    sublabel: '1024x768',
    bgColor: '#2E2B38',
    accentColor: '#B7FF67',
    textColor: '#EDE9F2',
  },
  {
    id: 'badge-nocookies',
    label: 'NO TRACKERS',
    sublabel: 'CYBERPUNK',
    bgColor: '#1B2421',
    accentColor: '#B7FF67',
    textColor: '#62E9FF',
  },
  {
    id: 'badge-html',
    label: 'VALID HTML',
    sublabel: '4.01 STRICT',
    bgColor: '#6B2D5C',
    accentColor: '#FF3DAE',
    textColor: '#EDE9F2',
  },
  {
    id: 'badge-fl',
    label: 'FL STUDIO 7',
    sublabel: 'PIRATED',
    bgColor: '#332014',
    accentColor: '#FF9900',
    textColor: '#FFFFFF',
  },
];
