import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XPress Health - Telemedicine Platform",
  description: "Fast, secure, and reliable healthcare at your fingertips - connecting patients with healthcare providers through XPress Health",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-emerald-50 to-green-50`}>
        {children}
      </body>
    </html>
  );
}
