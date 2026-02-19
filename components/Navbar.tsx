
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onLogout: () => void;
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, userName }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 flex items-center justify-between px-4 md:px-12 py-4 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center gap-8">
        <h1 className="text-red-600 text-3xl font-bold tracking-tighter uppercase">CineStream</h1>
        <div className="hidden md:flex gap-5 text-sm text-gray-200">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">TV Shows</a>
          <a href="#" className="hover:text-white transition">Movies</a>
          <a href="#" className="hover:text-white transition">New & Popular</a>
          <a href="#" className="hover:text-white transition">My List</a>
        </div>
      </div>
      
      <div className="flex items-center gap-6 text-white">
        <button className="hidden sm:block hover:text-gray-300"><i className="fas fa-search"></i></button>
        <button className="hidden sm:block hover:text-gray-300"><i className="fas fa-bell"></i></button>
        <div className="flex items-center gap-2 group relative cursor-pointer">
          <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-sm font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <i className="fas fa-caret-down text-xs transition-transform group-hover:rotate-180"></i>
          
          <div className="absolute right-0 top-10 w-40 bg-black/90 border border-gray-800 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 flex flex-col gap-2">
            <span className="text-sm border-b border-gray-800 pb-2 px-2 text-gray-400">{userName}</span>
            <button 
              onClick={onLogout}
              className="text-left px-2 py-1 text-sm hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
