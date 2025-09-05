import { Linkedin,Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Brand / About */}
          <div>
            <div className="text-2xl  flex flex-row  gap-4 font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 hover:cursor-pointer">
              Mercel Life
              <img src="/assets/img/logo_2.png" alt="mercel life"  className="w-9 h-9 hover:scale-150 hover:cursor-pointer transform transition-transform duration-200"/>
            </div>
            <p className="text-gray-400">
              Creating digital experiences that make a difference
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="hover:text-white transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow me on social media</h3>
            <div className="flex justify-center md:justify-start space-x-3">
             
              <a
                href="https://www.linkedin.com/in/marcelina-adebisi-0393b037a/"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=61562343710215&_rdc=1&_rdr"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/mercelinaadebisi/"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
              >
                <Instagram  className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Mercelina. All rights reserved. Designed with ❤️ by  <Link to="https://my-new-portfolio-8zg5.vercel.app/" target="_blank" className="hover:text-white transition duration-700 hover:font-bold">SamzikTech</Link> and lots of
            coffee.
          </p>
        </div>
      </div>
    </footer>
  );
}
