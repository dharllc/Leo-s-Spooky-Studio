export interface DecorationItem {
  id: string;
  emoji: string;
  name: string;
}

export interface PlacedDecoration extends DecorationItem {
  x: number;
  y: number;
}

export const decorationItems: DecorationItem[] = [
  { id: 'ghost', emoji: '👻', name: 'Ghost' },
  { id: 'pumpkin', emoji: '🎃', name: 'Pumpkin' },
  { id: 'skeleton', emoji: '💀', name: 'Skeleton' },
  { id: 'vampire', emoji: '🧛', name: 'Vampire' },
  { id: 'vampire', emoji: '😈', name: 'Monster' },
  { id: 'spider', emoji: '🕷️', name: 'Spider' },
  { id: 'spider', emoji: '🕸️', name: 'Web' },
  { id: 'witch', emoji: '🧙‍♀️', name: 'Witch' },
  { id: 'cat', emoji: '🐈‍⬛', name: 'Black Cat' },
  { id: 'cat', emoji: '🦊', name: 'Fox' },
  { id: 'cat', emoji: '🖤', name: 'Orange Heart' },
];