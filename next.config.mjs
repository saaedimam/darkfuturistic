/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  eslint: {
    // Enforce linting during builds
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Enforce type-checking during builds
    ignoreBuildErrors: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
