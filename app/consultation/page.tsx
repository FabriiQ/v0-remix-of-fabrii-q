"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BusinessProfileHeader } from "@/components/business-profile-header"
import {
  ChevronRight,
  ChevronLeft,
  Building,
  Users,
  DollarSign,
  Target,
  Calendar,
  Rocket,
  CheckCircle,
  ArrowRight,
  Globe,
  Smartphone,
  Cog,
  Package,
  Building2,
  Laptop,
  TrendingUp,
  BarChart,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type ConsultationData = {
  businessType: string
  companySize: string
  budget: string
  projectType: string[]
  timeline: string
  goals: string[]
  name: string
  email: string
  company: string
  phone: string
  isGuest: boolean
}

export default function ConsultationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isGuest, setIsGuest] = useState(false)
  const [consultationData, setConsultationData] = useState<ConsultationData>({
    businessType: "",
    companySize: "",
    budget: "",
    projectType: [],
    timeline: "",
    goals: [],
    name: "",
    email: "",
    company: "",
    phone: "",
    isGuest: false,
  })

  // Update header dropdown when data changes
  useEffect(() => {
    const updateData = {
      service: consultationData.projectType.join(", "),
      businessName: consultationData.company,
      businessType: consultationData.businessType,
      companySize: consultationData.companySize,
      budget: consultationData.budget,
      timeline: consultationData.timeline,
      contactName: consultationData.name,
      email: consultationData.email,
    }

    // Show dropdown when user starts filling data
    if (Object.values(updateData).some((val) => val && val.trim() !== "")) {
      window.dispatchEvent(new CustomEvent("showProfileDropdown", { detail: updateData }))
      window.dispatchEvent(new CustomEvent("updateProfileDropdown", { detail: updateData }))
    }
  }, [consultationData])

  const steps = [
    { id: "business", title: "Business", icon: Building, color: "emerald" },
    { id: "size", title: "Size", icon: Users, color: "blue" },
    { id: "project", title: "Project", icon: Target, color: "purple" },
    { id: "budget", title: "Budget", icon: DollarSign, color: "green" },
    { id: "timeline", title: "Timeline", icon: Clock, color: "orange" },
    { id: "goals", title: "Goals", icon: Rocket, color: "cyan" },
    { id: "contact", title: "Contact", icon: Calendar, color: "pink" },
  ]

  const businessTypes = [
    {
      id: "startup",
      label: "Startup",
      description: "Early-stage innovation",
      icon: "🚀",
      gradient: "from-emerald-500/20 to-green-500/20",
      border: "border-emerald-500/30",
    },
    {
      id: "smb",
      label: "Small Business",
      description: "Established enterprise",
      icon: "🏢",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
    },
    {
      id: "enterprise",
      label: "Enterprise",
      description: "Large corporation",
      icon: "🏛️",
      gradient: "from-purple-500/20 to-indigo-500/20",
      border: "border-purple-500/30",
    },
    {
      id: "agency",
      label: "Agency",
      description: "Creative & marketing",
      icon: "🎨",
      gradient: "from-pink-500/20 to-rose-500/20",
      border: "border-pink-500/30",
    },
  ]

  const companySizes = [
    { id: "1-10", label: "1-10 employees", description: "Small team", icon: "👥" },
    { id: "11-50", label: "11-50 employees", description: "Growing company", icon: "🏢" },
    { id: "51-200", label: "51-200 employees", description: "Mid-size", icon: "🏬" },
    { id: "200+", label: "200+ employees", description: "Large corp", icon: "🏭" },
  ]

  const projectTypes = [
    {
      id: "website",
      label: "Website Development",
      icon: <Globe className="w-6 h-6" />,
      color: "emerald",
      description: "Web applications",
    },
    {
      id: "mobile",
      label: "Mobile App",
      icon: <Smartphone className="w-6 h-6" />,
      color: "blue",
      description: "iOS & Android",
    },
    {
      id: "digital",
      label: "Digital Systems",
      icon: <Laptop className="w-6 h-6" />,
      color: "purple",
      description: "Enterprise software",
    },
    {
      id: "mechanical",
      label: "Mechanical Engineering",
      icon: <Cog className="w-6 h-6" />,
      color: "orange",
      description: "Product design",
    },
    {
      id: "product",
      label: "Product Development",
      icon: <Package className="w-6 h-6" />,
      color: "cyan",
      description: "End-to-end solutions",
    },
    {
      id: "architecture",
      label: "Architecture Design",
      icon: <Building2 className="w-6 h-6" />,
      color: "indigo",
      description: "Structural design",
    },
  ]

  const budgetRanges = [
    { id: "5k-25k", label: "$5K - $25K", description: "Small projects", icon: "💡" },
    { id: "25k-100k", label: "$25K - $100K", description: "Medium solutions", icon: "🚀" },
    { id: "100k-500k", label: "$100K - $500K", description: "Enterprise", icon: "🏢" },
    { id: "500k+", label: "$500K+", description: "Transformation", icon: "⭐" },
  ]

  const timelines = [
    { id: "asap", label: "ASAP", description: "Immediate start", icon: "⚡" },
    { id: "1-3months", label: "1-3 months", description: "Planning phase", icon: "📅" },
    { id: "3-6months", label: "3-6 months", description: "Flexible dev", icon: "🎯" },
    { id: "6months+", label: "6+ months", description: "Long-term", icon: "🗺️" },
  ]

  const businessGoals = [
    { id: "increase-sales", label: "Increase Sales", icon: <TrendingUp className="w-5 h-5" />, color: "emerald" },
    { id: "improve-efficiency", label: "Improve Efficiency", icon: <Rocket className="w-5 h-5" />, color: "blue" },
    { id: "expand-market", label: "Expand Market", icon: <Target className="w-5 h-5" />, color: "purple" },
    { id: "reduce-costs", label: "Reduce Costs", icon: <BarChart className="w-5 h-5" />, color: "green" },
    { id: "modernize", label: "Modernize Ops", icon: <Sparkles className="w-5 h-5" />, color: "orange" },
    { id: "competitive-advantage", label: "Competitive Edge", icon: <Shield className="w-5 h-5" />, color: "cyan" },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    localStorage.setItem("consultationCompleted", "true")
    localStorage.setItem("consultationData", JSON.stringify(consultationData))
    window.location.href = "/dashboard"
  }

  const toggleProjectType = (typeId: string) => {
    setConsultationData((prev) => ({
      ...prev,
      projectType: prev.projectType.includes(typeId)
        ? prev.projectType.filter((id) => id !== typeId)
        : [...prev.projectType, typeId],
    }))
  }

  const toggleGoal = (goalId: string) => {
    setConsultationData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId) ? prev.goals.filter((id) => id !== goalId) : [...prev.goals, goalId],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <NavBar />
      <BusinessProfileHeader />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center py-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Strategic Consultation
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      index <= currentStep ? "bg-emerald-500 text-white" : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {index < currentStep ? <CheckCircle className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-2 bg-gray-700 rounded">
                      <div
                        className={`h-full bg-emerald-500 rounded transition-all duration-500 ${
                          index < currentStep ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="min-h-[400px] flex flex-col justify-center"
              >
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold flex items-center justify-center">
                        <Building className="w-6 h-6 mr-3 text-emerald-400" />
                        What type of business are you?
                      </h2>
                      <p className="text-gray-400">Help us understand your business context</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                      {businessTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          onClick={() => setConsultationData({ ...consultationData, businessType: type.id })}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                            consultationData.businessType === type.id
                              ? `${type.border} bg-gradient-to-br ${type.gradient} shadow-xl`
                              : "border-gray-700/50 hover:border-gray-600 bg-gray-800/20"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-2xl mb-2">{type.icon}</div>
                          <h3 className="text-sm font-bold mb-1 text-white">{type.label}</h3>
                          <p className="text-gray-400 text-xs">{type.description}</p>
                          {consultationData.businessType === type.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                            >
                              <CheckCircle className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold flex items-center justify-center">
                        <Users className="w-6 h-6 mr-3 text-blue-400" />
                        Company size?
                      </h2>
                      <p className="text-gray-400">This helps us scale our recommendations</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                      {companySizes.map((size) => (
                        <motion.button
                          key={size.id}
                          onClick={() => setConsultationData({ ...consultationData, companySize: size.id })}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                            consultationData.companySize === size.id
                              ? "border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-xl"
                              : "border-gray-700/50 hover:border-gray-600 bg-gray-800/20"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-2xl mb-2">{size.icon}</div>
                          <h3 className="text-sm font-bold mb-1 text-white">{size.label}</h3>
                          <p className="text-gray-400 text-xs">{size.description}</p>
                          {consultationData.companySize === size.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                            >
                              <CheckCircle className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold flex items-center justify-center">
                        <Target className="w-6 h-6 mr-3 text-purple-400" />
                        What services do you need?
                      </h2>
                      <p className="text-gray-400">Select all that apply</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                      {projectTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          onClick={() => toggleProjectType(type.id)}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            consultationData.projectType.includes(type.id)
                              ? `border-${type.color}-500 bg-gradient-to-br from-${type.color}-500/20 to-${type.color}-600/20 shadow-xl`
                              : "border-gray-700/50 hover:border-gray-600 bg-gray-800/20"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`text-${type.color}-400 mb-2`}>{type.icon}</div>
                          <h3 className="text-sm font-bold mb-1 text-white">{type.label}</h3>
                          <p className="text-gray-400 text-xs">{type.description}</p>
                          {consultationData.projectType.includes(type.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`absolute top-2 right-2 w-5 h-5 bg-${type.color}-500 rounded-full flex items-center justify-center`}
                            >
                              <CheckCircle className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold flex items-center justify-center">
                        <DollarSign className="w-6 h-6 mr-3 text-green-400" />
                        What's your budget range?
                      </h2>
                      <p className="text-gray-400">This helps us recommend the right solution</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                      {budgetRanges.map((budget) => (
                        <motion.button
                          key={budget.id}
                          onClick={() => setConsultationData({ ...consultationData, budget: budget.id })}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                            consultationData.budget === budget.id
                              ? "border-green-500 bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-xl"
                              : "border-gray-700/50 hover:border-gray-600 bg-gray-800/20"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-2xl mb-2">{budget.icon}</div>
                          <h3 className="text-sm font-bold mb-1 text-white">{budget.label}</h3>
                          <p className="text-gray-400 text-xs">{budget.description}</p>
                          {consultationData.budget === budget.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <CheckCircle className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold flex items-center justify-center">
                        <Clock className="w-6 h-6 mr-3 text-orange-400" />
                        When do you want to start?
                      </h2>
                      <p className="text-gray-400">Timeline helps us plan your project</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                      {timelines.map((timeline) => (
                        <motion.button
                          key={timeline.id}
                          onClick={() => setConsultationData({ ...consultationData, timeline: timeline.id })}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                            consultationData.timeline === timeline.id
                              ? "border-orange-500 bg-gradient-to-br from-orange-500/20 to-red-500/20 shadow-xl"
                              : "border-gray-700/50 hover:border-gray-600 bg-gray-800/20"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-2xl mb-2">{timeline.icon}</div>
                          <h3 className="text-sm font-bold mb-1 text-white">{timeline.label}</h3>
                          <p className="text-gray-400 text-xs">{timeline.description}</p>
                          {consultationData.timeline === timeline.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center"
                            >
                              <CheckCircle className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold flex items-center justify-center">
                        <Rocket className="w-6 h-6 mr-3 text-cyan-400" />
                        What are your main goals?
                      </h2>
                      <p className="text-gray-400">Select all that apply</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                      {businessGoals.map((goal) => (
                        <motion.button
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            consultationData.goals.includes(goal.id)
                              ? `border-${goal.color}-500 bg-gradient-to-br from-${goal.color}-500/20 to-${goal.color}-600/20 shadow-xl`
                              : "border-gray-700/50 hover:border-gray-600 bg-gray-800/20"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`text-${goal.color}-400 mb-2`}>{goal.icon}</div>
                          <h3 className="text-sm font-bold text-white">{goal.label}</h3>
                          {consultationData.goals.includes(goal.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`absolute top-2 right-2 w-5 h-5 bg-${goal.color}-500 rounded-full flex items-center justify-center`}
                            >
                              <CheckCircle className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold flex items-center justify-center">
                        <Calendar className="w-6 h-6 mr-3 text-emerald-400" />
                        Let's get your consultation scheduled
                      </h2>
                      <p className="text-gray-400">Final step to unlock your strategy</p>
                    </div>

                    {/* Guest Mode Toggle */}
                    <div className="max-w-xl mx-auto mb-6">
                      <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-emerald-500/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-white">Try as Guest</h3>
                            <p className="text-gray-400 text-sm">Preview dashboard without saving info</p>
                          </div>
                          <button
                            onClick={() => setIsGuest(!isGuest)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              isGuest ? "bg-emerald-500" : "bg-gray-600"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                isGuest ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {!isGuest && (
                      <div className="max-w-2xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Full Name *</label>
                            <input
                              type="text"
                              value={consultationData.name}
                              onChange={(e) => setConsultationData({ ...consultationData, name: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition-all"
                              placeholder="Your full name"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Email Address *</label>
                            <input
                              type="email"
                              value={consultationData.email}
                              onChange={(e) => setConsultationData({ ...consultationData, email: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition-all"
                              placeholder="your@email.com"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Company Name</label>
                            <input
                              type="text"
                              value={consultationData.company}
                              onChange={(e) => setConsultationData({ ...consultationData, company: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition-all"
                              placeholder="Your company"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Phone Number</label>
                            <input
                              type="tel"
                              value={consultationData.phone}
                              onChange={(e) => setConsultationData({ ...consultationData, phone: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition-all"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {isGuest && (
                      <div className="max-w-xl mx-auto">
                        <div className="text-center p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-emerald-500/20">
                          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Sparkles className="w-6 h-6 text-emerald-400" />
                          </div>
                          <h3 className="font-bold text-emerald-400 mb-2">Guest Mode Active</h3>
                          <p className="text-gray-400">
                            Explore our dashboard and see what we offer. Sign up at the end to save your consultation.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
              >
                Next Step
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
              >
                {isGuest ? "Preview Dashboard" : "Start Consultation"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
