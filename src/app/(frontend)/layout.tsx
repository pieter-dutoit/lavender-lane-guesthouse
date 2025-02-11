import './globals.css'

import { getBookingPlatform, getLogo, getSEOConfig } from '@/lib/data'

import Header from './components/header'
import Footer from './components/footer'
import { Metadata } from 'next'
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
  const { url } = bookingPlatform

  const logoData = await getLogo()

  return (
    <html lang='en' className='scroll-smooth antialiased'>
      <body>
        <Header bookingLink={url} logo={logoData} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
