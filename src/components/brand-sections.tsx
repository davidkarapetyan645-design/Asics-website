"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import {
  historyMilestones,
  storyMoments,
  technologyCards,
  trustPillars,
  wearTestNotes,
} from "@/data/brand-content";
import { products } from "@/data/products";

type BrandSectionsProps = {
  activeModelId: string;
  activeVariantId: string;
  onActivateProduct: (modelId: string, variantId?: string) => void;
  onScrollToSection: (sectionId: string) => void;
};

const revealTransition = {
  duration: 0.6,
  ease: [0.2, 0.9, 0.2, 1],
} as const;

function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  body: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-[11px] uppercase tracking-[0.28em] text-white/48">{eyebrow}</p>
      <h2 className="font-display text-[2rem] font-semibold leading-[0.96] tracking-display text-white sm:text-[2.7rem] lg:text-[3.4rem]">
        {title}
      </h2>
      <p className="max-w-2xl text-sm leading-7 text-white/70 sm:text-base">{body}</p>
    </div>
  );
}

function ScoreDots() {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="h-2.5 w-2.5 rounded-full bg-white/90 shadow-[0_0_18px_rgba(255,255,255,0.18)]"
        />
      ))}
    </div>
  );
}

export function BrandSections({
  activeModelId,
  activeVariantId,
  onActivateProduct,
  onScrollToSection,
}: BrandSectionsProps) {
  const storyCardRefs = useRef<Record<string, HTMLElement | null>>({});

  const activeModel = products.find((product) => product.id === activeModelId) ?? products[0];
  const activeVariant =
    activeModel.variants.find((variant) => variant.id === activeVariantId) ??
    activeModel.variants[0];

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const cards = Object.values(storyCardRefs.current).filter(
      (node): node is HTMLElement => Boolean(node),
    );

    if (!cards.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const nextEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!nextEntry) {
          return;
        }

        const modelId = nextEntry.target.getAttribute("data-model-id");
        const variantId = nextEntry.target.getAttribute("data-variant-id") ?? undefined;

        if (!modelId) {
          return;
        }

        onActivateProduct(modelId, variantId);
      },
      {
        threshold: [0.4, 0.6, 0.8],
        rootMargin: "-12% 0px -28% 0px",
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
      observer.disconnect();
    };
  }, [onActivateProduct]);

  const handleCatalogOpen = (modelId: string) => {
    const nextModel = products.find((product) => product.id === modelId);

    if (!nextModel) {
      return;
    }

    onActivateProduct(modelId, nextModel.variants[0].id);
    onScrollToSection(`product-${modelId}`);
  };

  return (
    <>
      <section id="story" className="scroll-mt-28 px-3 py-18 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeader
            body="Scroll deeper and the presentation changes mood, light and language. Each chapter pushes the product from a single shoe render into a fuller brand story."
            eyebrow="Deep scroll storytelling"
            title="A longer product experience built to hold attention"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-hero backdrop-blur-xl sm:p-6"
                initial={{ opacity: 0, y: 24 }}
                transition={revealTransition}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                    Active chapter
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                    {activeModel.era}
                  </p>
                </div>

                <div
                  className="relative mt-5 overflow-hidden rounded-[28px] border border-white/10 p-5"
                  style={{
                    background: `linear-gradient(135deg, ${activeVariant.theme.background[0]} 0%, ${activeVariant.theme.background[1]} 58%, ${activeVariant.theme.background[2]} 100%)`,
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.18),transparent_42%)]" />
                  <div className="absolute inset-x-[12%] bottom-8 h-10 rounded-full bg-black/35 blur-2xl" />
                  <div className="relative mx-auto max-w-[420px]">
                    <Image
                      alt={`${activeModel.name} detail view`}
                      className="hero-shoe-image h-auto w-full object-contain"
                      height={activeVariant.imageHeight}
                      sizes="(max-width: 1023px) 88vw, 34vw"
                      src={activeVariant.image}
                      width={activeVariant.imageWidth}
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {activeModel.detailPoints.map((point) => (
                    <div
                      key={point.label}
                      className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4"
                    >
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">
                        {point.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/78">{point.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-5">
              {storyMoments.map((moment, index) => {
                const isCurrent =
                  moment.productId === activeModel.id && moment.variantId === activeVariant.id;

                return (
                  <motion.article
                    key={moment.productId}
                    ref={(node) => {
                      storyCardRefs.current[moment.productId] = node;
                    }}
                    className={`rounded-[30px] border p-5 sm:p-6 ${
                      isCurrent
                        ? "border-white/18 bg-white/[0.08] shadow-hero"
                        : "border-white/10 bg-white/[0.04]"
                    }`}
                    data-model-id={moment.productId}
                    data-variant-id={moment.variantId}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ ...revealTransition, delay: index * 0.06 }}
                    viewport={{ amount: 0.2, once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                        {moment.eyebrow}
                      </p>
                      <div className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/55">
                        {moment.statLabel}: {moment.statValue}
                      </div>
                    </div>
                    <h3 className="mt-5 max-w-[16ch] font-display text-[1.7rem] font-semibold leading-[1.02] tracking-display text-white sm:text-[2rem]">
                      {moment.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                      {moment.body}
                    </p>
                    <button
                      className="mt-6 rounded-full border border-white/12 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/72 transition hover:border-white/18 hover:bg-white/[0.06]"
                      onClick={() => onActivateProduct(moment.productId, moment.variantId)}
                      type="button"
                    >
                      Bring this model forward
                    </button>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="history" className="scroll-mt-28 px-3 py-18 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-[1500px] rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 sm:p-6 lg:p-10">
          <SectionHeader
            body="ASICS is stronger when it feels like a worldview, not just a logo. The brand story begins in sport, then evolves into a clear lifestyle language without losing technical credibility."
            eyebrow="Brand history"
            title="From a sound mind in a sound body to a modern culture product"
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {historyMilestones.map((milestone, index) => (
              <motion.article
                key={milestone.year}
                className="rounded-[28px] border border-white/10 bg-[#060b17]/70 p-5"
                initial={{ opacity: 0, y: 20 }}
                transition={{ ...revealTransition, delay: index * 0.05 }}
                viewport={{ amount: 0.2, once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/42">
                  {milestone.year}
                </p>
                <h3 className="mt-5 font-display text-[1.35rem] font-semibold leading-[1.08] tracking-display text-white">
                  {milestone.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/68">{milestone.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="scroll-mt-28 px-3 py-18 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeader
            body="The point is not to list buzzwords. The point is to show what the technology changes underfoot and why the product still feels premium after the first look."
            eyebrow="Technology"
            title="GEL, cushioning and stability explained as a feeling"
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {technologyCards.map((card, index) => (
              <motion.article
                key={card.title}
                className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-5 sm:p-6"
                initial={{ opacity: 0, y: 20 }}
                transition={{ ...revealTransition, delay: index * 0.05 }}
                viewport={{ amount: 0.2, once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_46%)]" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-[1.55rem] font-semibold tracking-display text-white">
                      {card.title}
                    </h3>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.05]">
                      <div className="h-5 w-5 rounded-full border border-white/18 bg-white/80" />
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/70">{card.body}</p>
                  <div className="mt-6 rounded-[20px] border border-white/10 bg-black/10 p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">
                      What you feel
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/82">{card.feel}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="scroll-mt-28 px-3 py-18 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeader
            body="The catalog should feel like a clean decision surface: every model visible at once, every personality obvious, and every route into the product detail section frictionless."
            eyebrow="Catalog"
            title="Three distinct models, one coherent ASICS product family"
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {products.map((product, index) => {
              const variant = product.variants[0];

              return (
                <motion.article
                  key={product.id}
                  className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04]"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ ...revealTransition, delay: index * 0.05 }}
                  viewport={{ amount: 0.2, once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div
                    className="relative overflow-hidden border-b border-white/10 p-5"
                    style={{
                      background: `linear-gradient(135deg, ${variant.theme.background[0]} 0%, ${variant.theme.background[1]} 60%, ${variant.theme.background[2]} 100%)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.16),transparent_42%)]" />
                    <div className="relative mx-auto max-w-[330px]">
                      <Image
                        alt={product.name}
                        className="hero-shoe-image h-auto w-full object-contain"
                        height={variant.imageHeight}
                        sizes="(max-width: 1023px) 80vw, 26vw"
                        src={variant.image}
                        width={variant.imageWidth}
                      />
                    </div>
                  </div>

                  <div className="space-y-5 p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                        {product.era}
                      </p>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/55">
                        ${product.price}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-[1.8rem] font-semibold leading-[1.02] tracking-display text-white">
                        {product.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/70">{product.overview}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/55"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      className="w-full rounded-full border border-white/12 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/18 hover:bg-white/[0.06]"
                      onClick={() => handleCatalogOpen(product.id)}
                      type="button"
                    >
                      Open model detail
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-3 py-18 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-[1500px] space-y-8">
          {products.map((product, index) => {
            const variant = product.variants[0];
            const isHighlighted = product.id === activeModel.id;

            return (
              <motion.article
                key={product.id}
                id={`product-${product.id}`}
                className="scroll-mt-28 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.035]"
                initial={{ opacity: 0, y: 24 }}
                transition={revealTransition}
                viewport={{ amount: 0.15, once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div
                    className={`relative overflow-hidden border-b border-white/10 p-5 lg:border-b-0 ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                    style={{
                      background: `linear-gradient(145deg, ${variant.theme.background[0]} 0%, ${variant.theme.background[1]} 58%, ${variant.theme.background[2]} 100%)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.18),transparent_40%)]" />
                    <div className="absolute inset-x-[16%] bottom-10 h-10 rounded-full bg-black/30 blur-2xl" />
                    <div className="relative mx-auto max-w-[420px] lg:max-w-[500px]">
                      <Image
                        alt={`${product.name} product detail`}
                        className="hero-shoe-image h-auto w-full object-contain"
                        height={variant.imageHeight}
                        sizes="(max-width: 1023px) 84vw, 34vw"
                        src={variant.image}
                        width={variant.imageWidth}
                      />
                    </div>
                  </div>

                  <div className={`p-5 sm:p-6 lg:p-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                        Product deep dive
                      </p>
                      {isHighlighted ? (
                        <span className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/65">
                          Active on stage
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-5">
                      <h3 className="font-display text-[2rem] font-semibold leading-[0.98] tracking-display text-white sm:text-[2.4rem]">
                        {product.name}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                        {product.overview}
                      </p>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {product.detailPoints.map((point) => (
                        <div
                          key={point.label}
                          className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4"
                        >
                          <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">
                            {point.label}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-white/82">{point.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                      <div className="rounded-[26px] border border-white/10 bg-black/10 p-5">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">
                          On-foot feel
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/78">{product.feel}</p>
                        <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-white/42">
                          Technology angle
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/78">
                          {product.techNarrative}
                        </p>
                      </div>

                      <div className="rounded-[26px] border border-white/10 bg-black/10 p-5">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">
                          Best scenarios
                        </p>
                        <div className="mt-4 space-y-3">
                          {product.scenarios.map((scenario) => (
                            <div
                              key={scenario.label}
                              className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4"
                            >
                              <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">
                                {scenario.label}
                              </p>
                              <p className="mt-2 text-sm leading-6 text-white/78">
                                {scenario.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                        onClick={() => onActivateProduct(product.id, variant.id)}
                        type="button"
                      >
                        Bring to hero
                      </button>
                      <button
                        className="rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/18 hover:bg-white/[0.06]"
                        onClick={() => onScrollToSection("buy")}
                        type="button"
                      >
                        Continue to purchase
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="reviews" className="scroll-mt-28 px-3 py-18 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeader
            body="Instead of empty praise, this section reads like the recurring feedback themes people notice first: support, ease, softness and how each silhouette fits into daily life."
            eyebrow="Wear-test style feedback"
            title="What people respond to when the shoe leaves the screen"
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {wearTestNotes.map((note, index) => (
              <motion.article
                key={note.model}
                className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 sm:p-6"
                initial={{ opacity: 0, y: 20 }}
                transition={{ ...revealTransition, delay: index * 0.05 }}
                viewport={{ amount: 0.2, once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                    {note.model}
                  </p>
                  <ScoreDots />
                </div>
                <p className="mt-5 text-lg leading-8 text-white/88">{`"${note.quote}"`}</p>
                <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-white/42">
                  Feedback theme
                </p>
                <p className="mt-2 text-sm text-white/70">{note.theme}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 py-18 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-[1500px] rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 sm:p-6 lg:p-10">
          <SectionHeader
            body="The strongest premium product pages remove doubt by explaining why the product deserves attention. Here the case is performance credibility, comfort logic and aesthetic relevance."
            eyebrow="Why choose ASICS"
            title="A brand worth trusting beyond trend cycles"
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {trustPillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                className="rounded-[28px] border border-white/10 bg-[#060b17]/80 p-5"
                initial={{ opacity: 0, y: 20 }}
                transition={{ ...revealTransition, delay: index * 0.05 }}
                viewport={{ amount: 0.2, once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-display text-[1.45rem] font-semibold tracking-display text-white">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/70">{pillar.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="buy" className="scroll-mt-28 px-3 pt-18 sm:px-6 sm:pt-24 lg:px-8">
        <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[36px] border border-white/12 bg-white/[0.05]">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.7fr)]">
            <div className="relative overflow-hidden p-5 sm:p-6 lg:p-10">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${activeVariant.theme.background[0]} 0%, ${activeVariant.theme.background[1]} 58%, ${activeVariant.theme.background[2]} 100%)`,
                  opacity: 0.92,
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_28%)]" />
              <div className="relative z-10 max-w-2xl">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">
                  Final decision block
                </p>
                <h2 className="mt-5 font-display text-[2.2rem] font-semibold leading-[0.96] tracking-display text-white sm:text-[3rem] lg:text-[4rem]">
                  Choose the pair that matches your pace and leave with confidence.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/78 sm:text-base">
                  The page now closes like a real product experience: clear product differences,
                  visible technology logic, stronger brand trust and a direct route to purchase.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                    onClick={() => onActivateProduct(activeModel.id, activeVariant.id)}
                    type="button"
                  >
                    Buy {activeModel.name}
                  </button>
                  <button
                    className="rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                    onClick={() => onScrollToSection("catalog")}
                    type="button"
                  >
                    Compare models
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-[#060b17] p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                Decision helper
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">
                    Current pick
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">{activeModel.name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/68">{activeModel.idealFor}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">
                    Confidence points
                  </p>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-white/72">
                    <li>Sport-born cushioning and stability logic.</li>
                    <li>Distinct identities across the full model family.</li>
                    <li>Responsive desktop version and optimized mobile path.</li>
                  </ul>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">
                    Price
                  </p>
                  <p className="mt-2 font-display text-[2rem] font-semibold tracking-display text-white">
                    ${activeModel.price}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    One price point, three different personalities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
