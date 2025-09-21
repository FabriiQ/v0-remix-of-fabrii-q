"use client"

import Link from "next/link"
import { CodeRain } from "@/components/code-rain"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { SpinningEarth } from "@/components/spinning-earth"
import { TypingHero } from "@/components/typing-hero"
import { motion } from "framer-motion"
import { Zap, Users, Brain, Shield, Building2, Lightbulb, Target } from "lucide-react"
import { ProfileDropdown } from "@/components/profile-dropdown"

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
                <span className="text-foreground">6 Key </span>
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
                  title: "Intelligent Enrollment Management",
                  description:
                    "Streamline student lifecycle management with automated processing and multi-campus coordination. Single and bulk enrollment creation, real-time CSV validation, and predictive analytics transform administrative efficiency.",
                  status: "Core operations active, advanced analytics in development",
                  image: "/student-enrollment-dashboard-with-automated-workf.jpg",
                  color: "text-primary",
                },
                {
                  icon: Building2,
                  title: "Financial Operations Automation",
                  description:
                    "Transform fee management with intelligent automation, multi-currency support, and comprehensive financial analytics. Automated challan generation, payment processing, and policy-based late fee management.",
                  status: "Core functionality complete, advanced reporting in development",
                  image: "/financial-dashboard-with-multi-currency-support-a.jpg",
                  color: "text-fabriiq-primary",
                },
                {
                  icon: Zap,
                  title: "Strategic Communication Intelligence",
                  description:
                    "Coordinate institutional communications with FERPA-compliant messaging, emergency broadcasting, and intelligent routing. Multi-channel delivery, automated prioritization, and comprehensive analytics.",
                  status: "Core messaging active, analytics dashboard in beta",
                  image: "/communication-hub-with-multi-channel-messaging-an.jpg",
                  color: "text-fabriiq-teal",
                },
                {
                  icon: Shield,
                  title: "Data-Driven Teaching Analytics",
                  description:
                    "Access comprehensive class performance insights with predictive student outcome analysis and intervention recommendations. Real-time dashboards, Bloom's Taxonomy cognitive tracking, and at-risk student identification.",
                  status: "Core reporting active, predictive features in development",
                  image: "/analytics-dashboard-with-student-performance-pred.jpg",
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
                  <div className="mb-4 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
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

        {/* Comprehensive Capabilities section */}
        <section className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                className="inline-flex items-center space-x-2 px-6 py-3 bg-fabriiq-primary/10 rounded-full border border-fabriiq-primary/20 mb-6 backdrop-blur-sm"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="w-2 h-2 bg-fabriiq-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-fabriiq-primary">Comprehensive Platform Capabilities</span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Capabilities That{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  Transform
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Five comprehensive capabilities designed to revolutionize educational operations and enhance learning
                outcomes
              </p>
            </motion.div>

            <div className="space-y-20">
              {[
                {
                  title: "Intelligent Enrollment Management",
                  description:
                    "Streamline student lifecycle management with automated processing and multi-campus coordination. Single and bulk enrollment creation, real-time CSV validation, and predictive analytics transform administrative efficiency across institutional hierarchies.",
                  features: [
                    "Multi-campus enrollment coordination",
                    "Automated status management workflows",
                    "Real-time validation and error handling",
                    "Predictive enrollment forecasting",
                  ],
                  benefits: ["75% Manual Task Reduction", "98% Data Accuracy", "65% Time Savings"],
                  status: {
                    active: "Core operations",
                    development: "Advanced analytics",
                    planned: "AI-powered forecasting",
                  },
                  techStack: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
                  videoUrl:
                    "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Enrollments.mp4",
                  image: "/intelligent-enrollment-management-dashboard-with-.jpg",
                },
                {
                  title: "Financial Operations Automation",
                  description:
                    "Transform fee management with intelligent automation, multi-currency support, and comprehensive financial analytics. Automated challan generation, payment processing, and policy-based late fee management streamline institutional financial operations.",
                  features: [
                    "Flexible fee structure management",
                    "Multi-payment method processing",
                    "Automated compliance reporting",
                    "Real-time financial analytics",
                  ],
                  benefits: [
                    "80% Financial Task Efficiency",
                    "99% Calculation Accuracy",
                    "50% Processing Speed Improvement",
                  ],
                  status: {
                    complete: "Core functionality",
                    development: "Advanced reporting",
                    planned: "Predictive financial analytics",
                  },
                  techStack: ["Node.js", "Stripe API", "PostgreSQL", "Redis"],
                  videoUrl:
                    "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Fee%20Management.mp4",
                  image: "/financial-operations-automation-dashboard-with-m.jpg",
                },
                {
                  title: "Pedagogical Intelligence Framework",
                  description:
                    "Align curriculum with learning outcomes using Bloom's Taxonomy integration and cognitive balance analysis. Learning outcome mapping, curriculum alignment verification, and performance correlation tracking enhance educational effectiveness.",
                  features: [
                    "Six-level Bloom's Taxonomy framework",
                    "Automated curriculum alignment",
                    "Cognitive balance analysis",
                    "Performance correlation tracking",
                  ],
                  benefits: ["65% Curriculum Alignment Accuracy", "92% Outcome Correlation", "55% Planning Efficiency"],
                  status: {
                    complete: "Core framework",
                    development: "Advanced analytics",
                    beta: "Cognitive balance optimization",
                  },
                  techStack: ["Python", "scikit-learn", "PostgreSQL", "React"],
                  videoUrl:
                    "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/System%20Admin%20Subjects%20and%20learning%20outcomes.mp4",
                  image: "/pedagogical-intelligence-framework-with-bloom-s-.jpg",
                },
                {
                  title: "Strategic Communication Intelligence",
                  description:
                    "Coordinate institutional communications with FERPA-compliant messaging, emergency broadcasting, and intelligent routing. Multi-channel delivery, automated prioritization, and comprehensive analytics ensure effective stakeholder engagement.",
                  features: [
                    "FERPA-compliant messaging system",
                    "Emergency broadcast capabilities",
                    "Intelligent routing and prioritization",
                    "Communication analytics insights",
                  ],
                  benefits: [
                    "85% Communication Efficiency",
                    "100% Compliance Adherence",
                    "60% Response Time Improvement",
                  ],
                  status: {
                    active: "Core messaging",
                    planned: "Advanced features",
                    beta: "Analytics dashboard",
                  },
                  techStack: ["WebSocket", "Node.js", "Redis", "PostgreSQL"],
                  videoUrl:
                    "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/System%20Admin%20Communication%20hub.mp4",
                  image: "/strategic-communication-intelligence-hub-with-mu.jpg",
                },
                {
                  title: "Data-Driven Teaching Analytics",
                  description:
                    "Access comprehensive class performance insights with predictive student outcome analysis and intervention recommendations. Real-time dashboards, Bloom's Taxonomy cognitive tracking, and at-risk student identification enhance teaching effectiveness.",
                  features: [
                    "Real-time performance dashboards",
                    "Predictive outcome analysis",
                    "At-risk student identification",
                    "Bloom's cognitive level tracking",
                  ],
                  benefits: [
                    "70% Prediction Accuracy",
                    "88% Intervention Reliability",
                    "50% Faster Risk Identification",
                  ],
                  status: {
                    active: "Core reporting",
                    development: "Predictive features",
                    planned: "AI-powered interventions",
                  },
                  techStack: ["Python", "TensorFlow", "D3.js", "PostgreSQL"],
                  videoUrl:
                    "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Class%20Reports.mp4",
                  image: "/data-driven-teaching-analytics-dashboard-with-pr.jpg",
                },
              ].map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Content */}
                  <div className={`space-y-8 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-4">{capability.title}</h3>
                      <p className="text-lg text-gray-300 leading-relaxed mb-6">{capability.description}</p>
                    </div>

                    {/* Features and Benefits Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Features */}
                      <div>
                        <h4 className="text-lg font-semibold text-fabriiq-primary mb-4">Key Features</h4>
                        <ul className="space-y-3">
                          {capability.features.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIndex * 0.1 }}
                              className="flex items-start space-x-3"
                            >
                              <div className="w-2 h-2 bg-fabriiq-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="text-lg font-semibold text-fabriiq-teal mb-4">Expected Benefits</h4>
                        <div className="space-y-3">
                          {capability.benefits.map((benefit, benefitIndex) => (
                            <motion.div
                              key={benefitIndex}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: benefitIndex * 0.1 }}
                              className="bg-fabriiq-teal/10 px-3 py-2 rounded-lg border border-fabriiq-teal/20"
                            >
                              <span className="text-fabriiq-teal font-semibold text-sm">{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Development Status */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                        Development Status
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(capability.status).map(([status, label], statusIndex) => (
                          <motion.div
                            key={statusIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: statusIndex * 0.05 }}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              status === "active"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : status === "complete"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                  : status === "beta"
                                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                    : status === "development"
                                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                                      : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}: {label}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {capability.techStack.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.05 }}
                            className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-xs font-medium border border-gray-700"
                          >
                            {tech}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Image and Video */}
                  <motion.div
                    className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-fabriiq-primary/10 to-fabriiq-teal/10 border border-white/10">
                      <img
                        src={capability.image || "/placeholder.svg"}
                        alt={capability.title}
                        className="w-full h-80 object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white font-semibold mb-2">{capability.title}</h4>
                        <p className="text-gray-300 text-sm">Interactive Demo Available</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Showcase section */}
        <section className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                className="inline-flex items-center space-x-2 px-6 py-3 bg-fabriiq-primary/10 rounded-full border border-fabriiq-primary/20 mb-6 backdrop-blur-sm"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Zap className="w-4 h-4 text-fabriiq-primary" />
                <span className="text-sm font-medium text-fabriiq-primary">Platform Excellence</span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Built for{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  Education
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Purpose-built architecture designed specifically for educational institutions, not generic solutions
                retrofitted for schools
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Platform Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src="/comprehensive-educational-platform-dashboard-wi.jpg"
                    alt="FabriiQ Platform Dashboard"
                    className="w-full h-96 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-semibold mb-2">FabriiQ Platform</h4>
                    <p className="text-gray-300 text-sm">Comprehensive Educational Intelligence</p>
                  </div>
                </div>
              </motion.div>

              {/* Platform Features */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6">Platform Excellence</h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    Every component of FabriiQ is designed with educational workflows in mind, from AIVY's multi-agent
                    intelligence to FERPA-native privacy architecture.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Brain,
                      title: "AIVY Multi-Agent System",
                      description: "Purpose-built AI agents that understand educational contexts and workflows",
                      color: "text-fabriiq-primary",
                    },
                    {
                      icon: Target,
                      title: "Bloom's Taxonomy Native",
                      description: "Integrated cognitive level tracking and mastery measurement at the core",
                      color: "text-fabriiq-teal",
                    },
                    {
                      icon: Shield,
                      title: "Privacy-by-Design",
                      description: "FERPA compliance built into the architecture, not bolted on afterwards",
                      color: "text-primary",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0`}
                      >
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                        <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6"
                >
                  <div className="p-6 bg-gradient-to-r from-fabriiq-primary/10 to-fabriiq-teal/10 rounded-xl border border-fabriiq-primary/20">
                    <h4 className="text-lg font-semibold text-white mb-2">Alpha Development Status</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Core systems are active and being refined through development partnerships. Join us in co-creating
                      the future of educational technology.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

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
                    <p className="text-sm text-muted-foreground">Strategic Investment</p>
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
                    <p className="text-sm text-muted-foreground">Competitive advantage</p>
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
