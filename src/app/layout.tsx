import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#070913",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Arnav Mahajan | Backend & Distributed Systems Engineer",
  description:
    "Portfolio of Arnav Mahajan — High-throughput distributed systems, concurrent backends in Go, CNCF Meshery contributor, and 1,600+ algorithmic problem solver.",
  keywords: [
    "Arnav Mahajan",
    "Distributed Systems",
    "Backend Engineer",
    "Golang",
    "Kubernetes",
    "Kafka",
    "ClickHouse",
    "AWS",
    "PostgreSQL",
    "KJ Somaiya",
  ],
  authors: [{ name: "Arnav Mahajan" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#070913] text-slate-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
