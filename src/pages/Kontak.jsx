import { useState, useEffect, useMemo, useRef } from "react";
import { MotionConfig, motion, AnimatePresence } from "framer-motion";
import {
  FaLeaf,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaUser,
  FaCheckCircle,
  FaCopy,
} from "react-icons/fa";

/**
 * Kontak – versi premium
 * Efek UX (11):
 * 1) Ambient gradient backdrop (radial + noise) yang hidup.
 * 2) Page enter fade/scale lembut via MotionConfig.
 * 3) Glass card + gradient ring + hover lift.
 * 4) Input focus-glow + validasi realtime (ikon/tone).
 * 5) Textarea auto-resize + live counter.
 * 6) Tombol WA dengan shimmer + ripple click.
 * 7) Toast sukses slide-in.
 * 8) Map card parallax tilt + pin bounce.
 * 9) Testimoni autoplay + drag swipe + progress bar + dots.
 * 10) Chip “Salin email” dengan tooltip animasi.
 * 11) Floating bubble WhatsApp (pojok layar) fade-in.
 */

function Kontak({ theme }) {
  const isDark = theme === "dark";

  /* ================== FORM STATE ================== */
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const maxLen = 300;

  // Validasi realtime sederhana
  const isNamaOk = nama.trim().length >= 3;
  const isEmailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  // Auto-resize textarea
  const taRef = useRef(null);
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [pesan]);

  /* ================== TESTIMONI ================== */
  const testimonials = useMemo(
    () => [
      { text: "Produk Nutri Bunga benar-benar asli, lembut dan tidak bikin eneg.", author: "Rina, Surabaya" },
      { text: "Sejak rutin minum, badan lebih segar dan jarang sakit.", author: "Budi, Malang" },
      { text: "CS ramah, pengiriman cepat, kualitas madu luar biasa.", author: "Lestari, Bandung" },
      { text: "Madu klancengnya mantap. Sekarang jadi langganan.", author: "Agus, Jakarta" },
    ],
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const progRef = useRef(null);

  // Auto slide + progress bar
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Restart animasi progress setiap slide berubah
  useEffect(() => {
    const el = progRef.current;
    if (!el) return;
    el.style.animation = "none";
    requestAnimationFrame(() => {
      el.style.animation = "t-progress 4s linear forwards";
    });
  }, [currentIndex]);

  const nextTestimonial = () =>
    setCurrentIndex((p) => (p + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  /* ================== WHATSAPP ================== */
  const WA_NUMBER = "+6285745135415";
  const waText = `Halo, saya ${nama} (${email}):%0A${encodeURIComponent(
    (pesan || "Saya ingin tahu lebih banyak tentang produk Nutri Bunga 🌺").trim()
  )}`;

  /* ================== SUBMIT ================== */
  const validate = () => {
    const e = {};
    if (!isNamaOk) e.nama = "Nama minimal 3 karakter.";
    if (!isEmailOk) e.email = "Email tidak valid.";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${waText}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSubmitted(true);
    setNama("");
    setEmail("");
    setPesan("");
    setTimeout(() => setSubmitted(false), 3500);
  };

  /* ================== UTIL ================== */
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("madunutribunga@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  // Ripple pada tombol WA
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);
  const onRipple = (e) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((r) => [...r, { id, x, y }]);
    setTimeout(() => setRipples((r) => r.filter((i) => i.id !== id)), 500);
  };

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 200, damping: 26 }}>
      <div
        className={`relative min-h-screen pt-24 font-[Poppins] ${
          isDark ? "text-white" : "text-gray-800"
        }`}
        style={{ background: isDark ? "#0f1420" : "#ffffff" }}
      >
        {/* ========= Efek #1: Ambient gradient backdrop + noise ========= */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 10% -10%, rgba(231,49,54,.12), transparent 60%), radial-gradient(1200px 600px at 110% 110%, rgba(143,47,49,.12), transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><defs><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter></defs><rect width='100%' height='100%' filter='url(%23n)' opacity='.7'/></svg>\")",
          }}
        />

        <style>{`
          @keyframes t-progress { from { width: 0% } to { width: 100% } }
        `}</style>

        {/* ========= Header Mini ========= */}
        <header className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-[Montserrat] font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e73136] to-[#8f2f31]">
                Kontak & Bantuan
              </span>
            </h1>
            <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
              Ada pertanyaan? Tulis di formulir—kami akan merespons secepatnya.
            </p>
          </div>
        </header>

        {/* ========= Konten ========= */}
        <section className="relative z-[1] max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-[minmax(0,440px)_1fr] gap-10 items-start">
            {/* ==== Card Form – Efek #2 & #3 & #4 & #5 & #6 & #7 ==== */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative"
            >
              {/* Gradient ring */}
              <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#e73136] via-[#8f2f31] to-[#e73136] shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                {/* Glass card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`rounded-2xl ${
                    isDark ? "bg-[#0f1420]/70" : "bg-white/70"
                  } backdrop-blur-xl p-6 md:p-7 border border-white/10`}
                >
                  <h2 className="text-2xl font-bold mb-6">Hubungi Kami</h2>

                  <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                    {/* Nama */}
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
                      <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 rounded-lg border outline-none transition
                          ${isNamaOk ? "border-emerald-400" : "border-gray-300 dark:border-white/15"}
                          focus:ring-2 focus:ring-[#e73136]/30 focus:border-[#e73136]
                          bg-transparent`}
                        placeholder="Nama"
                      />
                      {/* valid icon */}
                      {isNamaOk && (
                        <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                      )}
                      {!!errors.nama && (
                        <div className="mt-1 text-xs text-red-500">{errors.nama}</div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 rounded-lg border outline-none transition
                          ${isEmailOk ? "border-emerald-400" : "border-gray-300 dark:border-white/15"}
                          focus:ring-2 focus:ring-[#e73136]/30 focus:border-[#e73136]
                          bg-transparent`}
                        placeholder="Email"
                      />
                      {isEmailOk && (
                        <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                      )}
                      {!!errors.email && (
                        <div className="mt-1 text-xs text-red-500">{errors.email}</div>
                      )}
                    </div>

                    {/* Pesan */}
                    <div className="relative">
                      <textarea
                        ref={taRef}
                        value={pesan}
                        onChange={(e) => setPesan(e.target.value.slice(0, maxLen))}
                        className="w-full rounded-lg px-4 py-3 border outline-none min-h-[112px] resize-none bg-transparent
                                   border-gray-300 dark:border-white/15 focus:ring-2 focus:ring-[#e73136]/30 focus:border-[#e73136]"
                        placeholder="Pesan"
                      />
                      <div className="pointer-events-none absolute right-2 bottom-2 text-[11px] opacity-70">
                        {pesan.length}/{maxLen}
                      </div>
                    </div>

                    {/* CTA — shimmer + ripple */}
                    <motion.button
                      ref={btnRef}
                      type="submit"
                      onClick={onRipple}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full overflow-hidden rounded-lg bg-gradient-to-tr from-[#8f2f31] to-[#e73136] text-white font-semibold py-3 shadow-lg"
                    >
                      <span className="relative z-[2] inline-flex items-center justify-center gap-2">
                        <FaWhatsapp /> Hubungi via WhatsApp
                      </span>
                      {/* shimmer */}
                      <span className="pointer-events-none absolute -left-10 top-0 h-full w-10 bg-white/40 skew-x-[-20deg] animate-[shimmer_2.2s_infinite] z-[1]" />
                      {/* ripple */}
                      <AnimatePresence>
                        {ripples.map((r) => (
                          <motion.span
                            key={r.id}
                            initial={{ opacity: 0.35, scale: 0 }}
                            animate={{ opacity: 0, scale: 5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute rounded-full bg-white/50"
                            style={{
                              width: 20,
                              height: 20,
                              left: r.x - 10,
                              top: r.y - 10,
                              zIndex: 0,
                            }}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.button>
                  </form>

                  {/* Toast sukses */}
                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="mt-4 flex items-center gap-2 text-sm rounded-md px-3 py-2 bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 border border-emerald-600/30"
                      >
                        <FaCheckCircle /> Pesan diarahkan ke WhatsApp. Terima kasih!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Chip salin email – Efek #10 */}
              <div className="mt-4 flex items-center gap-2 text-xs">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border border-gray-300 dark:border-white/20 hover:bg-white/60 dark:hover:bg-white/10 transition"
                  title="Salin alamat email"
                  type="button"
                >
                  <FaCopy /> madunutribunga@gmail.com
                </button>
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 6, opacity: 0 }}
                      className="text-emerald-500"
                    >
                      Disalin!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ==== Info + Maps + Testimoni – Efek #8 & #9 ==== */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="space-y-8"
            >
              {/* Highlights */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-5">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e73136] to-[#8f2f31]">
                    Manfaatkan Kebaikan Nutri Bunga
                  </span>
                </h3>
                <ul className="grid sm:grid-cols-2 gap-4 text-sm md:text-base">
                  {[
                    "Produk madu murni berkualitas dari petani lokal.",
                    "Harga ramah dengan kualitas premium.",
                    "Legalitas lengkap: Merek, Halal, BPOM MD.",
                    "Lebih dari 10 tahun pengalaman.",
                  ].map((t) => (
                    <motion.li
                      key={t}
                      whileHover={{ y: -2 }}
                      className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5"
                    >
                      <FaLeaf className="text-[#e73136] mt-1" />
                      <p className={isDark ? "text-white" : "text-gray-700"}>{t}</p>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-5 text-sm text-gray-600 dark:text-gray-300">
                  <p>📍 Kalisongo, Malang</p>
                  <p>📧 madunutribunga@gmail.com</p>
                </div>
              </div>

              {/* Maps – tilt + pin bounce */}
              <div className="relative">
                <motion.div
                  className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 shadow-lg"
                  whileHover={{ rotateX: 1.2, rotateY: -1.2 }}
                  style={{ transformStyle: "preserve-3d" }}
                  transition={{ type: "spring", stiffness: 140, damping: 16 }}
                >
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <iframe
                    title="Lokasi Nutri Bunga"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.6285900855654!2d112.5861827!3d-7.9396367999999985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e789eab3b13c61b%3A0x9c42f7d15bf6ab0!2sKalisongo%2C%20Malang!5e0!3m2!1sid!2sid!4v1734477111111!5m2!1sid!2sid"
                    width="100%"
                    height="260"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] text-[#e73136] text-3xl drop-shadow"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  >
                    <FaMapMarkerAlt />
                  </motion.div>
                </motion.div>
              </div>

              {/* Testimoni – autoplay + drag + progress + dots */}
              <div className="relative">
                <h4 className="text-lg font-bold mb-3 text-[#8f2f31] dark:text-[#e73136]">
                  Testimoni Pelanggan
                </h4>

                <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(_, info) => {
                        if (info.offset.x > 60) prevTestimonial();
                        if (info.offset.x < -60) nextTestimonial();
                      }}
                      className="p-5 rounded-lg border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow text-center"
                    >
                      <p className="text-sm italic leading-relaxed">
                        “{testimonials[currentIndex].text}”
                      </p>
                      <span className="mt-2 block text-xs opacity-70">
                        — {testimonials[currentIndex].author}
                      </span>
                    </motion.div>
                  </AnimatePresence>

                  <button
                    onClick={prevTestimonial}
                    className="absolute -left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-white/10 hover:scale-105 transition"
                    aria-label="Sebelumnya"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute -right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-white/10 hover:scale-105 transition"
                    aria-label="Berikutnya"
                  >
                    <FaChevronRight />
                  </button>

                  {/* progress */}
                  <div className="mt-3 h-1 w-full rounded bg-gray-200 dark:bg-white/10 overflow-hidden">
                    <div ref={progRef} className="h-full bg-[#e73136]" style={{ width: "0%" }} />
                  </div>

                  {/* dots */}
                  <div className="mt-2 flex justify-center gap-1.5">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition ${
                          i === currentIndex ? "bg-[#e73136]" : "bg-gray-300 dark:bg-white/20"
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==== Floating WA bubble – Efek #11 ==== */}
        <AnimatePresence>
          <motion.a
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-20 inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg text-white bg-[#25D366] hover:brightness-110"
            title="Chat WhatsApp cepat"
          >
            <FaWhatsapp />
          </motion.a>
        </AnimatePresence>

        {/* little CSS for shimmer */}
        <style>{`
          @keyframes shimmer { 0% { transform: translateX(-150%);} 100% { transform: translateX(250%);} }
        `}</style>
      </div>
    </MotionConfig>
  );
}

export default Kontak;
