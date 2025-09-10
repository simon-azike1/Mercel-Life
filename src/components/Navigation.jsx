import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from '/assets/img/logo_3.PNG';
import { AnimatePresence, motion } from "framer-motion";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const importantLinks = [
    { id: "/", label: "Home" },
    { id: "/portfolio", label: "Portfolio" },
    { id: "/contact", label: "Contact" },
  ];

  const moreLinks = [
    { id: "/about", label: "About" },
    { id: "/services", label: "Services" },
    { id: "/skills", label: "Skills" },
    { id: "/blog", label: "Blog" },
    { id: "/experience", label: "Experience" },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center">
<div className="rounded-full p-1 bg-white hover:bg-green-100 hover:scale-105 hover:shadow-md hover:shadow-green-200/40 transition transform duration-500 ease-in-out">
  <img src={Logo} alt="Mercel-logo" className="w-8 h-8 rounded-full" />
</div>


            {/* <span className="ml-2 text-2xl font-bold text-green-600">
              Mercel Life
            </span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {importantLinks.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-green-600 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:text-green-600 transition-colors duration-200 hover:cursor-pointer"
              >
                More
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50"
                  >
                    {moreLinks.map((item) => (
                      <Link
                        key={item.id}
                        to={item.id}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Schedule Button */}
            <a
              href="https://wa.me/2349056195484?text=Hi%20Mercelina,%20I%20would%20like%20to%20schedule%20a%20consultation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition hover:cursor-pointer">
                Schedule
              </button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[...importantLinks, ...moreLinks].map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-green-600 hover:bg-green-50 w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://wa.me/2349056195484?text=Hi%20Mercelina,%20I%20would%20like%20to%20schedule%20a%20consultation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  Schedule
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
