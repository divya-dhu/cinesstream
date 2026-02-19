
import React, { useState, useEffect } from 'react';
import { User, AuthMode, Movie } from './types';
import { MOVIES } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieDetails from './components/MovieDetails';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('register');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Filtering movies
  const trendingMovies = [...MOVIES].sort((a, b) => b.popularity - a.popularity);
  const bollywoodMovies = MOVIES.filter(m => m.origin === 'bollywood');
  const hollywoodMovies = MOVIES.filter(m => m.origin === 'hollywood');
  const series = MOVIES.filter(m => m.type === 'series');
  const recommended = [...MOVIES].sort(() => Math.random() - 0.5); // "Most Likely" simulation

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      // Logic would go here for real app
      setAuthMode('login');
      alert('Registration successful! Please login.');
    } else {
      // Mock login
      if (email && password) {
        setUser({ email, name: name || 'User' });
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    setName('');
    setAuthMode('login');
  };

  if (!user) {
    return (
      <div 
        className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://picsum.photos/seed/bg-auth/1920/1080')` }}
      >
        <div className="absolute top-8 left-8">
          <h1 className="text-red-600 text-4xl font-bold tracking-tighter uppercase">CineStream</h1>
        </div>

        <div className="bg-black/75 p-16 rounded shadow-xl w-full max-w-[450px]">
          <h2 className="text-3xl font-bold mb-8">{authMode === 'login' ? 'Sign In' : 'Sign Up'}</h2>
          
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            {authMode === 'register' && (
              <input 
                type="text" 
                placeholder="Name" 
                className="bg-[#333] p-4 rounded text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input 
              type="email" 
              placeholder="Email or phone number" 
              className="bg-[#333] p-4 rounded text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="bg-[#333] p-4 rounded text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="bg-red-600 py-3 rounded font-bold mt-4 hover:bg-red-700 transition">
              {authMode === 'login' ? 'Sign In' : 'Register'}
            </button>
          </form>

          <div className="mt-8">
            <div className="flex items-center justify-between text-gray-400 text-xs">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="hover:underline">Need help?</a>
            </div>
            
            <p className="text-gray-500 mt-10">
              {authMode === 'login' ? 'New to CineStream?' : 'Already have an account?'}
              <button 
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-white ml-2 hover:underline"
              >
                {authMode === 'login' ? 'Sign up now.' : 'Sign in now.'}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] pb-20 overflow-x-hidden">
      <Navbar onLogout={handleLogout} userName={user.name} />
      
      <main>
        <Hero movie={MOVIES[0]} onMoreInfo={setSelectedMovie} />
        
        <div className="-mt-32 relative z-10 flex flex-col gap-8">
          <MovieRow 
            title="Most Watched" 
            movies={trendingMovies} 
            onSelectMovie={setSelectedMovie} 
          />
          
          <MovieRow 
            title="Most Likely For You" 
            movies={recommended} 
            onSelectMovie={setSelectedMovie} 
          />

          <MovieRow 
            title="Bollywood Hits" 
            movies={bollywoodMovies} 
            onSelectMovie={setSelectedMovie} 
          />

          <MovieRow 
            title="Hollywood Blockbusters" 
            movies={hollywoodMovies} 
            onSelectMovie={setSelectedMovie} 
          />

          <MovieRow 
            title="Popular Series" 
            movies={series} 
            onSelectMovie={setSelectedMovie} 
          />
        </div>
      </main>

      {selectedMovie && (
        <MovieDetails 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      <footer className="mt-20 px-4 md:px-12 text-gray-500 text-sm max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex gap-6 text-2xl text-white">
          <i className="fab fa-facebook-square cursor-pointer"></i>
          <i className="fab fa-instagram cursor-pointer"></i>
          <i className="fab fa-twitter cursor-pointer"></i>
          <i className="fab fa-youtube cursor-pointer"></i>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="#" className="hover:underline">Audio Description</a>
          <a href="#" className="hover:underline">Help Centre</a>
          <a href="#" className="hover:underline">Gift Cards</a>
          <a href="#" className="hover:underline">Media Centre</a>
          <a href="#" className="hover:underline">Investor Relations</a>
          <a href="#" className="hover:underline">Jobs</a>
          <a href="#" className="hover:underline">Terms of Use</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Cookie Preferences</a>
          <a href="#" className="hover:underline">Corporate Information</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>

        <div className="mt-4 pb-12">
          <p>&copy; 1997-2024 CineStream, Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
