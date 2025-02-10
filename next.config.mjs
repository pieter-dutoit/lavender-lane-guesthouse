import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/accommodation/:path*',
        destination: '/our-rooms',
        permanent: true
      }
    ]
  }
}

export default withPayload(nextConfig)
