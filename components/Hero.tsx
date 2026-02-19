
import React from 'react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onMoreInfo: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onMoreInfo }) => {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh]">
      <img 
        src={movie.backdropUrl} 
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
      
      <div className="absolute bottom-[20%] left-4 md:left-12 max-w-xl">
        <h1 className="text-4xl md:text-7xl font-bold mb-4">{movie.title}</h1>
        <p className="text-white text-sm md:text-lg mb-6 line-clamp-3 md:line-clamp-none">
          {movie.description}
        </p>
        
        <div className="flex gap-4">
          <button className="bg-white text-black px-6 md:px-10 py-2 md:py-3 rounded flex items-center gap-3 font-bold hover:bg-gray-200 transition text-sm md:text-lg">
            <i className="fas fa-play"></i> Play
          </button>
          <button 
            onClick={() => onMoreInfo(movie)}
            className="bg-gray-500/70 text-white px-6 md:px-10 py-2 md:py-3 rounded flex items-center gap-3 font-bold hover:bg-gray-500 transition text-sm md:text-lg"
          >
            <i className="fas fa-info-circle text-2xl"></i> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
