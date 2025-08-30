import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaQuestionCircle, FaChevronDown, FaSearch, FaArrowUp } from "react-icons/fa";

/* highlight kata kunci di jawaban / pertanyaan */
function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")})`, "ig");
  const parts = String(text).split(re);
  return parts.map((p, i) =>
    re.test(p) ? (
      <mark key={i} className="bg-[#fdecec] text-[#8f2f31] dark:bg-[#2a2f3a] dark:text-[#ffd2d3] rounded px-0.5">
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

function FAQ({ theme }) {
  /* Efek #1: progress scale judul saat scroll */
  const { scrollYProgress } = useScroll();
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -8]);

  /* Efek #2: pointer glow mengikuti mouse (halus) */
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  /* Data */
  const data = useMemo(
    () => [
      {
        q: "Apa itu NUTRI BUNGA?",
        a: "NUTRI BUNGA adalah brand madu dari badan usaha CV Hexa Anugerah Bersinar. Kami menyediakan rangkaian produk madu berkualitas untuk kebutuhan harian maupun kesehatan.",
      },
      {
        q: "Legalitas dan sertifikasi apa yang dimiliki?",
        a: "Produk NUTRI BUNGA memiliki legalitas resmi: Merek, Sertifikat Halal, dan izin BPOM MD.",
      },
      { q: "Sudah berapa lama usaha ini berjalan?", a: "Kami telah beroperasi lebih dari 10 tahun (≈ 10 th) dalam industri madu." },
      {
        q: "Produk apa saja yang tersedia?",
        a: "Madu Murni, Madu Premium, Madu Klanceng, Madu Royal Jelly, Madu Propolis, dan Madu Bawang Lanang/Tunggal.",
      },
      {
        q: "Pasar pemasaran NUTRI BUNGA di mana saja?",
        a: "Kami melayani Jakarta, Yogyakarta, Surabaya, serta Malang Raya (apotik & ritel).",
      },
      { q: "Bahan baku didapat dari mana?", a: "Sumber bahan baku utama kami berasal dari Riau, Pati, Pasuruan, dan Malang melalui kemitraan peternak lebah." },
      {
        q: "Bagaimana cara pemesanan?",
        a: "Tambahkan produk ke keranjang dan Checkout via WhatsApp di situs ini. Anda juga bisa menghubungi kami langsung melalui nomor yang tertera.",
      },
    ],
    []
  );

  /* State */
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState([]);
  const containerRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((x) => !q || x.q.toLowerCase().includes(q) || x.a.toLowerCase().includes(q));
  }, [data, query]);

  const toggle = (i) => setOpen((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  const openAll = () => setOpen(filtered.map((_, i) => i));
  const closeAll = () => setOpen([]);

  return (
    <div
      className={`min-h-screen font-[Poppins] ${theme === "dark" ? "text-white" : "text-gray-800"} relative pt-20`}
      style={{ backgroundColor: theme === "dark" ? "#0f1420" : "#ffffff", transition: "background-color .3s" }}
      ref={containerRef}
    >
      {/* Efek #2: mouse glow */}
      <motion.div
        className="pointer-events-none fixed w-80 h-80 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mouse.x,
          top: mouse.y,
          background: theme === "dark" ? "radial-gradient(closest-side, rgba(231,49,54,.18), transparent 65%)" : "radial-gradient(closest-side, rgba(143,47,49,.12), transparent 65%)",
          filter: "blur(30px)",
          zIndex: 0,
        }}
      />

      {/* HERO */}
      <div className="relative z-[1] max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
        <motion.h1
          className="pt-6 md:pt-10 text-4xl md:text-5xl font-[Montserrat] font-extrabold text-center"
          style={{ scale: titleScale, y: titleY }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e73136] to-[#8f2f31]">Pertanyaan Yang Sering Diajukan</span>
        </motion.h1>

        {/* Toolbar: search + actions */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-center gap-3 z-[1]">
          <label className="relative flex items-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 shadow-sm w-full md:w-[520px]">
            <FaSearch className="mr-2 opacity-70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari pertanyaan…"
              className="bg-transparent outline-none w-full text-sm"
            />
          </label>
          <div className="flex items-center justify-center gap-2">
            <button onClick={openAll} className="px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
              Buka semua
            </button>
            <button onClick={closeAll} className="px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
              Tutup semua
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <section className="relative z-[1] max-w-4xl mx-auto px-5 md:px-6 lg:px-8 py-12">
        <AnimatePresence initial={false}>
          {filtered.map((faq, i) => {
            const active = open.includes(i);
            return (
              <motion.article
                key={faq.q}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className={`mb-4 rounded-2xl border ${active ? "border-transparent" : "border-gray-200 dark:border-gray-700"} bg-white dark:bg-[#141a26] shadow-sm overflow-hidden`}
              >
                {/* Efek #3: header hover + icon rotate + outline brand */}
                <button
                  className={`w-full text-left px-5 py-4 flex items-center justify-between gap-3 transition-colors ${active ? "bg-gradient-to-r from-[#8f2f31] to-[#e73136] text-white" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                  onClick={() => toggle(i)}
                  aria-expanded={active}
                >
                  <div className="flex items-center gap-2 text-sm md:text-base font-semibold">
                    <FaQuestionCircle className={`${active ? "text-white" : "text-[#e73136]"}`} />
                    <span>{highlight(faq.q, query)}</span>
                  </div>
                  <motion.span
                    initial={false}
                    animate={{ rotate: active ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-1 rounded-full ${active ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"}`}
                    aria-hidden
                  >
                    <FaChevronDown />
                  </motion.span>
                </button>

                {/* Efek #4: isi dengan animasi height/opacity */}
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-4"
                    >
                      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        {highlight(faq.a, query)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </AnimatePresence>

        {/* Efek #5: tombol back-to-top muncul saat scroll */}
        <BackToTop theme={theme} containerRef={containerRef} />
      </section>
    </div>
  );
}

/* Tombol kembali ke atas dengan fade/slide */
function BackToTop({ theme, containerRef }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-[#e73136] hover:text-white hover:bg-[#e73136]"
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default FAQ;
