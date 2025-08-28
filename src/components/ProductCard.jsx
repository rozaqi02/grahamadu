import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaMinus, FaPlus, FaCartPlus } from "react-icons/fa";

export default function ProductCard({ product, isOpen, onClose, onAdd, theme }) {
  // ---------------- Utilities (bukan Hooks) ----------------
  const toRupiah = (v) => `Rp ${Number(v).toLocaleString("id-ID")}`;
  const normalize = (s) => String(s || "").toLowerCase().replace(/\s+/g, "");
const p = useMemo(() => {
  return product ?? { title: "", price: 0, image: "", stock: 0, desc: "", variants: [] };
}, [product]);
  const hasVariants = Array.isArray(p.variants) && p.variants.length > 0;

  // ---------------- Hooks (semua diletakkan DI ATAS, sebelum return apapun) ----------------
  const [qty, setQty] = useState(1);

  // Tentukan varian awal (jika ada)
  const initialVariantIndex = useMemo(() => {
    if (!hasVariants) return -1;

    // 1) Cocokkan harga
    const byPrice = p.variants.findIndex((v) => v.price === p.price);
    if (byPrice >= 0) return byPrice;

    // 2) Cocokkan label di judul "Base (Label)"
    const m = /\(([^)]+)\)\s*$/.exec(p.title || "");
    if (m) {
      const lab = normalize(m[1]);
      const byLabel = p.variants.findIndex((v) => normalize(v.label) === lab);
      if (byLabel >= 0) return byLabel;
    }
    // default varian pertama
    return 0;
  }, [hasVariants, p.price, p.title, p.variants]);

  const [selIdx, setSelIdx] = useState(initialVariantIndex);

  // Reset qty & varian ketika product berubah
  useEffect(() => {
    setQty(1);
    setSelIdx(initialVariantIndex);
  }, [p, initialVariantIndex]);

  // Tutup dengan ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && isOpen && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // ---------------- Derivatif UI ----------------
  const selectedVariant = hasVariants && selIdx >= 0 ? p.variants[selIdx] : null;
  const baseTitle = useMemo(() => (p.title || "").replace(/\s*\([^)]+\)\s*$/, ""), [p.title]);
  const displayPrice = selectedVariant?.price ?? p.price;

  const buildFinalId = () => {
    if (!hasVariants || !selectedVariant) return p.id;

    // Hapus sufiks varian lama bila ada, lalu tambahkan varian baru
    let baseId = p.id || normalize(baseTitle);
    for (const v of p.variants) {
      const suf = "-" + normalize(v.label);
      if ((baseId || "").endsWith(suf)) {
        baseId = baseId.slice(0, -suf.length);
        break;
      }
    }
    return `${baseId}-${normalize(selectedVariant.label)}`;
  };

  const dec = () => setQty((n) => Math.max(1, n - 1));
  const inc = () => setQty((n) => Math.min(p.stock ?? 999, n + 1));

  // ---------------- Early return DIPINDAH ke BAWAH (setelah hooks) ----------------
  if (!isOpen || !product) return null;

  // ---------------- Render ----------------
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay + blur */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-[61] w-[92vw] max-w-4xl rounded-2xl overflow-hidden
                       bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100
                       shadow-2xl border border-gray-200 dark:border-gray-800"
            initial={{ y: 30, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol X */}
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="absolute right-4 top-4 p-2 rounded-full bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800 transition"
              title="Tutup"
            >
              <FaTimes className="text-[#e73136]" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Gambar — TANPA PANGKAS */}
              <div className="bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-6 md:p-8">
                <img
                  src={p.image}
                  alt={baseTitle}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              {/* Detail */}
              <div className="p-6 md:p-8 flex flex-col">
                <h2 className="text-2xl font-bold">
                  {baseTitle}
                  {selectedVariant ? ` (${selectedVariant.label})` : ""}
                </h2>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Stok tersedia: <span className="font-medium">{p.stock}</span>
                </div>

                <div className="mt-4 text-xl md:text-2xl font-extrabold text-[#8f2f31] dark:text-[#e73136]">
                  {toRupiah(displayPrice)}
                </div>

                {/* Selector Varian (jika ada) */}
                {hasVariants && (
                  <div className="mt-4">
                    <label className="text-sm font-medium block mb-2">
                      Pilih ukuran/varian
                    </label>

                    {p.variants.length > 1 ? (
                      <div className="flex flex-wrap gap-2">
                        {p.variants.map((v, i) => {
                          const active = i === selIdx;
                          return (
                            <button
                              key={v.label}
                              onClick={() => setSelIdx(i)}
                              className={`px-3 py-1.5 rounded-full border text-sm transition
                                ${
                                  active
                                    ? "bg-[#e73136] text-white border-[#e73136]"
                                    : theme === "dark"
                                    ? "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-800/70"
                                    : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                                }`}
                              title={toRupiah(v.price)}
                            >
                              {v.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                        {p.variants[0].label}
                        <span className="opacity-70">•</span>
                        <span>{toRupiah(p.variants[0].price)}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Deskripsi */}
                {p.desc && (
                  <p className="mt-4 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {p.desc}
                  </p>
                )}

                {/* Qty + Add */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={dec}
                      aria-label="Kurangi"
                    >
                      <FaMinus />
                    </button>
                    <input
                      value={qty}
                      onChange={(e) => {
                        const v = Math.max(
                          1,
                          Math.min(
                            Number(e.target.value.replace(/\D/g, "") || "1"),
                            p.stock ?? 999
                          )
                        );
                        setQty(v);
                      }}
                      className="w-14 text-center bg-white dark:bg-gray-900 outline-none"
                    />
                    <button
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={inc}
                      aria-label="Tambah"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const finalId = buildFinalId();
                      const name =
                        hasVariants && selectedVariant
                          ? `${baseTitle} (${selectedVariant.label})`
                          : baseTitle;
                      const price = displayPrice;

                      onAdd?.(
                        {
                          id: finalId,
                          title: name,
                          name,
                          price,
                          image: p.image,
                          stock: p.stock,
                          desc: p.desc,
                        },
                        qty
                      );
                    }}
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-white bg-[#e73136] hover:bg-[#8f2f31] transition font-semibold"
                  >
                    <FaCartPlus /> Tambah ke Keranjang
                  </button>
                </div>

                {/* Info bisnis ringkas */}
                <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  <div><strong>Badan usaha:</strong> CV Hexa Anugerah Bersinar</div>
                  <div><strong>Legalitas:</strong> Merek, Halal, BPOM MD</div>
                  <div><strong>Pasokan bahan baku:</strong> Riau, Pati, Pasuruan, Malang</div>
                  <div><strong>Pasar:</strong> Jakarta, Yogyakarta, Surabaya, Malang Raya (apotik & ritel)</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
