import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import "./globals.css"

export const metadata: Metadata = {
  title: "StitchOS - Industrial Textile Software Platform",
  description:
    "Premium SaaS platform for textile manufacturing: RFID tracking, production analytics, and industrial automation. Built for the future of textile operations.",
  generator: "v0.app",
  keywords: [
    "Textile Software",
    "RFID Tracking",
    "Manufacturing Analytics",
    "Industrial SaaS",
    "Production Management",
  ],
  authors: [{ name: "StitchOS Team" }],
  openGraph: {
    title: "StitchOS - Industrial Textile Software Platform",
    description: "Premium SaaS platform for textile manufacturing with RFID tracking and production analytics.",
    type: "website",
    images: [
      {
        url: "/assets/og-default.webp",
        width: 1200,
        height: 630,
        alt: "StitchOS Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StitchOS - Industrial Textile Software Platform",
    description: "Premium SaaS platform for textile manufacturing with RFID tracking and production analytics.",
    images: ["/assets/og-default.webp"],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.jpg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0B1F3A" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>
            <Suspense fallback={null}>{children}</Suspense>
          </main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
