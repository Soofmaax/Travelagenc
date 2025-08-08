import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Globe, Phone } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'navbar-scrolled text-gray-900 dark:text-white' : 'bg-transparent text-white'}`}>
      <div className="container-custom">
        {/* Barre supérieure avec infos de contact */}
        <div className={`hidden md:flex justify-between items-center py-2 text-sm ${isScrolled ? 'text-gray-600 dark:text-gray-300' : 'text-gray-200'}`}>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Globe size={14} />
              <span>Français | EUR</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <span>+33 (0)1 23 45 67 89</span>
            </div>
          </div>
          <div>
            <DarkModeToggle />
          </div>
        </div>
        
        {/* Navigation principale */}
        <div className="flex items-center justify-between py-4">
          <NavLink to="/" className="font-serif text-2xl font-bold">
            VoyageExplore
          </NavLink>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => 
              `font-medium transition duration-300 ${isScrolled 
                ? (isActive ? 'text-blue-900 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400') 
                : (isActive ? 'text-amber-400' : 'text-white hover:text-amber-400')}`
            }>
              Accueil
            </NavLink>
            <NavLink to="/trips" className={({ isActive }) => 
              `font-medium transition duration-300 ${isScrolled 
                ? (isActive ? 'text-blue-900 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400') 
                : (isActive ? 'text-amber-400' : 'text-white hover:text-amber-400')}`
            }>
              Destinations
            </NavLink>
            <NavLink to="/booking" className={({ isActive }) => 
              `font-medium transition duration-300 ${isScrolled 
                ? (isActive ? 'text-blue-900 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400') 
                : (isActive ? 'text-amber-400' : 'text-white hover:text-amber-400')}`
            }>
              Réserver
            </NavLink>
            <NavLink to="/legal" className={({ isActive }) => 
              `font-medium transition duration-300 ${isScrolled 
                ? (isActive ? 'text-blue-900 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400') 
                : (isActive ? 'text-amber-400' : 'text-white hover:text-amber-400')}`
            }>
              Mentions Légales
            </NavLink>
            
            {/* Mobile dark mode toggle for when scrolled */}
            <div className="md:hidden">
              <DarkModeToggle />
            </div>
          </nav>

          {/* Mobile menu and dark mode toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <button 
              onClick={toggleMenu} 
              className="focus:outline-none"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 text-gray-800 dark:text-white absolute left-0 right-0 p-5 shadow-lg border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              <NavLink to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                `font-medium transition ${isActive ? 'text-blue-900 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`
              }>
                Accueil
              </NavLink>
              <NavLink to="/trips" 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                `font-medium transition ${isActive ? 'text-blue-900 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`
              }>
                Destinations
              </NavLink>
              <NavLink to="/booking" 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                `font-medium transition ${isActive ? 'text-blue-900 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`
              }>
                Réserver
              </NavLink>
              <NavLink to="/legal" 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                `font-medium transition ${isActive ? 'text-blue-900 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`
              }>
                Mentions Légales
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;