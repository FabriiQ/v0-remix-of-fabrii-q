"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Brain, 
  Users, 
  Shield, 
  Target, 
  Building2, 
  Lightbulb,
  Zap,
  ChevronDown,
  ChevronRight,
  Globe,
  Heart,
  Lock,
  Handshake,
  ArrowRight,
  Sparkles,
  BookOpen,
  Network,
  Eye
} from "lucide-react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { useLanguage } from "@/contexts/language-context"
import { useDynamicMetadata } from "@/hooks/use-dynamic-metadata"

// Expandable belief card component
function BeliefCard({ 
  icon: Icon, 
  title, 
  preview, 
  content, 
  whatThisMeans, 
  ourResponse, 
  color = "text-fabriiq-primary",
  isExpanded,
  onToggle 
}: {
  icon: any
  title: string
  preview: string
  content: string
  whatThisMeans: string[]
  ourResponse: string
  color?: string
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
      <div className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{preview}</p>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-border/50"
          >
            <div className="space-y-6">
              <p className="text-foreground leading-relaxed">{content}</p>
              
              <div>
                <h4 className="text-lg font-semibold text-fabriiq-teal mb-3">What This Means:</h4>
                <ul className="space-y-2">
                  {whatThisMeans.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-fabriiq-teal rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-fabriiq-primary/10 rounded-lg border border-fabriiq-primary/20">
                <h4 className="text-lg font-semibold text-fabriiq-primary mb-2">Our Response:</h4>
                <p className="text-foreground leading-relaxed">{ourResponse}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default function PhilosophyPage() {
  const { t } = useLanguage()
  const [expandedBelief, setExpandedBelief] = useState<number | null>(null)
  useDynamicMetadata()

  const coreBeliefs = [
    {
      icon: Network,
      title: "Education as Living Ecosystem",
      preview: "Every element affects every other element—from enrollment to learning outcomes.",
      content: "Traditional educational technology treats schools like assembly lines - separate systems for separate functions. We believe educational institutions are living ecosystems where every element affects every other element.",
      whatThisMeans: [
        "Student enrollment affects classroom dynamics → learning outcomes → institutional reputation",
        "Financial health enables program innovation → attracts better faculty → improves student experience",
        "Attendance patterns reveal engagement levels → predict academic success → inform intervention strategies"
      ],
      ourResponse: "FabriiQ is architected as an ecosystem where every component enriches every other component.",
      color: "text-fabriiq-primary"
    },
    {
      icon: Brain,
      title: "Purpose-Built Educational Intelligence",
      preview: "AI designed for learning, not generic tools adapted for education.",
      content: "The AI revolution in education has largely meant taking generic AI tools and hoping they work in educational contexts. We believe educational intelligence must be purpose-built for learning.",
      whatThisMeans: [
        "'Assessment' isn't just measurement—it's cognitive development tracking",
        "'Engagement' isn't just participation—it's meaningful learning interaction",
        "'Analytics' isn't just data—it's educational insight for human flourishing"
      ],
      ourResponse: "AIVY isn't adapted consumer AI—it's educational intelligence designed from the ground up for teaching and learning.",
      color: "text-fabriiq-teal"
    },
    {
      icon: Lock,
      title: "Privacy-by-Design Architecture",
      preview: "FERPA compliance built into every line of code, not bolted on later.",
      content: "Most educational technology builds features first, then tries to make them compliant. We believe privacy and safety must be architectural foundations, not regulatory afterthoughts.",
      whatThisMeans: [
        "Every line of code written with FERPA compliance as first principle",
        "Student data protection embedded in system design, not added later",
        "Transparency and control built into user experience"
      ],
      ourResponse: "Privacy-by-design architecture where compliance is automatic, not effortful.",
      color: "text-primary"
    },
    {
      icon: BookOpen,
      title: "Learning Science Drives Design",
      preview: "Technology amplifies proven educational principles, never replaces them.",
      content: "The educational technology industry often creates solutions looking for problems. We believe technology should amplify proven educational principles, not replace them.",
      whatThisMeans: [
        "Bloom's Taxonomy integration isn't a feature—it's how learning should be understood",
        "Mastery tracking isn't optional—it's how progress should be measured",
        "Social learning isn't trendy—it's how humans naturally develop"
      ],
      ourResponse: "Every FabriiQ capability is rooted in established learning science and pedagogical best practices.",
      color: "text-fabriiq-primary"
    },
    {
      icon: Building2,
      title: "Institutional Autonomy Enhanced",
      preview: "Technology should enhance institutional identity, never replace it.",
      content: "Educational institutions shouldn't have to choose between powerful technology and institutional autonomy. We believe technology should enhance institutional identity, not replace it.",
      whatThisMeans: [
        "Multi-campus organizations need unified governance with campus autonomy",
        "Institutional data belongs to institutions, not technology vendors",
        "Educational innovation should serve institutional mission, not vendor revenue"
      ],
      ourResponse: "FabriiQ empowers institutional excellence without sacrificing operational independence.",
      color: "text-fabriiq-teal"
    }
  ]

  const developmentPrinciples = [
    {
      title: "Co-Creation Over Consultation",
      traditional: "Technologists imagine problems → Engineers build solutions → Sales teams convince → Implementation forces adaptation",
      fabriiq: "Partners identify challenges → Experts collaborate → Real implementations validate → Success emerges from excellence"
    },
    {
      title: "Transparency Over Marketing",
      points: [
        "Clear communication about current vs. planned capabilities",
        "Honest timelines based on actual development capacity",
        "Open documentation of decision-making processes",
        "Regular progress updates including challenges and pivots"
      ]
    },
    {
      title: "Evolution Over Revolution",
      stages: [
        { name: "Foundation First", desc: "Core operational systems with immediate value" },
        { name: "Integration Next", desc: "Connecting systems for unified workflows" },
        { name: "Intelligence Then", desc: "AI-powered insights and automation" },
        { name: "Innovation Always", desc: "Continuous improvement based on partner feedback" }
      ]
    }
  ]

  const rolesBenefits = [
    {
      role: "For Teachers",
      icon: Heart,
      benefits: [
        "AI assistance for lesson planning, not lesson replacement",
        "Intelligent grading support, not grading automation without oversight",
        "Data insights for decision making, not decision replacement"
      ]
    },
    {
      role: "For Students",
      icon: Sparkles,
      benefits: [
        "Personalized learning paths, not impersonal algorithms",
        "Achievement recognition, not external motivation dependency",
        "Social learning opportunities, not isolated digital consumption"
      ]
    },
    {
      role: "For Administrators",
      icon: Target,
      benefits: [
        "Operational intelligence, not operational autopilot",
        "Predictive insights, not prescriptive mandates",
        "Strategic dashboards, not micromanagement tools"
      ]
    }
  ]

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
      </div>

      {/* Content container */}
      <div className="relative z-10">
        <NavBar />
        <ProfileDropdown />

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6 pt-24">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <div className="mb-8">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-fabriiq-primary/20 border border-fabriiq-primary/40 text-fabriiq-primary text-base font-semibold backdrop-blur-sm">
                <span className="w-3 h-3 bg-fabriiq-primary rounded-full mr-3 animate-pulse"></span>
                Beyond Technology: A Fundamental Rethinking
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-background/80 rounded-2xl blur-3xl"></div>
              <div className="relative z-10 space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-foreground">Our Philosophy: </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                    Technology That Serves Learning
                  </span>
                </h1>
                <h2 className="text-2xl sm:text-3xl font-semibold text-muted-foreground">
                  Education deserves better than fragmented band-aids.
                </h2>
              </div>
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto my-8"></div>

            <div className="relative">
              <div className="absolute inset-0 bg-background/60 rounded-xl blur-2xl"></div>
              <p className="relative z-10 text-muted-foreground max-w-4xl mx-auto font-medium text-lg leading-relaxed">
                For too long, educational institutions have been forced to patch together disconnected systems, 
                each solving a piece of the puzzle while creating new problems through their disconnection. 
                We believe educational technology should amplify human potential, not burden it with complexity.
              </p>
            </div>

            <div className="pt-8">
              <Button 
                onClick={() => document.getElementById('philosophical-foundation')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal text-white rounded-lg font-medium text-base hover:from-fabriiq-teal hover:to-fabriiq-primary transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(31,80,75,0.3)]"
              >
                <span className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Explore Our Beliefs</span>
                </span>
              </Button>
            </div>
          </div>
        </section>

        {/* Philosophical Foundation Section */}
        <section id="philosophical-foundation" className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                Five Beliefs That Drive{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  Everything We Build
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                These aren't marketing positions—they're the foundational principles that guide every design decision, 
                every feature we build, and every partnership we form. Understanding our philosophy helps you understand 
                whether FabriiQ aligns with your institutional values and vision for educational excellence.
              </p>
            </motion.div>

            <div className="space-y-6">
              {coreBeliefs.map((belief, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BeliefCard
                    {...belief}
                    isExpanded={expandedBelief === index}
                    onToggle={() => setExpandedBelief(expandedBelief === index ? null : index)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Philosophy Section */}
        <section className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                How We Build:{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  Co-Creation, Not Consultation
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Most educational technology companies build in isolation, then try to convince institutions to adapt. 
                We believe the best solutions emerge from genuine partnership between educational experts and technologists.
              </p>
            </motion.div>

            <div className="space-y-12">
              {developmentPrinciples.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-8"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">{principle.title}</h3>
                  
                  {principle.traditional && principle.fabriiq && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-red-400 mb-3">Traditional Approach:</h4>
                        <p className="text-gray-300 leading-relaxed">{principle.traditional}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-fabriiq-teal mb-3">FabriiQ Approach:</h4>
                        <p className="text-gray-300 leading-relaxed">{principle.fabriiq}</p>
                      </div>
                    </div>
                  )}
                  
                  {principle.points && (
                    <ul className="space-y-3">
                      {principle.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-fabriiq-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {principle.stages && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {principle.stages.map((stage, stageIndex) => (
                        <div
                          key={stageIndex}
                          className="bg-fabriiq-primary/10 border border-fabriiq-primary/20 rounded-lg p-4 text-center"
                        >
                          <h5 className="font-semibold text-fabriiq-primary mb-2">{stage.name}</h5>
                          <p className="text-sm text-gray-300">{stage.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Human-Centered Technology Section */}
        <section className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                Technology Amplifies{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  Human Excellence
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                We believe the best educational technology makes great educators even better and helps struggling 
                educators improve. Technology should never replace human judgment, creativity, or care.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {rolesBenefits.map((roleGroup, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-fabriiq-primary/10 rounded-lg flex items-center justify-center">
                      <roleGroup.icon className="w-5 h-5 text-fabriiq-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{roleGroup.role}</h3>
                  </div>
                  <ul className="space-y-3">
                    {roleGroup.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-fabriiq-teal rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 p-8 bg-gradient-to-r from-fabriiq-primary/10 to-fabriiq-teal/10 rounded-xl border border-fabriiq-primary/20"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Holistic Learning Experience</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Learning is social and emotional, not just cognitive. Comprehensive educational platforms must address 
                the whole human experience through gamification that builds intrinsic motivation, social learning features 
                fostering genuine collaboration, achievement systems celebrating growth, and community building tools 
                strengthening educational relationships.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Partnership Philosophy Section */}
        <section className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                Development Partners,{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  Not Early Customers
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                We don't want institutions to buy what we've built—we want partners to help us build what education needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Partnership Meaning</h3>
                  <ul className="space-y-3">
                    {[
                      "Direct influence on product roadmap and feature prioritization",
                      "Collaborative problem-solving rather than vendor-customer transactions",
                      "Shared investment in educational technology advancement",
                      "Long-term relationship building beyond software implementation"
                    ].map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-fabriiq-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Success Measurement</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Our success isn't measured by software adoption metrics but by educational excellence 
                    improvements in partner institutions:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Student engagement and achievement improvements",
                      "Teacher satisfaction and pedagogical effectiveness",
                      "Administrative efficiency and operational excellence",
                      "Institutional growth and community impact"
                    ].map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-fabriiq-teal rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Thought Leadership Through Practice</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Best insights come from real implementation experiences, not theoretical frameworks:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Share learnings and best practices across partner network",
                      "Publish research and case studies from actual implementations",
                      "Contribute to educational technology discourse through proven results",
                      "Elevate partner institutions as thought leaders in educational innovation"
                    ].map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-fabriiq-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-fabriiq-teal/10 border border-fabriiq-teal/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-fabriiq-teal mb-3">Partnership Network Benefits</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Join a collaborative ecosystem where partner institutions share insights, best practices, 
                    and innovation opportunities while maintaining their unique identities and competitive advantages.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Future Vision Section */}
        <section className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                The Future We're Building:{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  A World Where Technology Serves Learning
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-8 mb-12"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                We envision educational institutions where technology amplifies human potential rather than competing with it. 
                Where teachers spend time teaching rather than managing systems. Where students engage with learning rather 
                than navigating platforms. Where administrators make strategic decisions based on intelligent insights rather 
                than drowning in operational complexity.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Educational Ecosystems That Thrive</h3>
                <p className="text-gray-300 leading-relaxed">
                  Building toward a future where educational institutions operate as coherent ecosystems—every component 
                  supporting every other component in service of student success and institutional excellence.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">New Standard for Educational Technology</h3>
                <p className="text-gray-300 leading-relaxed">
                  FabriiQ represents our commitment to elevating the entire educational technology industry. We believe 
                  institutions deserve better than fragmented solutions, vendor lock-in, and privacy compromises. 
                  We're proving that comprehensive, ethical, and effective educational technology is possible.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 sm:px-6 relative bg-black">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-4xl sm:text-5xl font-bold">
                <span className="text-foreground">Turn Philosophy </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  Into Reality
                </span>
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                This philosophy isn't abstract theory—it's the foundation for everything we build and every partnership we form. 
                If these principles resonate with your institutional values and vision, we invite you to help us transform 
                educational technology from a collection of tools into an ecosystem for human flourishing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <p className="text-xl text-gray-300 leading-relaxed">
                We're seeking educational institutions that share this philosophy and want to co-create the future 
                of comprehensive educational technology. Together, we can prove that technology can truly serve learning, 
                institutions can maintain their autonomy while gaining operational excellence, and the future of education 
                can be both innovative and deeply human.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/partnership">
                  <Button className="group relative px-8 py-4 bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal text-white rounded-lg font-medium text-base hover:from-fabriiq-teal hover:to-fabriiq-primary transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(31,80,75,0.3)]">
                    <span className="flex items-center space-x-2">
                      <Handshake className="w-5 h-5" />
                      <span>Join Us in Building the Future</span>
                    </span>
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button className="group relative px-8 py-4 bg-gray-800 text-white rounded-lg font-medium text-base hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-700">
                    <span className="flex items-center space-x-2">
                      <ArrowRight className="w-5 h-5" />
                      <span>Schedule Discussion</span>
                    </span>
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground italic">
                  "Join us in building technology that amplifies educational excellence rather than complicating it."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}