"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion, useScroll, useSpring } from "framer-motion";

import { storefrontProducts } from "@/data/storefront";
import { useMediaQuery } from "@/hooks/use-media-query";

import { CartSheet } from "./cart-sheet";
import { CheckoutModal } from "./checkout-modal";
import { SiteFooter } from "./site-footer";
import { StorefrontBody } from "./storefront-body";
import { StorefrontHero } from "./storefront-hero";
import { SizeGuideModal } from "./size-guide-modal";
import type { CartItem } from "./storefront-types";

const initialImageState = Object.fromEntries(
  storefrontProducts.map((product) => [product.id, 0]),
) as Record<string, number>;

const initialSizeState = Object.fromEntries(
  storefrontProducts.map((product) => [product.id, ""]),
) as Record<string, string>;

export function AsicsShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 639px)");
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    damping: 28,
    mass: 0.24,
    stiffness: 180,
  });

  const [activeProductId, setActiveProductId] = useState(storefrontProducts[0].id);
  const [selectedImages, setSelectedImages] =
    useState<Record<string, number>>(initialImageState);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(initialSizeState);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const activeProduct =
    storefrontProducts.find((product) => product.id === activeProductId) ?? storefrontProducts[0];
  const activeGalleryIndex = selectedImages[activeProduct.id] ?? 0;
  const activeImage = activeProduct.gallery[activeGalleryIndex] ?? activeProduct.gallery[0];
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );
  const hasMobileScreenOpen = isMobile && (isCartOpen || isCheckoutOpen || isSizeGuideOpen);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow =
      isCartOpen || isCheckoutOpen || isSizeGuideOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartOpen, isCheckoutOpen, isSizeGuideOpen]);

  const scrollToSection = (sectionId: string) => {
    if (typeof window === "undefined") {
      return;
    }

    const node = document.getElementById(sectionId);

    if (!node) {
      return;
    }

    node.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const addProductToCart = (productId: string) => {
    const product = storefrontProducts.find((item) => item.id === productId);
    const size = selectedSizes[productId];

    if (!product || !size) {
      return false;
    }

    const imageIndex = selectedImages[productId] ?? 0;
    const image = product.gallery[imageIndex] ?? product.gallery[0];
    const cartId = `${product.id}-${size}`;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === cartId);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...currentItems,
        {
          id: cartId,
          colorName: product.colorName,
          image: image.src,
          name: product.name,
          price: product.price,
          quantity: 1,
          size,
        },
      ];
    });

    return true;
  };

  const handleAddToCart = (productId: string) => {
    const didAdd = addProductToCart(productId);

    if (!didAdd) {
      return;
    }

    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };

  const handleBuyNow = (productId: string) => {
    const didAdd = addProductToCart(productId);

    if (!didAdd) {
      return;
    }

    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, nextQuantity: number) => {
    if (nextQuantity <= 0) {
      setCartItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="relative overflow-x-clip bg-[#f7f4ed] text-[#14171c]">
      {!hasMobileScreenOpen ? (
        <>
          <StorefrontHero
            activeGalleryIndex={activeGalleryIndex}
            activeImage={activeImage}
            activeProduct={activeProduct}
            cartCount={cartCount}
            onOpenCart={() => {
              setIsCheckoutOpen(false);
              setIsCartOpen(true);
            }}
            onSelectHeroImage={(imageIndex) => {
              setSelectedImages((current) => ({ ...current, [activeProduct.id]: imageIndex }));
            }}
            onScrollToSection={scrollToSection}
            progressScale={progressScale}
          />

          <main className="pb-28 sm:pb-24">
            <div className="pointer-events-none fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 xl:block">
              <div className="pointer-events-auto rounded-[28px] border border-[#ddd6ca] bg-[#fbfaf6]/92 p-3 shadow-[0_18px_50px_rgba(17,19,24,0.08)] backdrop-blur-xl">
                <div className="space-y-2">
                  {[
                    ["story", "Story"],
                    ["catalog", "Catalog"],
                    ["guide", "Fit guide"],
                    ["reviews", "Reviews"],
                    ["payments", "Checkout"],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      className="flex w-full items-center justify-between gap-4 rounded-full px-4 py-3 text-sm font-medium text-[#4e544e] transition hover:bg-white hover:text-[#14171c]"
                      onClick={() => scrollToSection(id)}
                      type="button"
                    >
                      <span>{label}</span>
                      <span className="h-2 w-2 rounded-full bg-[#d3ccbf]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <StorefrontBody
              activeProductId={activeProduct.id}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              onScrollToSection={scrollToSection}
              onSelectHeroProduct={setActiveProductId}
              onSelectImage={(productId, imageIndex) => {
                setSelectedImages((current) => ({ ...current, [productId]: imageIndex }));
                setActiveProductId(productId);
              }}
              onSelectSize={(productId, size) => {
                setSelectedSizes((current) => ({ ...current, [productId]: size }));
              }}
              selectedImages={selectedImages}
              selectedSizes={selectedSizes}
            />
          </main>

          <SiteFooter onScrollToSection={scrollToSection} />

          <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#d9d2c6] bg-[#fbfaf6]/95 px-3 py-3 shadow-[0_-12px_30px_rgba(17,19,24,0.06)] backdrop-blur-xl sm:hidden">
            <div className="mx-auto flex max-w-[520px] items-center gap-3">
              <button
                className="min-w-0 flex-1 rounded-full border border-[#d8d1c5] bg-white px-4 py-3 text-left"
                onClick={() => scrollToSection(`product-${activeProduct.id}`)}
                type="button"
              >
                <p className="truncate text-sm font-semibold text-[#14171c]">{activeProduct.name}</p>
                <p className="mt-1 text-xs text-[#687068]">${activeProduct.price}</p>
              </button>
              <button
                className="rounded-full bg-[#171b22] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsCartOpen(true);
                }}
                type="button"
              >
                Cart {cartCount > 0 ? cartCount : ""}
              </button>
            </div>
          </div>
        </>
      ) : null}

      <CartSheet
        isOpen={isCartOpen}
        items={cartItems}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onClose={() => setIsCartOpen(false)}
        onRemove={(itemId) => {
          setCartItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
        }}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cartItems}
        onBackToCart={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={handleOrderComplete}
      />

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
}
