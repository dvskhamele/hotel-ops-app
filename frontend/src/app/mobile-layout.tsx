import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/safe-area.css'
import '../styles/mobile-dashboard.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HotelOps - Hotel Operations Management',
  description: 'Manage hotel operations efficiently',
}

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="HotelOps" />
        <meta name="theme-color" content="#0d9488" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className + ' mobile-optimized'}>
        {children}
      </body>
    </html>
  )
}