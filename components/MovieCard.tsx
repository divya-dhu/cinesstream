
import React, { useState } from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(movie)}
      className="relative flex-none w-[180px] md:w-[240px] h-[100px] md:h-[135px] cursor-pointer group transition-all duration-300 hover:scale-110 hover:z-20"
    >
      <img 
        src={movie.backdropUrl} 
        alt={movie.title}
        className="w-full h-full object-cover rounded-md shadow-lg"
      />
      
      {/* Overlay details on hover (simulated mini modal) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 bg-gradient-to-t from-black via-black/40 to-transparent rounded-md">
        <h4 className="text-white text-xs md:text-sm font-bold truncate">{movie.title}</h4>
        <div className="flex gap-2 mt-1">
          <span className="text-green-500 text-[10px] font-bold">{movie.popularity}% Match</span>
          <span className="text-white text-[10px] border border-white/40 px-1 rounded">{movie.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
