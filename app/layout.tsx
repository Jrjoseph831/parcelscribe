import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.parcelscribe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Parcelscribe — UPS/FedEx Claim Packet Builder",
    template: "%s | Parcelscribe",
  },
  description:
    "Generate a carrier-ready claim packet PDF for UPS or FedEx (damage, loss, missing contents) with photos, proof of value, and narrative in minutes.",
  openGraph: {
    title: "Parcelscribe — UPS/FedEx Claim Packet Builder",
    description:
      "Generate a carrier-ready claim packet PDF for UPS or FedEx (damage, loss, missing contents) with photos, proof of value, and narrative in minutes.",
    url: siteUrl,
    siteName: "Parcelscribe",
    images: ["/opengraph-image"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parcelscribe — UPS/FedEx Claim Packet Builder",
    description:
      "Generate a carrier-ready claim packet PDF for UPS or FedEx (damage, loss, missing contents) with photos, proof of value, and narrative in minutes.",
    images: ["/twitter-image"],
    site: "@parcelscribe",
  },
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#fafafa]`}
      >
        {children}
      </body>
    </html>
  );
}
