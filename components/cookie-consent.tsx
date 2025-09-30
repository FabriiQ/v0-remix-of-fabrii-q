'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cookie_consent_choice')
      if (!stored) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const setChoice = (choice: 'accept' | 'reject' | 'customize') => {
    try {
      localStorage.setItem('cookie_consent_choice', choice)
    } catch {}
    if (choice !== 'customize') setVisible(false)
    // For customize, you might open a modal; keeping banner visible for now
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4">
      <div
        className="relative w-full max-w-4xl px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border backdrop-blur-xl"
        style={{
          background: 'rgba(255,255,255,0.9)',
          borderColor: 'rgba(0,0,0,0.08)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
        }}
      >
        <div className="flex flex-col gap-2 items-center sm:flex-row sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-800 text-center">
            You can customize your preferences or learn more in our{' '}
            <Link href="/privacy" className="underline hover:text-gray-900">Privacy Policy</Link>.
          </p>
          <div className="flex items-center gap-2 sm:ml-auto">
            <button
              onClick={() => setChoice('reject')}
              className="px-3 py-1.5 text-xs sm:text-sm rounded-full border border-gray-300 text-gray-800 hover:bg-gray-100 transition"
            >
              Reject All
            </button>
            <button
              onClick={() => setChoice('customize')}
              className="px-3 py-1.5 text-xs sm:text-sm rounded-full border border-gray-300 text-gray-800 hover:bg-gray-100 transition"
            >
              Customize Settings
            </button>
            <button
              onClick={() => setChoice('accept')}
              className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-full text-white transition"
              style={{
                background: 'linear-gradient(135deg, #1F504B, #5A8A84)',
                boxShadow: '0 6px 20px rgba(31,80,75,0.25)'
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
