import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0b0c0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Arnav Mahajan — Systems & Distributed Backend Engineering",
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
      <body className="antialiased bg-[var(--ink)] text-[var(--bone)] min-h-screen selection:bg-[var(--amber)] selection:text-[var(--ink)] font-mono">
        {children}
      </body>
    </html>
  );
}
