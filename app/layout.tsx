import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "../components/theme-provider"
import { Header } from "../src/components/layout/Header"
import { SmoothScrollProvider } from "../src/components/SmoothScrollProvider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lumina - Modern SaaS Platform",
  description:
    "A production-grade Next.js SaaS platform with modern design, accessibility, and performance. Built with TypeScript, Tailwind CSS, and shadcn/ui.",
  generator: "Next.js",
  keywords: [
    "SaaS Platform",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Accessibility",
    "Performance",
  ],
  authors: [{ name: "Lumina Team" }],
  openGraph: {
    title: "Lumina - Modern SaaS Platform",
    description: "A production-grade Next.js SaaS platform with modern design, accessibility, and performance.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lumina Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina - Modern SaaS Platform",
    description: "A production-grade Next.js SaaS platform with modern design, accessibility, and performance.",
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
            <Header />
            <main id="main-content" className="min-h-screen">
              <Suspense fallback={null}>{children}</Suspense>
            </main>
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
