"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { storefrontProducts } from "@/data/storefront";

type StorefrontBodyProps = {
  activeProductId: string;
  onAddToCart: (productId: string) => void;
  onBuyNow: (productId: string) => void;
  onOpenSizeGuide: () => void;
  onSelectHeroProduct: (productId: string) => void;
  onSelectImage: (productId: string, imageIndex: number) => void;
  onSelectSize: (productId: string, size: string) => void;
  onScrollToSection: (sectionId: string) => void;
  selectedImages: Record<string, number>;
  selectedSizes: Record<string, string>;
};

function RatingDots({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`h-2.5 w-2.5 rounded-full ${
            index < rating ? "bg-[#1a1e25]" : "bg-[#d9d2c5]"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part.slice(0, 1))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#171b22] text-sm font-semibold uppercase tracking-[0.16em] text-white">
      {initials}
    </div>
  );
}

export function StorefrontBody({
  activeProductId,
  onAddToCart,
  onBuyNow,
  onOpenSizeGuide,
  onSelectHeroProduct,
  onSelectImage,
  onSelectSize,
  onScrollToSection,
  selectedImages,
  selectedSizes,
}: StorefrontBodyProps) {
  const totalReviews = storefrontProducts.flatMap((product) => product.reviews);
  const averageRating =
    totalReviews.length > 0
      ? (totalReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews.length).toFixed(1)
      : "5.0";

  return (
    <>
      <section id="story" className="px-3 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1480px] gap-4 lg:grid-cols-[minmax(0,1.05fr)_420px]">
          <div className="rounded-[34px] border border-[#e1dacd] bg-white p-6 shadow-[0_20px_60px_rgba(17,19,24,0.05)] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#7b827b]">Brand feel</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[2.1rem] font-semibold tracking-display text-[#14171c] sm:text-[2.8rem]">
              Running DNA, edited down for everyday style.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5f655f] sm:text-base">
              ASICS started in performance sport, but the reason these models still matter is
              simple: they feel good on foot, they look sharp without trying too hard, and they
              fit into daily life better than most trend shoes do.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Clear product pages",
                  body: "Each model has its own images, fit notes, materials, sizes and quick buying flow.",
                },
                {
                  title: "Fast on phone",
                  body: "No heavy floating 3D scene. The mobile version keeps the premium look without dragging performance down.",
                },
                {
                  title: "Useful copy",
                  body: "Descriptions are short, normal and focused on what actually helps someone choose a pair.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[#ebe4d7] bg-[#faf8f2] p-5"
                >
                  <p className="font-display text-[1.2rem] font-semibold tracking-display text-[#14171c]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#5f655f]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] border border-[#ded7ca] bg-[#171b22] p-6 text-white shadow-[0_20px_60px_rgba(17,19,24,0.12)] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Quick compare</p>
            <div className="mt-5 space-y-4">
              {[
                {
                  name: "GEL-Kayano 14",
                  note: "Pick this if you want a more secure, structured feel underfoot.",
                },
                {
                  name: "GEL-Nimbus 10.1",
                  note: "Pick this if you want a softer step and a slightly easier everyday feel.",
                },
              ].map((item) => (
                <div key={item.name} className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                  <p className="font-display text-[1.25rem] font-semibold tracking-display">
                    {item.name}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/72">{item.note}</p>
                </div>
              ))}
            </div>

            <button
              className="mt-6 w-full rounded-full bg-white px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#14171c] transition hover:bg-[#f1eee7]"
              onClick={() => onScrollToSection("catalog")}
              type="button"
            >
              Compare products
            </button>
          </div>
        </div>
      </section>

      <section id="catalog" className="px-3 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1480px]">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#7b827b]">Catalog</p>
            <h2 className="mt-4 font-display text-[2.2rem] font-semibold tracking-display text-[#14171c] sm:text-[3rem]">
              Two models. Clear fit. Easy choice.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f655f] sm:text-base">
              We kept this simple on purpose. Two strong ASICS options, clear differences, better
              product detail and a shopping flow that feels like a real store, not just a concept
              page.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {storefrontProducts.map((product) => (
              <motion.article
                key={product.id}
                className="overflow-hidden rounded-[32px] border border-[#e1dacd] bg-white shadow-[0_18px_50px_rgba(17,19,24,0.05)]"
                transition={{ duration: 0.24, ease: "easeOut" }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="cursor-pointer border-b border-[#ece5d8] p-5 sm:p-6"
                  onClick={() => {
                    onSelectHeroProduct(product.id);
                    onScrollToSection("hero");
                  }}
                  style={{
                    background: `linear-gradient(135deg, ${product.theme.surface} 0%, ${product.theme.soft} 100%)`,
                  }}
                >
                  <div className="relative mx-auto max-w-[420px]">
                    <Image
                      alt={product.gallery[0].alt}
                      className="hero-shoe-image h-auto w-full object-contain"
                      height={product.gallery[0].height}
                      quality={95}
                      sizes="(max-width: 1023px) 82vw, 34vw"
                      src={product.gallery[0].src}
                      width={product.gallery[0].width}
                    />
                  </div>
                </div>
                <div className="space-y-5 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-[1.7rem] font-semibold tracking-display text-[#14171c]">
                      {product.name}
                    </p>
                    <span className="rounded-full border border-[#ddd6c9] px-4 py-2 text-sm font-medium text-[#232830]">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-[#5f655f]">{product.summary}</p>

                  <p className="text-xs uppercase tracking-[0.16em] text-[#7b827b]">
                    Click any card or photo to update the main preview.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {product.features.map((feature) => (
                      <div
                        key={feature.label}
                        className="rounded-[22px] border border-[#ebe4d7] bg-[#faf8f2] px-4 py-4"
                      >
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[#7b827b]">
                          {feature.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-[#14171c]">
                          {feature.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      className="rounded-full bg-[#171b22] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#0f1115]"
                      onClick={() => {
                        onSelectHeroProduct(product.id);
                        onScrollToSection(`product-${product.id}`);
                      }}
                      type="button"
                    >
                      View details
                    </button>
                    <button
                      className="rounded-full border border-[#d9d2c5] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#232830] transition hover:bg-[#faf7f1]"
                      onClick={() => onSelectHeroProduct(product.id)}
                      type="button"
                    >
                      Make featured
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1480px] rounded-[34px] border border-[#e1dacd] bg-white p-6 shadow-[0_20px_60px_rgba(17,19,24,0.05)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#7b827b]">Comparison</p>
              <h2 className="mt-4 font-display text-[2rem] font-semibold tracking-display text-[#14171c] sm:text-[2.7rem]">
                Which pair fits your day better?
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#5f655f] sm:text-base">
                Kayano 14 feels more controlled and supportive. Nimbus 10.1 feels softer and a bit
                more relaxed. The rest comes down to the shape you want and how you usually wear
                your shoes.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#ebe4d7] bg-[#faf8f2] px-5 py-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#7b827b]">Fast choice</p>
              <p className="mt-2 text-sm font-medium text-[#14171c]">
                Support first: Kayano 14. Softer feel: Nimbus 10.1.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="guide" className="px-3 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1480px] gap-4 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="rounded-[34px] border border-[#ded7ca] bg-[#171b22] p-6 text-white shadow-[0_20px_60px_rgba(17,19,24,0.12)] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Fit guide</p>
            <h2 className="mt-4 font-display text-[2rem] font-semibold tracking-display sm:text-[2.4rem]">
              Size choice should feel simple.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/72">
              Instead of guessing, open the fit guide, compare EU, US and CM, then use the fit note
              inside each product block.
            </p>

            <button
              className="mt-8 w-full rounded-full bg-white px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#14171c] transition hover:bg-[#f1eee7]"
              onClick={onOpenSizeGuide}
              type="button"
            >
              Open size guide
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Measured flow",
                body: "We added a dedicated size guide instead of hiding fit help inside long product text.",
              },
              {
                title: "Better page balance",
                body: "The page now breathes more between overview, compare, fit guide, product detail, reviews and checkout.",
              },
              {
                title: "Useful interaction",
                body: "Quick side navigation on desktop makes it easier to jump through the page without feeling lost.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[30px] border border-[#e1dacd] bg-white p-6 shadow-[0_16px_40px_rgba(17,19,24,0.04)]"
              >
                <p className="font-display text-[1.4rem] font-semibold tracking-display text-[#14171c]">
                  {item.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-[#5f655f]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1480px] gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <article className="rounded-[34px] border border-[#e1dacd] bg-white p-6 shadow-[0_20px_60px_rgba(17,19,24,0.05)] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#7b827b]">Style notes</p>
            <h2 className="mt-4 font-display text-[2rem] font-semibold tracking-display text-[#14171c] sm:text-[2.7rem]">
              Product page, but with more taste and less noise.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "City uniform",
                  body: "Works with straight denim, easy trousers, clean socks and an unbranded outer layer.",
                },
                {
                  title: "Travel setup",
                  body: "Easy choice when comfort matters, but you still want the pair to look clean in photos and in transit.",
                },
                {
                  title: "Everyday rotation",
                  body: "These sit in the part of a wardrobe where comfort and visual shape matter equally.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[#ebe4d7] bg-[#faf8f2] p-5"
                >
                  <p className="font-display text-[1.2rem] font-semibold tracking-display text-[#14171c]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#5f655f]">{item.body}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[34px] border border-[#e1dacd] bg-[linear-gradient(180deg,#f8f5ee_0%,#f1ece1_100%)] p-6 shadow-[0_20px_60px_rgba(17,19,24,0.05)] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#7b827b]">Store notes</p>
            <div className="mt-5 space-y-4">
              {[
                "Free delivery and easy exchange stay visible through the buying flow.",
                "The cart and payment drawer keep the action close instead of kicking the user to another messy page.",
                "Sections now alternate in weight so the page feels paced, not flat.",
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-[#e1dacd] bg-white p-4">
                  <p className="text-sm leading-7 text-[#5f655f]">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-3 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1480px] space-y-8">
          {storefrontProducts.map((product) => {
            const currentImageIndex = selectedImages[product.id] ?? 0;
            const currentImage = product.gallery[currentImageIndex] ?? product.gallery[0];
            const selectedSize = selectedSizes[product.id];

            return (
              <article
                key={product.id}
                id={`product-${product.id}`}
                className="scroll-mt-28 overflow-hidden rounded-[36px] border border-[#dfd8cb] bg-white shadow-[0_22px_70px_rgba(17,19,24,0.05)]"
              >
                <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                  <div
                    className="border-b border-[#ebe4d7] p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-8"
                    style={{
                      background: `linear-gradient(145deg, ${product.theme.surface} 0%, ${product.theme.soft} 100%)`,
                    }}
                  >
                    <div className="relative overflow-hidden rounded-[28px] border border-[#ddd6c9] bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(247,243,235,0.92)_100%)]">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at 50% 26%, ${product.theme.glow} 0%, transparent 42%)`,
                        }}
                      />
                      <div className="absolute inset-x-[14%] bottom-6 h-8 rounded-full bg-[#111318]/10 blur-2xl" />
                      <div className="relative z-10 p-4 sm:p-6">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${product.id}-${currentImageIndex}`}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            initial={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                          >
                            <Image
                              alt={currentImage.alt}
                              className="hero-shoe-image h-auto w-full object-contain"
                              height={currentImage.height}
                              quality={95}
                              sizes="(max-width: 1023px) 88vw, 38vw"
                              src={currentImage.src}
                              width={currentImage.width}
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {product.gallery.map((image, index) => (
                        <button
                          key={image.src}
                          className={`overflow-hidden rounded-[22px] border p-2 transition ${
                            currentImageIndex === index
                              ? "border-[#15181d] bg-white/95 shadow-[0_10px_24px_rgba(17,19,24,0.08)]"
                              : "border-[#ddd6c9] bg-white/55 hover:bg-white/85"
                          }`}
                          onClick={() => onSelectImage(product.id, index)}
                          type="button"
                        >
                          <Image
                            alt={image.alt}
                            className="hero-shoe-image h-auto w-full object-contain"
                            height={image.height}
                            quality={90}
                            sizes="(max-width: 1023px) 28vw, 12vw"
                            src={image.src}
                            width={image.width}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#7b827b]">
                      Selecting a photo here also updates the main image at the top.
                    </p>
                  </div>

                  <div className="p-5 sm:p-6 lg:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b827b]">
                          {product.colorName}
                        </p>
                        <h3 className="mt-2 font-display text-[2rem] font-semibold tracking-display text-[#14171c] sm:text-[2.5rem]">
                          {product.name}
                        </h3>
                      </div>
                      {activeProductId === product.id ? (
                        <span className="rounded-full bg-[#171b22] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">
                          Featured
                        </span>
                      ) : (
                        <button
                          className="rounded-full border border-[#d9d2c5] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#232830] transition hover:bg-[#faf7f1]"
                          onClick={() => onSelectHeroProduct(product.id)}
                          type="button"
                        >
                          Use in hero
                        </button>
                      )}
                    </div>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5f655f] sm:text-base">
                      {product.description}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {product.features.map((feature) => (
                        <div
                          key={feature.label}
                          className="rounded-[22px] border border-[#ebe4d7] bg-[#faf8f2] px-4 py-4"
                        >
                          <p className="text-[11px] uppercase tracking-[0.2em] text-[#7b827b]">
                            {feature.label}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-[#14171c]">
                            {feature.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b827b]">
                          Select size
                        </p>
                        <button
                          className="text-sm font-medium text-[#3d4550] transition hover:text-[#14171c]"
                          onClick={onOpenSizeGuide}
                          type="button"
                        >
                          Need fit help?
                        </button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            className={`min-w-[64px] rounded-full border px-4 py-3 text-sm font-medium transition ${
                              selectedSize === size
                                ? "border-[#171b22] bg-[#171b22] text-white"
                                : "border-[#d9d2c5] bg-white text-[#24272d] hover:bg-[#f4f0e7]"
                            }`}
                            onClick={() => onSelectSize(product.id, size)}
                            type="button"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#676d67]">{product.fitNote}</p>
                      <div className="mt-4 rounded-[22px] border border-[#ebe4d7] bg-[#faf8f2] px-4 py-4">
                        <p className="text-sm leading-7 text-[#5f655f]">
                          Start with your regular EU size. If you are usually between sizes, the
                          safer move is to size up for a more relaxed fit.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-5 lg:grid-cols-2">
                      <div className="rounded-[24px] border border-[#ebe4d7] bg-[#faf8f2] p-5">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b827b]">
                          Materials
                        </p>
                        <ul className="mt-4 space-y-3 text-sm leading-6 text-[#575d57]">
                          {product.materials.map((material) => (
                            <li key={material}>{material}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-[24px] border border-[#ebe4d7] bg-[#faf8f2] p-5">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b827b]">
                          Best for
                        </p>
                        <ul className="mt-4 space-y-3 text-sm leading-6 text-[#575d57]">
                          {product.usage.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[24px] border border-[#ebe4d7] bg-white p-5">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b827b]">
                        Delivery and exchange
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#5f655f]">{product.shippingNote}</p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        className="rounded-full bg-[#171b22] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#0f1115] disabled:cursor-not-allowed disabled:opacity-45"
                        disabled={!selectedSize}
                        onClick={() => onAddToCart(product.id)}
                        type="button"
                      >
                        Add to cart
                      </button>
                      <button
                        className="rounded-full border border-[#d9d2c5] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#232830] transition hover:bg-[#faf7f1] disabled:cursor-not-allowed disabled:opacity-45"
                        disabled={!selectedSize}
                        onClick={() => onBuyNow(product.id)}
                        type="button"
                      >
                        Buy now
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="reviews" className="px-3 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#7b827b]">Reviews</p>
              <h2 className="mt-4 font-display text-[2.2rem] font-semibold tracking-display text-[#14171c] sm:text-[3rem]">
                Reviews that actually help with sizing and comfort.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f655f] sm:text-base">
                We kept the review block useful: fit notes, how often the pair is worn, and short
                comments that help with the actual purchase decision.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#e1dacd] bg-white px-5 py-4 shadow-[0_16px_40px_rgba(17,19,24,0.04)]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#7b827b]">Average rating</p>
              <div className="mt-2 flex items-center gap-3">
                <p className="font-display text-[2rem] font-semibold tracking-display text-[#14171c]">
                  {averageRating}
                </p>
                <RatingDots rating={5} />
              </div>
              <p className="mt-2 text-sm text-[#676d67]">{totalReviews.length} buyer notes</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {totalReviews.map((review) => (
              <article
                key={review.id}
                className="rounded-[30px] border border-[#e1dacd] bg-white p-5 shadow-[0_14px_40px_rgba(17,19,24,0.04)] sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <ReviewAvatar name={review.name} />
                    <div>
                      <p className="font-display text-[1.3rem] font-semibold tracking-display text-[#14171c]">
                        {review.title}
                      </p>
                      <p className="mt-1 text-sm text-[#676d67]">
                        {review.name} / {review.location}
                      </p>
                    </div>
                  </div>
                  <RatingDots rating={review.rating} />
                </div>

                <p className="mt-5 text-sm leading-7 text-[#5f655f] sm:text-base">
                  {review.body}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Age", review.age],
                    ["Purpose", review.purpose],
                    ["Frequency", review.frequency],
                    ["Purchased size", review.purchasedSize],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[20px] border border-[#ebe4d7] bg-[#faf8f2] px-4 py-3"
                    >
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#7b827b]">
                        {label}
                      </p>
                      <p className="mt-2 text-sm font-medium text-[#14171c]">{value}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-sm font-medium text-[#1f242b]">{review.recommendation}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1480px] gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="rounded-[34px] border border-[#e1dacd] bg-white p-6 shadow-[0_20px_60px_rgba(17,19,24,0.05)] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#7b827b]">Why this works</p>
            <h2 className="mt-4 font-display text-[2.1rem] font-semibold tracking-display text-[#14171c] sm:text-[2.8rem]">
              Clean design, simple words, clear buying flow.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Sharper visuals",
                  body: "Image containers now respect the real proportions of each asset, with cleaner lighting and less visual noise.",
                },
                {
                  title: "Better product focus",
                  body: "Real product cards, size choices, cart and checkout. Less concept, more actual shopping flow.",
                },
                {
                  title: "Cleaner copy",
                  body: "Descriptions now read like a normal person wrote them, with useful detail instead of strange phrases.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[#ebe4d7] bg-[#faf8f2] p-5"
                >
                  <p className="font-display text-[1.3rem] font-semibold tracking-display text-[#14171c]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#5f655f]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            id="payments"
            className="rounded-[34px] border border-[#e1dacd] bg-[#171b22] p-6 text-white shadow-[0_20px_60px_rgba(17,19,24,0.12)] sm:p-8"
          >
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Payment</p>
            <h2 className="mt-4 font-display text-[2rem] font-semibold tracking-display sm:text-[2.4rem]">
              Checkout is built into the flow.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/72">
              Choose a size, add the pair to cart, then pay inside checkout. Card type selection is
              already part of the flow: Visa, Mastercard, Amex and Mada.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Visa", "Mastercard", "Amex", "Mada"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/14 px-4 py-2 text-sm font-medium text-white/82"
                >
                  {item}
                </span>
              ))}
            </div>

            <button
              className="mt-8 w-full rounded-full bg-white px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#14171c] transition hover:bg-[#f1eee7]"
              onClick={() => onScrollToSection("catalog")}
              type="button"
            >
              Choose a pair
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
