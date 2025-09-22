"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CodeRain } from "@/components/code-rain"
import { useLanguage } from "@/contexts/language-context"
import {
  MessageCircle,
  Settings,
  Users,
  TestTube,
  Rocket,
  LifeBuoy,
  CheckCircle,
  Target,
  BookOpen,
  Eye,
  Shield,
  Server,
  Brain,
  Building,
  Smartphone,
  BarChart,
  TrendingUp,
  ArrowRight,
  Play,
  FileText,
  ChevronLeft,
  ChevronRight,
  Clock,
  Award,
} from "lucide-react"

export default function ProcessPage() {
  const { t } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length)
    }, 8000) // Change step every 8 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const processSteps = [
    {
      id: "discovery",
      title: t('pages.process.steps.discovery.title'),
      duration: t('pages.process.steps.discovery.duration'),
      icon: <MessageCircle className="w-6 h-6" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      description: t('pages.process.steps.discovery.description'),
      activities: t('pages.process.steps.discovery.activities', { returnObjects: true }) || [],
      deliverables: t('pages.process.steps.discovery.deliverables', { returnObjects: true }) || [],
    },
    {
      id: "configuration",
      title: t('pages.process.steps.configuration.title'),
      duration: t('pages.process.steps.configuration.duration'),
      icon: <Settings className="w-6 h-6" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      description: t('pages.process.steps.configuration.description'),
      activities: t('pages.process.steps.configuration.activities', { returnObjects: true }) || [],
      deliverables: t('pages.process.steps.configuration.deliverables', { returnObjects: true }) || [],
    },
    {
      id: "pilot",
      title: t('pages.process.steps.pilot.title'),
      duration: t('pages.process.steps.pilot.duration'),
      icon: <Users className="w-6 h-6" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      description: t('pages.process.steps.pilot.description'),
      activities: t('pages.process.steps.pilot.activities', { returnObjects: true }) || [],
      deliverables: t('pages.process.steps.pilot.deliverables', { returnObjects: true }) || [],
    },
    {
      id: "refinement",
      title: t('pages.process.steps.refinement.title'),
      duration: t('pages.process.steps.refinement.duration'),
      icon: <TestTube className="w-6 h-6" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      description: t('pages.process.steps.refinement.description'),
      activities: t('pages.process.steps.refinement.activities', { returnObjects: true }) || [],
      deliverables: t('pages.process.steps.refinement.deliverables', { returnObjects: true }) || [],
    },
    {
      id: "deployment",
      title: t('pages.process.steps.deployment.title'),
      duration: t('pages.process.steps.deployment.duration'),
      icon: <Rocket className="w-6 h-6" />,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      description: t('pages.process.steps.deployment.description'),
      activities: t('pages.process.steps.deployment.activities', { returnObjects: true }) || [],
      deliverables: t('pages.process.steps.deployment.deliverables', { returnObjects: true }) || [],
    },
    {
      id: "partnership",
      title: t('pages.process.steps.partnership.title'),
      duration: t('pages.process.steps.partnership.duration'),
      icon: <LifeBuoy className="w-6 h-6" />,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      description: t('pages.process.steps.partnership.description'),
      activities: t('pages.process.steps.partnership.activities', { returnObjects: true }) || [],
      deliverables: t('pages.process.steps.partnership.deliverables', { returnObjects: true }) || [],
    },
  ]

  const methodologies = [
    {
      title: "Educational-First Development",
      description: "Every development decision prioritizes educational impact over technical convenience",
      icon: <BookOpen className="w-6 h-6" />,
      benefits: [
        "Pedagogically-sound feature design",
        "Evidence-based educational improvements",
        "Teacher workflow optimization",
      ],
    },
    {
      title: "Collaborative Co-Creation",
      description: "Development partners influence platform direction, features, and implementation approach",
      icon: <Users className="w-6 h-6" />,
      benefits: [
        "Institution-specific customization",
        "Real-world problem solving",
        "Shared ownership of platform evolution",
      ],
    },
    {
      title: "Transparent Alpha Development",
      description: "Complete visibility into development progress, limitations, and future roadmap",
      icon: <Eye className="w-6 h-6" />,
      benefits: [
        "No hidden limitations or surprises",
        "Realistic timeline expectations",
        "Honest capability communication",
      ],
    },
    {
      title: "Privacy-First Architecture",
      description: "FERPA compliance and educational privacy built into every platform component",
      icon: <Shield className="w-6 h-6" />,
      benefits: ["Automatic compliance maintenance", "Student privacy protection", "Administrative peace of mind"],
    },
  ]

  const tools = [
    {
      category: "Platform Architecture",
      tools: ["Next.js", "React", "Node.js", "PostgreSQL"],
      icon: <Server className="w-5 h-5" />,
    },
    {
      category: "Educational Intelligence",
      tools: ["AIVY Multi-Agent System", "Bloom's Taxonomy Engine", "Mastery Analytics", "Predictive Insights"],
      icon: <Brain className="w-5 h-5" />,
    },
    {
      category: "Multi-Campus Operations",
      tools: [
        "Role-based Access Control",
        "Real-time Synchronization",
        "Cross-Campus Analytics",
        "Unified Communications",
      ],
      icon: <Building className="w-5 h-5" />,
    },
    {
      category: "Privacy & Compliance",
      tools: ["FERPA Compliance Engine", "Privacy-by-Design Architecture", "Audit Systems", "Consent Management"],
      icon: <Shield className="w-5 h-5" />,
    },
    {
      category: "Mobile & Offline",
      tools: ["Progressive Web Apps", "Offline-First Architecture", "Mobile Optimization", "Cross-Device Sync"],
      icon: <Smartphone className="w-5 h-5" />,
    },
    {
      category: "Analytics & Reporting",
      tools: ["Real-time Dashboards", "Predictive Analytics", "Custom Report Builder", "Educational Insights"],
      icon: <BarChart className="w-5 h-5" />,
    },
  ]

  const metrics = [
    {
      title: "Workflow Efficiency Improvement",
      value: "85%",
      description: "Average efficiency gain across partner institutions",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-green-500",
    },
    {
      title: "Partnership Satisfaction Score",
      value: "96%",
      description: "Development partner satisfaction rating",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-500",
    },
    {
      title: "System Uptime",
      value: "99.5%",
      description: "Platform availability across all partner institutions",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-purple-500",
    },
    {
      title: "Milestone Achievement",
      value: "100%",
      description: "On-time delivery of partnership milestones",
      icon: <Target className="w-6 h-6" />,
      color: "text-orange-500",
    },
  ]

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % processSteps.length)
    setIsAutoPlaying(false)
  }

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + processSteps.length) % processSteps.length)
    setIsAutoPlaying(false)
  }

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <CodeRain />
      </div>
      <NavBar />

      <div className="container mx-auto px-4 py-20 sm:py-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-fabriiq-primary/10 border border-fabriiq-primary/20 text-fabriiq-primary text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              {t('pages.process.badge')}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
              {t('pages.process.title')}{" "}
              <span className="bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal bg-clip-text text-transparent">
                {t('pages.process.titleHighlight')}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              {t('pages.process.subtitle')}
            </p>
          </motion.div>

          {/* Partnership Philosophy */}
          <motion.div
            className="mb-12 sm:mb-16 bg-gradient-to-br from-fabriiq-primary/5 to-fabriiq-teal/5 border border-fabriiq-primary/20 rounded-2xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-fabriiq-primary to-fabriiq-teal rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Partnership Philosophy</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto text-pretty">
                We don't build educational technology <em>for</em> institutions - we build it <em>with</em> them. Our
                Alpha phase development partners are co-creators who shape FabriiQ's evolution based on real educational
                challenges and opportunities.
              </p>
            </div>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our 6-Step Partnership Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Navigate through our comprehensive development process designed for educational excellence
              </p>
            </div>

            <div className="mb-8">
              {/* Progress Bar */}
              <div className="relative mb-6">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted rounded-full -translate-y-1/2" />
                <div
                  className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal rounded-full -translate-y-1/2 transition-all duration-500"
                  style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                />
                <div className="relative flex justify-between">
                  {processSteps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => {
                        setActiveStep(index)
                        setIsAutoPlaying(false)
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                        index <= activeStep
                          ? "bg-gradient-to-br from-fabriiq-primary to-fabriiq-teal border-fabriiq-primary text-white"
                          : "bg-background border-muted-foreground/30 text-muted-foreground hover:border-fabriiq-primary/50"
                      }`}
                    >
                      <span className="text-sm font-medium">{index + 1}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Navigation Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {processSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveStep(index)
                      setIsAutoPlaying(false)
                    }}
                    className={`px-3 py-2 text-xs sm:text-sm rounded-lg transition-all duration-300 ${
                      activeStep === index
                        ? "bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal text-white shadow-lg"
                        : "bg-background/80 backdrop-blur-sm text-muted-foreground border border-border hover:text-foreground hover:border-fabriiq-primary/30"
                    }`}
                  >
                    <span className="hidden sm:inline">{index + 1}. </span>
                    <span className="truncate max-w-[120px] sm:max-w-none">{step.title}</span>
                  </button>
                ))}
              </div>

              {/* Auto-play Controls */}
              <div className="flex justify-center items-center gap-4 mb-8">
                <button onClick={prevStep} className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    isAutoPlaying
                      ? "bg-fabriiq-primary/20 text-fabriiq-primary border border-fabriiq-primary/30"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {isAutoPlaying ? "Pause Auto-play" : "Resume Auto-play"}
                </button>

                <button onClick={nextStep} className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Step Details - Enhanced Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`${processSteps[activeStep].bgColor} ${processSteps[activeStep].borderColor} border rounded-2xl p-6 sm:p-8 shadow-lg`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                  <div
                    className={`w-16 h-16 ${processSteps[activeStep].bgColor} rounded-2xl flex items-center justify-center border ${processSteps[activeStep].borderColor} shadow-lg`}
                  >
                    <div className={processSteps[activeStep].color}>{processSteps[activeStep].icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{processSteps[activeStep].title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Duration: {processSteps[activeStep].duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-current rounded-full" />
                        <span>
                          Step {activeStep + 1} of {processSteps.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-base sm:text-lg mb-8 text-pretty">{processSteps[activeStep].description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg flex items-center">
                      <Play className="w-5 h-5 mr-2 text-fabriiq-primary" />
                      Key Activities
                    </h4>
                    <div className="space-y-3">
                      {processSteps[activeStep].activities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm"
                        >
                          <CheckCircle className="w-5 h-5 text-fabriiq-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm sm:text-base">{activity}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-fabriiq-primary" />
                      Partnership Deliverables
                    </h4>
                    <div className="space-y-3">
                      {processSteps[activeStep].deliverables.map((deliverable, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm"
                        >
                          <ArrowRight className="w-5 h-5 text-fabriiq-teal mt-0.5 flex-shrink-0" />
                          <span className="text-sm sm:text-base">{deliverable}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Partnership Methodologies */}
          <motion.div
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Partnership Methodologies</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our proven approaches to collaborative educational technology development
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {methodologies.map((methodology, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 hover:border-fabriiq-primary/50 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-fabriiq-primary/20 to-fabriiq-teal/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-fabriiq-primary">{methodology.icon}</div>
                  </div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{methodology.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 text-pretty">{methodology.description}</p>
                  <div className="space-y-2">
                    {methodology.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-fabriiq-primary mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Educational Technology Tools & Expertise */}
          <motion.div
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
              Educational Technology Tools & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((toolCategory, index) => (
                <div key={index} className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {toolCategory.icon}
                    </div>
                    <h3 className="font-semibold">{toolCategory.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {toolCategory.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-3 py-1 bg-muted/50 text-muted-foreground text-sm rounded-full border border-border"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Partnership Success Metrics */}
          <motion.div
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Partnership Success Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {metric.icon}
                  </div>
                  <div className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                  <h3 className="font-semibold mb-1">{metric.title}</h3>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Why Alpha Phase Partnership */}
          <motion.div
            className="mb-12 bg-background/80 backdrop-blur-sm border border-border rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Why Alpha Phase Partnership?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Influence Platform Direction",
                  description: "Your institution's needs directly influence feature development",
                  icon: <Target className="w-6 h-6" />,
                },
                {
                  title: "Early Competitive Advantage",
                  description: "18-24 month head start on comprehensive educational technology",
                  icon: <TrendingUp className="w-6 h-6" />,
                },
                {
                  title: "No Implementation Costs",
                  description: "Development partnership covers initial deployment and customization",
                  icon: <Shield className="w-6 h-6" />,
                },
                {
                  title: "Thought Leadership Recognition",
                  description: "Position your institution as an educational innovation pioneer",
                  icon: <BookOpen className="w-6 h-6" />,
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="bg-gradient-to-br from-fabriiq-primary/5 to-fabriiq-teal/5 border border-fabriiq-primary/20 rounded-2xl p-6 sm:p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-fabriiq-primary to-fabriiq-teal rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Transform Your Institution?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Join forward-thinking educational institutions in co-creating the future of educational technology.
              Limited Alpha phase partnership positions available for qualified institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/partnership-application"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
              >
                <Users className="w-5 h-5 mr-2" />
                Apply for Development Partnership
              </a>
              <a
                href="/capabilities"
                className="inline-flex items-center justify-center px-6 py-3 bg-background border border-border text-foreground rounded-xl hover:border-fabriiq-primary/50 hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
              >
                Explore Platform Capabilities
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>

            {/* Limited Partnership Availability Notice */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm sm:text-base mb-1">Limited Partnership Availability</p>
                  <p className="text-xs sm:text-sm text-muted-foreground text-pretty">
                    We're accepting a maximum of 12 development partners to ensure meaningful collaboration and
                    comprehensive customization for each institution. Priority given to institutions demonstrating
                    commitment to educational innovation and technology transformation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
