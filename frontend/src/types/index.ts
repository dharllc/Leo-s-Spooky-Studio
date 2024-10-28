export interface DecorationItem {
  id: string;
  emoji: string;
  name: string;
}

export interface PlacedDecoration extends DecorationItem {
  x: number;
  y: number;
}
