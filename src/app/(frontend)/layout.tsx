import { getBookingPlatform } from '@/lib/data'
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

  return (
    <html lang='en' className={`antialiased`}>
      <body>
        <Header bookingLink={url} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
