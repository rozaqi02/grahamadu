import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Produk", path: "/produk" },
    { name: "FAQ", path: "/faq" },
    { name: "Tentang", path: "/tentang" },
    { name: "Kontak", path: "/kontak" },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const backgroundStyle = isMounted
    ? {
        backgroundColor:
          theme === "dark"
            ? "rgba(26, 31, 43, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }
    : {};

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 shadow-sm font-poppins ${
        theme === "dark" ? "text-white" : "text-gray-800"
      }`}
      style={backgroundStyle}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 relative">
        <div className="flex items-center justify-between">
          {/* Logo + Brand */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("/")}
          >
            <motion.img
              src="/assets/images/logo.png"
              alt="Graha Madu Logo"
              className="h-8 w-auto"
            />
            <span className="text-lg font-semibold tracking-wide">
              GRAHA MADU
            </span>
          </motion.div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.path);
                }}
                className={`text-sm font-medium relative pb-1 ${
                  location.pathname === link.path
                    ? "text-graha-green after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-graha-green after:left-0 after:bottom-0"
                    : "hover:text-graha-green"
                }`}
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Toggle & Hamburger */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "light"
                  ? "bg-white text-gray-700 hover:bg-gray-100"
                  : "bg-[#1a1f2b] text-yellow-400 hover:bg-[#2a2f3d]"
              }`}
            >
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
            </motion.button>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md"
            >
              <div className="space-y-1">
                <span
                  className={`block h-0.5 w-5 bg-current transform transition duration-300 ${
                    isOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current transition duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current transform transition duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-3 py-3 space-y-2 rounded-lg shadow-md bg-white dark:bg-[#1a1f2b]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.path);
                  }}
                  className={`block px-4 py-2 text-sm font-medium rounded-md ${
                    location.pathname === link.path
                      ? "bg-yellow-100 text-graha-brown dark:bg-yellow-900 dark:text-yellow-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
