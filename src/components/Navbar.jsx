import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Produk", path: "/produk" },
    { name: "FAQ", path: "/faq" },
    { name: "Tentang Kami", path: "/tentang" },
    { name: "Kontak", path: "/kontak" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const backgroundStyle = {
    backgroundColor:
      theme === "dark"
        ? `rgba(16, 19, 28, ${scrolled ? 0.82 : 0.55})`
        : `rgba(255, 255, 255, ${scrolled ? 0.88 : 0.62})`,
    backdropFilter: scrolled ? "blur(14px)" : "blur(8px)",
    WebkitBackdropFilter: scrolled ? "blur(14px)" : "blur(8px)",
    borderBottom:
      theme === "dark"
        ? `1px solid rgba(255,255,255,${scrolled ? 0.08 : 0.05})`
        : `1px solid rgba(0,0,0,${scrolled ? 0.08 : 0.05})`,
    boxShadow: scrolled ? "0 6px 24px rgba(0,0,0,.08)" : "none",
    transition:
      "background-color 500ms ease, color 350ms ease, border-color 350ms ease, backdrop-filter 500ms ease, box-shadow 500ms ease",
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 font-poppins ${
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
            <img
              src="/assets/images/logo.png"
              alt="Graha Madu Logo"
              className="h-8 w-auto"
            />
            <span className="text-lg font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 via-orange-500 to-amber-700 dark:from-yellow-200 dark:via-yellow-400 dark:to-orange-300 transition-colors duration-500">
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
                className={`text-sm font-medium relative pb-1 transition-colors ${
                  location.pathname === link.path
                    ? "text-yellow-500 dark:text-yellow-300"
                    : "hover:text-yellow-400 dark:hover:text-yellow-200"
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
              className={`p-2 rounded-full transition-colors ${
                theme === "light"
                  ? "bg-white text-gray-700 hover:bg-gray-100"
                  : "bg-[#1a1f2b] text-yellow-400 hover:bg-[#2a2f3d]"
              }`}
              whileTap={{ scale: 0.95 }}
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
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
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
