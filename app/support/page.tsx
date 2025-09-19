"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Send, Bot, User, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI support assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const faqs = [
    {
      question: "What makes FabriiQ different from traditional Learning Management Systems (LMS)?",
      answer:
        "FabriiQ is a comprehensive School Operating System, not just an LMS. While traditional LMS platforms focus primarily on course delivery and basic student management, FabriiQ unifies all institutional operations - enrollment management, financial systems, attendance tracking, communications, and advanced learning analytics - into one intelligent platform. We're designed specifically for multi-campus educational institutions with built-in AI agents (AIVY) and Bloom's Taxonomy integration from the ground up, not as add-on features.",
    },
    {
      question: 'What does "Alpha Phase" mean for my institution?',
      answer:
        "Alpha Phase means our core systems are operational and being used by development partners, but we're still refining features based on real-world feedback. All essential institutional functions work reliably - enrollment, fee management, attendance, grading, and communications. However, some advanced features are still being optimized. Alpha partners get full platform access, custom configuration, and direct influence over development priorities. We're transparent about what's ready now versus what's coming in Beta phase.",
    },
    {
      question: "How does the Development Partnership program work?",
      answer:
        "Development partners are co-creators, not customers. You get early access to the full platform, custom configuration for your institution's needs, and no upfront licensing costs during the development phase. In exchange, you provide feedback, participate in testing, and help us refine features based on real educational workflows. We limit partnerships to 12 institutions to ensure meaningful collaboration. The partnership includes staff training, data migration support, and ongoing platform evolution based on your institution's growth.",
    },
    {
      question: "Is FabriiQ compliant with educational privacy regulations like FERPA?",
      answer:
        "Yes, FERPA compliance is built into our platform architecture, not added afterward. We use a privacy-by-design approach with automated compliance monitoring, comprehensive audit trails, and AI-powered content classification to identify potential privacy risks. All educational records are protected with appropriate access controls, and we maintain detailed logs of all data access and disclosures as required by FERPA regulations.",
    },
    {
      question: "Can FabriiQ handle multi-campus institutions with different programs and policies?",
      answer:
        "Multi-campus operations are core to FabriiQ's design. We support complex institutional hierarchies (Institution → Campus → Program → Class) with centralized policy management and campus-level implementation flexibility. Each campus can have specific fee structures, academic calendars, and operational procedures while maintaining unified reporting and cross-campus analytics. Our system handles everything from small satellite campuses to large multi-location institutions.",
    },
    {
      question: "How does the AIVY Multi-Agent System work, and is it safe for educational use?",
      answer:
        "AIVY consists of specialized AI agents designed specifically for education: Student Companion Agents for personalized learning support, Teacher Assistant Agents for curriculum help, Content Generation Agents for educational materials, Analytics Agents for insights, and Safety & Compliance Agents for monitoring. All agents operate within strict educational guidelines, maintain student privacy, and include safety mechanisms. Teachers and administrators retain full control over AI recommendations and can override any automated decisions.",
    },
    {
      question: "What happens to our existing data and systems when we implement FabriiQ?",
      answer:
        "We provide comprehensive data migration support as part of the development partnership. Our team works with you to map existing data structures, migrate historical records, and ensure continuity of operations. FabriiQ can integrate with many existing systems, and we provide tools for exporting data if needed. During the transition period, we support parallel operations to minimize disruption to your educational processes.",
    },
    {
      question: "What are the long-term costs and commitment requirements?",
      answer:
        "During the Alpha development partnership phase, there are no licensing fees - the partnership covers initial deployment, customization, and training. Long-term pricing will be announced before Beta phase launch, with development partners receiving significant discounts and grandfathered benefits. The partnership requires dedicated staff time for training and feedback sessions (approximately 4-6 hours per week initially), commitment to the collaborative development process, and willingness to serve as a reference for other educational institutions. We believe in building long-term relationships, not short-term transactions.",
    },
  ]

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("budget")) {
      return "During the Alpha development partnership phase, there are no licensing fees. Long-term pricing will be announced before Beta phase launch, with development partners receiving significant discounts. Would you like me to connect you with our partnership team to discuss details?"
    }

    if (lowerMessage.includes("timeline") || lowerMessage.includes("how long")) {
      return "The development partnership includes a 6-step process typically taking 18-24 months from initial consultation to full deployment. This includes discovery, planning, development, testing, deployment, and ongoing optimization phases. What specific timeline aspect interests you most?"
    }

    if (lowerMessage.includes("consultation") || lowerMessage.includes("meeting")) {
      return "I'd be happy to help you schedule a free consultation with our development partnership team! You can book directly through our consultation page, or I can connect you with our team. What works better for you?"
    }

    if (lowerMessage.includes("support") || lowerMessage.includes("partnership")) {
      return "Our development partnership includes comprehensive support: staff training, data migration assistance, custom configuration, and ongoing platform evolution based on your institution's needs. Would you like to know more about our partnership benefits?"
    }

    return "That's a great question about FabriiQ! I'd be happy to connect you with one of our educational technology specialists who can provide detailed information about our platform capabilities. Would you like me to schedule a consultation, or do you have any other questions I can help with right now?"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-fabriiq-primary/10 rounded-full border border-fabriiq-primary/20 mb-6">
              <Bot className="w-4 h-4 text-fabriiq-primary" />
              <span className="text-sm font-medium text-fabriiq-primary">AI-Powered Support</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Get </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                Instant Help
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Chat with our AI assistant for immediate support, or browse our comprehensive FAQ section for quick
              answers about FabriiQ's educational platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-fabriiq-primary/10 to-fabriiq-teal/10 border-b border-gray-700 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">FabriiQ Support Assistant</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-fabriiq-primary rounded-full animate-pulse" />
                    <span className="text-sm text-fabriiq-primary">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "bg-fabriiq-teal"
                          : "bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.sender === "user" ? "bg-fabriiq-teal text-white" : "bg-gray-700 text-gray-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-700 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-700 p-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about FabriiQ's capabilities, partnership program, or technical details..."
                  className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-fabriiq-primary focus:outline-none"
                />
                <Button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal hover:from-fabriiq-teal hover:to-fabriiq-primary px-6 py-3 rounded-xl"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">
              Key questions about FabriiQ's educational platform and development partnership program.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
