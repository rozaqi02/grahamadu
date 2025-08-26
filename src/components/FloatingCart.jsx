import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaTimes, FaTrash, FaMinus, FaPlus } from "react-icons/fa";

const WA_NUMBER = "6281334426377"; // 081 3344 26 377

export default function FloatingCart() {
  const { items, total, updateQty, remove, setOpen, isOpen } = useCart();
  const [qtyDraft, setQtyDraft] = useState({});

  const toRupiah = (v) => `Rp ${Number(v).toLocaleString("id-ID")}`;

  const onChangeQty = (id, raw) => {
    if (raw === "" || /^[0-9]{0,3}$/.test(raw)) {
      setQtyDraft((d) => ({ ...d, [id]: raw }));
    }
  };
  const commitQty = (id) => {
    setQtyDraft((d) => {
      const raw = d[id];
      let n = parseInt(raw ?? "", 10);
      if (isNaN(n) || n < 1) n = 1;
      if (n > 999) n = 999;
      updateQty(id, n);
      const { [id]: _, ...rest } = d;
      return rest;
    });
  };
  const step = (id, dir = 1) => {
    const current =
      Object.prototype.hasOwnProperty.call(qtyDraft, id)
        ? parseInt(qtyDraft[id] || "0", 10) || 0
        : (items.find((x) => x.id === id)?.qty || 1);
    let next = current + dir;
    if (next < 1) next = 1;
    if (next > 999) next = 999;
    updateQty(id, next);
  };

  const buildWaText = () => {
    const lines = [
      "*Halo NUTRI BUNGA,* saya ingin memesan:",
      ...items.map(
        (it) =>
          `- ${it.name} x${it.qty} @ ${toRupiah(it.price)} = ${toRupiah(
            (Number(it.price) || 0) * it.qty
          )}`
      ),
      `\n*Total: ${toRupiah(total)}*`,
      "\nMohon informasi ketersediaan & pengiriman. Terima kasih.",
    ];
    return lines.join("\n");
  };

  const handleCheckout = () => {
    if (!items.length) return;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildWaText())}`;
    window.open(url, "_blank");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="relative ml-auto h-full w-full max-w-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-2xl flex flex-col rounded-l-xl transition-colors duration-300"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Keranjang</h3>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                aria-label="Tutup"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                title="Tutup"
              >
                <FaTimes className="text-[#e73136] text-lg" />
              </motion.button>
            </div>

            {/* Content */}
            <div
              className="flex-1 overflow-y-auto px-5 py-4 space-y-4
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
                dark:[&::-webkit-scrollbar-track]:bg-gray-900"
            >
              {!items.length && (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-10">
                  Belum ada item di keranjang.
                </div>
              )}

              {items.map((it) => {
                const displayVal = Object.prototype.hasOwnProperty.call(qtyDraft, it.id)
                  ? qtyDraft[it.id]
                  : String(it.qty);

                return (
                  <motion.div
                    key={it.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {it.image && (
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{it.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Stok: {it.stock ?? "-"}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {toRupiah(it.price)}
                      </div>

                      {/* Stepper quantity (+ / -) */}
                      <div className="mt-2 flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => step(it.id, -1)}
                          className="px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                          title="Kurangi"
                          aria-label="Kurangi"
                        >
                          <FaMinus />
                        </motion.button>

                        <input
                          type="text"
                          inputMode="numeric"
                          value={displayVal}
                          onChange={(e) => onChangeQty(it.id, e.target.value)}
                          onBlur={() => commitQty(it.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                          }}
                          className="w-16 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#e73136] outline-none text-center"
                        />

                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => step(it.id, +1)}
                          className="px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                          title="Tambah"
                          aria-label="Tambah"
                        >
                          <FaPlus />
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.92 }}
                          onClick={() => remove(it.id)}
                          aria-label="Hapus item"
                          className="ml-2 p-2 rounded-md bg-[#e73136] hover:bg-[#8f2f31] text-white"
                          title="Hapus"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="text-lg font-bold text-[#8f2f31] dark:text-[#e73136]">
                  {toRupiah(total)}
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={!items.length}
                onClick={handleCheckout}
                className="w-full rounded-full px-5 py-3 text-white font-semibold bg-[#e73136] hover:bg-[#8f2f31] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Checkout via WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
