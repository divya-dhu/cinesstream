
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  backdropUrl: string;
  genre: string[];
  duration: string;
  rating: string;
  year: number;
  type: 'movie' | 'series';
  origin: 'bollywood' | 'hollywood';
  popularity: number; // 0-100
}

export interface User {
  email: string;
  name: string;
}

export type AuthMode = 'login' | 'register';
