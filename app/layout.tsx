import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Concert Ticket",
  description:
    "A beautiful landing page built with Shadcn UI, Next.js 15, Tailwind CSS, and Shadcn UI Blocks.",
  keywords: [
    "Shadcn UI Landing Page",
    "Shadcn UI Blocks",
    "Shadcn UI",
    "Landing Page",
    "Tailwind CSS Landing Page",
    "Beautiful Shadcn UI Landing Page",
    "Next.js 15 Landing Page",
    "Simple Landing Page",
    "Landing Page Template",
    "Landing Page Design",
  ],
  openGraph: {
    type: "website",
    siteName: "ConcertTicketing",
    locale: "en_US",
    url: "https://concert-ticketing-fe.vercel.app",
    title: "Concert Ticket - Beli Tiket Konser Termudah",
    description:
      "Platform pembelian tiket konser terpercaya no. 1 di Indonesia. Temukan tiket konser termurah dan jadwal tur artis favorit.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shadcn UI Landing Page Preview",
      },
    ],
  },
  authors: [
    {
      name: "ConcertTicketing Team",
      url: "https://github.com/arbilaksmana",
    },
  ],
  creator: "Arbi Laksmana",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-16x16.png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
