import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer({ theme }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const backgroundStyle = isMounted
    ? {
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #1a1f2b, #0f172a)"
            : "linear-gradient(135deg, #f59e0b, #b45309)", // kuning ke coklat madu
        transition: "background 1s ease-in-out, color 0.6s ease",
        position: "relative",
        overflow: "hidden",
      }
    : {};

  // Smooth scroll top
  const smoothScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`text-white font-[Poppins] ${
        theme === "dark" ? "text-gray-200" : "text-white"
      }`}
      style={backgroundStyle}
    >
      {/* Wave background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-40 opacity-30"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            fill={theme === "dark" ? "#fbbf24" : "#fde68a"}
            fillOpacity="0.4"
            d="M0,128L60,133.3C120,139,240,149,360,170.7C480,192,600,224,720,224C840,224,960,192,1080,165.3C1200,139,1320,117,1380,106.7L1440,96L1440,320L0,320Z"
          />
        </motion.svg>

        {/* Partikel glowing */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 4 + "px",
              height: Math.random() * 6 + 4 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 1, 0.3],
              backgroundColor: [
                "rgba(251,191,36,0.9)", // kuning madu
                "rgba(253,224,71,0.9)", // honey light
                "rgba(245,158,11,0.9)", // golden
                "rgba(251,191,36,0.9)", 
              ],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Konten utama */}
      <motion.div
        className="max-w-7xl mx-auto px-6 py-16 relative z-10"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <img
                src="/assets/images/logo.png"
                alt="Logo Graha Madu"
                className="w-10 h-10 object-contain"
              />
              <h2 className="text-xl font-bold">Graha Madu</h2>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              Menghadirkan madu murni dan alami berkualitas tinggi, untuk
              kesehatan keluarga Indonesia.
            </p>
          </motion.div>

          {/* Navigasi */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-yellow-300">
              Navigasi
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  onClick={smoothScrollTop}
                  className="hover:text-yellow-200 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/produk"
                  onClick={smoothScrollTop}
                  className="hover:text-yellow-200 transition-colors"
                >
                  Produk
                </Link>
              </li>
              <li>
                <Link
                  to="/testimoni"
                  onClick={smoothScrollTop}
                  className="hover:text-yellow-200 transition-colors"
                >
                  Testimoni
                </Link>
              </li>
              <li>
                <Link
                  to="/tentang"
                  onClick={smoothScrollTop}
                  className="hover:text-yellow-200 transition-colors"
                >
                  Tentang
                </Link>
              </li>
              <li>
                <Link
                  to="/kontak"
                  onClick={smoothScrollTop}
                  className="hover:text-yellow-200 transition-colors"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Kontak */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-yellow-300">
              Hubungi Kami
            </h3>
            <div className="flex flex-col space-y-3 text-sm">
              <a
                href="mailto:info@grahamadu.com"
                className="flex items-center gap-2 hover:text-yellow-200 transition-colors"
              >
                <FaEnvelope /> info@grahamadu.com
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-yellow-200 transition-colors"
              >
                <FaWhatsapp /> +62 812 3456 7890
              </a>
              <a
                href="https://www.instagram.com/grahamadu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-yellow-200 transition-colors"
              >
                <FaInstagram /> @grahamadu
              </a>
              <p className="text-gray-300 mt-4 text-sm">
                📍 Malang, Indonesia <br />
                🕒 Senin - Sabtu, 08.00 - 17.00
              </p>
            </div>
          </motion.div>
        </div>

        {/* Ikon Sosial */}
        <motion.div
          className="flex justify-center md:justify-end gap-4 mt-8"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-400 transition"
          >
            <FaWhatsapp />
          </a>
          <a
            href="mailto:info@grahamadu.com"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-400 transition"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://www.instagram.com/grahamadu/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-400 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com/grahamadu"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-400 transition"
          >
            <FaFacebook />
          </a>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-gray-700 mt-10 pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-xs text-gray-300">
            © 2025 Graha Madu | CV Hexa Anugerah Bersinar. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;
