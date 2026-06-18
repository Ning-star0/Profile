import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Footer from "@/components/Footer";
import TopNav from "@/components/TopNav";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ning — Personal Portfolio",
  description: "A bright interactive portfolio about computer science, AI infrastructure, projects, and ideas.",
  openGraph: {
    title: "Ning — Personal Portfolio",
    description: "A bright interactive portfolio about computer science, AI infrastructure, projects, and ideas.",
    siteName: "Ning Personal Portfolio",
    type: "website",
  },
  icons: {
    icon: "/icons/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>
        <TopNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
