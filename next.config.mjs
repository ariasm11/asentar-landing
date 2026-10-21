/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Short tracking links printed on event materials (QR codes). Temporary (307),
  // so the destination can change per campaign without browsers caching it.
  async redirects() {
    return [
      {
        source: '/aff',
        destination: '/?utm_source=remera&utm_medium=evento&utm_campaign=aff2026',
        permanent: false,
      },
      {
        source: '/t',
        destination: '/?utm_source=tarjeta&utm_medium=evento&utm_campaign=aff2026',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
