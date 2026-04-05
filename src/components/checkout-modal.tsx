"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { CartItem, PaymentBrand } from "./storefront-types";

type CheckoutModalProps = {
  isOpen: boolean;
  items: CartItem[];
  onBackToCart: () => void;
  onClose: () => void;
  onOrderComplete: () => void;
};

const paymentBrands: PaymentBrand[] = ["Visa", "Mastercard", "Amex", "Mada"];

export function CheckoutModal({
  isOpen,
  items,
  onBackToCart,
  onClose,
  onOrderComplete,
}: CheckoutModalProps) {
  const [brand, setBrand] = useState<PaymentBrand>("Visa");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [success, setSuccess] = useState(false);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const isReady =
    customerName.trim().length > 2 &&
    email.includes("@") &&
    cardNumber.replace(/\s/g, "").length >= 12 &&
    expiry.trim().length === 5 &&
    cvv.trim().length >= 3;

  const handleCardNumberChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();

    setCardNumber(formatted);
  };

  const handleExpiryChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) {
      setExpiry(digits);
      return;
    }

    setExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
  };

  const handleCvvChange = (value: string) => {
    setCvv(value.replace(/\D/g, "").slice(0, 4));
  };

  const handlePay = () => {
    if (!isReady) {
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onOrderComplete();
      onClose();
      setSuccess(false);
      setCustomerName("");
      setEmail("");
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setBrand("Visa");
    }, 1400);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            aria-label="Close checkout"
            className="fixed inset-0 z-[60] bg-[#0b1020]/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            onClick={onClose}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
          />

          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center p-3 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-[760px] overflow-hidden rounded-[34px] border border-[#ddd7ca] bg-[#fbfaf6] text-[#111318] shadow-[0_30px_120px_rgba(15,17,21,0.22)]"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="border-b border-[#e6e0d4] p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f756d]">
                        Checkout
                      </p>
                      <h2 className="mt-1 font-display text-[1.8rem] font-semibold tracking-display">
                        Payment details
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-full border border-[#dad3c6] px-4 py-2 text-sm font-medium text-[#24272d] transition hover:bg-[#f0ede6]"
                        onClick={onBackToCart}
                        type="button"
                      >
                        Cart
                      </button>
                      <button
                        className="rounded-full border border-[#dad3c6] px-4 py-2 text-sm font-medium text-[#24272d] transition hover:bg-[#f0ede6]"
                        onClick={onClose}
                        type="button"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  {success ? (
                    <div className="mt-8 rounded-[28px] border border-[#d8d1c4] bg-white px-6 py-10 text-center">
                      <p className="font-display text-[2rem] font-semibold tracking-display text-[#12151a]">
                        Payment complete
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#676d67]">
                        Your order has been placed. A confirmation email is on the way.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mt-6">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f756d]">
                          Card type
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {paymentBrands.map((item) => (
                            <button
                              key={item}
                              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                brand === item
                                  ? "border-[#111318] bg-[#111318] text-white"
                                  : "border-[#dad3c6] bg-white text-[#24272d] hover:bg-[#f4f0e7]"
                              }`}
                              onClick={() => setBrand(item)}
                              type="button"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2">
                          <span className="text-sm font-medium text-[#24272d]">Full name</span>
                          <input
                            autoComplete="cc-name"
                            className="w-full rounded-[18px] border border-[#d8d1c4] bg-white px-4 py-3 text-sm text-[#12151a] outline-none transition focus:border-[#111318]"
                            onChange={(event) => setCustomerName(event.target.value)}
                            placeholder="Name on card"
                            value={customerName}
                          />
                        </label>
                        <label className="space-y-2">
                          <span className="text-sm font-medium text-[#24272d]">Email</span>
                          <input
                            autoComplete="email"
                            className="w-full rounded-[18px] border border-[#d8d1c4] bg-white px-4 py-3 text-sm text-[#12151a] outline-none transition focus:border-[#111318]"
                            type="email"
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="name@email.com"
                            value={email}
                          />
                        </label>
                        <label className="space-y-2 sm:col-span-2">
                          <span className="text-sm font-medium text-[#24272d]">Card number</span>
                          <input
                            autoComplete="cc-number"
                            className="w-full rounded-[18px] border border-[#d8d1c4] bg-white px-4 py-3 text-sm text-[#12151a] outline-none transition focus:border-[#111318]"
                            inputMode="numeric"
                            onChange={(event) => handleCardNumberChange(event.target.value)}
                            placeholder={`${brand} card number`}
                            value={cardNumber}
                          />
                        </label>
                        <label className="space-y-2">
                          <span className="text-sm font-medium text-[#24272d]">Expiry</span>
                          <input
                            autoComplete="cc-exp"
                            className="w-full rounded-[18px] border border-[#d8d1c4] bg-white px-4 py-3 text-sm text-[#12151a] outline-none transition focus:border-[#111318]"
                            inputMode="numeric"
                            onChange={(event) => handleExpiryChange(event.target.value)}
                            placeholder="MM/YY"
                            value={expiry}
                          />
                        </label>
                        <label className="space-y-2">
                          <span className="text-sm font-medium text-[#24272d]">CVV</span>
                          <input
                            autoComplete="cc-csc"
                            className="w-full rounded-[18px] border border-[#d8d1c4] bg-white px-4 py-3 text-sm text-[#12151a] outline-none transition focus:border-[#111318]"
                            inputMode="numeric"
                            onChange={(event) => handleCvvChange(event.target.value)}
                            placeholder="3-4 digits"
                            value={cvv}
                          />
                        </label>
                      </div>

                      <button
                        className="mt-6 w-full rounded-full bg-[#16191f] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#0f1115] disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!isReady}
                        onClick={handlePay}
                        type="button"
                      >
                        Pay ${total}
                      </button>

                      <p className="mt-4 text-xs leading-6 text-[#7a817a]">
                        Choose your card type first, then enter the payment details for that card.
                      </p>
                    </>
                  )}
                </div>

                <div className="bg-[#f5f2ea] p-5 sm:p-6 lg:p-8">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f756d]">
                    Order summary
                  </p>
                  <div className="mt-4 space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="rounded-[22px] border border-[#ddd7ca] bg-white p-4">
                        <p className="font-medium text-[#14171c]">{item.name}</p>
                        <p className="mt-1 text-sm text-[#676d67]">
                          {item.colorName} / Size {item.size}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-sm text-[#676d67]">
                          <span>Qty {item.quantity}</span>
                          <span>${item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[24px] border border-[#ddd7ca] bg-white p-4">
                    <div className="flex items-center justify-between text-sm text-[#676d67]">
                      <span>Items</span>
                      <span>${total}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-[#676d67]">
                      <span>Delivery</span>
                      <span>Free</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between font-display text-[1.35rem] font-semibold tracking-display text-[#14171c]">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
