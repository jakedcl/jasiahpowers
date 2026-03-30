/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/home', destination: '/', permanent: true }]
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
