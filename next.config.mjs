/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
}

export default nextConfig
