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
  title: {
    default: "Modern SaaS Platform - Build the Future",
    template: "%s | Modern SaaS Platform"
  },
  description:
    "Transform your business with our cutting-edge platform designed for scale, performance, and user experience. Built with the latest technologies and best practices.",
  keywords: [
    "SaaS Platform",
    "Business Software",
    "Modern Technology",
    "Scalable Solutions",
    "User Experience",
  ],
  authors: [{ name: "Modern SaaS Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Modern SaaS Platform - Build the Future",
    description: "Transform your business with our cutting-edge platform designed for scale, performance, and user experience.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Modern SaaS Platform",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Modern SaaS Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern SaaS Platform - Build the Future",
    description: "Transform your business with our cutting-edge platform designed for scale, performance, and user experience.",
    creator: "@modernsaas",
    images: ["/og-default.jpg"],
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
