import './globals.css'

import { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleTagManager } from '@next/third-parties/google'

import { getBookingPlatform, getLogo, getSEOConfig } from '@/lib/data'

import Header from './components/header'
import Footer from './components/footer'

import createMetadataConfig from '@/lib/utils/create-metadata-config'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOConfig('home')
  if (!data) return {}
  return createMetadataConfig({ ...data, path: '/' })
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const bookingPlatform = await getBookingPlatform()
  const logoData = await getLogo()

  const enableAnalytics = process.env.ENABLE_ANALYTICS === 'true'
  const gtmId = process.env.GTM_ID

  return (
    <html lang='en' className='scroll-smooth antialiased'>
      {enableAnalytics && gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body>
        {enableAnalytics && <SpeedInsights />}
        <Header bookingLink={bookingPlatform.url} logo={logoData} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
