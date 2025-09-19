"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Brain, Building2, Shield, Users, Zap, ArrowRight, CheckCircle, Clock, Target, Lightbulb } from "lucide-react"

export default function PlatformPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-fabriiq-primary/10 border border-fabriiq-primary/20 text-fabriiq-primary text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-2 h-2 bg-fabriiq-primary rounded-full mr-2 animate-pulse"></span>
            Platform Overview - Alpha Phase
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-foreground">The First </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
              School Operating System
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            FabriiQ isn't just another Learning Management System - it's a comprehensive School Operating System that
            unifies all aspects of educational institution management into one intelligent, AI-powered platform.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/capabilities"
              className="px-8 py-4 bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal text-white rounded-lg font-medium hover:from-fabriiq-teal hover:to-fabriiq-primary transition-all duration-300 transform hover:scale-105"
            >
              Explore Core Capabilities
            </Link>
            <Link
              href="/partnership"
              className="px-8 py-4 bg-transparent border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Become a Development Partner
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Platform Philosophy */}
      <section className="py-20 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Platform Philosophy
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Understanding the fundamental differences between traditional approaches and FabriiQ's comprehensive
              solution.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: "School Operating System vs. Learning Management System",
                description:
                  "Comprehensive institutional management beyond just course delivery and content management.",
                icon: Building2,
                color: "text-fabriiq-primary",
              },
              {
                title: "Unified vs. Fragmented Approach",
                description: "Single integrated platform replacing 5-10 separate systems with seamless data flow.",
                icon: Zap,
                color: "text-fabriiq-teal",
              },
              {
                title: "AI-Native vs. AI-Added Approach",
                description: "Built from the ground up with AI intelligence, not bolted onto existing legacy systems.",
                icon: Brain,
                color: "text-primary",
              },
              {
                title: "Multi-Campus vs. Single-Campus Design",
                description: "Native support for complex institutional hierarchies and governance structures.",
                icon: Users,
                color: "text-fabriiq-primary",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-xl bg-card border border-border"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Architecture Overview
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Built on modern, scalable architecture designed specifically for educational institutions.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Visual System Architecture",
                description: "Comprehensive system design with clear component relationships and data flows.",
                icon: Target,
                status: "Active",
              },
              {
                title: "Integration Capabilities",
                description: "Seamless connection with existing institutional systems and third-party services.",
                icon: Zap,
                status: "Active",
              },
              {
                title: "Scalability Framework",
                description: "Designed to grow with institutions from single campus to multi-campus networks.",
                icon: Building2,
                status: "In Development",
              },
              {
                title: "Security Foundations",
                description: "Privacy-by-design architecture with FERPA compliance built into every component.",
                icon: Shield,
                status: "Active",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Approach */}
      <section className="py-20 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Development Approach
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Partner-driven development ensuring real-world validation and practical application.
            </motion.p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Agile, Partner-Driven Development",
                description: "Continuous collaboration with development partners to ensure practical solutions.",
                icon: Users,
              },
              {
                title: "Continuous Feedback Integration",
                description: "Regular feedback cycles with educational professionals to refine functionality.",
                icon: Lightbulb,
              },
              {
                title: "Co-Creation Methodology",
                description: "Partners actively participate in feature design and development decisions.",
                icon: Brain,
              },
              {
                title: "Quality Assurance Standards",
                description: "Rigorous testing in real educational environments before feature release.",
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-6 p-6 rounded-xl bg-card border border-border"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alpha Status Transparency */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Alpha Status Transparency
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We believe in radical transparency about our current development stage and future roadmap.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              className="p-6 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-400">Current Development Stage</h3>
              </div>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>• Core system architecture implemented</li>
                <li>• Basic AIVY agents functional</li>
                <li>• Unified operations hub active</li>
                <li>• Privacy and compliance framework complete</li>
              </ul>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-400">
                  Partner Involvement Opportunities
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• Feature prioritization input</li>
                <li>• User interface design feedback</li>
                <li>• Workflow customization collaboration</li>
                <li>• Beta testing and validation</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/capabilities"
              className="px-8 py-4 bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal text-white rounded-lg font-medium hover:from-fabriiq-teal hover:to-fabriiq-primary transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <span>Explore Core Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/partnership"
              className="px-8 py-4 bg-transparent border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Discuss Partnership Opportunities
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
