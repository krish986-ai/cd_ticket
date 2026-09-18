import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodersEra | Virtual Pass & Ticket Portal",
  description: "Official event pass generation and verification system for CodersEra developer community events and hackathons.",
  keywords: ["CodersEra", "Student Developer Community", "Hackathons", "NIET", "Virtual Pass", "Ticket System"],
  authors: [{ name: "CodersEra Community" }],
  icons: {
    icon: "/codersera-logo-original.jpg",
    apple: "/codersera-logo-original.jpg",
  },
  openGraph: {
    title: "CodersEra | Virtual Pass & Ticket Portal",
    description: "Official event pass generation and verification system for CodersEra community events.",
    type: "website",
    locale: "en_IN",
    siteName: "CodersEra",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodersEra | Virtual Pass & Ticket Portal",
    description: "Official event pass generation and verification system for CodersEra community events.",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#09090b] text-[#fafafa] selection:bg-[#38bdf8] selection:text-[#09090b]">
        {children}
      </body>
    </html>
  );
}