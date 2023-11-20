// import { GeistSans } from 'geist/font/sans'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR } from '../constants'
import { NavItem } from '../constants/types'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'MINE',
  description: "Bormy's Management Point of Sales",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ini nanti pindah ke tiap page
  // const isAdmin = false //role === "admin"
  // const isKasir = true
  return (
    <html lang="en">
      <body >
        {/* <Navbar 
          listOfNav={
            (isAdmin ? NAV_ADMIN : (isKasir ? NAV_KASIR : NAV_INVENTARIS))
          }
        /> */}
        <main className='relative overflow-hidden bg_dashboard'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
