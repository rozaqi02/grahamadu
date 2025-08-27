import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLeaf,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";

function Kontak({ theme }) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const maxLen = 300;

  const testimonials = useMemo(
    () => [
      {
        text:
          "Produk Nutri Bunga benar-benar asli, rasanya lembut dan tidak bikin eneg.",
        author: "Rina, Surabaya",
      },
      {
        text:
          "Sejak rutin minum madu Nutri Bunga, badan lebih segar dan jarang sakit.",
        author: "Budi, Malang",
      },
      {
        text:
          "Pelayanan ramah, pengiriman cepat, dan kualitas madu luar biasa.",
        author: "Lestari, Bandung",
      },
      {
        text: "Madu klancengnya mantap banget. Sekarang jadi langganan.",
        author: "Agus, Jakarta",
      },
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

  const whatsappNumber = "+6285745135415";
  const whatsappMessage = `Halo, saya ${nama} (${email}):%0A${encodeURIComponent(
    (pesan || "Saya ingin tahu lebih banyak tentang produk Nutri Bunga 🌺").trim()
  )}`;

  const validate = () => {
    const e = {};
    if (!nama.trim()) e.nama = "Nama wajib diisi.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Email tidak valid.";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSubmitted(true);
    setNama("");
    setEmail("");
    setPesan("");
    setTimeout(() => setSubmitted(false), 3500);
  };

  const isDark = theme === "dark";
  const [showMap, setShowMap] = useState(false);

  // path gambar dari public/ supaya aman di CRA/webpack
  const mapPlaceholder =
    (process.env.PUBLIC_URL || "") + "/assets/images/map-placeholder.jpg";

  return (
    <div
      className={`relative min-h-screen pt-24 font-[Poppins] ${
        isDark ? "text-white" : "text-gray-800"
      }`}
      style={{
        background: isDark ? "#0f1420" : "#ffffff",
        transition: "background 400ms ease",
      }}
    >
      <style>{`@keyframes t-progress { from { width: 0% } to { width: 100% } }`}</style>

      <section className="relative z-[1] max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[minmax(0,420px)_1fr] gap-10 items-start">
          {/* === Form Card === */}
          <motion.div
            className="relative"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#e73136] via-[#8f2f31] to-[#e73136] shadow-lg">
              <div
                className={`rounded-2xl ${
                  isDark ? "bg-[#0f1420]/70" : "bg-white/70"
                } backdrop-blur-xl p-6 md:p-7`}
              >
                <h2 className="text-2xl font-bold mb-6">Hubungi Kami</h2>
                <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="peer w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent outline-none focus:border-[#e73136]"
                      placeholder="Nama"
                    />
                    {!!errors.nama && (
                      <div className="mt-1 text-xs text-red-500">
                        {errors.nama}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent outline-none focus:border-[#e73136]"
                      placeholder="Email"
                    />
                    {!!errors.email && (
                      <div className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <textarea
                      value={pesan}
                      onChange={(e) => setPesan(e.target.value.slice(0, maxLen))}
                      className="w-full rounded-lg px-4 py-3 border outline-none h-28 resize-y bg-transparent focus:border-[#e73136]"
                      placeholder="Pesan"
                    />
                    <div className="pointer-events-none absolute right-2 bottom-2 text-[11px] opacity-70">
                      {pesan.length}/{maxLen}
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-lg bg-gradient-to-tr from-[#8f2f31] to-[#e73136] text-white font-semibold py-3 shadow-lg"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FaWhatsapp /> Hubungi via WhatsApp
                    </span>
                  </motion.button>
                </form>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="mt-4 flex items-center gap-2 text-sm rounded-md px-3 py-2 bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 border border-emerald-600/30"
                    >
                      <FaCheckCircle /> Pesan diarahkan ke WhatsApp. Terima
                      kasih!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* === Info + Maps + Testimoni === */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.05 }}
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
                    className="flex items-start gap-3 p-3 rounded-lg border bg-white/60 dark:bg-white/5"
                  >
                    <FaLeaf className="text-[#e73136] mt-1" />
                    <p>{t}</p>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-5 text-sm text-gray-600 dark:text-gray-300">
                <p>📍 Kalisongo, Malang</p>
                <p>📧 madunutribunga@gmail.com</p>
              </div>
            </div>

            {/* Maps: CLICK-TO-ACTIVATE */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl border shadow-lg">
                {!showMap ? (
                  <button
                    onClick={() => setShowMap(true)}
                    className="relative w-full h-64 flex items-center justify-center"
                    aria-label="Aktifkan peta"
                    title="Tampilkan peta interaktif"
                    style={{
                      backgroundImage: `url(${mapPlaceholder})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-[1] flex flex-col items-center text-white">
                      <FaMapMarkerAlt className="text-3xl mb-2" />
                      <span className="text-sm font-semibold">
                        Tap untuk lihat peta
                      </span>
                    </div>
                  </button>
                ) : (
                  <>
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
                      transition={{
                        repeat: Infinity,
                        duration: 1.6,
                        ease: "easeInOut",
                      }}
                    >
                      <FaMapMarkerAlt />
                    </motion.div>
                  </>
                )}
              </div>
            </div>

            {/* Testimoni */}
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
                    className="p-5 rounded-lg border bg-white/70 dark:bg-white/5 shadow text-center"
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
                  title="Sebelumnya"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute -right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-white/10 hover:scale-105 transition"
                  aria-label="Berikutnya"
                  title="Berikutnya"
                >
                  <FaChevronRight />
                </button>

                <div className="mt-3 h-1 w-full rounded bg-gray-200 overflow-hidden">
                  <div
                    ref={progRef}
                    className="h-full bg-[#e73136]"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Kontak;
