"use client"

import Link from "next/link"
import { CodeRain } from "@/components/code-rain"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { SpinningEarth } from "@/components/spinning-earth"
import { TypingHero } from "@/components/typing-hero"
import { motion } from "framer-motion"
import { Zap, Users, Brain, Shield, Building2, Lightbulb } from "lucide-react"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { CoreCapabilitiesSection } from "@/components/core-capabilities-section"
import { TechnicalCodeSection } from "@/components/technical-code-section"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-foreground overflow-x-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-5">
          <img
            src="/abstract-educational-technology-network-with-inter.jpg"
            alt="Educational Technology Background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Spinning Earth */}
        <div className="opacity-10">
          <SpinningEarth />
        </div>
        {/* Code rain */}
        <div className="opacity-10">
          <CodeRain />
        </div>
      </div>

      {/* Hero Video - Full screen background */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-fabriiq-primary/10 via-transparent to-fabriiq-teal/10">
          <img
            src="/abstract-animation-showing-interconnected-educatio.jpg"
            alt="Hero Animation"
            className="w-full h-full object-cover opacity-25"
            style={{
              filter: "contrast(1.2) brightness(0.7)",
            }}
          />
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10">
        <NavBar />
        <ProfileDropdown />

        {/* Hero section with FabriiQ messaging */}
        <section className="flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-fabriiq-primary/10 border border-fabriiq-primary/20 text-fabriiq-primary text-sm font-medium">
                <span className="w-2 h-2 bg-fabriiq-primary rounded-full mr-2 animate-pulse"></span>
                Alpha Development Phase - Partnership Opportunities Available
              </div>
            </div>

            {/* Enhanced hero with better contrast */}
            <div className="relative">
              {/* Background for better contrast */}
              <div className="absolute inset-0 bg-background/80 rounded-2xl blur-3xl"></div>
              <div className="relative z-10">
                <TypingHero />
              </div>
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto my-8"></div>

            <div className="relative">
              <div className="absolute inset-0 bg-background/60 rounded-xl blur-2xl"></div>
              <p className="relative z-10 text-muted-foreground max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                Join forward-thinking institutions in co-creating FabriiQ - moving beyond fragmented LMS solutions to
                unified institutional intelligence designed for modern educational excellence.
              </p>
            </div>

            <div className="pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/partnership"
                  className="group relative px-8 py-4 bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal text-white rounded-lg font-medium text-base hover:from-fabriiq-teal hover:to-fabriiq-primary transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(31,80,75,0.3)]"
                >
                  <span className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Become a Development Partner</span>
                  </span>
                </Link>

                <Link
                  href="/platform"
                  className="group relative px-8 py-4 bg-gray-800 text-white rounded-lg font-medium text-base hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-700"
                >
                  <span className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>Explore the Platform</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <img
                  src="/modern-educational-technology-dashboard-with-ai-an.jpg"
                  alt="Modern Educational Technology Dashboard"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  <span className="text-foreground">Transforming </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                    Educational Excellence
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  FabriiQ empowers educational institutions with AI-driven insights, seamless multi-campus operations,
                  and comprehensive student lifecycle management - all in one unified platform.
                </p>
                <Link
                  href="/capabilities"
                  className="inline-flex items-center space-x-2 text-fabriiq-primary hover:text-fabriiq-teal transition-colors"
                >
                  <span>Explore Platform Capabilities</span>
                  <Zap className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl sm:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-foreground">6 Core </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  Capabilities
                </span>
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Purpose-built features designed specifically for educational institutions, not generic solutions adapted
                for schools.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "AIVY Multi-Agent Intelligence",
                  description:
                    "Not generic AI, but specialized agents designed specifically for education. Student Companion, Teacher Assistant, Content Generation, Assessment Intelligence, and Compliance Monitoring - all working together seamlessly.",
                  status: "Core agents active, advanced collaboration in beta",
                  image: "/network-of-interconnected-ai-nodes-with-educationa.jpg",
                  color: "text-fabriiq-primary",
                },
                {
                  icon: Lightbulb,
                  title: "Pedagogically Sound",
                  description:
                    "Every question, assessment, and activity is automatically aligned with Bloom's Taxonomy. Track cognitive development from Remember to Create with real-time mastery analytics and intervention triggers.",
                  status: "Classification engine active, balance analytics in development",
                  image: "/pyramid-structure-with-cognitive-levels--bloom-s-t.jpg",
                  color: "text-fabriiq-teal",
                },
                {
                  icon: Users,
                  title: "Gamification & Social Learning",
                  description:
                    "Comprehensive points system, achievement unlocks, class social walls, and intelligent motivation engine. Transform learning into an engaging journey with peer recognition and collaborative growth.",
                  status: "Core gamification complete, social features complete",
                  image: "/achievement-badges--leaderboards--social-interacti.jpg",
                  color: "text-primary",
                },
                {
                  icon: Building2,
                  title: "Multi-Campus Operations",
                  description:
                    "Native multi-campus architecture managing enrollment, fees, attendance, and analytics across unlimited locations. Centralized governance with campus autonomy - designed from the ground up, not retrofitted.",
                  status: "Core operations active, advanced analytics in development",
                  image: "/interconnected-campus-buildings-with-data-flow-vis.jpg",
                  color: "text-fabriiq-primary",
                },
                {
                  icon: Zap,
                  title: "Offline-First Learning",
                  description:
                    "Complete offline functionality with intelligent synchronization. Teachers grade, students learn, coordinators manage - all without internet. When connection returns, everything syncs seamlessly with conflict resolution.",
                  status: "Offline core complete, advanced sync features in beta",
                  image: "/device-synchronization-with-cloud-connectivity-ind.jpg",
                  color: "text-fabriiq-teal",
                },
                {
                  icon: Shield,
                  title: "Privacy-by-Design Compliance",
                  description:
                    "Not compliance added later, but privacy designed from the first line of code. Automated retention, intelligent redaction, comprehensive audit trails, and AI-powered risk assessment built into every feature.",
                  status: "Compliance engine active, advanced features in development",
                  image: "/shield-with-ferpa-compliance-badges--privacy-prote.jpg",
                  color: "text-primary",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="group p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                  <div className="text-xs text-fabriiq-primary bg-fabriiq-primary/10 px-2 py-1 rounded-full inline-block">
                    Alpha Status: {feature.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Capabilities section - replacing services */}
        <CoreCapabilitiesSection />

        <TechnicalCodeSection />

        <section id="contact" className="py-20 px-4 sm:px-6 relative bg-black">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <motion.h2
                className="text-4xl sm:text-5xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-foreground">Ready to </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  co-create?
                </span>
              </motion.h2>
              <motion.div
                className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Join a select group of forward-thinking institutions shaping the future of educational technology.
                Limited development partnerships available.
              </motion.p>
            </div>

            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex flex-col items-center space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="/partnership"
                    className="group relative px-8 py-4 bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal text-white rounded-lg font-medium text-base hover:from-fabriiq-teal hover:to-fabriiq-primary transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(31,80,75,0.3)]"
                  >
                    <span className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Apply for Partnership</span>
                    </span>
                  </Link>

                  <Link
                    href="/contact"
                    className="group relative px-8 py-4 bg-gray-800 text-white rounded-lg font-medium text-base hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-700"
                  >
                    <span className="flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>Schedule Discussion</span>
                    </span>
                  </Link>

                  <Link
                    href="/resources"
                    className="group relative px-8 py-4 bg-gray-800 text-white rounded-lg font-medium text-base hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-700"
                  >
                    <span className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>Alpha Documentation</span>
                    </span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center max-w-2xl">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <p className="text-sm text-muted-foreground">No upfront costs</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Co-development opportunity</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <p className="text-sm text-muted-foreground">18-24 month advantage</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
