/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: false,
  },
  webpack: (config) => {
    // Required for react-pdf / pdfjs-dist
    config.resolve.alias.canvas = false
    return config
  },
}

module.exports = nextConfig
