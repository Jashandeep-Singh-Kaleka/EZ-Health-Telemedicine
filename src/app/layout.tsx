import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "XPress Health — Telemedicine Made Simple",
    template: "%s — XPress Health",
  },
  description:
    "Quality care made convenient, accessible, and tailored just for you. Connect with trusted, licensed healthcare providers for prescriptions, lab tests, consultations, and more.",
  keywords: [
    "telemedicine",
    "telehealth",
    "online doctor",
    "virtual consultation",
    "prescription request",
    "lab tests",
    "healthcare",
    "HIPAA compliant",
    "XPress Health",
  ],
  authors: [{ name: "XPress Health" }],
  creator: "XPress Health",
  metadataBase: new URL("https://xpresshealth.care"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "XPress Health — Telemedicine Made Simple",
    description:
      "Connect with trusted, licensed healthcare providers for prescriptions, lab tests, and virtual consultations — all from home.",
    url: "https://xpresshealth.care",
    siteName: "XPress Health",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XPress Health — Telemedicine Made Simple",
    description:
      "Connect with trusted, licensed healthcare providers for prescriptions, lab tests, and virtual consultations — all from home.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
