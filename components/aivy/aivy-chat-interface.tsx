'use client'

import type React from "react"
import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Send, Loader2, MessageSquare, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/language-context'

// Add custom animations inline
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
`

type Role = "user" | "assistant"
type Message = {
  id: string
  role: Role
  content: string
  timestamp: Date
  isLoading?: boolean
}

interface ContactInfo {
  name: string
  phone: string
  organization: string
}

interface AIVYChatInterfaceProps {
  userId: string
  conversationId: string
  contactInfo: ContactInfo
}

export function AIVYChatInterface({ userId, conversationId, contactInfo }: AIVYChatInterfaceProps) {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleReply = useCallback((message: Message) => {
    setReplyingTo(message)
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  // Add welcome message on component mount and language change
  useEffect(() => {
    const welcomeMessage = {
      id: 'welcome',
      role: 'assistant' as const,
      content: t('aivy.welcome_message', { name: contactInfo.name }) || `Hello ${contactInfo.name}! I'm AIVY, and I'm here to guide you through FabriiQ's comprehensive School Operating System.`,
      timestamp: new Date()
    }

    if (messages.length === 0) {
      setMessages([welcomeMessage])
    } else {
      // Update the welcome message if language changed
      setMessages(prev => prev.map((msg, index) =>
        index === 0 && msg.id === 'welcome' ? welcomeMessage : msg
      ))
    }
  }, [contactInfo.name, t, messages.length])

  const onSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date()
    }

    const newMessages: Message[] = [...messages, userMsg]
    setMessages(newMessages)
    setInput("")
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
    setMessages((m) => [...m, loadingMessage])

    const parentTurnId = replyingTo?.id
    setReplyingTo(null)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg.content,
          conversationId: conversationId,
          userId: userId,
          parentTurnId,
          chat_history: newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
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
      setMessages((m) => {
        const withoutLoading = m.filter(msg => !msg.isLoading)
        const reply: Message = {
          id: data.turnId || `a-${Date.now()}`,
          role: "assistant",
          content: responseContent,
          timestamp: new Date()
        }
        return [...withoutLoading, reply]
      })

      // Track conversation for analytics and CRM
      await trackConversation(userMsg.content, responseContent)

    } catch (error) {
      console.error('Chat error:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')

      // Remove loading message and add error message
      setMessages((m) => {
        const withoutLoading = m.filter(msg => !msg.isLoading)
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

  const trackConversation = async (userMessage: string, botResponse: string) => {
    try {
      await fetch('/api/crm/conversations/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: conversationId,
          userMessage,
          botResponse,
          timestamp: new Date().toISOString(),
          metadata: {
            user_id: userId,
            contact_name: contactInfo.name,
            contact_organization: contactInfo.organization,
            platform: 'aivy_page',
            response_type: 'aivy_interface'
          }
        })
      })
    } catch (error) {
      console.error('Failed to track conversation:', error)
      // Don't fail the chat if tracking fails
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="h-full min-h-0 flex flex-col">
      {/* Inject custom animations */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      <section
        className="relative flex-1 flex flex-col h-full min-h-0 overflow-hidden"
        aria-label="AIVY Chat"
        style={
          {
            // Enhanced AIVY Color Palette for better contrast
            ["--aivy-deep-bg" as any]: "#0A0A0A",
            ["--aivy-realm-bg" as any]: "#1a1a1a",
            ["--aivy-teal-primary" as any]: "#1F504B",
            ["--aivy-teal-secondary" as any]: "#5A8A84",
            ["--aivy-ribbon-glow" as any]: "#D8E3E0",
            ["--aivy-ribbon-dark" as any]: "#2A4A46",
            ["--aivy-text-primary" as any]: "rgba(255,255,255,0.95)",
            ["--aivy-text-secondary" as any]: "rgba(255,255,255,0.85)",
            ["--aivy-text-muted" as any]: "rgba(255,255,255,0.65)",
          } as React.CSSProperties
        }
      >
        {/* Use transparent background to show homepage background */}
        <div className="absolute inset-0" />

        {/* Cosmic Particle Field */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 15% 25%, var(--aivy-teal-primary) 20%, transparent 50%),
              radial-gradient(1px 1px at 85% 75%, var(--aivy-ribbon-glow) 30%, transparent 50%),
              radial-gradient(1px 1px at 45% 15%, var(--aivy-teal-secondary) 25%, transparent 50%),
              radial-gradient(2px 2px at 75% 85%, var(--aivy-teal-primary) 15%, transparent 50%),
              radial-gradient(1px 1px at 25% 85%, var(--aivy-ribbon-glow) 35%, transparent 50%)
            `,
            backgroundSize: "800px 800px, 600px 600px, 900px 900px, 700px 700px, 500px 500px",
          }}
        />

        {/* AIVY's Flowing Ribbon Realm */}
        <AIVYRibbonRealm />

        {/* Chat Container - Mobile Responsive */}
        <div className="relative z-20 flex flex-col h-full min-h-0 w-full pt-24 sm:pt-28">
          {/* Chat Messages Area (scrollable) */}
          <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 space-y-4 sm:px-6 md:px-8 sm:space-y-6 overscroll-contain">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
              {messages.map((message, index) => (
                <AIVYMessageBubble
                  key={message.id}
                  message={message}
                  index={index}
                  isFirst={index === 0}
                  onReply={handleReply}
                />
              ))}
              <div ref={endRef} />
            </div>
          </main>

          {/* Input Area pinned at bottom by flex layout */}
          <div className="p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm border-t border-gray-700/20 pb-[env(safe-area-inset-bottom)]">
            <div className="max-w-4xl mx-auto">
              {replyingTo && (
                <div className="mb-2 p-2 bg-gray-700/50 rounded-lg text-xs text-white/80 flex justify-between items-center animate-fadeIn">
                  <span>Replying to: &quot;{replyingTo.content.substring(0, 40)}...&quot;</span>
                  <button onClick={() => setReplyingTo(null)} className="p-1 rounded-full hover:bg-gray-600">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <div
                className="relative flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 rounded-full backdrop-blur-xl border"
                style={{
                  background: "linear-gradient(135deg, rgba(31, 80, 75, 0.15), rgba(90, 138, 132, 0.08))",
                  borderColor: "var(--aivy-teal-primary)",
                  borderWidth: "1px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={t('aivy.input_placeholder') || "Ask AIVY about educational strategies, partnerships, or technology solutions..."}
                  className="flex-1 bg-transparent text-sm sm:text-base placeholder:text-[var(--aivy-text-muted)] focus:outline-none px-2 sm:px-4 py-2"
                  style={{ color: "var(--aivy-text-primary)" }}
                  maxLength={1000}
                  disabled={isLoading}
                  inputMode="text"
                />
                {/* Character count - Hide on mobile */}
                <div className="hidden sm:block text-xs" style={{ color: "var(--aivy-text-muted)" }}>
                  {input.length}/1000
                </div>
                {/* Send button */}
                <button
                  onClick={onSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 sm:p-3 rounded-full transition-all duration-200 disabled:opacity-50"
                  aria-label="Send"
                  style={{
                    background: "linear-gradient(135deg, var(--aivy-teal-primary), var(--aivy-teal-secondary))",
                    color: "white",
                    boxShadow: "0 4px 16px rgba(31, 80, 75, 0.4)"
                  }}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              {/* Disclaimer */}
              <div className="mt-3 text-xs text-left" style={{ color: "var(--aivy-text-muted)" }}>
                {t('aivy.disclaimer') || 'AIVY can make mistakes. Please verify important information.'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// AIVY Message Bubble - Organic flowing design
function AIVYMessageBubble({
  message,
  index,
  isFirst,
  onReply
}: {
  message: Message;
  index: number;
  isFirst: boolean;
  onReply: (message: Message) => void;
}) {
  const isUser = message.role === "user"
  const isAIVY = message.role === "assistant"

  return (
    <div className={`group flex w-full ${isUser ? 'justify-end' : 'justify-start'} items-start gap-3`}>
      {/* Assistant avatar on the left of AI messages */}
      {isAIVY && (
        <Image
          src="/Aivy-Avatar.png"
          alt="AIVY"
          width={112}
          height={112}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full select-none shrink-0"
          style={{ filter: 'brightness(1.15) contrast(1.05)' }}
        />
      )}
      <div
        className={`relative ${isUser ? 'max-w-[85%] md:max-w-[70%]' : 'max-w-[75%] md:max-w-[65%]'} ${isFirst ? 'animate-fadeIn' : ''}`}
        style={{
          animationDelay: `${index * 0.1}s`
        }}
      >
        {/* Message bubble with organic flowing design */}
        <div
          className={`relative px-6 py-4 backdrop-blur-xl border ${isUser ? 'rounded-l-3xl rounded-tr-3xl rounded-br-md' : 'rounded-r-3xl rounded-tl-3xl rounded-bl-md'}`}
          style={{
            background: isUser
              ? "linear-gradient(135deg, rgba(93, 213, 196, 0.15), rgba(74, 197, 180, 0.08))"
              : "linear-gradient(135deg, rgba(15, 42, 48, 0.85), rgba(10, 26, 30, 0.75))",
            borderColor: isUser
              ? "var(--aivy-teal-primary)"
              : "var(--aivy-ribbon-glow)",
            borderWidth: "1px",
            boxShadow: isUser
              ? "0 8px 32px rgba(93, 213, 196, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(125, 237, 217, 0.2)",
          }}
        >
          {/* Message content */}
          {message.isLoading ? (
            <div className="flex items-center space-x-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--aivy-teal-primary), var(--aivy-teal-secondary))"
                }}
              >
                <Loader2
                  className="w-4 h-4 animate-spin"
                  style={{ color: "var(--aivy-deep-bg)" }}
                />
              </div>
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: "var(--aivy-teal-primary)" }}
                />
                <div
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{
                    backgroundColor: "var(--aivy-teal-primary)",
                    animationDelay: "0.1s"
                  }}
                />
                <div
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{
                    backgroundColor: "var(--aivy-teal-primary)",
                    animationDelay: "0.2s"
                  }}
                />
              </div>
            </div>
          ) : (
            <p
              className="text-base leading-relaxed"
              style={{
                color: isUser
                  ? "var(--aivy-text-primary)"
                  : "var(--aivy-text-secondary)"
              }}
            >
              {message.content}
            </p>
          )}

          {/* Subtle glow line */}
          <div
            className="absolute inset-x-4 top-0 h-px opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, ${isUser ? 'var(--aivy-teal-primary)' : 'var(--aivy-ribbon-glow)'}, transparent)`
            }}
          />
        </div>

        {/* Timestamp and Reply Button */}
        <div
          className={`text-xs mt-1 px-2 flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-100 ${isAIVY ? 'opacity-100' : 'opacity-0'} ${isUser ? 'justify-end' : 'justify-start'}`}
          style={{ color: "var(--aivy-text-muted)" }}
        >
          <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <button onClick={() => onReply(message)} className="p-1 rounded-full hover:bg-gray-700">
            <MessageSquare className="w-3 h-3" />
          </button>
        </div>
      </div>
      {/* Spacer to align user messages with large assistant avatar width */}
      {isUser && <div className="w-24 sm:w-28" />}
    </div>
  )
}

