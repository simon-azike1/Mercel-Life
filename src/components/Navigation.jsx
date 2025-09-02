import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from '/assets/img/mercel_logo.png'


export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "/", label: "Home" },
    { id: "/about", label: "About" },
    { id: "/services", label: "Services" },
    { id: "/skills", label: "Skills" },
    { id: "/portfolio", label: "Portfolio" },
    { id: "/blog", label: "Blog" },
    { id: "/experience", label: "Experience" },
    { id: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
         <Link to="/">
         <div className="flex justify-center items-center p-2 my-1 mx-1 group transition-transform duration-500 hover:scale-110 mt-6 mb-6">
           <div className="rounded-full p-1 transition duration-500 group-hover:bg-red-600 group-hover:shadow-lg">
        <img 
        src={Logo} 
        alt="Mercel-logo" 
        className="rounded-full w-8 h-8 transition-transform duration-500" 
      />
    </div>
    <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent transition duration-500 group-hover:text-red-600">
      Mercel Life
    </span>
  </div>
</Link>
</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
