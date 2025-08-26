import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
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
import FloatingCart from "./components/FloatingCart";

// Cart Context
import { CartProvider, useCart } from "./context/CartContext";

/* ------------------ Scroll Restore + Progress ------------------ */
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

/* ------------------ Page Transition Wrapper ------------------ */
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

/* ------------------ Checkout Redirect (WhatsApp) ------------------ */
function CheckoutRedirect() {
  const { items, total } = useCart();

  const waUrl = useMemo(() => {
    const lines = items.map(
      (it) =>
        `• ${it.name} x ${it.qty} — Rp ${Number(it.price).toLocaleString("id-ID")}`
    );
    const header = "Halo, saya ingin memesan produk NUTRI BUNGA:%0A";
    const body = lines.join("%0A");
    const foot = `%0A%0ATotal: Rp ${Number(total).toLocaleString("id-ID")}%0ATerima kasih.`;
    return `https://wa.me/6281334426377?text=${header}${body}${foot}`;
  }, [items, total]);

  useEffect(() => {
    if (items.length) window.open(waUrl, "_blank", "noopener,noreferrer");
  }, [waUrl, items.length]);

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Mengarahkan ke WhatsApp…
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Jika WhatsApp tidak terbuka otomatis, klik tombol di bawah.
        </p>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 text-left p-4 mb-6">
          <h2 className="font-semibold mb-2">Ringkasan Pesanan</h2>
          {!items.length ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Keranjang masih kosong.
            </p>
          ) : (
            <ul className="text-sm space-y-1">
              {items.map((it) => (
                <li key={it.id}>
                  {it.name} <span className="text-gray-500">x {it.qty}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3 font-semibold">
            Total: Rp {Number(total).toLocaleString("id-ID")}
          </div>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-white font-semibold ${
            items.length ? "bg-[#e73136] hover:bg-[#8f2f31]" : "bg-gray-400 cursor-not-allowed"
          } transition`}
        >
          Buka WhatsApp
        </a>
      </div>
    </PageTransition>
  );
}

/* ------------------ Routes with AnimatePresence ------------------ */
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
        {/* Checkout WA */}
        <Route path="/checkout" element={<CheckoutRedirect />} />
      </Routes>
    </AnimatePresence>
  );
}

/* ------------------ App Root ------------------ */
function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Pasang kelas ke <html> utk utilitas Tailwind dark:
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Konfigurasi NProgress: merah, tanpa spinner, animasi mulus
  useEffect(() => {
    NProgress.configure({
      showSpinner: false,           // ⟵ hilangkan loading bulat
      trickleSpeed: 120,            // drip yang terasa halus
      speed: 500,                   // transisi progress bar mulus
      easing: "ease",
      minimum: 0.05,
    });

    // Inject CSS supaya bar NProgress merah brand
    const id = "nprogress-custom-style";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.innerHTML = `
        #nprogress .bar { background: #e73136 !important; height: 3px; }
        #nprogress .peg { box-shadow: 0 0 10px #e73136, 0 0 5px #e73136 !important; }
        #nprogress .spinner { display: none !important; } /* guard */
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <div className={theme === "dark" ? "dark" : "light"} data-theme={theme}>
          <div className="min-h-screen font-poppins transition-colors duration-500">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <AnimatedRoutes theme={theme} toggleTheme={toggleTheme} />
            <Footer theme={theme} />
            <FloatingCart />
          </div>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
