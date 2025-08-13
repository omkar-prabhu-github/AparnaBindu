import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

interface HeaderProps {
  scrollY: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ scrollY, isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrollY > 20 ? 'bg-amber-50/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 md:px-10 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <svg width="32" height="32" viewBox="0 0 100 100" className="relative animate-spin-slow text-amber-700">
                <circle cx="50" cy="30" r="18" stroke="currentColor" strokeWidth="6" fill="none" />
                <circle cx="50" cy="70" r="18" stroke="currentColor" strokeWidth="6" fill="none" />
                <circle cx="30" cy="50" r="18" stroke="currentColor" strokeWidth="6" fill="none" />
                <circle cx="70" cy="50" r="18" stroke="currentColor" strokeWidth="6" fill="none" />
                <circle cx="50" cy="50" r="6" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-amber-900 font-serif">APARNA BINDU</h1>
              <p className="text-xs text-amber-600 tracking-widest">KOLAM HERITAGE</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {['Home', 'Gallery', 'Database', 'About Us'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase().replace(' ', '')}`} 
                className="relative group py-2"
              >
                <span className="text-amber-800 font-medium group-hover:text-amber-600 transition-colors">
                  {item}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Profile */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-10 h-10 rounded-full ring-2 ring-amber-300 cursor-pointer transform group-hover:scale-110 transition-transform flex items-center justify-center bg-amber-100">
                <User className="w-6 h-6 text-amber-700" />
              </div>
            </div>

            {/* Mobile Menu */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-amber-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};