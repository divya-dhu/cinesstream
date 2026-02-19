
import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { getMovieInsight } from '../services/geminiService';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const text = await getMovieInsight(movie.title);
      setInsight(text || "No AI insight available.");
      setLoadingInsight(false);
    };
    fetchInsight();
  }, [movie]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 overflow-y-auto">
      <div className="bg-[#181818] w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-black transition"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="relative h-60 md:h-[480px]">
          <img 
            src={movie.backdropUrl} 
            className="w-full h-full object-cover" 
            alt={movie.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
            <h2 className="text-2xl md:text-5xl font-bold mb-4">{movie.title}</h2>
            <div className="flex gap-4">
              <button className="bg-white text-black px-8 py-2 rounded font-bold hover:bg-gray-200 transition flex items-center gap-2">
                <i className="fas fa-play"></i> Play
              </button>
              <button className="bg-gray-500/50 text-white px-8 py-2 rounded font-bold hover:bg-gray-500 transition flex items-center gap-2">
                <i className="fas fa-plus"></i> My List
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4 text-sm font-semibold">
              <span className="text-green-500">{movie.popularity}% Match</span>
              <span className="text-gray-400">{movie.year}</span>
              <span className="border border-gray-600 px-1 rounded text-xs">{movie.rating}</span>
              <span className="text-gray-400">{movie.duration}</span>
            </div>
            
            <p className="text-white text-lg leading-relaxed mb-6">
              {movie.description}
            </p>

            <div className="bg-red-900/20 border-l-4 border-red-600 p-4 rounded-r">
              <h4 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">AI Movie Insight</h4>
              <p className="italic text-gray-300">
                {loadingInsight ? "Deeply analyzing the cinematic vibes..." : insight}
              </p>
            </div>
          </div>

          <div className="text-sm">
            <div className="mb-4">
              <span className="text-gray-500">Genres:</span>
              <p className="inline ml-2 text-gray-300">{movie.genre.join(', ')}</p>
            </div>
            <div className="mb-4">
              <span className="text-gray-500">Origin:</span>
              <p className="inline ml-2 capitalize text-gray-300">{movie.origin}</p>
            </div>
            <div className="mb-4">
              <span className="text-gray-500">Type:</span>
              <p className="inline ml-2 capitalize text-gray-300">{movie.type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
