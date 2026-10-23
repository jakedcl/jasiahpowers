import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // The Studio folder has its own Sanity install. The Next app must keep
    // using the root copies, or /studio pulls Sanity 4 into this React 18 build.
    config.resolve.modules = [
      path.join(root, 'node_modules'),
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : ['node_modules']),
    ]
    if (isServer) {
      config.externals.push('@sanity/orderable-document-list')
    }
    return config
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/admin', destination: '/studio', permanent: false },
    ]
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverComponentsExternalPackages: [
      'sanity',
      '@sanity/vision',
      '@sanity/orderable-document-list',
      'styled-components',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    // Sanity's CDN does the resizing; Vercel does zero image transformations.
    loader: 'custom',
    loaderFile: './src/lib/sanityImageLoader.js',
  },
}

export default nextConfig
