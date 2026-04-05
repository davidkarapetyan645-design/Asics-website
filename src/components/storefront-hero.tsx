"use client";

import Image from "next/image";
import { AnimatePresence, motion, type MotionValue } from "framer-motion";

import type { StoreProduct } from "@/data/storefront";

type StorefrontHeroProps = {
  activeGalleryIndex: number;
  activeImage: StoreProduct["gallery"][number];
  activeProduct: StoreProduct;
  cartCount: number;
  onOpenCart: () => void;
  onSelectHeroImage: (imageIndex: number) => void;
  onScrollToSection: (sectionId: string) => void;
  progressScale: MotionValue<number>;
};

export function StorefrontHero({
  activeGalleryIndex,
  activeImage,
  activeProduct,
  cartCount,
  onOpenCart,
  onSelectHeroImage,
  onScrollToSection,
  progressScale,
}: StorefrontHeroProps) {
  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#cbbba5] via-[#909aa5] to-[#111318]"
        style={{ scaleX: progressScale }}
      />

      <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between rounded-full border border-[#ded7cb] bg-[#fbfaf6]/90 px-4 py-3 shadow-[0_10px_30px_rgba(17,19,24,0.06)] backdrop-blur-xl">
          <button className="text-left" onClick={() => onScrollToSection("hero")} type="button">
            <p className="font-display text-base font-semibold tracking-display">ASICS</p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#6d746d]">
              Premium daily running style
            </p>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {[
              ["story", "Story"],
              ["catalog", "Catalog"],
              ["guide", "Fit"],
              ["reviews", "Reviews"],
              ["payments", "Payment"],
            ].map(([id, label]) => (
              <button
                key={id}
                className="rounded-full border border-transparent px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#60665f] transition hover:border-[#ddd6c9] hover:bg-white hover:text-[#14171c]"
                onClick={() => onScrollToSection(id)}
                type="button"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="hidden rounded-full border border-[#d9d2c5] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#51564f] transition hover:bg-white sm:block"
              onClick={() => onScrollToSection("catalog")}
              type="button"
            >
              Shop
            </button>
            <button
              className="rounded-full bg-[#171b22] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#0f1115]"
              onClick={onOpenCart}
              type="button"
            >
              Cart {cartCount > 0 ? `(${cartCount})` : ""}
            </button>
          </div>
        </div>
      </header>

      <section id="hero" className="px-3 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1480px] gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="rounded-[34px] border border-[#e2dbcf] bg-white p-6 shadow-[0_20px_60px_rgba(17,19,24,0.06)] sm:p-8 lg:p-10">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#7b827b]">
              Premium ASICS storefront
            </p>
            <h1 className="mt-5 max-w-[11ch] font-display text-[2.6rem] font-semibold leading-[0.94] tracking-display sm:text-[3.6rem] lg:text-[4.8rem]">
              ASICS pairs that look sharp and feel easy to wear.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#5f655f] sm:text-base">
              Light layout, clear product info, easy size selection, honest reviews, cart and
              checkout in one flow. Less visual noise, better product focus and a shopping
              experience that works properly on desktop and phone.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["2", "Models in stock"],
                ["Free", "Delivery and size exchange"],
                ["Visa+", "Checkout card support"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[24px] border border-[#ece5d8] bg-[#faf8f2] px-4 py-4"
                >
                  <p className="font-display text-[1.55rem] font-semibold tracking-display text-[#171b22]">
                    {value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#666c66]">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                className="rounded-full bg-[#171b22] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#0f1115]"
                onClick={() => onScrollToSection(`product-${activeProduct.id}`)}
                type="button"
              >
                Shop featured pair
              </button>
              <button
                className="rounded-full border border-[#d9d2c5] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#1f242b] transition hover:bg-white"
                onClick={() => onScrollToSection("reviews")}
                type="button"
              >
                Read reviews
              </button>
            </div>
          </div>

          <div
            className="overflow-hidden rounded-[34px] border border-[#ddd6ca] p-5 sm:p-6 lg:p-8"
            style={{
              background: `linear-gradient(135deg, ${activeProduct.theme.surface} 0%, ${activeProduct.theme.soft} 60%, #ffffff 100%)`,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProduct.id}-hero-copy`}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center justify-between gap-3"
                exit={{ opacity: 0, y: -8 }}
                initial={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#6d746d]">
                    Featured product
                  </p>
                  <h2 className="mt-2 font-display text-[2rem] font-semibold tracking-display">
                    {activeProduct.name}
                  </h2>
                </div>
                <span className="rounded-full border border-[#d7d0c3] bg-white/80 px-4 py-2 text-sm font-medium text-[#20242c]">
                  ${activeProduct.price}
                </span>
              </motion.div>
            </AnimatePresence>

            <div className="relative mt-6 overflow-hidden rounded-[30px] border border-[#dbd4c8] bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(247,243,235,0.92)_100%)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProduct.id}-hero-glow`}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0"
                  exit={{ opacity: 0, scale: 1.04 }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    background: `radial-gradient(circle at 50% 28%, ${activeProduct.theme.glow} 0%, transparent 45%)`,
                  }}
                />
              </AnimatePresence>
              <div className="absolute inset-x-[15%] bottom-7 h-9 rounded-full bg-[#111318]/10 blur-2xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProduct.id}-${activeGalleryIndex}`}
                  className="relative z-10 p-5 sm:p-8"
                  initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, scale: 1.02, filter: "blur(6px)" }}
                  transition={{ duration: 0.32, ease: [0.2, 0.9, 0.2, 1] }}
                >
                  <Image
                    alt={activeImage.alt}
                    className="hero-shoe-image h-auto w-full object-contain"
                    height={activeImage.height}
                    priority
                    quality={100}
                    sizes="(max-width: 1023px) 88vw, 48vw"
                    src={activeImage.src}
                    width={activeImage.width}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {activeProduct.gallery.map((image, index) => (
                <button
                  key={image.src}
                  aria-label={`Show preview ${index + 1}`}
                  className={`overflow-hidden rounded-[18px] border p-1.5 transition ${
                    activeGalleryIndex === index
                      ? "border-[#15181d] bg-white/95 shadow-[0_10px_24px_rgba(17,19,24,0.08)]"
                      : "border-[#ddd6c9] bg-white/60 hover:bg-white/85"
                  }`}
                  onClick={() => onSelectHeroImage(index)}
                  type="button"
                >
                  <Image
                    alt={image.alt}
                    className="hero-shoe-image h-14 w-20 rounded-[12px] object-contain sm:h-16 sm:w-24"
                    height={image.height}
                    quality={90}
                    sizes="96px"
                    src={image.src}
                    width={image.width}
                  />
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProduct.id}-${activeGalleryIndex}-hero-meta`}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex flex-wrap items-center justify-between gap-4"
                exit={{ opacity: 0, y: -8 }}
                initial={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div className="max-w-[420px]">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#6d746d]">
                    Current finish
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#1d2128]">
                    {activeProduct.colorName}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#5f655f]">{activeProduct.summary}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#7b827b]">
                    Any photo you choose below updates this main preview.
                  </p>
                </div>
                <button
                  className="rounded-full bg-[#171b22] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#0f1115]"
                  onClick={() => onScrollToSection(`product-${activeProduct.id}`)}
                  type="button"
                >
                  Open product
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
