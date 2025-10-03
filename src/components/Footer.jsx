import { Linkedin, Facebook, Instagram, Heart, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Brand / About Section */}
            <div className="text-center md:text-left lg:col-span-1">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-500 to-white bg-clip-text text-transparent hover:cursor-pointer">
                  Mercel Life
                </div>
                <img
                  src="/assets/img/logo_3.PNG"
                  alt="Mercel Life Logo"
                  className="w-8 h-8 sm:w-9 sm:h-9 hover:scale-110 hover:cursor-pointer transform transition-transform duration-300 rounded-lg"
                  loading="lazy"
                />
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-sm mx-auto md:mx-0">
                Creating digital experiences that make a difference. Transforming ideas into beautiful, functional solutions.
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">
                Quick Links
              </h3>
              <nav>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <Link 
                      to="/about" 
                      className="hover:text-green-500 transition-colors duration-300 text-sm sm:text-base inline-block py-1 hover:translate-x-1 transform transition-transform"
                    >
                      About Me
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services" 
                      className="hover:text-green-500 transition-colors duration-300 text-sm sm:text-base inline-block py-1 hover:translate-x-1 transform transition-transform"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/portfolio" 
                      className="hover:text-green-500 transition-colors duration-300 text-sm sm:text-base inline-block py-1 hover:translate-x-1 transform transition-transform"
                    >
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contact" 
                      className="hover:text-green-500 transition-colors duration-300 text-sm sm:text-base inline-block py-1 hover:translate-x-1 transform transition-transform"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Social Media Section */}
            <div className="text-center md:text-left md:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">
                Connect With Me
              </h3>
              <p className="text-gray-400 text-sm mb-4 max-w-sm mx-auto md:mx-0">
                Follow me on social media for updates and behind-the-scenes content
              </p>
              
              {/* Social Icons */}
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://www.linkedin.com/in/marcelina-adebisi-0393b037a/"
                  className="group bg-gray-800 hover:bg-green-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://web.facebook.com/profile.php?id=61562343710215&_rdc=1&_rdr"
                  className="group bg-gray-800 hover:bg-green-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Facebook"
                >
                  <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://www.instagram.com/marcelinaadebisi?igsh=YzljYTk1ODg3Zg=="
                  className="group bg-gray-800 hover:bg-green-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                >
                  <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-xs sm:text-sm">
                © 2025 Mercelina Adebisi. All rights reserved.
              </p>
            </div>

            {/* Credits */}
            <div className="text-center sm:text-right">
              <p className="text-gray-400 text-xs sm:text-sm flex items-center justify-center sm:justify-end gap-1 flex-wrap">
                <span>Designed with</span>
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 animate-pulse" />
                <span>by</span>
                <Link
                  to="https://my-new-portfolio-8zg5.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400 transition-colors duration-300 font-medium hover:underline"
                >
                  SamzikTech
                </Link>
                <span className="hidden sm:inline">and lots of</span>
                <Coffee className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
