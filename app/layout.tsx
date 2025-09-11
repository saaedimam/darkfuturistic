import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "../components/theme-provider"
import { NavProvider } from "../components/nav/NavProvider"
import { Footer } from "../src/components/layout/Footer"
import { SmoothScrollProvider } from "../src/components/SmoothScrollProvider"
import "./globals.css"

export const metadata: Metadata = {
  title: "ioriimasu - Modern Web Platform",
  description:
    "A modern, production-ready website built with Next.js, TypeScript, and Tailwind CSS. Featuring accessibility, performance optimization, and beautiful design.",
  generator: "Next.js",
  keywords: [
    "Web Development",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Accessibility",
    "Performance",
    "Modern Web",
  ],
  authors: [{ name: "ioriimasu Team" }],
  openGraph: {
    title: "ioriimasu - Modern Web Platform",
    description: "A modern, production-ready website built with Next.js, TypeScript, and Tailwind CSS.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ioriimasu Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ioriimasu - Modern Web Platform",
    description: "A modern, production-ready website built with Next.js, TypeScript, and Tailwind CSS.",
    images: ["/og-image.png"],
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
          <SmoothScrollProvider>
            <NavProvider />
            <main id="main-content" className="min-h-screen">
              <Suspense fallback={null}>{children}</Suspense>
            </main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
