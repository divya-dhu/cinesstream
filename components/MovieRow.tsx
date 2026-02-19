
import React, { useRef } from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onSelectMovie }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8 pl-4 md:pl-12">
      <h2 className="text-gray-200 text-lg md:text-2xl font-semibold mb-4">{title}</h2>
      
      <div className="relative group">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 md:w-12 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center hover:bg-black/60"
        >
          <i className="fas fa-chevron-left text-white text-2xl"></i>
        </button>
        
        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 pr-12"
        >
          {movies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onSelect={onSelectMovie} 
            />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 md:w-12 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center hover:bg-black/60"
        >
          <i className="fas fa-chevron-right text-white text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
