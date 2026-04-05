"use client";

import { motion } from "framer-motion";

type SiteFooterProps = {
  onScrollToSection: (sectionId: string) => void;
};

export function SiteFooter({ onScrollToSection }: SiteFooterProps) {
  return (
    <footer className="px-3 pb-10 pt-6 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto overflow-hidden rounded-[36px] border border-[#ddd5c8] bg-[radial-gradient(circle_at_top,rgba(188,198,208,0.22),transparent_28%),linear-gradient(180deg,#faf7f0_0%,#f1ece1_100%)] text-[#14171c] shadow-[0_24px_80px_rgba(17,19,24,0.08)]"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.2fr)_220px_280px] lg:px-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d8d0c3] bg-white/80 shadow-[0_12px_30px_rgba(17,19,24,0.06)]">
                <span className="font-display text-lg font-semibold tracking-display">A</span>
              </div>
              <div>
                <p className="font-display text-[1.35rem] font-semibold tracking-display">
                  ASICS Selection
                </p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#737a73]">
                  Premium product experience
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-8 text-[#5f655f] sm:text-base">
              Cleaner product pages, honest fit guidance, fast checkout and a sharper visual system
              built around the shoes themselves. The footer now sits in the same palette as the
              rest of the site, so the ending feels integrated instead of detached.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#737a73]">Explore</p>
            <div className="mt-5 space-y-3">
              {[
                ["story", "Brand story"],
                ["catalog", "Catalog"],
                ["guide", "Size guide"],
                ["reviews", "Reviews"],
                ["payments", "Checkout"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  className="block text-left text-sm text-[#5f655f] transition hover:text-[#14171c]"
                  onClick={() => onScrollToSection(id)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#737a73]">Contacts</p>
            <div className="mt-5 space-y-3 text-sm text-[#5f655f]">
              <a href="mailto:hello@asics-selection.com">hello@asics-selection.com</a>
              <a href="https://instagram.com" rel="noreferrer" target="_blank">
                Instagram / @asics.selection
              </a>
              <a href="https://tiktok.com" rel="noreferrer" target="_blank">
                TikTok / @asics.selection
              </a>
              <p className="pt-2 text-[#7b827b]">Reply time: within one business day.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#ddd5c8] px-6 py-5 text-sm text-[#7b827b] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p>© 2026 ASICS Selection. All rights reserved.</p>
          <p>made by Daedra | Web Design & Development</p>
        </div>
      </motion.div>
    </footer>
  );
}
