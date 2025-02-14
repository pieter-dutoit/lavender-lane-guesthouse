import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/accommodation',
        destination: '/rooms',
        permanent: true
      },
      {
        source: '/accommodation/double-bed-room',
        destination: '/rooms/double-room',
        permanent: true
      },
      {
        source: '/rooms/three-quarter-bed-room',
        destination: '/rooms/single-room',
        permanent: true
      },
      {
        source: '/accommodation/:path',
        destination: '/rooms/:path',
        permanent: true
      },
      {
        source: '/accommodation-facility/:path*',
        destination: '/#facilities',
        permanent: true
      },
      {
        source: '/our-rooms',
        destination: '/rooms',
        permanent: true
      }
    ]
  }
}

export default withPayload(nextConfig)
