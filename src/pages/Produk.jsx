import {
  motion,
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
} from "framer-motion";
import { useMemo, useState } from "react";
import {
  FaMinus,
  FaPlus,
  FaCartPlus,
  FaInfoCircle,
  FaSearch,
  FaThLarge,
  FaGripHorizontal,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function Produk({ theme }) {
  const { add } = useCart();

  /* ----------------- Data Produk (4 item, harga per varian) ----------------- */
  const produkList = useMemo(
    () => [
      {
        id: "madu-premium",
        title: "Madu Premium",
        image: "/assets/images/madu_premium.jpg",
        desc:
          "Madu murni pilihan dengan tekstur lebih kental dan rasa manis alami.",
        variants: [
          { label: "230 g", price: 70000 },
          { label: "600 g", price: 130000 },
          { label: "875 g", price: 170000 },
        ],
        priceMin: 70000,
        stock: 60,
      },
      {
        id: "madu-propolis",
        title: "Madu Propolis",
        image: "/assets/images/madu_propolis.jpg",
        desc:
          "Kombinasi madu + propolis untuk mendukung daya tahan tubuh.",
        variants: [
          { label: "230 g", price: 120000 },
          { label: "600 g", price: 225000 },
        ],
        priceMin: 120000,
        stock: 45,
      },
      {
        id: "madu-royal-jelly",
        title: "Madu Royal Jelly",
        image: "/assets/images/royal_jelly.jpg",
        desc:
          "Royal jelly bernutrisi tinggi (protein, vitamin, asam amino).",
        variants: [
          { label: "230 g", price: 110000 },
          { label: "600 g", price: 190000 },
        ],
        priceMin: 110000,
        stock: 35,
      },
      {
        id: "propolis-cakra-trombo",
        title: "Madu Propolis Cakra Trombo",
        image: "/assets/images/madu_propolis.jpg",
        desc:
          "Formula propolis khas Cakra Trombo untuk kebutuhan harian.",
        variants: [{ label: "150 ml", price: 135000 }],
        priceMin: 135000,
        stock: 30,
      },
    ],
    []
  );

  /* ----------------- State UI ----------------- */
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [view, setView] = useState("compact"); // default COMPACT
  const [qty, setQty] = useState({});
  const [variantSel, setVariantSel] = useState({}); // id -> index varian
  const [active, setActive] = useState(null);
  const [loaded, setLoaded] = useState({}); // skeleton → hide saat img onLoad

  const toRupiah = (v) => `Rp ${Number(v).toLocaleString("id-ID")}`;
  const setDefaultQty = (id) =>
    setQty((q) => (q[id] ? q : { ...q, [id]: 1 }));
  const inc = (id, max = 999) =>
    setQty((q) => ({ ...q, [id]: Math.min((q[id] || 1) + 1, max) }));
  const dec = (id) =>
    setQty((q) => ({ ...q, [id]: Math.max((q[id] || 1) - 1, 1) }));

  const selectedVariant = (p) =>
    p.variants[variantSel[p.id] ?? 0] || p.variants[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = produkList.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
    );
    if (sortBy === "price-asc")
      arr = [...arr].sort((a, b) => a.priceMin - b.priceMin);
    if (sortBy === "price-desc")
      arr = [...arr].sort((a, b) => b.priceMin - a.priceMin);
    return arr;
  }, [produkList, query, sortBy]);

  // rasio aman: grid = 4/3 (landscape), compact = 3/4 (portrait botol)
  const imgAspect = view === "grid" ? "4 / 3" : "3 / 4";

  const onImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'>
           <defs>
             <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
               <stop stop-color='#f2f2f2' offset='0'/>
               <stop stop-color='#e8e8e8' offset='1'/>
             </linearGradient>
           </defs>
           <rect width='100%' height='100%' fill='url(#g)'/>
           <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                 font-family='Arial, sans-serif' font-size='28' fill='#9ca3af'>
             Gambar tidak tersedia
           </text>
         </svg>`
      );
  };

  /* --------- Variants anim --------- */
  const itemEnter = { opacity: 0, y: 18, scale: 0.98 };
  const itemShow = {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  };
  const itemExit = { opacity: 0, y: -10, transition: { duration: 0.18 } };

  return (
    <MotionConfig
      transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.6 }}
    >
      {/* shimmer skeleton (efek UX #1) */}
      <style>{`
        .shimmer::after{
          content:""; position:absolute; inset:0; 
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
          transform: translateX(-100%); animation: sh 1.2s infinite;
        }
        @keyframes sh{to{transform: translateX(100%)}}
      `}</style>

      <div
        className={`min-h-screen font-[Poppins] ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
        style={{
          backgroundColor: theme === "dark" ? "#0f1420" : "#ffffff",
          transition: "background-color .3s ease",
        }}
      >
        {/* ---------- Header ---------- */}
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pt-20 md:pt-24">
          <h1 className="text-4xl md:text-5xl font-[Montserrat] font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e73136] to-[#8f2f31]">
              Produk NUTRI BUNGA
            </span>
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
            Pilih <strong>ukuran/varian</strong> sebelum menambah ke keranjang.
          </p>
        </div>

        {/* ---------- Toolbar (sticky) ---------- */}
        <div className="sticky top-16 z-30 mt-5 border-y border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-[#0f1420]/70 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <label className="relative flex items-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 shadow-sm w-full md:w-[360px]">
              <FaSearch className="mr-2 opacity-70" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari produk..."
                className="bg-transparent outline-none w-full text-sm"
              />
            </label>

            <div className="flex items-center gap-3 flex-wrap">
              <motion.select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm shadow-sm"
                whileTap={{ scale: 0.98 }}
              >
                <option value="popular">Paling relevan</option>
                <option value="price-asc">Harga: termurah</option>
                <option value="price-desc">Harga: termahal</option>
              </motion.select>

              {/* SEGMENTED CONTROL */}
              <div className="flex items-center gap-1 rounded-lg border border-gray-300 dark:border-gray-700 p-1">
                <div className="relative flex">
                  <motion.div
                    layout
                    layoutId="view-pill"
                    className="absolute h-8 rounded-md bg-[#e73136] -z-10"
                    style={{
                      width: 40, // selalu pas dengan w-10
                      left: view === "grid" ? 2 : 42, // geser sesuai posisi tombol
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                  <motion.button
                    className={`w-10 h-8 grid place-items-center rounded-md ${
                      view === "grid"
                        ? "text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setView("grid")}
                    title="Grid"
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaThLarge />
                  </motion.button>
                  <motion.button
                    className={`w-10 h-8 grid place-items-center rounded-md ${
                      view === "compact"
                        ? "text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setView("compact")}
                    title="Compact"
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGripHorizontal />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Grid Produk ---------- */}
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-10">
          <LayoutGroup>
            <motion.div
              key={view + sortBy + query}
              layout
              className={
                view === "grid"
                  ? "grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                  : "grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
              }
              transition={{ layout: { duration: 0.35 } }}
            >
              <AnimatePresence>
                {filtered.map((p) => {
                  const v = selectedVariant(p);
                  const uniqueId =
                    p.id + "-" + v.label.toLowerCase().replace(/\s+/g, "");
                  return (
                    <motion.article
                      key={p.id}
                      layout
                      initial={itemEnter}
                      animate={itemShow}
                      exit={itemExit}
                      className={`group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition overflow-hidden ${
                        view === "compact" ? "grid grid-cols-[160px_1fr]" : ""
                      }`}
                      onMouseEnter={() => setDefaultQty(p.id)}
                      style={{ transformOrigin: "center" }}
                    >
                      {/* ===== Gambar ===== */}
                      <button
                        type="button"
                        onClick={() =>
                          setActive({
                            ...p,
                            id: uniqueId,
                            title: `${p.title} (${v.label})`,
                            price: v.price,
                          })
                        }
                        className="relative block"
                        aria-label={`Lihat ${p.title}`}
                      >
                        <motion.div
                          layoutId={`img-wrap-${p.id}-${view}`}
                          className={`relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800 ${
                            !loaded[p.id] ? "shimmer" : ""
                          }`}
                          style={{ aspectRatio: imgAspect }}
                          whileHover={{ scale: 1.003 }}
                        >
                          {!loaded[p.id] && <div className="absolute inset-0" />}
                          <img
                            src={p.image}
                            alt={p.title}
                            loading="lazy"
                            onLoad={() =>
                              setLoaded((s) => ({ ...s, [p.id]: true }))
                            }
                            onError={onImgError}
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03] rounded-t-2xl"
                          />
                          <div className="pointer-events-none absolute right-3 top-3">
                            <span className="px-2 py-1 text-[10px] rounded-full bg-black/60 text-white tracking-wide">
                              Stok {p.stock}
                            </span>
                          </div>
                        </motion.div>
                      </button>

                      {/* ===== Body ===== */}
                      <div className="p-4 flex flex-col">
                        <h3 className="font-semibold text-base line-clamp-1">
                          {p.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[36px]">
                          {p.desc}
                        </p>

                        {/* Selector varian */}
                        <div className="mt-3 flex items-center gap-2">
                          <label className="text-xs opacity-70">Ukuran:</label>
                          <select
                            value={variantSel[p.id] ?? 0}
                            onChange={(e) =>
                              setVariantSel((s) => ({
                                ...s,
                                [p.id]: Number(e.target.value),
                              }))
                            }
                            className="text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1"
                          >
                            {p.variants.map((op, idx) => (
                              <option key={op.label} value={idx}>
                                {op.label} — {toRupiah(op.price)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-lg font-bold">
                            {toRupiah(v.price)}
                          </div>
                          <motion.button
                            type="button"
                            onClick={() =>
                              setActive({
                                ...p,
                                id: uniqueId,
                                title: `${p.title} (${v.label})`,
                                price: v.price,
                              })
                            }
                            className="inline-flex items-center gap-1 text-[#e73136] hover:text-[#8f2f31] text-sm font-medium"
                            title="Lihat detail"
                            whileTap={{ scale: 0.96 }}
                          >
                            <FaInfoCircle /> Info
                          </motion.button>
                        </div>

                        {/* Qty + Keranjang */}
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                            <motion.button
                              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                              onClick={() => dec(p.id)}
                              type="button"
                              aria-label="Kurangi"
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaMinus />
                            </motion.button>
                            <input
                              className="w-12 text-center bg-white dark:bg-gray-900 outline-none"
                              value={qty[p.id] ?? 1}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                setQty((q) => ({
                                  ...q,
                                  [p.id]: Math.max(
                                    1,
                                    Math.min(Number(val || "1"), p.stock ?? 999)
                                  ),
                                }));
                              }}
                            />
                            <motion.button
                              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                              onClick={() => inc(p.id, p.stock ?? 999)}
                              type="button"
                              aria-label="Tambah"
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaPlus />
                            </motion.button>
                          </div>

                          <motion.button
                            type="button"
                            onClick={() =>
                              add(
                                {
                                  id: uniqueId,
                                  name: `${p.title} (${v.label})`,
                                  price: v.price,
                                  image: p.image,
                                  stock: p.stock,
                                },
                                qty[p.id] ?? 1
                              )
                            }
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-white bg-[#e73136] hover:bg-[#8f2f31] transition"
                            title="Tambah ke Keranjang"
                            whileTap={{ scale: 0.97 }}
                          >
                            <FaCartPlus /> Keranjang
                          </motion.button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>

        {/* ---------- Quick View (bawa varian terpilih sebagai produk tunggal) ---------- */}
        <ProductCard
          theme={theme}
          product={active}
          isOpen={!!active}
          onClose={() => setActive(null)}
          onAdd={(prod, q) => {
            // pastikan nama & harga sesuai yang tampil di Quick View
            add(
              {
                id: prod.id,
                name: prod.title,
                price: prod.price,
                image: prod.image,
                stock: prod.stock,
              },
              q
            );
          }}
        />
      </div>
    </MotionConfig>
  );
}

export default Produk;
