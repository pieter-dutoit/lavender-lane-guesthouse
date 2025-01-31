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
        <main>{children}</main>
      </body>
    </html>
  )
}
