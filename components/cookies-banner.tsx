'use client'

import { useEffect, useState } from 'react'

export function CookiesBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fabriiq-cookies-consent')
      if (!stored) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const setChoice = (choice: 'accept' | 'reject' | 'customize') => {
    try {
      localStorage.setItem('fabriiq-cookies-consent', choice)
    } catch {}
    // Hide banner for accept/reject; keep visible for customize to nudge navigation to policy page
    if (choice !== 'customize') setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div
        className="relative w-full max-w-5xl px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.65), rgba(31,80,75,0.35))',
          borderColor: 'rgba(216, 227, 224, 0.25)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.35)'
        }}
      >
        <div className="flex flex-col gap-2 items-center sm:flex-row sm:gap-4">
          <p className="text-xs sm:text-sm text-white/90 text-center">
            You can customize your preferences or learn more in our{' '}
            <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.
          </p>
          <div className="flex items-center gap-2 sm:ml-auto">
            <button
              onClick={() => setChoice('reject')}
              className="px-3 py-1.5 text-xs sm:text-sm rounded-full border border-white/30 text-white/90 hover:bg-white/10 transition"
            >
              Reject All
            </button>
            <button
              onClick={() => setChoice('customize')}
              className="px-3 py-1.5 text-xs sm:text-sm rounded-full border border-white/30 text-white/90 hover:bg-white/10 transition"
            >
              Customize Settings
            </button>
            <button
              onClick={() => setChoice('accept')}
              className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-full text-white transition"
              style={{
                background: 'linear-gradient(135deg, #1F504B, #5A8A84)',
                boxShadow: '0 6px 20px rgba(31,80,75,0.4)'
              }}
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}