import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Pages
import Beranda from "./pages/Beranda";
import Produk from "./pages/Produk";
import FAQ from "./pages/FAQ";
import Tentang from "./pages/Tentang";
import Kontak from "./pages/Kontak";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Reset scroll & trigger progress bar
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    NProgress.start();
    window.scrollTo(0, 0);
    const timer = setTimeout(() => NProgress.done(), 400);
    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
}

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes({ theme, toggleTheme }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Beranda theme={theme} /></PageTransition>} />
        <Route path="/produk" element={<PageTransition><Produk theme={theme} /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ theme={theme} /></PageTransition>} />
        <Route path="/tentang" element={<PageTransition><Tentang theme={theme} /></PageTransition>} />
        <Route path="/kontak" element={<PageTransition><Kontak theme={theme} /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen font-poppins bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-500">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <AnimatedRoutes theme={theme} toggleTheme={toggleTheme} />
        <Footer theme={theme} />
      </div>
    </Router>
  );
}

export default App;
