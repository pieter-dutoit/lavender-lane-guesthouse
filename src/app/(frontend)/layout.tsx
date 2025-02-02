import Header from './components/header'
import './globals.css'
import { playfair } from '@/fonts'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${playfair.className} antialiased`}>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
