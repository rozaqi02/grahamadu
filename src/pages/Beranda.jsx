import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

/** Custom hook parallax (valid hook) */
function useLayerShift(smoothX, smoothY, centerX, centerY, mx, my) {
  const x = useTransform(smoothX, (v) => (v - centerX) / mx);
  const y = useTransform(smoothY, (v) => (v - centerY) / my);
  return { x, y };
}

function Beranda({ theme }) {
  /* -------- Typing headline -------- */
  const [typingText, setTypingText] = useState("");
  const texts = useMemo(() => ["NIKMATI", "PERCAYA"], []);
  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingInterval = setInterval(() => {
      if (!isDeleting) {
        setTypingText(texts[textIndex].slice(0, charIndex + 1));
        charIndex++;
        if (charIndex > texts[textIndex].length) isDeleting = true;
      } else {
        setTypingText(texts[textIndex].slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }
    }, 200);
    return () => clearInterval(typingInterval);
  }, [texts]);

  /* -------- Mouse parallax (spring-smoothed) -------- */
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });
  useEffect(() => {
    setViewport({ w: window.innerWidth, h: window.innerHeight });
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const mouseX = useMotionValue(viewport.w / 2);
  const mouseY = useMotionValue(viewport.h / 2);
  useEffect(() => {
    const handler = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.6 });

  const centerX = viewport.w / 2;
  const centerY = viewport.h / 2;
  const L1 = useLayerShift(smoothX, smoothY, centerX, centerY, 30, 36); // lambat
  const L2 = useLayerShift(smoothX, smoothY, centerX, centerY, 18, 24);
  const L3 = useLayerShift(smoothX, smoothY, centerX, centerY, 10, 12); // cepat

  /* -------- Sedikit transform saat scroll -------- */
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 4]);

  /* -------- Satu background untuk seluruh halaman -------- */
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  const pageStyle = isMounted
    ? {
        // Satu warna saja; menimpa gradient body dari index.css
        background: theme === "dark" ? "#0f1420" : "#ffffff",
        transition:
          "background 500ms ease, color 400ms ease, border-color 400ms ease",
      }
    : {};

  /* -------- Gambar produk unggulan -------- */
  const images = [
    "/assets/images/madu_propolis.jpg",
    "/assets/images/madu_premium.jpg",
    "/assets/images/royal_jelly.jpg",
  ];

  return (
    <div
      className={`min-h-screen font-[Poppins] ${
        theme === "dark" ? "text-white" : "text-gray-800"
      } overflow-hidden relative`}
      style={pageStyle}
    >
      {/* ================== HERO ================== */}
      <section className="relative h-[92vh] min-h-[560px] flex items-center">
        {/* Layer A: honeycomb grid */}
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 w-full h-full opacity-60"
          style={L1}
        >
          <defs>
            <pattern id="hex" width="14" height="12" patternUnits="userSpaceOnUse">
              <path
                d="M7 0l7 4v4l-7 4L0 8V4z"
                fill="none"
                stroke={theme === "dark" ? "rgba(253,224,71,.06)" : "rgba(180,83,9,.08)"}
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </motion.svg>

        {/* Layer B: blobs */}
        <motion.div
          className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-[40%] blur-3xl"
          style={L2}
          animate={{ opacity: theme === "dark" ? 0.25 : 0.18 }}
        >
          <div
            className={`w-full h-full animate-blob ${
              theme === "dark"
                ? "bg-[radial-gradient(circle_at_30%_30%,#fbbf24,transparent_60%)]"
                : "bg-[radial-gradient(circle_at_30%_30%,#f59e0b,transparent_60%)]"
            }`}
          />
        </motion.div>
        <motion.div
          className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-[45%] blur-3xl"
          style={L3}
          animate={{ opacity: theme === "dark" ? 0.3 : 0.22 }}
        >
          <div
            className={`w-full h-full animate-blob-delayed ${
              theme === "dark"
                ? "bg-[radial-gradient(circle_at_70%_70%,#fde68a,transparent_62%)]"
                : "bg-[radial-gradient(circle_at_70%_70%,#fcd34d,transparent_62%)]"
            }`}
          />
        </motion.div>

        {/* Vignette agar teks readable */}
        <div
          className={`pointer-events-none absolute inset-0 ${
            theme === "dark"
              ? "bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,.45))]"
              : "bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(255,255,255,.65))]"
          }`}
        />

        {/* Konten hero */}
        <motion.div
          className="relative z-[1] max-w-7xl mx-auto px-6 w-full"
          style={{ scale, rotate }}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Teks */}
            <div>
              <motion.span
                className={`inline-block text-xs tracking-[.3em] uppercase font-semibold mb-4 transition-colors duration-500 ${
                  theme === "dark" ? "text-yellow-300/90" : "text-yellow-700"
                }`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {typingText}
              </motion.span>

              <motion.h1
                className="font-[Montserrat] text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 via-orange-500 to-amber-700 dark:from-yellow-200 dark:via-yellow-400 dark:to-orange-300 drop-shadow-[0_2px_10px_rgba(0,0,0,.05)]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.7 }}
              >
                GRAHA MADU
              </motion.h1>

              {/* 1) Deskripsi — PUTIH TERANG saat dark */}
              <motion.p
                className="mt-4 text-base md:text-lg max-w-xl text-gray-700 dark:text-white transition-colors duration-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                Hadir sejak 2010, <strong>Graha Madu</strong> berkomitmen menjaga
                keaslian madu Indonesia. Produk kami telah bersertifikat{" "}
                <strong>BPOM MD</strong>, <strong>Halal</strong>, dan{" "}
                <strong>merek dagang resmi</strong>.
              </motion.p>

              {/* CTA */}
              <motion.div
                className="mt-7 flex gap-3 flex-wrap"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                <Link
                  to="/produk"
                  className="relative inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-tr from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300/40 transition-all overflow-hidden"
                >
                  <span className="relative z-[1]">Lihat Produk</span>
                  <FaArrowRight className="relative z-[1]" />
                  <span className="pointer-events-none absolute -left-10 top-0 h-full w-10 bg-white/60 skew-x-[-20deg] shimmer" />
                </Link>

                <Link
                  to="/tentang"
                  className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all border ${
                    theme === "dark"
                      ? "border-white/20 text-white/90 hover:bg-white/5"
                      : "border-gray-300 text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Tentang Kami
                </Link>
              </motion.div>

              {/* 2) Small stats — PUTIH saat dark */}
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-600 dark:text-white transition-colors duration-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  10+ tahun pengalaman
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  Uji lab & legal resmi
                </div>
              </div>
            </div>

            {/* Visual card (ikut parallax) */}
            <motion.div
              className="relative hidden lg:block"
              style={L2}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div
                className={`relative rounded-3xl overflow-hidden ring-1 ${
                  theme === "dark" ? "ring-white/10" : "ring-black/10"
                } shadow-2xl backdrop-blur-sm`}
              >
                <img
                  src="/assets/images/madu_banyak.jpg"
                  alt="Botol Madu Premium"
                  className="w-full h-[360px] object-cover scale-105 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating chips */}
              <motion.div
                className="absolute -left-6 top-6 px-3 py-2 rounded-full text-xs bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                Murni & Alami
              </motion.div>
              <motion.div
                className="absolute -right-6 bottom-6 px-3 py-2 rounded-full text-xs bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
              >
                Rasa Premium
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ================== PRODUK UNGGULAN ================== */}
      <motion.section
        className="py-16 relative z-10"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Judul — KUNING saat dark */}
          <motion.h2 className="text-4xl font-[Montserrat] font-bold text-center mb-12 text-yellow-700 dark:text-yellow-300 transition-colors duration-500">
            Produk Unggulan
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {["Madu Propolis", "Madu Premium", "Royal Jelly"].map((title, i) => (
              <Link key={i} to="/produk">
                <motion.div
                  className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={images[i]}
                    alt={title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-semibold">{title}</h4>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================== KENAPA PILIH GRAHA MADU ================== */}
      <motion.section
        className="py-16 relative z-10"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Judul — KUNING saat dark */}
          <motion.h2 className="text-3xl md:text-4xl font-bold text-yellow-700 dark:text-yellow-300 mb-8 transition-colors duration-500">
            Kenapa Pilih Graha Madu?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              "Asli teruji laboratorium Sucofindo",
              "Bersertifikat BPOM MD & Halal",
              "Lebih dari 10 tahun pengalaman",
              "Produk berkualitas untuk segmen menengah ke atas",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mt-2" />
                {/* deskripsi list — PUTIH saat dark */}
                <p className="text-gray-700 dark:text-white transition-colors duration-500">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Beranda;
