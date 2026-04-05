import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "ASICS Everyday Selection",
  description:
    "Premium ASICS storefront with cleaner product pages, honest reviews, size selection, cart and checkout.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f4ed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body bg-[#f7f4ed] text-[#14171c] antialiased">{children}</body>
    </html>
  );
}
