"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
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
  Star,
  TrendingUp,
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
    studentPopulation: "",
    currentSystems: "",
    timeline: "",
    commitment: "",
    customRequirements: "",
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
        studentPopulation: "",
        currentSystems: "",
        timeline: "",
        commitment: "",
        customRequirements: "",
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      {/* Hero Section - Alpha Phase Exclusive Development Partnerships */}
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
                Alpha Phase - Exclusive Development Partnerships
              </div>
              {/* Removed the line about limited positions */}
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
              Join a select group of forward-thinking institutions co-creating the future of educational technology.
              Shape FabriiQ while gaining competitive advantage through strategic partnership investment.
            </motion.p>

            {/* Partnership Value Proposition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-6xl mx-auto mb-20"
            >
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-2 border-fabriiq-primary/30 rounded-3xl p-12 shadow-2xl shadow-fabriiq-primary/10">
                <div className="flex flex-col items-center space-y-6">
                  <div className="flex items-center space-x-4">
                    <Brain className="w-12 h-12 text-fabriiq-primary" />
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-white">FabriiQ Development Partner</h2>
                      <p className="text-fabriiq-teal">Co-create the future of education</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                    <div className="text-center">
                      <p className="text-gray-400 text-lg mb-2">Strategic Investment</p>
                      <p className="text-2xl font-bold text-fabriiq-primary mb-2">Mutual Value Exchange</p>
                      <p className="text-gray-400 text-sm">Partnership Model</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-lg mb-2">Competitive Advantage</p>
                      <p className="text-2xl font-bold text-fabriiq-teal mb-2">Market Leadership</p>
                      <p className="text-gray-400 text-sm">Strategic Position</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-lg mb-2">Investment Model</p>
                      <p className="text-2xl font-bold text-primary mb-2">Shared Resources</p>
                      <p className="text-gray-400 text-sm">FabriiQ + Institution</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Co-Creators Philosophy Section */}
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
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              We don't want users who accept what we build - we want partners who help us build what education truly
              needs. Every development partner directly influences our product roadmap, receives custom branding
              integration, and validates solutions in real educational environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Journey Timeline */}
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
              Interactive timeline showing your path from invitation to sustained partnership
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-fabriiq-primary to-fabriiq-teal rounded-full"></div>

            <div className="space-y-16">
              {[
                {
                  icon: Target,
                  title: "Invitation & Discovery",
                  description: "Institutional needs assessment and strategic compatibility evaluation",
                  color: "text-fabriiq-primary",
                  bgColor: "from-fabriiq-primary/20 to-fabriiq-teal/10",
                },
                {
                  icon: Users,
                  title: "Mutual Selection",
                  description: "Partnership Charter signing and resource commitment formalization",
                  color: "text-fabriiq-teal",
                  bgColor: "from-fabriiq-teal/20 to-fabriiq-primary/10",
                },
                {
                  icon: Rocket,
                  title: "Pilot Implementation",
                  description: "Core system deployment with dedicated support and custom branding integration",
                  color: "text-primary",
                  bgColor: "from-primary/20 to-fabriiq-primary/10",
                },
                {
                  icon: Brain,
                  title: "Full Partnership",
                  description: "Complete platform access with co-development rights and workflow customization",
                  color: "text-purple-400",
                  bgColor: "from-purple-500/20 to-pink-600/10",
                },
                {
                  icon: Star,
                  title: "Beyond Alpha - Sustained Partnership",
                  description:
                    "Preferential terms, continued innovation access, and legacy recognition as founding partner",
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

      {/* Balanced Investment Framework */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Balanced{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                Investment Framework
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A strategic partnership where both institutions and FabriiQ invest meaningfully for mutual success
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
              <p className="text-lg text-fabriiq-primary font-semibold text-center mb-6">
                Strategic investment in deployment and expertise sharing
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: Zap,
                    title: "Custom feature development aligned with institutional workflows",
                    color: "text-fabriiq-primary",
                  },
                  {
                    icon: Clock,
                    title: "Competitive advantage over market alternatives",
                    description:
                      "Gain strategic market positioning through early access to cutting-edge educational technology solutions.",
                    color: "text-fabriiq-teal",
                  },
                  {
                    icon: Target,
                    title: "Direct influence on product roadmap and development priorities",
                    color: "text-primary",
                  },
                  {
                    icon: Building2,
                    title: "Custom branding and institutional identity integration",
                    color: "text-purple-400",
                  },
                  {
                    icon: Award,
                    title: "Thought leadership recognition in educational technology innovation",
                    color: "text-emerald-400",
                  },
                  {
                    icon: DollarSign,
                    title: "Preferential post-Alpha pricing and sustained partnership terms",
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
              <p className="text-lg text-fabriiq-teal font-semibold text-center mb-6">
                Investment in dedicated co-development resources and priority support
              </p>
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
                    icon: TrendingUp,
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

      {/* Ideal Partner Profile */}
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
              We seek institutions ready for strategic co-development partnership
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
                  "Technology readiness with dedicated IT resources and implementation capacity",
                  "Collaborative culture willing to participate in iterative co-development",
                  "Financial readiness to invest in deployment and infrastructure costs",
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
                  "C-suite commitment to platform adoption and organizational change management",
                  "Dedicated staff allocation (10-15 hours monthly) for co-development participation",
                  "Investment in deployment costs, training, and infrastructure requirements",
                  "Willingness to serve as reference and thought leadership case study",
                  "Participation in user research, feedback sessions, and product validation",
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

      {/* Partnership Charter Commitments */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Partnership Charter{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                Commitments
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Your Institution Commits To */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Building2 className="w-8 h-8 text-fabriiq-primary mr-3" />
                Your Institution Commits To:
              </h3>
              <div className="space-y-4">
                {[
                  "Cover deployment, infrastructure, and training investment",
                  "Allocate dedicated staff time for partnership activities",
                  "Participate in monthly feedback sessions and quarterly strategy workshops",
                  "Provide honest assessment and constructive development guidance",
                  "Maintain confidentiality regarding Alpha features and development roadmap",
                ].map((commitment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-fabriiq-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300">{commitment}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FabriiQ Commits To */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Brain className="w-8 h-8 text-fabriiq-teal mr-3" />
                FabriiQ Commits To:
              </h3>
              <div className="space-y-4">
                {[
                  "Provide dedicated Alpha co-development access and priority feature development",
                  "Deliver custom branding integration and workflow personalization",
                  "Maintain transparent communication about development progress and timelines",
                  "Honor preferential post-Alpha partnership terms and pricing",
                  "Recognize your institution as founding development partner with thought leadership opportunities",
                ].map((commitment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-fabriiq-teal rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300">{commitment}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Co-Creation Assessment Form */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Co-Creation Partnership{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                Invitation
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Complete partnership compatibility assessment to begin strategic evaluation process
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
                  <h3 className="text-2xl font-bold text-white mb-4">Partnership Co-Creation Assessment</h3>
                  <p className="text-gray-400">
                    Help us understand your institution's vision and co-development readiness
                  </p>
                </div>

                {/* Institution Information */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                    Institution Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <SelectItem value="multi-campus-private">Multi-Campus Private School System</SelectItem>
                          <SelectItem value="university">University/Higher Education</SelectItem>
                          <SelectItem value="international-network">International Education Network</SelectItem>
                          <SelectItem value="specialized">Specialized Educational Institution</SelectItem>
                          <SelectItem value="other">Other Educational Organization</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Campus Count</label>
                      <Input
                        value={formData.campusCount}
                        onChange={(e) => handleInputChange("campusCount", e.target.value)}
                        placeholder="Number of campus locations"
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Student Population</label>
                      <Input
                        value={formData.studentPopulation}
                        onChange={(e) => handleInputChange("studentPopulation", e.target.value)}
                        placeholder="Total student enrollment across campuses"
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Strategic Contact Information */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                    Strategic Contact Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Primary Contact Name *</label>
                      <Input
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="Executive or decision-maker name"
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
                        placeholder="executive.email@institution.edu"
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
                        placeholder="International format preferred"
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
                          <SelectItem value="ceo">Chief Executive Officer/President</SelectItem>
                          <SelectItem value="cto">Chief Technology Officer</SelectItem>
                          <SelectItem value="cao">Chief Academic Officer</SelectItem>
                          <SelectItem value="director">Campus Director/Principal</SelectItem>
                          <SelectItem value="it-director">IT Director</SelectItem>
                          <SelectItem value="other">Other Executive Role</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Co-Development Partnership Details */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                    Co-Development Partnership Details
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Technology Ecosystem & Strategic Challenges
                    </label>
                    <Textarea
                      value={formData.currentSystems}
                      onChange={(e) => handleInputChange("currentSystems", e.target.value)}
                      placeholder="Describe your current educational technology systems, operational challenges, and strategic digital transformation goals..."
                      rows={4}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Investment Timeline & Readiness
                      </label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (Ready to begin within 30 days)</SelectItem>
                          <SelectItem value="short-term">Short-term (Ready within 2-3 months)</SelectItem>
                          <SelectItem value="medium-term">Medium-term (Ready within 4-6 months)</SelectItem>
                          <SelectItem value="strategic">Strategic planning (6+ months evaluation period)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Partnership Investment Commitment Level
                      </label>
                      <Select
                        value={formData.commitment}
                        onValueChange={(value) => handleInputChange("commitment", value)}
                      >
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select commitment level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">
                            Full Strategic Partnership (Complete co-development participation)
                          </SelectItem>
                          <SelectItem value="focused">Focused Partnership (Specific areas of collaboration)</SelectItem>
                          <SelectItem value="evaluation">
                            Evaluation Partnership (Assessment phase with potential expansion)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Custom Requirements & Vision</label>
                    <Textarea
                      value={formData.customRequirements}
                      onChange={(e) => handleInputChange("customRequirements", e.target.value)}
                      placeholder="Describe your institution's specific needs, branding requirements, and vision for educational technology innovation..."
                      rows={4}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal hover:from-fabriiq-teal hover:to-fabriiq-primary text-white px-12 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-fabriiq-primary/25 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <span>Submit Partnership Co-Creation Assessment</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  By submitting, you express interest in strategic co-development partnership and agree to participate
                  in mutual evaluation process for Alpha phase collaboration.
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
                <h3 className="text-2xl font-bold text-white mb-4">Partnership Assessment Submitted!</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  We've received your comprehensive partnership assessment. Our development team will review your
                  submission and contact you within 48 hours to discuss strategic compatibility and next steps.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Submit Another Assessment
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Beyond Alpha - Sustained Partnership Value */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Beyond Alpha:{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                Sustained Partnership Value
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              The Alpha Development Partnership establishes the foundation for long-term strategic advantage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Preferential Partnership Terms",
                description:
                  "Founding partners retain advantageous pricing and priority access compared to future adopters",
                color: "text-fabriiq-primary",
                bgColor: "from-fabriiq-primary/20 to-fabriiq-teal/10",
              },
              {
                icon: Lightbulb,
                title: "Continued Innovation Leadership",
                description: "First access to new features, platform enhancements, and strategic developments",
                color: "text-fabriiq-teal",
                bgColor: "from-fabriiq-teal/20 to-fabriiq-primary/10",
              },
              {
                icon: Building2,
                title: "Legacy Advantage",
                description: "Your institutional workflows and branding remain deeply integrated in platform evolution",
                color: "text-primary",
                bgColor: "from-primary/20 to-fabriiq-primary/10",
              },
              {
                icon: Award,
                title: "Thought Leadership Recognition",
                description: "Showcased as founding contributor to educational technology transformation",
                color: "text-emerald-400",
                bgColor: "from-emerald-500/20 to-teal-600/10",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${benefit.bgColor} backdrop-blur-xl border border-white/10 rounded-2xl p-6`}
              >
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                  <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Intelligence Code Block */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700 rounded-3xl p-8 overflow-hidden"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Educational Intelligence Platform</h3>
              <p className="text-gray-400">The technology foundation powering next-generation education</p>
            </div>

            <div className="bg-black/50 rounded-2xl p-6 font-mono text-sm overflow-x-auto">
              <div className="text-gray-500 mb-4">// FabriiQ Educational Intelligence System</div>
              <div className="space-y-2">
                <div>
                  <span className="text-purple-400">function</span>{" "}
                  <span className="text-yellow-400">educationalIntelligence</span>() {`{`}
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">const</span> <span className="text-blue-400">fabriiq</span> = {`{`}
                </div>
                <div className="ml-8 text-gray-400">// AIVY Multi-Agent System</div>
                <div className="ml-8">
                  <span className="text-red-400">aivy</span>: {`{`}
                </div>
                <div className="ml-12">
                  <span className="text-green-400">agents</span>: [
                  <span className="text-orange-400">'Student Companion'</span>,{" "}
                  <span className="text-orange-400">'Teacher Assistant'</span>],
                </div>
                <div className="ml-12">
                  <span className="text-green-400">orchestration</span>:{" "}
                  <span className="text-orange-400">'Real-time collaboration'</span>,
                </div>
                <div className="ml-12">
                  <span className="text-green-400">memory</span>:{" "}
                  <span className="text-orange-400">'Persistent cross-session context'</span>
                </div>
                <div className="ml-8">{`},`}</div>
                <div className="ml-8 text-gray-400 mt-4">// Bloom's Taxonomy Integration</div>
                <div className="ml-8">
                  <span className="text-red-400">pedagogy</span>: {`{`}
                </div>
                <div className="ml-12">
                  <span className="text-green-400">framework</span>:{" "}
                  <span className="text-orange-400">'Six cognitive levels'</span>,
                </div>
                <div className="ml-12">
                  <span className="text-green-400">classification</span>:{" "}
                  <span className="text-orange-400">'Automated content analysis'</span>,
                </div>
                <div className="ml-12">
                  <span className="text-green-400">tracking</span>:{" "}
                  <span className="text-orange-400">'Real-time mastery measurement'</span>
                </div>
                <div className="ml-8">{`},`}</div>
                <div className="ml-8 text-gray-400 mt-4">// Custom Branding & Workflows</div>
                <div className="ml-8">
                  <span className="text-red-400">customization</span>: {`{`}
                </div>
                <div className="ml-12">
                  <span className="text-green-400">branding</span>:{" "}
                  <span className="text-orange-400">'Institution identity integration'</span>,
                </div>
                <div className="ml-12">
                  <span className="text-green-400">workflows</span>:{" "}
                  <span className="text-orange-400">'Personalized operational processes'</span>,
                </div>
                <div className="ml-12">
                  <span className="text-green-400">compliance</span>:{" "}
                  <span className="text-orange-400">'Regional standards adaptation'</span>
                </div>
                <div className="ml-8">{`}`}</div>
                <div className="ml-4">{`};`}</div>
                <div className="ml-4 mt-4">
                  <span className="text-purple-400">return</span> <span className="text-blue-400">fabriiq</span>.
                  <span className="text-yellow-400">transform</span>(<span className="text-blue-400">education</span>);
                </div>
                <div>{`}`}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
