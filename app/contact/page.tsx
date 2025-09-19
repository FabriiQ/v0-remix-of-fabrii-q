"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CodeRain } from "@/components/code-rain"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Bot,
  User,
  Sparkles,
  Linkedin,
  Github,
  Globe,
  MessageSquare,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ContactPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Weltivation's AI assistant. How can I help you with your project today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Enhanced AI response function with more intelligent responses
  const generateAdvancedBotResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase()

    // Advanced pricing responses
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("budget")) {
      if (lowerMessage.includes("web") || lowerMessage.includes("website")) {
        return "For web development projects, our pricing typically ranges from $5,000 for basic websites to $50,000+ for complex enterprise applications. Factors affecting cost include: custom functionality, integrations, user authentication, payment processing, and scalability requirements. Would you like me to connect you with our team for a detailed quote based on your specific needs?"
      }
      if (lowerMessage.includes("mobile") || lowerMessage.includes("app")) {
        return "Mobile app development costs vary significantly based on complexity. Simple apps start around $8,000, while feature-rich applications can reach $80,000+. Key factors include: platform choice (iOS/Android/both), custom UI/UX design, backend complexity, third-party integrations, and ongoing maintenance. I can schedule a technical consultation to provide accurate estimates for your project."
      }
      return "Our project costs are tailored to your specific requirements and business goals. We offer transparent pricing with detailed breakdowns covering development, testing, deployment, and support. Typical ranges: Basic projects ($5K-$15K), Medium complexity ($15K-$50K), Enterprise solutions ($50K+). Would you like to discuss your project requirements for a personalized quote?"
    }

    // Technical expertise responses
    if (
      lowerMessage.includes("technology") ||
      lowerMessage.includes("tech stack") ||
      lowerMessage.includes("framework")
    ) {
      return "We specialize in cutting-edge technologies: Frontend (React, Next.js, Vue.js, TypeScript), Backend (Node.js, Python, Java, .NET), Databases (PostgreSQL, MongoDB, Redis), Cloud (AWS, Azure, GCP), Mobile (React Native, Flutter, Swift, Kotlin), and AI/ML (TensorFlow, PyTorch, OpenAI). Our team stays current with industry best practices and emerging technologies. What specific technology challenges are you facing?"
    }

    // Project timeline responses
    if (lowerMessage.includes("time") || lowerMessage.includes("timeline") || lowerMessage.includes("deadline")) {
      return "Project timelines depend on scope and complexity. Typical ranges: Simple websites (2-4 weeks), Custom web applications (6-12 weeks), Mobile apps (8-16 weeks), Enterprise solutions (12-24 weeks). We use agile methodology with weekly sprints, providing regular updates and early previews. For urgent projects, we offer expedited development with dedicated teams. When do you need your project completed?"
    }

    // Team and process responses
    if (lowerMessage.includes("team") || lowerMessage.includes("process") || lowerMessage.includes("methodology")) {
      return "Our team consists of senior developers, UX/UI designers, project managers, and QA specialists with 5+ years of experience each. We follow agile development with continuous integration, automated testing, and regular client communication. Our process includes: discovery & planning, design & prototyping, development & testing, deployment & optimization, and ongoing support. We've successfully delivered 500+ projects with a 98% client satisfaction rate."
    }

    // Support and maintenance
    if (lowerMessage.includes("support") || lowerMessage.includes("maintenance") || lowerMessage.includes("update")) {
      return "We provide comprehensive post-launch support including: bug fixes, security updates, performance optimization, feature enhancements, and technical support. Our support packages range from basic (monthly updates) to premium (24/7 monitoring with guaranteed response times). All projects include 3 months of free maintenance. Would you like details about our ongoing support options?"
    }

    // Consultation and meeting
    if (
      lowerMessage.includes("consultation") ||
      lowerMessage.includes("meeting") ||
      lowerMessage.includes("call") ||
      lowerMessage.includes("discuss")
    ) {
      return "I'd be happy to schedule a free 30-minute technical consultation with our senior team. During this call, we'll: analyze your requirements, discuss technical approaches, provide timeline estimates, review similar projects, and answer all your questions. We can meet via video call, phone, or in-person at our San Francisco office. What's your preferred time and communication method?"
    }

    // General greeting responses
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! Welcome to Weltivation. I'm here to help you explore how we can transform your business through technology. Whether you're looking to build a web application, mobile app, implement AI solutions, or need technical consulting, I can provide detailed information and connect you with our expert team. What brings you here today?"
    }

    // Default intelligent response
    return "That's an excellent question! I'd love to provide you with detailed, personalized information. Our team of experts can address your specific needs and provide comprehensive solutions. You can reach our technical team directly at hello@weltivation.com, schedule a free consultation, or continue chatting with me for immediate assistance. What specific aspect of your project would you like to explore further?"
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(async () => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: await generateAdvancedBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@weltivation.com",
      description: "Send us an email anytime",
      href: "mailto:hello@weltivation.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm PST",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "San Francisco, CA",
      description: "Come say hello at our HQ",
      href: "#",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "< 24 hours",
      description: "We'll get back to you quickly",
      href: "#",
    },
  ]

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Globe, href: "#", label: "Website" },
    { icon: MessageSquare, href: "#", label: "Telegram" },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <CodeRain />
      </div>
      <NavBar />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white">Get in </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
                Touch
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Chat with our AI assistant or reach out directly. We're here to help transform your ideas into reality.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Enhanced AI Chat - Now takes more space */}
            <div className="lg:col-span-3">
              <motion.div
                className="bg-background/50 border border-border rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Enhanced Chat Header */}
                <div className="bg-gradient-to-r from-primary/10 to-emerald-500/10 border-b border-border p-6">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-r from-primary to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(52,211,153,0.3)",
                          "0 0 30px rgba(52,211,153,0.5)",
                          "0 0 20px rgba(52,211,153,0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Bot className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-xl font-bold">Weltivation AI Assistant</h3>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Sparkles className="w-5 h-5 text-emerald-400" />
                        </motion.div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <p className="text-sm text-muted-foreground">Online • Responds instantly</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Messages */}
                <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-background/30 to-background/50">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] px-6 py-4 rounded-2xl shadow-lg ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-primary to-emerald-500 text-white"
                              : "bg-gradient-to-r from-muted to-muted/80 text-foreground border border-border/50"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            {message.sender === "bot" && (
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <Bot className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                              </motion.div>
                            )}
                            {message.sender === "user" && <User className="w-5 h-5 text-white flex-shrink-0 mt-1" />}
                            <div className="flex-1">
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <p
                                className={`text-xs mt-2 ${message.sender === "user" ? "text-white/70" : "text-muted-foreground"}`}
                              >
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Enhanced Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gradient-to-r from-muted to-muted/80 px-6 py-4 rounded-2xl border border-border/50 shadow-lg">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Bot className="w-5 h-5 text-primary" />
                          </motion.div>
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-primary rounded-full"
                                animate={{ y: [0, -8, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">AI is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Enhanced Message Input */}
                <div className="border-t border-border p-6 bg-background/80">
                  <form onSubmit={handleSendMessage} className="flex space-x-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full px-6 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm shadow-inner"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={!inputMessage.trim()}
                      className="px-6 py-4 bg-gradient-to-r from-primary to-emerald-500 text-white rounded-xl hover:from-primary/90 hover:to-emerald-500/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold">Contact Methods</h3>
                <div className="space-y-3">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.href}
                      className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-primary/5 to-emerald-500/5 hover:from-primary/10 hover:to-emerald-500/10 border border-primary/20 hover:border-primary/40 rounded-xl transition-all duration-300 group shadow-sm hover:shadow-md"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-500 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                          <info.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm">{info.title}</h4>
                          <p className="text-xs text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                      <div className="text-primary font-semibold text-xs bg-primary/10 px-2 py-1 rounded-full">
                        {info.value}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Follow Us */}
              <motion.div
                className="bg-background/50 border border-border rounded-xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
