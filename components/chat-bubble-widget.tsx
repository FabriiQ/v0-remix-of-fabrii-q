'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { AIChat } from '@/components/ai/AIChat'

export default function ChatBubbleWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Hide on AIVY dedicated page
  if (pathname?.startsWith('/aivy')) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="group relative p-2 rounded-full transition-transform duration-300 hover:scale-105"
          aria-label="Open AIVY Chat"
        >
          {/* Small talk bubble above avatar */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full text-[10px] font-medium text-white bg-black/70 border border-white/10 shadow-lg whitespace-nowrap">
            Talk to AIVY
          </div>
          {/* Avatar + label */}
          <div className="flex flex-col items-center">
            <img
              src="/Aivy-Avatar.png"
              alt="AIVY"
              className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full select-none shadow-lg aivy-float"
            />
            {/* Single dark-green revolving dot */}
            <span className="aivy-single-orbit pointer-events-none" aria-hidden="true">
              <span className="aivy-single-rotor">
                <span className="aivy-single-dot" />
              </span>
            </span>
            <span className="mt-1 text-[11px] md:text-[12px] font-semibold text-white/90 tracking-wide aivy-label">
              AIVY
            </span>
          </div>
          <style jsx>{`
            @keyframes aivyFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
            .aivy-float { animation: aivyFloat 3s ease-in-out infinite; }
            .aivy-label { opacity: 0.9; transition: opacity 200ms ease; }
            .group:hover .aivy-label { opacity: 1; }

            /* Single orbit setup */
            .aivy-single-orbit { position: absolute; left: 50%; top: 50%; width: 88px; height: 88px; margin-left: -44px; margin-top: -44px; }
            .aivy-single-rotor { position: absolute; inset: 0; animation: aivy-single-spin 2.2s linear infinite; }
            .aivy-single-dot { position: absolute; top: 0; left: 50%; width: 6px; height: 6px; border-radius: 9999px; transform: translateX(-50%); background: #1F504B; box-shadow: 0 0 10px rgba(31,80,75,0.9), 0 0 18px rgba(31,80,75,0.6); }
            @keyframes aivy-single-spin { to { transform: rotate(360deg); } }

            @media (max-width: 480px) {
              .aivy-single-orbit { width: 72px; height: 72px; margin-left: -36px; margin-top: -36px; }
            }
          `}</style>
        </button>
      ) : (
        <div className="w-[480px] max-w-[calc(100vw-2rem)] h-[700px] max-h-[85vh] flex flex-col overflow-hidden rounded-2xl border"
          style={{ borderColor: 'rgba(216,227,224,0.25)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 bg-black/50 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center gap-2">
              <img src="/Aivy-Avatar.png" alt="AIVY" className="w-7 h-7 rounded-full" />
              <span className="text-sm font-semibold text-white">AIVY</span>
              <span className="text-[11px] text-white/60 px-2 py-0.5 rounded-full border border-white/10">Executive AI</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" aria-hidden="true" />
                Online
              </span>
              <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white text-xl font-bold" aria-label="Close">×</button>
            </div>
          </div>
          {/* Body */}
          <div className="flex-1 overflow-hidden bg-black/40 backdrop-blur-sm">
            <AIChat
              userId="global-widget-visitor"
              conversationId={`widget-${Date.now()}`}
              className="h-full"
              showHeader={false}
            />
          </div>
        </div>
      )}
    </div>
  )
}
