import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronDown, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAgenciesOpen, setIsAgenciesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-8 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-rose-500" />
              <span className="text-xl font-bold gradient-text">SmartEcom</span>
            </Link>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link 
              to="/brands" 
              className={`nav-link ${isActive('/brands') ? 'active' : 'text-gray-700'}`}
            >
              מותגים
            </Link>
            <Link 
              to="/apps" 
              className={`nav-link ${isActive('/apps') ? 'active' : 'text-gray-700'}`}
            >
              אפליקציות
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsAgenciesOpen(!isAgenciesOpen)}
                className={`nav-link flex items-center gap-1 ${
                  isActive('/agencies') || isActive('/service-providers') ? 'active' : 'text-gray-700'
                }`}
              >
                סוכנויות
                <ChevronDown className={`h-4 w-4 transition-transform ${isAgenciesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAgenciesOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <Link
                    to="/agencies"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsAgenciesOpen(false)}
                  >
                    סוכנויות דיגיטל
                  </Link>
                  <Link
                    to="/submit-review"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsAgenciesOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      השאר חוות דעת
                    </span>
                  </Link>
                  <Link
                    to="/service-providers"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsAgenciesOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      נותני שירות
                      <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">
                        בקרוב
                      </span>
                    </span>
                  </Link>
                </div>
              )}
            </div>
            <Link 
              to="/guides" 
              className={`nav-link ${isActive('/guides') ? 'active' : 'text-gray-700'}`}
            >
              מדריכים
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : 'text-gray-700'}`}
            >
              אודות
            </Link>
            <Link 
              to="/contact" 
              className="button-primary"
            >
              צור קשר
            </Link>
          </div>

          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-rose-500 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden absolute w-full bg-white/95 backdrop-blur-lg shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/brands" 
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                isActive('/brands') 
                  ? 'text-rose-500 bg-rose-50' 
                  : 'text-gray-700 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              מותגים
            </Link>
            <Link 
              to="/apps" 
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                isActive('/apps') 
                  ? 'text-rose-500 bg-rose-50' 
                  : 'text-gray-700 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              אפליקציות
            </Link>
            <Link 
              to="/agencies" 
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                isActive('/agencies') 
                  ? 'text-rose-500 bg-rose-50' 
                  : 'text-gray-700 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              סוכנויות דיגיטל
            </Link>
            <Link 
              to="/submit-review" 
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                isActive('/submit-review') 
                  ? 'text-rose-500 bg-rose-50' 
                  : 'text-gray-700 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                השאר חוות דעת
              </span>
            </Link>
            <Link 
              to="/service-providers" 
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                isActive('/service-providers') 
                  ? 'text-rose-500 bg-rose-50' 
                  : 'text-gray-700 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              <span className="flex items-center gap-2">
                נותני שירות
                <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">
                  בקרוב
                </span>
              </span>
            </Link>
            <Link 
              to="/guides" 
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                isActive('/guides') 
                  ? 'text-rose-500 bg-rose-50' 
                  : 'text-gray-700 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              מדריכים
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                isActive('/about') 
                  ? 'text-rose-500 bg-rose-50' 
                  : 'text-gray-700 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              אודות
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg hover:opacity-90 transition-opacity"
            >
              צור קשר
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}