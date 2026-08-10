export type UniverseId = 'mcu' | 'starwars' | 'middleearth' | 'conjuring' | 'dccinematic' | 'xmen' | 'spiderman' | 'alienpredator' | 'fastfurious' | 'godzilla';

export interface CastMember {
  name: string;
  character: string;
  imageUrl: string;
}

export interface Universe {
  id: UniverseId;
  name: string;
  tagline: string;
  badge: string;
  description: string;
  totalEntries: number;
  defaultWatchedPercent: number;
  colorTheme: 'primary' | 'secondary' | 'tertiary' | 'error' | 'info'; // Mapping to Chronos styles
  accentColor: string; // Tailwind hex color
  accentGlow: string; // Glow class
  heroImage: string;
  eras: string[];
}

export interface TimelineEntry {
  id: string;
  universeId: UniverseId;
  title: string;
  parentSeries: string;
  type: 'Movie' | 'Series' | 'Animated' | 'Short' | 'Animated Feature' | 'Feature Film';
  releaseYear: string;
  releaseDate: string;
  runtime: string;
  inStoryDate: string;
  chronologicalPosition: number;
  precededBy: string | null;
  posterUrl: string;
  keyArtUrl: string;
  synopsis: string;
  era: string; // Eras like "Second Age", "Third Age", "Phase 1", "Imperial Era"
  cast: CastMember[];
  nextEntryId: string | null;
  trailerEmbedId: string; // YouTube embed ID
}