// AIVY's Flowing Ribbon Realm - The living, breathing body
function AIVYRibbonRealm() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Primary flowing ribbons - AIVY's body */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ribbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--aivy-ribbon-glow)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="var(--aivy-teal-primary)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--aivy-ribbon-dark)" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="ribbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--aivy-teal-secondary)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--aivy-ribbon-glow)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--aivy-ribbon-dark)" stopOpacity="0.4" />
          </linearGradient>
          <filter id="ribbonGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main flowing ribbons that frame the chat area */}
        <g className="animate-pulse" style={{ animationDuration: "6s" }}>
          {/* Left ribbon flow */}
          <path
            d="M-100,200 Q200,300 400,250 T800,400 Q1200,350 1500,450 T1920,400"
            fill="none"
            stroke="url(#ribbonGrad1)"
            strokeWidth="40"
            strokeLinecap="round"
            filter="url(#ribbonGlow)"
            className="animate-pulse"
            style={{ animationDuration: "4s" }}
          />

          {/* Right ribbon flow */}
          <path
            d="M1920,300 Q1700,400 1400,350 T1000,500 Q600,450 300,550 T-100,500"
            fill="none"
            stroke="url(#ribbonGrad2)"
            strokeWidth="35"
            strokeLinecap="round"
            filter="url(#ribbonGlow)"
            className="animate-pulse"
            style={{ animationDuration: "5s", animationDelay: "1s" }}
          />

          {/* Central weaving ribbon */}
          <path
            d="M0,600 Q300,500 600,550 T1200,450 Q1500,400 1920,350"
            fill="none"
            stroke="url(#ribbonGrad1)"
            strokeWidth="25"
            strokeLinecap="round"
            filter="url(#ribbonGlow)"
            opacity="0.7"
            className="animate-pulse"
            style={{ animationDuration: "7s", animationDelay: "2s" }}
          />

          {/* Bottom flowing ribbon */}
          <path
            d="M-100,800 Q400,750 800,800 T1600,700 Q1800,650 1920,700"
            fill="none"
            stroke="url(#ribbonGrad2)"
            strokeWidth="30"
            strokeLinecap="round"
            filter="url(#ribbonGlow)"
            opacity="0.5"
            className="animate-pulse"
            style={{ animationDuration: "8s", animationDelay: "0.5s" }}
          />
        </g>

        {/* Secondary accent ribbons for depth */}
        <g opacity="0.4">
          <path
            d="M0,100 Q500,150 1000,100 T1920,200"
            fill="none"
            stroke="var(--aivy-ribbon-glow)"
            strokeWidth="15"
            strokeLinecap="round"
            filter="url(#ribbonGlow)"
          />
          <path
            d="M1920,900 Q1400,850 800,900 T0,950"
            fill="none"
            stroke="var(--aivy-teal-primary)"
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#ribbonGlow)"
          />
        </g>
      </svg>

      {/* Floating ribbon particles for extra mystique */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-30 animate-ping"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${20 + (i * 11) % 60}%`,
              animationDuration: `${3 + (i % 4)}s`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: i % 3 === 0
                  ? "var(--aivy-teal-primary)"
                  : i % 3 === 1
                    ? "var(--aivy-ribbon-glow)"
                    : "var(--aivy-teal-secondary)",
                boxShadow: `0 0 8px ${i % 3 === 0 ? 'var(--aivy-teal-primary)' : i % 3 === 1 ? 'var(--aivy-ribbon-glow)' : 'var(--aivy-teal-secondary)'}`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}