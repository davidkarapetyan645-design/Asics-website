"use client";

import { AnimatePresence, motion } from "framer-motion";

const sizeGuideRows = [
  { eu: "39", usMen: "6", usWomen: "7.5", cm: "24.5" },
  { eu: "40", usMen: "7", usWomen: "8.5", cm: "25.0" },
  { eu: "40.5", usMen: "7.5", usWomen: "9", cm: "25.25" },
  { eu: "41.5", usMen: "8", usWomen: "9.5", cm: "26.0" },
  { eu: "42", usMen: "8.5", usWomen: "10", cm: "26.5" },
  { eu: "42.5", usMen: "9", usWomen: "10.5", cm: "27.0" },
  { eu: "43.5", usMen: "9.5", usWomen: "11", cm: "27.5" },
  { eu: "44", usMen: "10", usWomen: "11.5", cm: "28.0" },
  { eu: "45", usMen: "11", usWomen: "12.5", cm: "28.5" },
];

type SizeGuideModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            aria-label="Close size guide"
            className="fixed inset-0 z-[80] bg-[#0b1020]/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            type="button"
          />

          <motion.div
            className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-[860px] overflow-hidden rounded-[34px] border border-[#ddd7ca] bg-[#fbfaf6] text-[#111318] shadow-[0_30px_120px_rgba(15,17,21,0.22)]"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6e0d4] px-5 py-5 sm:px-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f756d]">
                    Size guide
                  </p>
                  <h2 className="mt-1 font-display text-[1.8rem] font-semibold tracking-display">
                    Fit and conversion
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

              <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_320px]">
                <div className="p-5 sm:p-6">
                  <div className="overflow-hidden rounded-[28px] border border-[#e5dfd2] bg-white">
                    <div className="grid grid-cols-4 border-b border-[#ece5d8] bg-[#f7f4ed] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#6e756d]">
                      <span>EU</span>
                      <span>US Men</span>
                      <span>US Women</span>
                      <span>CM</span>
                    </div>
                    <div className="divide-y divide-[#efe8dc]">
                      {sizeGuideRows.map((row) => (
                        <div
                          key={row.eu}
                          className="grid grid-cols-4 px-4 py-3 text-sm text-[#171b22]"
                        >
                          <span className="font-semibold">{row.eu}</span>
                          <span>{row.usMen}</span>
                          <span>{row.usWomen}</span>
                          <span>{row.cm}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#e6e0d4] bg-[#f5f2ea] p-5 sm:p-6 lg:border-l lg:border-t-0">
                  <div className="rounded-[24px] border border-[#ddd7ca] bg-white p-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f756d]">
                      Best way to choose
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[#5d645d]">
                      <li>Start with your usual ASICS size if you already wear the brand.</li>
                      <li>If you are between sizes, go up for a more relaxed everyday fit.</li>
                      <li>If your feet are wide, sizing up is usually the safer move.</li>
                    </ul>
                  </div>

                  <div className="mt-4 rounded-[24px] border border-[#ddd7ca] bg-white p-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f756d]">
                      Exchange policy
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#5d645d]">
                      If the first size is not right, the exchange process is simple. That is why
                      we kept the size guide visible inside the shopping flow.
                    </p>
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
