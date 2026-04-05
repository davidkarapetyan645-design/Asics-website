"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { CartItem } from "./storefront-types";

type CartSheetProps = {
  isOpen: boolean;
  items: CartItem[];
  onCheckout: () => void;
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, nextQuantity: number) => void;
};

export function CartSheet({
  isOpen,
  items,
  onCheckout,
  onClose,
  onRemove,
  onUpdateQuantity,
}: CartSheetProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            aria-label="Close cart"
            className="fixed inset-0 z-40 bg-[#0b1020]/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            onClick={onClose}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col border-l border-[#ddd7ca] bg-[#fbfaf6] text-[#111318] shadow-[0_24px_80px_rgba(15,17,21,0.18)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <div className="flex items-center justify-between border-b border-[#e6e0d4] px-5 py-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f756d]">Cart</p>
                <h2 className="mt-1 font-display text-[1.6rem] font-semibold tracking-display">
                  Your order
                </h2>
              </div>
              <button
                className="rounded-full border border-[#dad3c6] px-4 py-2 text-sm font-medium text-[#24272d] transition hover:bg-[#f0ede6]"
                onClick={onClose}
                type="button"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {items.length === 0 ? (
                <div className="rounded-[28px] border border-dashed border-[#d7d1c3] bg-white px-5 py-10 text-center">
                  <p className="font-display text-[1.4rem] font-semibold tracking-display text-[#14171c]">
                    Cart is empty
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#676d67]">
                    Choose a size, add a pair, then checkout will be ready.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[28px] border border-[#e2dccf] bg-white p-4 shadow-[0_12px_30px_rgba(15,17,21,0.06)]"
                    >
                      <div className="flex gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt={item.name}
                          className="h-24 w-24 rounded-[22px] border border-[#ece6d9] bg-[#f5f2ea] object-contain p-2"
                          src={item.image}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-display text-[1.15rem] font-semibold tracking-display text-[#14171c]">
                                {item.name}
                              </p>
                              <p className="mt-1 text-sm text-[#676d67]">{item.colorName}</p>
                              <p className="mt-1 text-sm text-[#676d67]">Size {item.size}</p>
                            </div>
                            <button
                              className="text-sm font-medium text-[#8a4b4b] transition hover:text-[#6f3434]"
                              onClick={() => onRemove(item.id)}
                              type="button"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="flex items-center rounded-full border border-[#dad4c8] bg-[#faf8f2] p-1">
                              <button
                                className="flex h-8 w-8 items-center justify-center rounded-full text-base transition hover:bg-[#ece7dc]"
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                type="button"
                              >
                                -
                              </button>
                              <span className="min-w-10 text-center text-sm font-semibold text-[#14171c]">
                                {item.quantity}
                              </span>
                              <button
                                className="flex h-8 w-8 items-center justify-center rounded-full text-base transition hover:bg-[#ece7dc]"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                type="button"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-display text-[1.2rem] font-semibold tracking-display text-[#14171c]">
                              ${item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#e6e0d4] bg-white/90 px-5 py-5">
              <div className="flex items-center justify-between text-sm text-[#676d67]">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-[#676d67]">
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <div className="mt-4 flex items-center justify-between font-display text-[1.45rem] font-semibold tracking-display text-[#14171c]">
                <span>Total</span>
                <span>${subtotal}</span>
              </div>

              <button
                className="mt-5 w-full rounded-full bg-[#16191f] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#0f1115] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={items.length === 0}
                onClick={onCheckout}
                type="button"
              >
                Go to checkout
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
