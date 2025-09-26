/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@headlessui/react', 'chart.js', 'react-chartjs-2']
  }
}

module.exports = nextConfig
