"use client"

import { useState, useEffect } from "react"
import { ContactCollection } from "@/components/aivy/contact-collection"
import { AIVYChatInterface } from "@/components/aivy/aivy-chat-interface"
import { NavBar } from "@/components/nav-bar"
import CookieConsent from "@/components/cookie-consent"

interface ContactInfo {
  name: string
  phone: string
  organization: string
}

export default function AIVYPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)

  // Load onboarding state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aivy_contactInfo')
      const onboarded = localStorage.getItem('aivy_onboarded')
      if (stored && onboarded === 'true') {
        const parsed = JSON.parse(stored) as ContactInfo
        setContactInfo(parsed)
        setHasCompletedOnboarding(true)
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const handleContactComplete = async (contact: ContactInfo) => {
    setIsSubmittingContact(true)
    try {
      // Save contact information to database with proper schema
      const response = await fetch('/api/crm/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contact.name,
          phone: contact.phone,
          organization: contact.organization,
          email: '', // Optional field
          role: '', // Optional field
          source: 'aivy_chat',
          status: 'new',
          metadata: {
            aivy_session: true,
            collected_at: new Date().toISOString(),
            created_via: 'aivy_onboarding'
          }
        })
      })
      
      if (response.ok) {
        setContactInfo(contact)
        setHasCompletedOnboarding(true)
        // Persist onboarding state
        localStorage.setItem('aivy_contactInfo', JSON.stringify(contact))
        localStorage.setItem('aivy_onboarded', 'true')
      } else {
        const errorData = await response.json()
        console.error('Failed to save contact information:', errorData)
        // Still proceed to chat even if saving fails
        setContactInfo(contact)
        setHasCompletedOnboarding(true)
        localStorage.setItem('aivy_contactInfo', JSON.stringify(contact))
        localStorage.setItem('aivy_onboarded', 'true')
      }
    } catch (error) {
      console.error('Error saving contact:', error)
      // Still proceed to chat even if saving fails
      setContactInfo(contact)
      setHasCompletedOnboarding(true)
      localStorage.setItem('aivy_contactInfo', JSON.stringify(contact))
      localStorage.setItem('aivy_onboarded', 'true')
    } finally {
      setIsSubmittingContact(false)
    }
  }

  // Show contact collection flow if not completed
  if (!hasCompletedOnboarding || !contactInfo) {
    return <ContactCollection onComplete={handleContactComplete} isSubmitting={isSubmittingContact} />
  }

  // Show AI chat interface with consistent background
  return (
    <main className="relative h-dvh bg-black text-foreground overflow-hidden flex flex-col">
      {/* Consistent Background with Homepage */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-fabriiq-primary/5 via-background to-fabriiq-teal/5"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10 h-full min-h-0 flex flex-col">
        <NavBar />

        {/* AIVY Chat Interface - Full Screen without page scrolling */}
        <div className="flex-1 min-h-0 pt-20 pb-0">
          <AIVYChatInterface 
            userId={`aivy-${contactInfo.name.replace(/\s+/g, '-').toLowerCase()}`}
            conversationId={`aivy-conversation-${Date.now()}`}
            contactInfo={contactInfo}
          />
        </div>
        
      </div>
      <CookieConsent />
    </main>
  )
}
