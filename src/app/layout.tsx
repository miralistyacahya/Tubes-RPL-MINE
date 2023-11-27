// import { GeistSans } from 'geist/font/sans'
import Footer from '../components/navigation/Footer';
import React from 'react';
import './globals.css';

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
  return (
    <html lang="en">
      <body className='flex flex-col min-h-screen'>
        <main className='relative overflow-hidden bg_dashboard flex-1'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
