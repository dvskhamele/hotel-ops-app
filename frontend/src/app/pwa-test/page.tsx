'use client'

import React from 'react'
import { usePWA } from '../../context/PWAContext'

export default function PWATestPage() {
  const { isReady, isUpdated, updateAvailable, version, updateServiceWorker, sendPushNotification } = usePWA()

  const testPushNotification = () => {
    sendPushNotification('Test Notification', {
      body: 'This is a test push notification from HotelOps',
      icon: '/icons/icon-192x192.png'
    })
  }

  const triggerUpdate = () => {
    if (updateAvailable) {
      updateServiceWorker()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">PWA Test Page</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Service Worker Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Service Worker Ready:</span>
                  <span className={`font-medium ${isReady ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isReady ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Update Available:</span>
                  <span className={`font-medium ${updateAvailable ? 'text-amber-600' : 'text-slate-600'}`}>
                    {updateAvailable ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Service Worker Updated:</span>
                  <span className={`font-medium ${isUpdated ? 'text-emerald-600' : 'text-slate-600'}`}>
                    {isUpdated ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Version:</span>
                  <span className="font-medium">
                    {version || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">PWA Features</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Push Notifications:</span>
                  <span className={`font-medium ${'serviceWorker' in navigator && 'PushManager' in window ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {'serviceWorker' in navigator && 'PushManager' in window ? 'Supported' : 'Not Supported'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Background Sync:</span>
                  <span className={`font-medium ${'serviceWorker' in navigator && 'sync' in window ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {'serviceWorker' in navigator && 'sync' in window ? 'Supported' : 'Not Supported'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Periodic Sync:</span>
                  <span className={`font-medium ${'serviceWorker' in navigator && 'periodicSync' in window ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {'serviceWorker' in navigator && 'periodicSync' in window ? 'Supported' : 'Not Supported'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Test Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={testPushNotification}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                Send Test Notification
              </button>
              
              {updateAvailable && (
                <button
                  onClick={triggerUpdate}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                >
                  Update Service Worker
                </button>
              )}
              
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
              >
                Reload Page
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Installation Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Display Mode:</span>
                <span className="font-medium">
                  {window.matchMedia('(display-mode: standalone)').matches ? 'Standalone (Installed)' : 'Browser'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Orientation:</span>
                <span className="font-medium">
                  {window.matchMedia('(orientation: portrait)').matches ? 'Portrait' : 'Landscape'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}