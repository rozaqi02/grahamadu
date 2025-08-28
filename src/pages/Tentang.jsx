// src/pages/Tentang.jsx
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  FaCheckCircle,
  FaSeedling,
  FaLeaf,
  FaIndustry,
  FaBoxOpen,
  FaMedal,
  FaHandshake,
  FaWarehouse,
  FaMicroscope,
} from "react-icons/fa";

/* ====== Data dari dokumen (diringkas) ====== */
const VISI_MISI = {
  visi: "Menjadi pusat madu herbal berkualitas di Indonesia.",
  misi: [
    "Memberdayakan peternak lebah dari hulu ke hilir.",
    "Pemakaian sumber bahan baku berkualitas.",
    "Proses produksi menggunakan teknologi dengan menjaga enzim madu.",
  ],
};

const KEUNGGULAN = [
  "Quality control dipantau oleh ahlinya.",
  "Menggunakan bahan baku berkualitas terpilih.",
  "Formula homogen (madu + royal jelly + bee pollen + propolis) → Super Food.",
  "Proses menjaga enzim madu agar manfaatnya optimal.",
  "Kemasan menarik & layak sebagai souvenir.",
  "Nutrition Facts (Sucofindo) tersedia.",
  "Harga terjangkau dengan kualitas tinggi.",
];

const BAHAN_MANFAAT = [
  {
    title: "Madu",
    desc:
      "Sumber energi karbohidrat, rasa manis dari gula rantai pendek yang mudah diserap tubuh.",
  },
  {
    title: "Propolis",
    desc:
      "Sifat antibakteri, antivirus, antijamur, antiinflamasi — antibiotik alami pelindung kesehatan.",
  },
  {
    title: "Royal Jelly",
    desc:
      "Kaya protein, vitamin & asam amino; nutrisi ratu lebah untuk pertumbuhan & vitalitas.",
  },
  {
    title: "Bee Pollen",
    desc:
      "Pangan larva lebah; kaya mineral, vitamin, antioksidan—menunjang asupan gizi harian.",
  },
];

const MARKETING = [
  "2017–2018: Pameran hotel (Ubud, Royal Orchid, Atria) & event BPTP Balitbangtan, Bekraf.",
  "2018: Indonesia’s International Agribusiness Expo – JCC.",
  "Media: Jawa Pos / Radar Malang, brosur, kanal online.",
];

const MITRA = [
  "CV Kembang Joyo & Nur Suhakim (Malang).",
  "Penempatan koloni: Pasuruan, Jepara, Bondowoso (randu, karet, kaliandra).",
];

