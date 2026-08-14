export type UniverseId = 'mcu' | 'starwars' | 'middleearth' | 'conjuring' | 'dccinematic' | 'xmen' | 'spiderman' | 'alienpredator' | 'fastfurious' | 'godzilla' | 'planetoftheapes' | 'jurassic' | 'transformers' | 'johnwick' | 'madmax' | 'wizardingworld';

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

export interface TriviaItem {
  question: string;
  answer: string;
  funFact: string;
}

export interface BlogPost {
  id: string;
  universeId: UniverseId;
  title: string;
  subtitle: string;
  category: 'Timeline Guide' | 'Franchise Lore' | 'Behind The Scenes' | 'Watch Order' | 'Trivia Deep-Dive';
  author: string;
  date: string;
  readTime: string;
  featuredImage: string;
  tags: string[];
  excerpt: string;
  introduction: string;
  keyTakeaways: string[];
  mainContent: {
    heading: string;
    body: string;
  }[];
  trivia: TriviaItem[];
  timelineRecommendation: string;
}
