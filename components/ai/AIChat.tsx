'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { ContactCollection as SimpleContactCollection } from './ContactCollection'
import { ContactCollection as AIVYContactCollection } from '../aivy/contact-collection'
interface ContactInfo {
  name: string
  phone: string
  email?: string
  organization?: string
  role?: string
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isLoading?: boolean
}

interface AIChatProps {
  userId?: string
  conversationId?: string
  className?: string
  skipContactCollection?: boolean
  contactInfo?: {
    name: string
    phone: string
    organization: string
  }
  showHeader?: boolean
}

export function AIChat({ userId, conversationId, className = '', skipContactCollection = false, contactInfo, showHeader = true }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showContactCollection, setShowContactCollection] = useState(!skipContactCollection)
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Add welcome message when skipping contact collection (for AIVY)
  useEffect(() => {
    if (skipContactCollection && contactInfo && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `Hello ${contactInfo.name}! I'm AIVY, your intelligent conversation partner for educational leadership. I specialize in helping C-level executives${contactInfo.organization ? ' at ' + contactInfo.organization : ''} explore transformative educational technology solutions. What strategic challenge can I help you address today?`,
        timestamp: new Date()
      }])
    }
  }, [skipContactCollection, contactInfo, messages.length])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    // Add loading message
    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true
    }
    setMessages(prev => [...prev, loadingMessage])

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationId: conversationId || 'default',
          userId: userId
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Remove loading message and add AI response
      const responseContent = data.response || 'I apologize, but I couldn\'t generate a response. Please try again.'
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading)
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseContent,
          timestamp: new Date()
        }
        return [...withoutLoading, aiMessage]
      })

      // Track conversation for analytics and CRM
      await trackConversation(userMessage.content, responseContent)

    } catch (error) {
      console.error('Chat error:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
      
      // Remove loading message and add error message
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading)
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment.',
          timestamp: new Date()
        }
        return [...withoutLoading, errorMessage]
      })
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearError = () => setError(null)

  const trackConversation = async (userMessage: string, botResponse: string) => {
    try {
      await fetch('/api/crm/conversations/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: conversationId || `homepage-${Date.now()}`,
          userMessage,
          botResponse,
          timestamp: new Date().toISOString(),
          metadata: {
            user_id: userId,
            platform: 'homepage_chat',
            response_type: 'ai_chat'
          }
        })
      })
    } catch (error) {
      console.error('Failed to track conversation:', error)
      // Don't fail the chat if tracking fails
    }
  }

  const handleContactSubmit = async (contactInfo: ContactInfo) => {
    setIsSubmittingContact(true)
    try {
      // Submit contact information to CRM contacts API (same as AIVY uses)
      const response = await fetch('/api/crm/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactInfo.name,
          phone: contactInfo.phone,
          email: contactInfo.email || '',
          organization: contactInfo.organization || '',
          role: contactInfo.role || '',
          source: 'homepage_chat',
          status: 'new',
          metadata: {
            chat_session: true,
            collected_at: new Date().toISOString(),
            conversation_id: conversationId,
            user_id: userId
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Contact submission failed:', errorData)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Contact saved successfully:', data)
      
      // Hide contact collection and show welcome message
      setShowContactCollection(false)
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `Hello ${contactInfo.name}! I'm AIVY, and I'm here to guide you through FabriiQ's comprehensive School Operating System.`,
        timestamp: new Date()
      }])

    } catch (error) {
      console.error('Contact submission error:', error)
      setError('Failed to submit contact information. Please try again.')
      // Still proceed to chat even if saving fails
      setShowContactCollection(false)
      setMessages([{
        id: 'welcome',
        role: 'assistant', 
        content: `Hello ${contactInfo.name}! I'm AIVY, and I'm here to guide you through FabriiQ's comprehensive School Operating System.`,
        timestamp: new Date()
      }])
    } finally {
      setIsSubmittingContact(false)
    }
  }

  return (
    <div className={`flex flex-col h-full rounded-lg overflow-hidden ${className}`}>
      {/* Slim Header with AIVY avatar (optional) */}
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800/20 bg-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <img src="/Aivy-Avatar.png" alt="AIVY" className="w-8 h-8 rounded-full" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">AIVY</div>
              <div className="text-[11px] text-white/60">Executive Intelligence</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" aria-hidden="true" />
            <span>Online</span>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="p-3 bg-red-50 border-b border-red-200 text-red-700 text-sm flex justify-between items-center">
          <span>{error}</span>
          <button 
            onClick={clearError}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            ×
          </button>
        </div>
      )}

      {/* Contact Collection or Messages */}
      {showContactCollection ? (
        <div className="flex-1 overflow-y-auto">
          <AIVYContactCollection
            onComplete={(contact) => handleContactSubmit({
              name: contact.name,
              phone: contact.phone,
              email: '',
              organization: contact.organization,
              role: ''
            })}
            isSubmitting={isSubmittingContact}
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}
            >
              {/* Assistant avatar using AIVY image */}
              {message.role === 'assistant' && (
                <img src="/Aivy-Avatar.png" alt="AIVY" className="w-12 h-12 rounded-full select-none shrink-0" />
              )}
              {/* Message Bubble styled like AIVY */}
              <div className={`relative ${message.role === 'user' ? 'max-w-[85%] md:max-w-[70%]' : 'max-w-[75%] md:max-w-[65%]'}`}>
                <div
                  className={`relative px-5 py-3 backdrop-blur-xl border ${message.role === 'user' ? 'rounded-l-3xl rounded-tr-3xl rounded-br-md' : 'rounded-r-3xl rounded-tl-3xl rounded-bl-md'}`}
                  style={{
                    background: message.role === 'user'
                      ? 'linear-gradient(135deg, rgba(93, 213, 196, 0.15), rgba(74, 197, 180, 0.08))'
                      : 'linear-gradient(135deg, rgba(15, 42, 48, 0.85), rgba(10, 26, 30, 0.75))',
                    borderColor: message.role === 'user' ? '#1F504B' : '#D8E3E0',
                    borderWidth: '1px',
                    boxShadow: message.role === 'user'
                      ? '0 8px 32px rgba(93, 213, 196, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(125, 237, 217, 0.2)'
                  }}
                >
                  {message.isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#5A8A84] rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-[#5A8A84] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-[#5A8A84] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: message.role === 'user' ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)' }}>
                      {message.content}
                    </div>
                  )}
                  {/* Subtle glow line */}
                  <div className="absolute inset-x-4 top-0 h-px opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${message.role === 'user' ? '#1F504B' : '#D8E3E0'}, transparent)` }} />
                </div>
                {/* Timestamp */}
                <div className={`text-xs mt-1 px-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`} style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {/* Spacer to align user messages with avatar width */}
              {message.role === 'user' && <div className="w-12" />}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input - Only show when not collecting contact info */}
      {!showContactCollection && (
        <div className="border-t border-gray-800/20 p-4 bg-black/40 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-3 p-3 rounded-full border" style={{
            background: 'linear-gradient(135deg, rgba(31, 80, 75, 0.15), rgba(90, 138, 132, 0.08))',
            borderColor: '#1F504B'
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask AIVY about educational strategies, partnerships, or technology solutions..."
              className="flex-1 bg-transparent px-3 py-2 text-white placeholder:text-white/60 focus:outline-none"
              disabled={isLoading}
              maxLength={1000}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-full disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #1F504B, #5A8A84)', color: 'white' }}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="max-w-4xl mx-auto text-right text-xs text-white/60 mt-2">{input.length}/1000</div>
        </div>
      )}
    </div>
  )
}
