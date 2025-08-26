import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";

/** Custom hook parallax (valid hook) */
function useLayerShift(smoothX, smoothY, centerX, centerY, mx, my) {
  const x = useTransform(smoothX, (v) => (v - centerX) / mx);
  const y = useTransform(smoothY, (v) => (v - centerY) / my);
  return { x, y };
}

/** Counter sederhana yang mulai saat kelihatan */
function Counter({ to = 100, duration = 1200, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.max(1, Math.floor(to / (duration / 16)));
    const id = setInterval(() => {
      current += step;
      if (current >= to) {
        current = to;
        clearInterval(id);
      }
      setVal(current);
    }, 16);
    return () => clearInterval(id);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {val.toLocaleString("id-ID")}
    </span>
  );
}

function Beranda({ theme }) {
  /* -------- Typing headline -------- */
  const [typingText, setTypingText] = useState("");
  const texts = useMemo(() => ["NIKMATI", "RASAKAN"], []);
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
        background: theme === "dark" ? "#0f1420" : "#ffffff",
        transition:
          "background 500ms ease, color 400ms ease, border-color 400ms ease",
      }
    : {};

  /* -------- Gambar unggulan untuk grid bawah -------- */
  const images = [
    "/assets/images/madu_propolis.jpg",
    "/assets/images/madu_premium.jpg",
    "/assets/images/royal_jelly.jpg",
  ];

  /* -------- HERO Visual Card Slideshow (ganti setiap 3 detik) -------- */
  const heroSlides = useMemo(
    () => [
      "/assets/images/madu_banyak.jpg",
      "/assets/images/madu_premium.jpg",
      "/assets/images/madu_propolis.jpg",
      "/assets/images/royal_jelly.jpg",
    ],
    []
  );
  const [heroIndex, setHeroIndex] = useState(0);

  // preload supaya transisinya mulus
  useEffect(() => {
    heroSlides.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [heroSlides]);

  useEffect(() => {
    const id = setInterval(
      () => setHeroIndex((i) => (i + 1) % heroSlides.length),
      3000
    );
    return () => clearInterval(id);
  }, [heroSlides.length]);

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

        {/* Vignette */}
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
                className="font-[Montserrat] text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-br from-[#e73136] to-[#8f2f31] drop-shadow-[0_2px_10px_rgba(0,0,0,.05)]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.7 }}
              >
                NUTRI BUNGA
              </motion.h1>

              <motion.p
                className="mt-4 text-base md:text-lg max-w-xl text-gray-700 dark:text-white transition-colors duration-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                Hadir sejak 2010, <strong>Nutri Bunga</strong> berkomitmen menjaga
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
                  className="relative inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-tr from-[#8f2f31] to-[#e73136] hover:from-[#a33b3d] hover:to-[#f04347] shadow-lg focus:outline-none focus:ring-4 focus:ring-[#e73136]/40 transition-all overflow-hidden"
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

              {/* Small stats */}
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-600 dark:text-white transition-colors duration-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e73136]" />
                  10+ tahun pengalaman
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e73136]" />
                  Uji lab & legal resmi
                </div>
              </div>
            </div>

            {/* Visual card + SLIDESHOW */}
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
                <div className="relative w-full h-[360px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={heroIndex}
                      src={heroSlides[heroIndex]}
                      alt="Visual madu Nutri Bunga"
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </AnimatePresence>
                </div>
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

      {/* ================== STATS BAND (Efek 1) ================== */}
      <motion.section
        className="py-10 relative"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl p-6 ${
              theme === "dark" ? "bg-white/5" : "bg-gray-50"
            } ring-1 ${theme === "dark" ? "ring-white/10" : "ring-black/10"}`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold">
                <Counter to={10} />+
              </div>
              <div className="text-xs opacity-70 mt-1">Tahun pengalaman</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                <Counter to={4} />+
              </div>
              <div className="text-xs opacity-70 mt-1">Kota utama</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                <Counter to={6} />+
              </div>
              <div className="text-xs opacity-70 mt-1">Varian produk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                <Counter to={100} />%
              </div>
              <div className="text-xs opacity-70 mt-1">Madu murni</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ================== PRODUK UNGGULAN (Efek 2,3) ================== */}
      <motion.section
        className="py-16 relative z-10"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl font-[Montserrat] font-bold text-center mb-12 text-[#8f2f31] dark:text-[#e73136] transition-colors duration-500">
            Produk Unggulan
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {["Madu Propolis", "Madu Premium", "Royal Jelly"].map((title, i) => (
              <Link key={i} to="/produk">
                <motion.div
                  className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                >
                  {/* gradient ring (Efek 2) */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e73136] to-[#8f2f31] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative m-[2px] rounded-2xl overflow-hidden">
                    <motion.div
                      className="relative w-full h-64 will-change-transform"
                      onMouseMove={(e) => {
                        const el = e.currentTarget;
                        const r = el.getBoundingClientRect();
                        const px = (e.clientX - r.left) / r.width - 0.5;
                        const py = (e.clientY - r.top) / r.height - 0.5;
                        el.style.transform = `perspective(700px) rotateX(${py *
                          -6}deg) rotateY(${px * 8}deg) scale(1.02)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
                      }}
                    >
                      <img
                        src={images[i]}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="text-lg font-semibold">{title}</h4>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================== KEUNGGULAN (Efek 4: ripple highlight) ================== */}
      <motion.section
        className="py-16 relative z-10"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-[#8f2f31] dark:text-[#e73136] mb-8 transition-colors duration-500">
            Kenapa Pilih NUTRI BUNGA?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              "Asli teruji laboratorium Sucofindo",
              "Bersertifikat BPOM MD & Halal",
              "Lebih dari 10 tahun pengalaman",
              "Produk berkualitas untuk segmen menengah ke atas",
            ].map((point, i) => (
              <motion.div
                key={i}
                className={`relative overflow-hidden rounded-xl p-5 ${
                  theme === "dark" ? "bg-white/5" : "bg-gray-50"
                } ring-1 ${theme === "dark" ? "ring-white/10" : "ring-black/10"}`}
                whileHover={{ scale: 1.01 }}
              >
                <span className="absolute -left-2 -top-2 w-12 h-12 rounded-full bg-[#e73136]/20 blur-xl" />
                <div className="relative flex items-start gap-3">
                  <span className="w-3 h-3 bg-[#e73136] rounded-full mt-1.5" />
                  <p className="text-gray-700 dark:text-white transition-colors duration-500">
                    {point}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================== CTA (Efek 5: sparkles + pulse) ================== */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center text-white bg-gradient-to-r from-[#8f2f31] to-[#e73136]">
            {/* sparkles */}
            {[...Array(14)].map((_, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute w-1.5 h-1.5 bg-white/70 rounded-full"
                initial={{ opacity: 0, x: Math.random() * 800 - 400, y: Math.random() * 200 - 100 }}
                animate={{ opacity: [0, 1, 0], y: "-=40" }}
                transition={{ duration: 2.2 + Math.random(), repeat: Infinity, delay: Math.random() * 1.8 }}
                style={{ left: "50%", top: "50%" }}
              />
            ))}

            <h3 className="text-2xl md:text-3xl font-bold">Siap merasakan madu terbaik?</h3>
            <p className="mt-2 opacity-90">
              Lihat katalog lengkap dan pesan langsung via WhatsApp.
            </p>
            <Link
              to="/produk"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-semibold bg-white text-[#8f2f31] hover:bg-rose-50 transition shadow"
            >
              Jelajahi Produk <FaArrowRight />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Beranda;
