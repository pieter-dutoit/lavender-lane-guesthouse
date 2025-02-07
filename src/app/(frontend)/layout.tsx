import { getBookingPlatform, getLogo } from '@/lib/data'
import Header from './components/header'
import './globals.css'
import Footer from './components/footer'
// import { playfair } from '@/fonts'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const bookingPlatform = await getBookingPlatform()
  const { url } = bookingPlatform

  const logoData = await getLogo()

  return (
    <html lang='en' className={`antialiased`}>
      <body>
        <Header bookingLink={url} logo={logoData} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
