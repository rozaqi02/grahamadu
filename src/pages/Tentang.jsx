import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaSeedling, FaLeaf } from "react-icons/fa";

/* ====== Sumber Visi & Misi (dari dokumen) ====== */
const VISI_MISI = {
  visi: "Menjadi pusat madu herbal berkualitas di Indonesia.",
  misi: [
    "Memberdayakan peternak lebah dari hulu ke hilir.",
    "Pemakaian sumber bahan baku berkualitas.",
    "Proses produksi menggunakan teknologi."
  ],
};

/* CountUp angka yang smooth */
function CountUp({ from = 0, to = 100, duration = 1.6, className = "" }) {
  const ref = useRef(null);
  const mv = useMotionValue(from);
  useEffect(() => {
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    const unsub = mv.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString("id-ID");
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [mv, to, duration]);
  return <span ref={ref} className={className} />;
}

function Tentang({ theme }) {
  /* Progress bar di atas halaman */
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
  const sectionVariants = {
    hidden: { y: 28, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const hasVisi = !!VISI_MISI.visi?.trim();
  const hasMisi = Array.isArray(VISI_MISI.misi) && VISI_MISI.misi.length > 0;

  return (
    <div className={`min-h-screen font-[Poppins] ${theme === "dark" ? "text-white" : "text-gray-800"} relative`} style={bg}>
      {/* Efek #1: scroll progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-[#e73136]" style={{ width }} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Efek #2: soft particles */}
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
              animate={{ y: [0, -16, 0], opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 6 + i * 0.25, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-[Montserrat] font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e73136] to-[#8f2f31]">
                Tentang NUTRI BUNGA
              </span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300">
              Brand madu di bawah <strong>CV Hexa Anugerah Bersinar</strong> — fokus pada kualitas, keaslian, dan kemitraan berkelanjutan.
            </p>

            {/* Efek #3: glass badge shimmer */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/20 dark:bg-white/10 backdrop-blur-md text-sm text-white relative overflow-hidden">
              <span className="z-[1]">Legalitas: Merek • Halal • BPOM MD</span>
              <span className="absolute -left-10 top-0 bottom-0 w-12 bg-white/50 skew-x-[-20deg] animate-pulse" />
            </div>
          </motion.div>

          {/* Efek #4: stats count-up */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  <CountUp to={s.val} /> <span className="text-base md:text-lg font-semibold">{s.suffix}</span>
                </div>
                <div className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFIL */}
      <motion.section
        className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-14"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 bg-white dark:bg-gray-900 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 text-[#8f2f31] dark:text-[#e73136]">Profil Perusahaan</h2>
            <ul className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <li><strong>Badan Usaha:</strong> CV Hexa Anugerah Bersinar</li>
              <li><strong>Lama Usaha:</strong> ± 10 tahun</li>
              <li><strong>Legalitas:</strong> Merek, Sertifikat Halal, BPOM MD</li>
              <li>
                <strong>Produk:</strong> Madu Murni, Madu Premium, Madu Klanceng, Madu Royal Jelly, Madu Propolis, Madu Bawang Lanang/Tunggal
              </li>
              <li><strong>Pasar:</strong> Jakarta, Yogyakarta, Surabaya, Malang Raya (apotik & ritel)</li>
              <li><strong>Suplier:</strong> Riau, Pati, Pasuruan, Malang</li>
            </ul>
          </div>

          {/* Efek #5: timeline dengan line animasi */}
          <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
            <motion.div
              className="absolute left-5 top-10 bottom-10 w-[3px] bg-gradient-to-b from-[#e73136] to-[#8f2f31] origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
            />
            <h3 className="text-xl md:text-2xl font-bold mb-6">Perjalanan Singkat</h3>
            <div className="space-y-8 pl-10">
              {[
                { t: "2014", d: "Mulai bermitra dengan peternak lokal." },
                { t: "2017", d: "Memperluas pasokan: Riau & Pati." },
                { t: "2020", d: "Legalitas Halal & BPOM MD lengkap." },
                { t: "2024+", d: "Distribusi ritel/apotek di Malang Raya & ekspansi kota besar." },
              ].map((it) => (
                <motion.div key={it.t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 w-3 h-3 rounded-full bg-[#e73136] shadow" />
                    <div>
                      <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">{it.t}</div>
                      <div className="text-base">{it.d}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* VISI & MISI (auto-hide jika tidak ada data) */}
      {(hasVisi || hasMisi) && (
        <motion.section
          className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Visi */}
            {hasVisi && (
              <motion.div
                whileHover={{ y: -4, rotate: -0.2 }}
                className="p-8 rounded-3xl bg-[#fdecec] dark:bg-[#1a2230] border border-[#f3c5c6] dark:border-gray-800 shadow"
              >
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 text-[#8f2f31] dark:text-[#e73136]">
                  <FaSeedling /> Visi
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {VISI_MISI.visi}
                </p>
              </motion.div>
            )}

            {/* Misi */}
            {hasMisi && (
              <motion.div
                whileHover={{ y: -4, rotate: 0.2 }}
                className="p-8 rounded-3xl bg-[#fdecec] dark:bg-[#1a2230] border border-[#f3c5c6] dark:border-gray-800 shadow"
              >
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 text-[#8f2f31] dark:text-[#e73136]">
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

      {/* LEGALITAS */}
      <motion.section
        className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-14"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#8f2f31] dark:text-[#e73136]">
          Legalitas & Sertifikasi
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Merek Dagang", "Sertifikat Halal", "BPOM MD"].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm text-center"
            >
              <FaCheckCircle className="mx-auto text-green-500 text-4xl mb-3" />
              <div className="font-medium">{item}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* PASOKAN & PASAR */}
      <motion.section
        className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pb-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="text-xl font-bold mb-4 text-[#8f2f31] dark:text-[#e73136]">Area Pasokan</h3>
            <div className="flex flex-wrap gap-2">
              {["Riau", "Pati", "Pasuruan", "Malang"].map((x) => (
                <motion.span
                  key={x}
                  whileHover={{ y: -2 }}
                  className="px-3 py-1.5 rounded-full text-sm bg-[#fdecec] text-[#8f2f31] dark:bg-[#1a2230] dark:text-[#ffd2d3] border border-[#f3c5c6] dark:border-gray-700"
                >
                  {x}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="text-xl font-bold mb-4 text-[#8f2f31] dark:text-[#e73136]">Pasar Utama</h3>
            <div className="flex flex-wrap gap-2">
              {["Jakarta", "Yogyakarta", "Surabaya", "Malang Raya (apotik & ritel)"].map((x) => (
                <motion.span
                  key={x}
                  whileHover={{ y: -2 }}
                  className="px-3 py-1.5 rounded-full text-sm bg-[#fdecec] text-[#8f2f31] dark:bg-[#1a2230] dark:text-[#ffd2d3] border border-[#f3c5c6] dark:border-gray-700"
                >
                  {x}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Tentang;
