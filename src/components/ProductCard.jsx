import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaMinus, FaPlus, FaCartPlus } from "react-icons/fa";

export default function ProductCard({ product, isOpen, onClose, onAdd, theme }) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [product]);

  // Tutup dengan ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && isOpen && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!product) return null;

  const dec = () => setQty((n) => Math.max(1, n - 1));
  const inc = () => setQty((n) => Math.min((product.stock ?? 999), n + 1));
  const toRupiah = (v) => `Rp ${Number(v).toLocaleString("id-ID")}`;

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
                  src={product.image}
                  alt={product.title}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              {/* Detail */}
              <div className="p-6 md:p-8 flex flex-col">
                <h2 className="text-2xl font-bold">{product.title}</h2>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Stok tersedia: <span className="font-medium">{product.stock}</span>
                </div>

                <div className="mt-4 text-xl md:text-2xl font-extrabold text-[#8f2f31] dark:text-[#e73136]">
                  {toRupiah(product.price)}
                </div>

                <p className="mt-4 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.desc}
                </p>

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
                        const v = Math.max(1, Math.min(Number(e.target.value.replace(/\D/g, "") || "1"), product.stock ?? 999));
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
                    onClick={() => onAdd?.(product, qty)}
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
