import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {id, name, price, qty, image, stock}
  const [isOpen, setOpen] = useState(false);

  const add = (product, qty = 1) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      const inc = Math.max(1, Math.min(qty, 999));
      if (exists) {
        const next = prev.map((p) =>
          p.id === product.id
            ? { ...p, qty: Math.min((p.qty || 0) + inc, product.stock ?? 999) }
            : p
        );
        return next;
      }
      return [...prev, { ...product, qty: Math.min(inc, product.stock ?? 999) }];
    });
  };

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, qty: Math.max(1, Math.min(qty, p.stock ?? 999)) }
          : p
      )
    );
  };

  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((s, it) => s + (Number(it.price) || 0) * it.qty, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, add, updateQty, remove, clear, total, count, isOpen, setOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
