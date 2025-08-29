import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer({ theme }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const backgroundStyle = isMounted
    ? {
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #1a1f2b, #0f172a)"
            : "linear-gradient(135deg, #8f2f31, #e73136)",
        transition: "background 1s ease-in-out, color 0.6s ease",
        position: "relative",
        overflow: "hidden",
      }
    : {};

  const WA_LINK = "https://wa.me/6281334426377"; // 081 3344 26 377
  const MAPS_LINK = "https://maps.app.goo.gl/n5zuGVfd7Cpm57rr6";
  const ADDRESS_TXT =
    "GRAHA MADU, Puri Cempaka Putih I / AC 10, Jl. Mayjend Sungkono, Malang";

  const smoothScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className={`text-white font-[Poppins] ${
        theme === "dark" ? "text-gray-200" : "text-white"
      }`}
      style={backgroundStyle}
    >
      {/* Wave */}
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
            fill={theme === "dark" ? "#e73136" : "#f4b5b6"}
            fillOpacity="0.4"
            d="M0,128L60,133.3C120,139,240,149,360,170.7C480,192,600,224,720,224C840,224,960,192,1080,165.3C1200,139,1320,117,1380,106.7L1440,96L1440,320L0,320Z"
          />
        </motion.svg>

        {/* Partikel */}
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
                "rgba(255,255,255,0.6)",
                "rgba(255,255,255,0.3)",
                "rgba(255,255,255,0.6)",
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

      {/* Konten */}
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
                alt="Logo NUTRI BUNGA"
                className="w-10 h-10 object-contain"
              />
              <h2 className="text-xl font-bold">NUTRI BUNGA</h2>
            </div>
            <p className="text-sm text-gray-100/90 leading-relaxed">
              Menghadirkan madu murni dan alami berkualitas tinggi, untuk
              kesehatan keluarga Indonesia.
            </p>
          </motion.div>

          {/* Navigasi */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white/90">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: "Beranda" },
                { to: "/produk", label: "Produk" },
                { to: "/faq", label: "FAQ" },
                { to: "/tentang", label: "Tentang Kami" },
                { to: "/kontak", label: "Kontak" },
              ].map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    onClick={smoothScrollTop}
                    className="hover:text-white transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kontak */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white/90">Hubungi Kami</h3>
            <div className="flex flex-col space-y-3 text-sm">
              <a
                href="mailto:madunutribunga@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <FaEnvelope /> madunutribunga@gmail.com
              </a>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <FaWhatsapp /> 081 3344 26 377
              </a>

              <a
                href="https://www.instagram.com/nutribunga_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <FaInstagram /> @nutribunga_
              </a>

              <p className="text-white/80 mt-4 text-sm">
                📍{" "}
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted underline-offset-2 hover:opacity-80"
                  title="Buka di Google Maps"
                >
                  {ADDRESS_TXT}
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Ikon Sosial */}
        <motion.div
          className="flex justify-center md:justify-end gap-3 mt-8"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[
            { href: WA_LINK, icon: <FaWhatsapp />, label: "WhatsApp" },
            { href: "mailto:madunutribunga@gmail.com", icon: <FaEnvelope />, label: "Email" },
            { href: "https://www.instagram.com/nutribunga_", icon: <FaInstagram />, label: "Instagram" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#e73136] hover:bg-[#8f2f31] transition"
            >
              {s.icon}
            </a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-white/20 mt-10 pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-xs text-white/80">
            © 2025 NUTRI BUNGA | CV Hexa Anugerah Bersinar. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;
