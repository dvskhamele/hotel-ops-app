'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import MobileNavigation from '../../components/MobileNavigation'
import MobileRequests from './page-mobile'

export default function Requests() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if user is on mobile device
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  // Render mobile requests page for small screens
  if (isMobile) {
    return <MobileRequests />
  }

  // Desktop version would go here in a real implementation
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={null} onLogout={() => {}} />
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Desktop Version</h1>
          <p className="text-slate-600 mb-6">This is the desktop version of the requests page.</p>
          <p className="text-slate-500 text-sm">Resize your browser window to see the mobile-optimized version.</p>
        </div>
      </main>
    </div>
  )
}