/* ===== CountUp angka smooth ===== */
function CountUp({ from = 0, to = 100, duration = 1.6, className = "" }) {
  const ref = useRef(null);
  const mv = useMotionValue(from);
  useEffect(() => {
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    const unsub = mv.on("change", (v) => {
      if (ref.current)
        ref.current.textContent = Math.round(v).toLocaleString("id-ID");
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [mv, to, duration]);
  return <span ref={ref} className={className} />;
}

/* ===== Helper Video dengan rasio 16:9 & overlay halus ===== */
function VideoCard({ src, title, theme, priority = false }) {
  return (
    <motion.div
      className={`group relative rounded-2xl overflow-hidden border ${
        theme === "dark" ? "border-white/10" : "border-black/10"
      } bg-black/5`}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
    >
      {/* ring highlight saat hover */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-[#e73136]/60 transition-all duration-300" />
      <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
        <video
          src={src}
          controls
          playsInline
          preload={priority ? "auto" : "metadata"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* glass shimmer tipis */}
        <span className="pointer-events-none absolute -left-16 top-0 h-full w-16 bg-white/20 dark:bg-white/10 skew-x-[-18deg] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div
        className={`px-4 py-3 text-sm ${
          theme === "dark" ? "text-white/90" : "text-gray-800"
        }`}
      >
        {title}
      </div>
    </motion.div>
  );
}

function Tentang({ theme }) {
  /* Progress bar di atas halaman (Efek utama) */
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const bg = isMounted
    ? {
        backgroundColor: theme === "dark" ? "#0f1420" : "#ffffff",
        transition: "background-color .3s ease",
      }
    : {};

  /* Reveal helpers */
  const sectionVariants = useMemo(
    () => ({
      hidden: { y: 28, opacity: 0 },
      show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    }),
    []
  );

  const hasVisi = !!VISI_MISI.visi?.trim();
  const hasMisi = Array.isArray(VISI_MISI.misi) && VISI_MISI.misi.length > 0;

  /* ===== Parallax ringan (transform-only, ramah mobile) ===== */
  const pSlow = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const pMid  = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const pFast = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const pX    = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const pRot  = useTransform(scrollYProgress, [0, 1], [0, 6]);

  return (
    <div
      className={`min-h-screen font-[Poppins] ${
        theme === "dark" ? "text-white" : "text-gray-800"
      } relative`}
      style={bg}
    >
      {/* progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-[#e73136]"
        style={{ width }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* soft particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                top: `${(i * 83) % 100}%`,
                left: `${(i * 37) % 100}%`,
                background:
                  theme === "dark"
                    ? "rgba(231,49,54,.55)"
                    : "rgba(143,47,49,.35)",
                filter: "blur(0.5px)",
              }}
              animate={{ y: [0, -16, 0], opacity: [0.25, 0.9, 0.25] }}
              transition={{
                duration: 6 + i * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.12,
              }}
            />
          ))}
        </div>

        {/* ===== 5 Parallax layers (ringan) ===== */}
        <motion.div
          style={{ y: pSlow }}
          className="will-change-transform absolute -left-16 top-10 w-40 h-40 rounded-full 
                     bg-gradient-to-br from-[#fcd34d] to-transparent opacity-40 dark:opacity-30 blur-2xl"
        />
        <motion.div
          style={{ y: pMid, x: pX }}
          className="will-change-transform absolute right-4 -top-10 w-48 h-48 rounded-[40%] 
                     bg-[#e73136]/10 dark:bg-[#e73136]/20 blur-2xl"
        />
        <motion.div
          style={{ y: pFast, rotate: pRot }}
          className="will-change-transform absolute right-32 top-20 w-24 h-24 rounded-full 
                     border-2 border-[#e73136]/30 dark:border-white/10"
        />
        <motion.div
          style={{ y: pMid }}
          className="will-change-transform absolute left-8 bottom-12 w-12 h-12 rounded-full 
                     bg-[#e73136]/15 blur-md"
        />
        <motion.div
          style={{ y: pSlow }}
          className="will-change-transform absolute right-24 bottom-24 w-20 h-20 rounded-full 
                     bg-yellow-300/10 dark:bg-yellow-200/10 blur-xl"
        />

        <div className="relative max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-[Montserrat] font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e73136] to-[#8f2f31]">
                Tentang NUTRI BUNGA
              </span>
            </h1>
            <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300">
              Brand madu di bawah <strong>CV Hexa Anugerah Bersinar</strong> —
              fokus pada kualitas, keaslian, dan kemitraan berkelanjutan.
            </p>

            {/* Glass badge shimmer — TERBACA di light & dark */}
            <div
              className={`mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md relative overflow-hidden
                ${
                  theme === "dark"
                    ? "text-white border-white/30 bg-white/10"
                    : "text-gray-800 border-black/10 bg-black/5"
                } 
                border text-xs md:text-sm`}
            >
              <span className="z-[1]">
                Legalitas: Merek • Halal • BPOM MD • Nutrition Facts (Sucofindo)
              </span>
              <span className="absolute -left-10 top-0 bottom-0 w-12 bg-white/50 skew-x-[-20deg] animate-pulse" />
            </div>
          </motion.div>

          {/* Stats count-up */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Lama Usaha", val: 10, suffix: " th" },
              { label: "Ragam Produk", val: 6, suffix: "+" },
              { label: "Area Pasokan", val: 4, suffix: " daerah" },
              { label: "Kota Utama", val: 4, suffix: " kota" },
            ].map((s) => (
              <motion.div
                key={s.label}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-[#0f1420]/70 backdrop-blur-md p-5 text-center shadow-sm"
                whileHover={{ y: -3 }}
              >
                <div className="text-3xl md:text-4xl font-extrabold text-[#e73136]">
                  <CountUp to={s.val} />{" "}
                  <span className="text-base md:text-lg font-semibold">
                    {s.suffix}
                  </span>
                </div>
                <div className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFIL & TIMELINE */}
      <motion.section
        className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-10 md:py-14"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 bg-white dark:bg-gray-900 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#8f2f31] dark:text-[#e73136]">
              Selayang Pandang
            </h2>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Kami mengolah hasil perlebahan (madu, royal jelly, propolis, bee
              pollen) menjadi formula homogen sebagai <em>super food</em>.
              Kualitas bahan baku, proses berteknologi, dan kemitraan peternak
              menjadi fondasi utama kami.
            </p>
          </div>

          {/* timeline grow on-scroll */}
          <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
            <motion.div
              className="absolute left-5 top-10 bottom-10 w-[3px] bg-gradient-to-b from-[#e73136] to-[#8f2f31] origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
            />
            <h3 className="text-lg md:text-xl font-bold mb-5">Perjalanan Singkat</h3>
            <div className="space-y-7 pl-10 text-sm">
              {[
                { t: "2007", d: "Awal usaha memasok bahan perlebahan & distribusi propolis." },
                { t: "2010", d: "Membentuk Graha Madu di Malang untuk pemasaran lanjutan." },
                { t: "2017", d: "Lahir merek NUTRI BUNGA; mulai produksi madu olahan sendiri." },
                { t: "2018", d: "Ikut pameran agribisnis nasional di JCC & berbagai hotel." },
                { t: "Kini",  d: "Ekspansi pasar ritel/apotek di berbagai kota." },
              ].map((it) => (
                <motion.div
                  key={it.t}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 w-3 h-3 rounded-full bg-[#e73136] shadow" />
                  <div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      {it.t}
                    </div>
                    <div>{it.d}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* VIDEO GALLERY (1 besar di atas, 2 di bawah) */}
      <motion.section
        className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pt-2 pb-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <h3 className="text-lg md:text-xl font-bold mb-4 text-[#8f2f31] dark:text-[#e73136]">
          Galeri Video
        </h3>

        {/* Atas: 1 video lebar */}
        <VideoCard
          theme={theme}
          src="/assets/images/video_bapak_madu.mov"
          title="Sekilas tentang madu"
          priority
        />

        {/* Bawah: 2 video berjarak, responsif (stack di mobile) */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <VideoCard
            theme={theme}
            src="/assets/images/video1.mov"
            title="Sekilas tentang madu"
          />
          <VideoCard
            theme={theme}
            src="/assets/images/video2.mov"
            title="Sekilas tentang madu"
          />
        </div>
      </motion.section>

      {/* VISI & MISI */}
      {(hasVisi || hasMisi) && (
        <motion.section
          className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {hasVisi && (
              <motion.div
                whileHover={{ y: -4, rotate: -0.2 }}
                className="p-7 md:p-8 rounded-3xl bg-[#fdecec] dark:bg-[#1a2230] border border-[#f3c5c6] dark:border-gray-800 shadow"
              >
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#8f2f31] dark:text-[#e73136]">
                  <FaSeedling /> Visi
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{VISI_MISI.visi}</p>
              </motion.div>
            )}

            {hasMisi && (
              <motion.div
                whileHover={{ y: -4, rotate: 0.2 }}
                className="p-7 md:p-8 rounded-3xl bg-[#fdecec] dark:bg-[#1a2230] border border-[#f3c5c6] dark:border-gray-800 shadow"
              >
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#8f2f31] dark:text-[#e73136]">
                  <FaLeaf /> Misi
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {VISI_MISI.misi.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* KEUNGGULAN */}
      <motion.section
        className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2 text-[#8f2f31] dark:text-[#e73136]">
          <FaMedal /> Keunggulan Kami
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {KEUNGGULAN.map((k, i) => (
            <motion.div
              key={k}
              className={`relative overflow-hidden rounded-xl p-5 ${
                theme === "dark" ? "bg-white/5" : "bg-gray-50"
              } ring-1 ${theme === "dark" ? "ring-white/10" : "ring-black/10"}`}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
            >
              <span className="absolute -left-2 -top-2 w-12 h-12 rounded-full bg-[#e73136]/20 blur-xl" />
              <div className="relative text-sm">{k}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* PRODUKSI & PENGEMASAN */}
      <motion.section
        className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-[#8f2f31] dark:text-[#e73136]">
              <FaIndustry /> Tempat Produksi
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Proses menggunakan teknologi dengan memperhatikan kestabilan enzim
              madu agar manfaatnya tetap terjaga.
            </p>
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-[#8f2f31] dark:text-[#e73136]">
              <FaBoxOpen /> Pengemasan
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Kemasan menarik & higienis, mendukung pariwisata dan layak sebagai
              buah tangan.
            </p>
          </div>
        </div>
      </motion.section>

      {/* BAHAN & MANFAAT */}
      <motion.section
        className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2 text-[#8f2f31] dark:text-[#e73136]">
          <FaMicroscope /> Bahan & Manfaat
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BAHAN_MANFAAT.map((b) => (
            <motion.div
              key={b.title}
              className="rounded-2xl p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              whileHover={{ y: -2 }}
            >
              <div className="text-sm font-semibold mb-1">{b.title}</div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* LEGALITAS */}
      <motion.section
        className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-center mb-7 text-[#8f2f31] dark:text-[#e73136]">
          Legalitas & Sertifikasi
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Merek Dagang",
            "Sertifikat Halal",
            "BPOM MD & Nutrition Facts (Sucofindo)",
          ].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm text-center"
            >
              <FaCheckCircle className="mx-auto text-green-500 text-4xl mb-3" />
              <div className="font-medium text-sm">{item}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* PASOKAN & PASAR */}
      <motion.section
        className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pb-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-[#8f2f31] dark:text-[#e73136]">
              <FaWarehouse /> Area Pasokan
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Riau", "Pati", "Pasuruan", "Malang"].map((x) => (
                <motion.span
                  key={x}
                  whileHover={{ y: -2 }}
                  className="px-3 py-1.5 rounded-full text-xs md:text-sm bg-[#fdecec] text-[#8f2f31] dark:bg-[#1a2230] dark:text-[#ffd2d3] border border-[#f3c5c6] dark:border-gray-700"
                >
                  {x}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-[#8f2f31] dark:text-[#e73136]">
              Pasar Utama
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Jakarta",
                "Yogyakarta",
                "Surabaya",
                "Malang Raya (apotik & ritel)",
              ].map((x) => (
                <motion.span
                  key={x}
                  whileHover={{ y: -2 }}
                  className="px-3 py-1.5 rounded-full text-xs md:text-sm bg-[#fdecec] text-[#8f2f31] dark:bg-[#1a2230] dark:text-[#ffd2d3] border border-[#f3c5c6] dark:border-gray-700"
                >
                  {x}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* MITRA & MARKETING */}
      <motion.section
        className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pb-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-[#8f2f31] dark:text-[#e73136]">
              <FaHandshake /> Mitra Peternak
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 dark:text-gray-300">
              {MITRA.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-[#8f2f31] dark:text-[#e73136]">
              Aktivitas Pemasaran & Pameran
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 dark:text-gray-300">
              {MARKETING.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Tentang;
