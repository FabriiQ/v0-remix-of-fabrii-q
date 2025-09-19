"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  Clock,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Brain,
  Building2,
  Target,
  Lightbulb,
  Rocket,
  Shield,
  BookOpen,
  Zap,
} from "lucide-react"

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    institutionName: "",
    contactName: "",
    email: "",
    phone: "",
    role: "",
    institutionType: "",
    campusCount: "",
    studentCount: "",
    currentSystems: "",
    challenges: "",
    timeline: "",
    commitment: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true)
      setFormData({
        institutionName: "",
        contactName: "",
        email: "",
        phone: "",
        role: "",
        institutionType: "",
        campusCount: "",
        studentCount: "",
        currentSystems: "",
        challenges: "",
        timeline: "",
        commitment: "",
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      {/* Hero Section with FabriiQ Development Partnership */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(31,80,75,0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(90,138,132,0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(31,80,75,0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(31,80,75,0.2) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            {/* Alpha Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-fabriiq-primary/10 border border-fabriiq-primary/20 text-fabriiq-primary text-sm font-medium">
                <span className="w-2 h-2 bg-fabriiq-primary rounded-full mr-2 animate-pulse"></span>
                Alpha Phase - Limited Development Partnerships
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-7xl font-black mb-8 leading-tight text-white"
            >
              Development{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                Partnership
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-16"
            >
              Join a select group of forward-thinking institutions shaping the future of educational technology.
              Co-create FabriiQ while gaining 18-24 months competitive advantage.
            </motion.p>

            {/* Partnership Benefits Layout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-6xl mx-auto mb-20"
            >
              {/* Central Partnership Card */}
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-2 border-fabriiq-primary/30 rounded-3xl p-12 shadow-2xl shadow-fabriiq-primary/10">
                <div className="flex flex-col items-center space-y-6">
                  <div className="flex items-center space-x-4">
                    <Brain className="w-12 h-12 text-fabriiq-primary" />
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-white">FabriiQ Development Partner</h2>
                      <p className="text-fabriiq-teal">Co-create the future of education</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xl mb-2">Partnership Value</p>
                    <p className="text-4xl font-bold text-fabriiq-primary mb-2">Priceless</p>
                    <p className="text-gray-400 text-lg">18-24 month competitive advantage</p>
                  </div>
                </div>

                {/* Floating benefit cards around the main card */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Top Left - No Upfront Costs */}
                  <motion.div
                    className="absolute -top-8 -left-8 transform -rotate-12"
                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: -12 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="bg-gradient-to-br from-fabriiq-primary/20 to-fabriiq-teal/20 backdrop-blur-sm border border-fabriiq-primary/30 rounded-2xl p-6 shadow-lg min-w-[200px]">
                      <div className="flex items-center space-x-3 mb-3">
                        <DollarSign className="w-6 h-6 text-fabriiq-primary" />
                        <div>
                          <h3 className="text-lg font-bold text-white">No Upfront Costs</h3>
                          <p className="text-sm text-gray-400">Zero Implementation Fees</p>
                        </div>
                      </div>
                      <Badge className="bg-fabriiq-primary/20 text-fabriiq-primary border-fabriiq-primary/30">
                        Alpha Phase
                      </Badge>
                    </div>
                  </motion.div>

                  {/* Top Right - Co-development */}
                  <motion.div
                    className="absolute -top-8 -right-8 transform rotate-12"
                    initial={{ opacity: 0, scale: 0, rotate: 45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 12 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="bg-gradient-to-br from-fabriiq-teal/20 to-fabriiq-primary/20 backdrop-blur-sm border border-fabriiq-teal/30 rounded-2xl p-6 shadow-lg min-w-[200px]">
                      <div className="flex items-center space-x-3 mb-3">
                        <Users className="w-6 h-6 text-fabriiq-teal" />
                        <div>
                          <h3 className="text-lg font-bold text-white">Co-development</h3>
                          <p className="text-sm text-gray-400">Shape Product Roadmap</p>
                        </div>
                      </div>
                      <Badge className="bg-fabriiq-teal/20 text-fabriiq-teal border-fabriiq-teal/30">
                        Direct Influence
                      </Badge>
                    </div>
                  </motion.div>

                  {/* Left - Early Access */}
                  <motion.div
                    className="absolute top-1/2 -left-12 transform -translate-y-1/2 -rotate-6"
                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: -6 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="bg-gradient-to-br from-primary/20 to-fabriiq-primary/20 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 shadow-lg min-w-[200px]">
                      <div className="flex items-center space-x-3 mb-3">
                        <Clock className="w-6 h-6 text-primary" />
                        <div>
                          <h3 className="text-lg font-bold text-white">Early Access</h3>
                          <p className="text-sm text-gray-400">18-24 Month Advantage</p>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">Competitive Edge</Badge>
                    </div>
                  </motion.div>

                  {/* Right - AIVY Integration */}
                  <motion.div
                    className="absolute top-1/2 -right-12 transform -translate-y-1/2 rotate-6"
                    initial={{ opacity: 0, scale: 0, rotate: 30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 6 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 shadow-lg min-w-[200px]">
                      <div className="flex items-center space-x-3 mb-3">
                        <Brain className="w-6 h-6 text-purple-400" />
                        <div>
                          <h3 className="text-lg font-bold text-white">AIVY Access</h3>
                          <p className="text-sm text-gray-400">Multi-Agent AI System</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Exclusive</Badge>
                    </div>
                  </motion.div>

                  {/* Bottom Left - Multi-Campus */}
                  <motion.div
                    className="absolute -bottom-8 -left-8 transform rotate-6"
                    initial={{ opacity: 0, scale: 0, rotate: 30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 6 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6 shadow-lg min-w-[200px]">
                      <div className="flex items-center space-x-3 mb-3">
                        <Building2 className="w-6 h-6 text-emerald-400" />
                        <div>
                          <h3 className="text-lg font-bold text-white">Multi-Campus</h3>
                          <p className="text-sm text-gray-400">Native Architecture</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Scalable</Badge>
                    </div>
                  </motion.div>

                  {/* Bottom Right - FERPA Compliance */}
                  <motion.div
                    className="absolute -bottom-8 -right-8 transform -rotate-6"
                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: -6 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="bg-gradient-to-br from-red-500/20 to-orange-600/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 shadow-lg min-w-[200px]">
                      <div className="flex items-center space-x-3 mb-3">
                        <Award className="w-6 h-6 text-red-400" />
                        <div>
                          <h3 className="text-lg font-bold text-white">FERPA Native</h3>
                          <p className="text-sm text-gray-400">Privacy by Design</p>
                        </div>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Compliant</Badge>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-r from-fabriiq-primary/20 to-fabriiq-teal/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-r from-fabriiq-primary/20 to-fabriiq-teal/20 rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Philosophy Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Co-Creators,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                Not Customers
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We don't want users who accept what we build - we want partners who help us build what education truly
              needs. Every development partner directly influences our product roadmap and helps validate solutions in
              real educational environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Journey Visualization */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Partnership{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                Journey
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Interactive timeline showing your path from application to full partnership
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-fabriiq-primary to-fabriiq-teal rounded-full"></div>

            <div className="space-y-16">
              {[
                {
                  icon: Target,
                  title: "Application & Discovery",
                  description: "Institutional needs assessment and initial compatibility evaluation",
                  color: "text-fabriiq-primary",
                  bgColor: "from-fabriiq-primary/20 to-fabriiq-teal/10",
                },
                {
                  icon: Users,
                  title: "Mutual Selection",
                  description: "Technical requirements and cultural fit evaluation with both teams",
                  color: "text-fabriiq-teal",
                  bgColor: "from-fabriiq-teal/20 to-fabriiq-primary/10",
                },
                {
                  icon: Rocket,
                  title: "Pilot Implementation",
                  description: "Core system deployment with dedicated support and training",
                  color: "text-primary",
                  bgColor: "from-primary/20 to-fabriiq-primary/10",
                },
                {
                  icon: Brain,
                  title: "Full Partnership",
                  description: "Complete platform access with co-development rights and influence",
                  color: "text-purple-400",
                  bgColor: "from-purple-500/20 to-pink-600/10",
                },
                {
                  icon: Lightbulb,
                  title: "Long-term Collaboration",
                  description: "Ongoing innovation and best practice sharing with the FabriiQ ecosystem",
                  color: "text-emerald-400",
                  bgColor: "from-emerald-500/20 to-teal-600/10",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <div className={`p-8 rounded-2xl bg-gradient-to-br ${step.bgColor} border border-white/10`}>
                      <div
                        className={`flex items-center space-x-4 ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"} mb-4`}
                      >
                        <div className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center`}>
                          <step.icon className={`w-6 h-6 ${step.color}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal border-4 border-black`}
                    ></div>
                  </div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mutual Benefits Framework */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Mutual{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                Benefits Framework
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A true partnership where both institutions and FabriiQ development benefit significantly
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Educational Institutions */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white mb-8 text-center">For Educational Institutions</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: DollarSign,
                    title: "Zero implementation costs during Alpha phase",
                    color: "text-fabriiq-primary",
                  },
                  {
                    icon: Zap,
                    title: "Custom feature development for specific institutional needs",
                    color: "text-fabriiq-teal",
                  },
                  {
                    icon: Clock,
                    title: "18-24 month competitive advantage over market alternatives",
                    color: "text-primary",
                  },
                  {
                    icon: Target,
                    title: "Direct influence on product roadmap and development priorities",
                    color: "text-purple-400",
                  },
                  {
                    icon: Award,
                    title: "Thought leadership recognition in educational technology innovation",
                    color: "text-emerald-400",
                  },
                  {
                    icon: BookOpen,
                    title: "Comprehensive training and change management support",
                    color: "text-orange-400",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                    </div>
                    <p className="text-gray-300">{benefit.title}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* For FabriiQ Development */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white mb-8 text-center">For FabriiQ Development</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Shield,
                    title: "Real-world validation in authentic educational environments",
                    color: "text-fabriiq-primary",
                  },
                  {
                    icon: Users,
                    title: "User-centered design input from actual educators and administrators",
                    color: "text-fabriiq-teal",
                  },
                  {
                    icon: CheckCircle,
                    title: "Quality assurance through comprehensive multi-institutional testing",
                    color: "text-primary",
                  },
                  {
                    icon: Lightbulb,
                    title: "Use case refinement and workflow optimization insights",
                    color: "text-purple-400",
                  },
                  {
                    icon: Target,
                    title: "Market validation and proof of concept development",
                    color: "text-emerald-400",
                  },
                  {
                    icon: BookOpen,
                    title: "Success story documentation and case study creation",
                    color: "text-orange-400",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                    </div>
                    <p className="text-gray-300">{benefit.title}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ideal Partner Profile Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ideal{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                Partner Profile
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're looking for specific institutional characteristics and partnership requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Institutional Characteristics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Building2 className="w-8 h-8 text-fabriiq-primary mr-3" />
                Institutional Characteristics
              </h3>
              <div className="space-y-4">
                {[
                  "Multi-campus educational organizations with complex operational needs",
                  "Progressive leadership committed to comprehensive digital transformation",
                  "Technology readiness with dedicated IT resources and staff",
                  "Collaborative culture willing to participate in iterative development",
                  "Timeline flexibility to accommodate Alpha phase development cycles",
                ].map((characteristic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-fabriiq-primary mt-1 flex-shrink-0" />
                    <p className="text-gray-300">{characteristic}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Partnership Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Users className="w-8 h-8 text-fabriiq-teal mr-3" />
                Partnership Requirements
              </h3>
              <div className="space-y-4">
                {[
                  "C-suite commitment to platform adoption and change management",
                  "Dedicated staff time for feedback sessions and testing participation",
                  "Willingness to serve as reference for future partnerships",
                  "Participation in user research and product development validation",
                ].map((requirement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-fabriiq-teal mt-1 flex-shrink-0" />
                    <p className="text-gray-300">{requirement}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Application Form */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Partnership{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                Application
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Complete application form to begin the partnership evaluation process
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700 rounded-3xl p-8 sm:p-12"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Development Partnership Application</h3>
                  <p className="text-gray-400">Help us understand your institution and partnership goals</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Institution Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Institution Information</h4>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Institution Name *</label>
                      <Input
                        value={formData.institutionName}
                        onChange={(e) => handleInputChange("institutionName", e.target.value)}
                        placeholder="Your educational institution"
                        required
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Institution Type *</label>
                      <Select
                        value={formData.institutionType}
                        onValueChange={(value) => handleInputChange("institutionType", value)}
                      >
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select institution type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="k12-district">K-12 School District</SelectItem>
                          <SelectItem value="vocational">Vocational School</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Campus Count</label>
                        <Select
                          value={formData.campusCount}
                          onValueChange={(value) => handleInputChange("campusCount", value)}
                        >
                          <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                            <SelectValue placeholder="Campuses" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Campus</SelectItem>
                            <SelectItem value="2-5">2-5 Campuses</SelectItem>
                            <SelectItem value="6-10">6-10 Campuses</SelectItem>
                            <SelectItem value="10+">10+ Campuses</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Student Count</label>
                        <Select
                          value={formData.studentCount}
                          onValueChange={(value) => handleInputChange("studentCount", value)}
                        >
                          <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                            <SelectValue placeholder="Students" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<1000">Under 1,000</SelectItem>
                            <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                            <SelectItem value="5000-15000">5,000 - 15,000</SelectItem>
                            <SelectItem value="15000+">15,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Contact Information</h4>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Contact Name *</label>
                      <Input
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="Your full name"
                        required
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="institutional.email@domain.edu"
                        required
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(555) 123-4567"
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Role/Title *</label>
                      <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="president">President/Chancellor</SelectItem>
                          <SelectItem value="provost">Provost/VP Academic Affairs</SelectItem>
                          <SelectItem value="cio">CIO/VP Technology</SelectItem>
                          <SelectItem value="dean">Dean</SelectItem>
                          <SelectItem value="director">Director</SelectItem>
                          <SelectItem value="other">Other Leadership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Partnership Details */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-white">Partnership Details</h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Systems & Challenges</label>
                    <Textarea
                      value={formData.challenges}
                      onChange={(e) => handleInputChange("challenges", e.target.value)}
                      placeholder="Describe your current educational technology systems and main operational challenges..."
                      rows={4}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Implementation Timeline</label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Preferred timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (1-3 months)</SelectItem>
                          <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                          <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Commitment Level</label>
                      <Select
                        value={formData.commitment}
                        onValueChange={(value) => handleInputChange("commitment", value)}
                      >
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Partnership commitment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pilot">Pilot Program</SelectItem>
                          <SelectItem value="full">Full Partnership</SelectItem>
                          <SelectItem value="evaluation">Evaluation Phase</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal hover:from-fabriiq-teal hover:to-fabriiq-primary text-white px-12 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-fabriiq-primary/25 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <span>Submit Partnership Application</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  By submitting, you agree to participate in the Alpha development phase and provide constructive
                  feedback.
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-fabriiq-primary rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">Partnership Application Submitted!</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  We've received your comprehensive partnership application. Our development team will review your
                  submission and contact you within 48 hours to discuss next steps and partnership compatibility.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Submit Another Application
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
