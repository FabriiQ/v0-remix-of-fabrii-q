'use client'

import { AIVYChatInterface as AivyChat } from '@/components/aivy/aivy-chat-interface'
import CookieConsent from '@/components/cookie-consent'

export default function AIDemoPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-gray-100 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">AIVY - Live Demo</h3>
          <p className="text-sm text-gray-500">
            Interact with the agentic system. Ask it to schedule a meeting or summarize a document.
          </p>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <AivyChat
            contactInfo={{ name: 'Demo User', phone: 'N/A', organization: 'Demo Org' }}
            userId="demo-user"
            conversationId="demo-conversation-full"
          />
        </div>
      </div>
      <CookieConsent />
    </div>
  )
}