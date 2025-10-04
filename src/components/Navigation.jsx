import React, { useState, useEffect } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Skills", path: "/skills" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${scrolled 
        ? isDarkMode 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-gray-800' 
          : 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-200'
        : isDarkMode
          ? 'bg-gray-900/80 backdrop-blur-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
            <div className="relative">
              <img
                src="/assets/img/logo_3.PNG"
                alt="Mercel Life"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl transition-all duration-300 group-hover:scale-110"
              />
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                isDarkMode ? 'bg-green-400' : 'bg-green-500'
              }`}></div>
            </div>
            <span className={`
              text-xl lg:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300
              ${isDarkMode 
                ? 'from-green-400 to-white' 
                : 'from-green-500 to-black'
              }
            `}>
              Mercel Life
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group
                  ${location.pathname === item.path
                    ? isDarkMode
                      ? 'text-green-400 bg-green-400/10'
                      : 'text-green-600 bg-green-50'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }
                `}
              >
                {item.name}
                <span className={`
                  absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r transition-all duration-300 transform -translate-x-1/2 group-hover:w-full
                  ${location.pathname === item.path ? 'w-full' : ''}
                  ${isDarkMode 
                    ? 'from-green-400 to-green-300' 
                    : 'from-green-600 to-green-500'
                  }
                `}></span>
              </Link>
            ))}
          </div>

          {/* Right Side: Schedule Button + Theme Toggle + Mobile Menu */}
          <div className="flex items-center space-x-3">
            
            {/* Schedule Button - Desktop */}
            <Link
              to="/contact"
              className={`
                hidden lg:flex items-center space-x-2 px-6 py-2.5 rounded-xl font-semibold 
                transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/20
                ${isDarkMode
                  ? 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-gray-900'
                  : 'bg-gradient-to-r from-green-500 to-black hover:from-green-600 hover:to-gray-900 text-white'
                } shadow-lg hover:shadow-xl
              `}
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Call</span>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                lg:hidden p-2 rounded-lg transition-all duration-300 
                ${isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`
          lg:hidden transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className={`
            py-4 space-y-2 border-t 
            ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
          `}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={`
                  block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 
                  ${location.pathname === item.path
                    ? isDarkMode
                      ? 'text-green-400 bg-green-400/10 border-l-4 border-green-400'
                      : 'text-green-600 bg-green-50 border-l-4 border-green-500'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Schedule Button */}
            <div className="px-4 py-2">
              <Link
                to="/contact"
                onClick={closeMenu}
                className={`
                  flex items-center justify-center space-x-2 w-full px-6 py-3 rounded-xl font-semibold 
                  transition-all duration-300 transform hover:scale-105
                  ${isDarkMode
                    ? 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-gray-900'
                    : 'bg-gradient-to-r from-green-500 to-black hover:from-green-600 hover:to-gray-900 text-white'
                  } shadow-lg hover:shadow-xl
                `}
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Call</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
