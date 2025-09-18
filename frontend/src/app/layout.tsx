import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HotelOps - Hotel Operations Management',
  description: 'Manage hotel operations efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className={inter.className}>
        {children}
        {/* Add mobile-specific styles */}
        <style jsx global>{`
          @media (max-width: 767px) {
            body {
              -webkit-touch-callout: none;
              -webkit-user-select: none;
              -khtml-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              -webkit-tap-highlight-color: transparent;
            }
            
            /* Ensure proper scrolling on mobile */
            html, body {
              height: 100%;
              overflow-x: hidden;
            }
            
            /* Mobile-specific optimizations */
            .mobile-optimized {
              -webkit-overflow-scrolling: touch;
              scroll-behavior: smooth;
            }
          }
        `}</style>
      </body>
    </html>
  )
}