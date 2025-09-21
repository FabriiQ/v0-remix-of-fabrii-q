"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ChevronRight, Star, TrendingUp, Users, Zap, Shield, Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"
import VideoPlayer from "@/components/video-player"

export default function CapabilitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedCapability, setSelectedCapability] = useState<any>(null)
  const isMobile = useMobile()

  const capabilities = [
    // System Admin Portal
    {
      id: "academic-calendar",
      name: "Academic Calendar Management",
      subtitle: "Unified Multi-Campus Scheduling",
      category: "System Admin Portal",
      status: "Alpha Stage",
      description:
        "Centralize academic planning across multiple campuses with intelligent conflict detection and automated synchronization.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Academic%20Calendar.mp4",
      features: [
        "Multi-campus calendar coordination",
        "Academic event management (exams, orientations, graduations)",
        "Holiday management with automatic exclusions",
        "Resource scheduling with conflict detection",
        "Real-time synchronization across all campuses",
      ],
      benefits: [
        "Projected 60% reduction in scheduling conflicts",
        "Anticipated streamlined multi-campus coordination",
        "Expected improved resource utilization",
        "Planned automated compliance tracking",
      ],
      tags: ["Multi-Campus", "Scheduling", "Academic Planning", "Conflict Management"],
      performance: {
        coordination: "+60%",
        timeReduction: "40%",
        accuracy: "95%",
      },
    },
    {
      id: "enrollment-management",
      name: "Enrollment Management System",
      subtitle: "Intelligent Student Lifecycle Management",
      category: "System Admin Portal",
      status: "Alpha Stage",
      description:
        "Automate student enrollment processes with intelligent validation and comprehensive tracking across institutional hierarchy.",
      videoUrl: "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Enrollments.mp4",
      features: [
        "Single and bulk enrollment processing",
        "Automated status management (ACTIVE, PENDING, COMPLETED, WITHDRAWN)",
        "CSV import with real-time validation",
        "Multi-campus enrollment analytics",
        "Predictive enrollment forecasting",
      ],
      benefits: [
        "Projected 75% reduction in manual enrollment tasks",
        "Anticipated real-time enrollment visibility",
        "Expected automated profile creation accuracy",
        "Planned cross-campus insights",
      ],
      tags: ["Student Management", "Automation", "Multi-Campus", "Data Analytics"],
      performance: {
        efficiency: "+75%",
        timeReduction: "65%",
        accuracy: "98%",
      },
    },
    {
      id: "fee-management",
      name: "Comprehensive Fee Management",
      subtitle: "Financial Operations Automation",
      category: "System Admin Portal",
      status: "Alpha Stage",
      description:
        "Streamline financial operations with automated fee structures, payment processing, and multi-currency support.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Fee%20Management.mp4",
      features: [
        "Flexible fee structure management",
        "Automated challan and invoice generation",
        "Multi-payment method support",
        "Late fee automation with policy rules",
        "Financial reporting and analytics",
      ],
      benefits: [
        "Projected 80% reduction in manual financial tasks",
        "Anticipated improved payment collection rates",
        "Expected comprehensive financial visibility",
        "Planned automated compliance reporting",
      ],
      tags: ["Financial Management", "Automation", "Multi-Currency", "Compliance"],
      performance: {
        efficiency: "+80%",
        processing: "50%",
        accuracy: "99%",
      },
    },
    {
      id: "question-bank",
      name: "AI-Powered Question Bank",
      subtitle: "Intelligent Assessment Creation",
      category: "System Admin Portal",
      status: "Alpha Stage",
      description:
        "Build comprehensive question repositories with Bloom's Taxonomy integration and AI-powered content generation.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Question%20Bank.mp4",
      features: [
        "16+ question types with rich media support",
        "Bloom's Taxonomy cognitive level tagging",
        "AI-powered question generation",
        "Quality metrics and usage analytics",
        "Collaborative review and validation",
      ],
      benefits: [
        "Projected 70% faster question creation",
        "Anticipated improved assessment quality",
        "Expected cognitive balance validation",
        "Planned intelligent recommendations",
      ],
      tags: ["Assessment", "AI Content", "Bloom's Taxonomy", "Quality Assurance"],
      performance: {
        efficiency: "+70%",
        timeReduction: "45%",
        quality: "95%",
      },
    },
    {
      id: "communication-hub",
      name: "Strategic Communication Hub",
      subtitle: "Institution-Wide Messaging Intelligence",
      category: "System Admin Portal",
      status: "Alpha Stage",
      description:
        "Coordinate institutional communications with intelligent routing, compliance monitoring, and analytics.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/System%20Admin%20Communication%20hub.mp4",
      features: [
        "Multi-channel messaging (direct, group, broadcast)",
        "FERPA-compliant communication",
        "Emergency broadcasting capabilities",
        "Communication analytics and insights",
        "Automated routing and prioritization",
      ],
      benefits: [
        "Projected 85% improvement in communication reach",
        "Anticipated enhanced compliance monitoring",
        "Expected streamlined crisis communication",
        "Planned stakeholder engagement analytics",
      ],
      tags: ["Communication", "FERPA Compliance", "Emergency Management", "Analytics"],
      performance: {
        efficiency: "+85%",
        responseTime: "60%",
        compliance: "100%",
      },
    },
    {
      id: "curriculum-management",
      name: "Pedagogical Curriculum Management",
      subtitle: "Learning Outcomes Intelligence",
      category: "System Admin Portal",
      status: "Alpha Stage",
      description:
        "Align curriculum with learning outcomes using Bloom's Taxonomy integration and cognitive balance analysis.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/System%20Admin%20Subjects%20and%20learning%20outcomes.mp4",
      features: [
        "Learning outcome definition and mapping",
        "Bloom's Taxonomy six-level framework",
        "Curriculum alignment verification",
        "Cognitive balance analysis",
        "Performance correlation tracking",
      ],
      benefits: [
        "Projected 65% improvement in curriculum alignment",
        "Anticipated enhanced learning outcome clarity",
        "Expected cognitive development tracking",
        "Planned pedagogical validation",
      ],
      tags: ["Curriculum", "Bloom's Taxonomy", "Learning Outcomes", "Pedagogical Intelligence"],
      performance: {
        alignment: "+65%",
        efficiency: "55%",
        correlation: "92%",
      },
    },

    // Teacher Portal
    {
      id: "class-analytics",
      name: "Comprehensive Class Analytics",
      subtitle: "Data-Driven Teaching Insights",
      category: "Teacher Portal",
      status: "Alpha Stage",
      description:
        "Access detailed class performance analytics with student insights and intervention recommendations.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Class%20Reports.mp4",
      features: [
        "Real-time class performance dashboards",
        "Individual student progress tracking",
        "Bloom's Taxonomy cognitive analysis",
        "At-risk student identification",
        "Intervention recommendation engine",
      ],
      benefits: [
        "Projected 70% improvement in student outcome prediction",
        "Anticipated enhanced teaching effectiveness",
        "Expected data-driven decision making",
        "Planned personalized intervention strategies",
      ],
      tags: ["Analytics", "Student Performance", "Predictive Intelligence", "Intervention"],
      performance: {
        insight: "+70%",
        identification: "50%",
        reliability: "88%",
      },
    },
    {
      id: "resource-management",
      name: "Dynamic Resource Management",
      subtitle: "Intelligent Content Organization",
      category: "Teacher Portal",
      status: "Alpha Stage",
      description: "Organize and distribute educational resources with intelligent sharing and usage analytics.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Class%20Resources.mp4",
      features: [
        "Hierarchical resource organization",
        "Smart sharing based on enrollment",
        "Usage analytics and engagement metrics",
        "Version control and collaboration",
        "AI-powered content recommendations",
      ],
      benefits: [
        "Projected 60% improvement in resource accessibility",
        "Anticipated enhanced content utilization",
        "Expected collaborative efficiency gains",
        "Planned intelligent content curation",
      ],
      tags: ["Resource Management", "Content Analytics", "Collaboration", "AI Recommendations"],
      performance: {
        efficiency: "+60%",
        accessTime: "40%",
        utilization: "85%",
      },
    },
    {
      id: "quiz-activities",
      name: "Interactive Quiz Activities",
      subtitle: "Engaging Assessment Creation",
      category: "Teacher Portal",
      status: "Alpha Stage",
      description:
        "Create dynamic quiz activities with multiple question types and real-time student engagement tracking.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Quiz%20Activities.mp4",
      features: [
        "Multiple question formats and media support",
        "Real-time student response tracking",
        "Bloom's Taxonomy cognitive alignment",
        "Instant feedback and explanation",
        "Performance analytics and insights",
      ],
      benefits: [
        "Projected 75% increase in student engagement",
        "Anticipated improved assessment efficiency",
        "Expected enhanced learning outcomes",
        "Planned adaptive difficulty adjustment",
      ],
      tags: ["Interactive Assessment", "Student Engagement", "Real-time Analytics", "Cognitive Alignment"],
      performance: {
        engagement: "+75%",
        creationTime: "55%",
        accuracy: "90%",
      },
    },
    {
      id: "assessment-creation",
      name: "Advanced Assessment Creation",
      subtitle: "Comprehensive Evaluation Tools",
      category: "Teacher Portal",
      status: "Alpha Stage",
      description:
        "Design sophisticated assessments with AI-powered grading, rubric integration, and detailed analytics.",
      videoUrls: [
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/TEacher%20-%20Create%20Assessment.mp4",
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20assements%20view%20and%20grading.mp4",
      ],
      features: [
        "Multiple assessment types (quiz, essay, project, presentation)",
        "AI-powered grading with confidence scoring",
        "Rubric-based evaluation",
        "Plagiarism detection",
        "Comprehensive performance analytics",
      ],
      benefits: [
        "Projected 65% reduction in grading time",
        "Anticipated improved assessment consistency",
        "Expected enhanced feedback quality",
        "Planned predictive performance insights",
      ],
      tags: ["Assessment Creation", "AI Grading", "Rubric Integration", "Performance Analytics"],
      performance: {
        efficiency: "+65%",
        timeReduction: "50%",
        consistency: "92%",
      },
    },
    {
      id: "reading-activities",
      name: "AI-Enhanced Reading Activities",
      subtitle: "Intelligent Content Generation",
      category: "Teacher Portal",
      status: "Alpha Stage",
      description:
        "Create engaging reading activities with AI assistance, adaptive difficulty, and comprehension tracking.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20-%20Creating%20Reading%20with%20AI.mp4",
      features: [
        "AI-powered content generation",
        "Adaptive difficulty adjustment",
        "Comprehension question creation",
        "Reading analytics and insights",
        "Curriculum alignment verification",
      ],
      benefits: [
        "Projected 80% faster content creation",
        "Anticipated improved reading engagement",
        "Expected personalized learning paths",
        "Planned comprehension tracking",
      ],
      tags: ["AI Content Generation", "Reading Comprehension", "Adaptive Learning", "Curriculum Alignment"],
      performance: {
        efficiency: "+80%",
        engagement: "60%",
        alignment: "87%",
      },
    },
    {
      id: "reward-system",
      name: "Motivational Reward System",
      subtitle: "Engagement-Driven Recognition",
      category: "Teacher Portal",
      status: "Alpha Stage",
      description:
        "Implement comprehensive reward systems with achievement tracking and motivational psychology principles.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20-%20Rewards.mp4",
      features: [
        "Multi-source point earning system",
        "Achievement unlocks and progression",
        "Class leaderboards and recognition",
        "Personalized motivation strategies",
        "Social recognition features",
      ],
      benefits: [
        "Projected 85% increase in student motivation",
        "Anticipated improved class participation",
        "Expected enhanced learning persistence",
        "Planned behavioral positive reinforcement",
      ],
      tags: ["Gamification", "Student Motivation", "Achievement System", "Social Recognition"],
      performance: {
        motivation: "+85%",
        participation: "70%",
        sustainability: "78%",
      },
    },
    {
      id: "student-profiles",
      name: "Student Learning Profiles",
      subtitle: "Comprehensive Progress Tracking",
      category: "Teacher Portal",
      status: "Alpha Stage",
      description:
        "Monitor individual student progress with detailed learning profiles and cognitive development tracking.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Student%20class%20profile.mp4",
      features: [
        "Individual learning journey tracking",
        "Bloom's Taxonomy cognitive progression",
        "Mastery level assessment",
        "Learning pattern recognition",
        "Intervention recommendation alerts",
      ],
      benefits: [
        "Projected 75% improvement in personalized instruction",
        "Anticipated enhanced student outcome prediction",
        "Expected targeted intervention efficiency",
        "Planned learning pathway optimization",
      ],
      tags: ["Student Profiles", "Learning Analytics", "Cognitive Tracking", "Personalized Learning"],
      performance: {
        personalization: "+75%",
        intervention: "55%",
        tracking: "90%",
      },
    },
    {
      id: "aivy-assistant",
      name: "AIVY Teacher Assistant",
      subtitle: "AI-Powered Teaching Support",
      category: "Teacher Portal",
      status: "Alpha Stage",
      description:
        "Access intelligent teaching support with lesson planning assistance, grading support, and pedagogical guidance.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20assements%20view%20and%20grading.mp4",
      features: [
        "Intelligent lesson planning assistance",
        "AI-powered grading support",
        "Pedagogical best practice recommendations",
        "Content creation guidance",
        "Student insight generation",
      ],
      benefits: [
        "Projected 70% reduction in planning time",
        "Anticipated improved teaching effectiveness",
        "Expected enhanced pedagogical alignment",
        "Planned personalized teaching strategies",
      ],
      tags: ["AI Assistant", "Teaching Support", "Pedagogical Intelligence", "Content Creation"],
      performance: {
        efficiency: "+70%",
        timeReduction: "45%",
        relevance: "88%",
      },
    },
    {
      id: "calendar-management",
      name: "Integrated Calendar Management",
      subtitle: "Personalized Schedule Intelligence",
      category: "Teacher Portal",
      status: "Alpha Stage",
      description:
        "Manage teaching schedules with intelligent conflict detection, reminder systems, and workload optimization.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20Calendar.mp4",
      features: [
        "Personal and class schedule integration",
        "Automatic conflict detection",
        "Deadline and reminder management",
        "Workload balance analytics",
        "Multi-campus coordination",
      ],
      benefits: [
        "Projected 60% improvement in time management",
        "Anticipated reduced scheduling conflicts",
        "Expected enhanced work-life balance",
        "Planned optimized resource allocation",
      ],
      tags: ["Schedule Management", "Time Optimization", "Conflict Detection", "Work-Life Balance"],
      performance: {
        efficiency: "+60%",
        conflictReduction: "50%",
        accuracy: "85%",
      },
    },
    {
      id: "teacher-communication",
      name: "Teacher Communication Hub",
      subtitle: "Professional Messaging Platform",
      category: "Teacher Portal",
      status: "Alpha Stage",
      description:
        "Facilitate professional communication with students, parents, and colleagues through secure, FERPA-compliant channels.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20Messeging.mp4",
      features: [
        "Multi-channel communication (direct, group, class)",
        "FERPA-compliant messaging",
        "Automated parent notifications",
        "Message templates and scheduling",
        "Communication analytics",
      ],
      benefits: [
        "Projected 75% improvement in communication efficiency",
        "Anticipated enhanced parent engagement",
        "Expected streamlined administrative communication",
        "Planned compliance assurance",
      ],
      tags: ["Professional Communication", "FERPA Compliance", "Parent Engagement", "Message Analytics"],
      performance: {
        efficiency: "+75%",
        responseTime: "65%",
        compliance: "100%",
      },
    },
    {
      id: "social-wall",
      name: "Interactive Social Wall",
      subtitle: "Classroom Community Building",
      category: "Teacher Portal",
      status: "Alpha Stage",
      description:
        "Foster classroom community with interactive social features, peer recognition, and collaborative learning opportunities.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20Social%20Wall.mp4",
      features: [
        "Rich media post creation",
        "Peer recognition and achievements",
        "Collaborative project sharing",
        "Real-time interaction and comments",
        "Content moderation tools",
      ],
      benefits: [
        "Projected 80% increase in class engagement",
        "Anticipated improved peer collaboration",
        "Expected enhanced learning community",
        "Planned positive social interaction",
      ],
      tags: ["Social Learning", "Community Building", "Peer Recognition", "Collaborative Learning"],
      performance: {
        engagement: "+80%",
        collaboration: "70%",
        interaction: "85%",
      },
    },
    {
      id: "attendance-tracking",
      name: "Smart Attendance Tracking",
      subtitle: "Automated Attendance Intelligence",
      category: "Teacher Portal",
      status: "Alpha Stage",
      description:
        "Streamline attendance management with pattern recognition, predictive alerts, and intervention triggers.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher-%20Student%20Attendance.mp4",
      features: [
        "Quick attendance entry and bulk operations",
        "Pattern recognition and trend analysis",
        "Low attendance alerts and interventions",
        "Parent notification automation",
        "Attendance analytics and reporting",
      ],
      benefits: [
        "Projected 70% reduction in attendance administration time",
        "Anticipated improved attendance tracking accuracy",
        "Expected early intervention effectiveness",
        "Planned predictive attendance patterns",
      ],
      tags: ["Attendance Management", "Pattern Recognition", "Early Intervention", "Parent Communication"],
      performance: {
        efficiency: "+70%",
        accuracy: "85%",
        intervention: "60%",
      },
    },

    // Student Portal
    {
      id: "learning-activities",
      name: "Interactive Learning Activities",
      subtitle: "Engaging Educational Experiences",
      category: "Student Portal",
      status: "Alpha Stage",
      description:
        "Participate in diverse, interactive learning activities designed to enhance engagement and measure cognitive development.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Student%20Activties.mp4",
      features: [
        "Multiple activity types (quiz, reading, project, interactive)",
        "Real-time progress tracking",
        "Bloom's Taxonomy cognitive alignment",
        "Immediate feedback and explanations",
        "Gamified completion rewards",
      ],
      benefits: [
        "Projected 85% improvement in learning engagement",
        "Anticipated enhanced cognitive skill development",
        "Expected personalized learning pathways",
        "Planned achievement motivation",
      ],
      tags: ["Interactive Learning", "Cognitive Development", "Gamification", "Progress Tracking"],
      performance: {
        engagement: "+85%",
        completion: "60%",
        retention: "78%",
      },
    },
    {
      id: "personal-profile",
      name: "Personal Learning Profile",
      subtitle: "Individual Progress Dashboard",
      category: "Student Portal",
      status: "Alpha Stage",
      description:
        "Access comprehensive personal learning dashboard with progress tracking, achievement history, and goal setting.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Student%20class%20profile.mp4",
      features: [
        "Comprehensive progress visualization",
        "Achievement and reward history",
        "Cognitive level progression tracking",
        "Personal goal setting and monitoring",
        "Learning analytics and insights",
      ],
      benefits: [
        "Projected 75% improvement in self-awareness of learning",
        "Anticipated enhanced goal achievement",
        "Expected increased learning motivation",
        "Planned personalized study guidance",
      ],
      tags: ["Personal Dashboard", "Progress Tracking", "Goal Setting", "Learning Analytics"],
      performance: {
        awareness: "+75%",
        achievement: "65%",
        motivation: "80%",
      },
    },
    {
      id: "aivy-companion",
      name: "AIVY Student Companion",
      subtitle: "Personalized Learning Assistant",
      category: "Student Portal",
      status: "Alpha Stage",
      description:
        "Receive personalized learning support, study guidance, and motivational assistance from your AI learning companion.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Student%20class%20profile.mp4",
      features: [
        "Personalized study recommendations",
        "Concept explanation and tutoring",
        "Progress motivation and encouragement",
        "Navigation assistance",
        "Practice activity suggestions",
      ],
      benefits: [
        "Projected 80% improvement in study efficiency",
        "Anticipated enhanced concept understanding",
        "Expected increased learning confidence",
        "Planned personalized support availability",
      ],
      tags: ["AI Companion", "Personalized Learning", "Study Support", "Motivation"],
      performance: {
        efficiency: "+80%",
        comprehension: "70%",
        confidence: "85%",
      },
    },
    {
      id: "student-social",
      name: "Collaborative Social Wall",
      subtitle: "Peer Learning Community",
      category: "Student Portal",
      status: "Alpha Stage",
      description:
        "Engage with classmates through collaborative social features, peer recognition, and community learning experiences.",
      videoUrl:
        "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Student%20Social%20wall.mp4",
      features: [
        "Peer interaction and collaboration",
        "Achievement sharing and recognition",
        "Study group formation",
        "Helpful resource sharing",
        "Positive community building",
      ],
      benefits: [
        "Projected 90% increase in peer collaboration",
        "Anticipated enhanced social learning",
        "Expected improved class community",
        "Planned positive peer support",
      ],
      tags: ["Social Learning", "Peer Collaboration", "Community Building", "Achievement Sharing"],
      performance: {
        interaction: "+90%",
        collaboration: "75%",
        satisfaction: "82%",
      },
    },
  ]

  const filters = [
    { id: "all", label: "All Capabilities", count: capabilities.length },
    {
      id: "system-admin",
      label: "System Admin Portal",
      count: capabilities.filter((c) => c.category === "System Admin Portal").length,
    },
    {
      id: "teacher",
      label: "Teacher Portal",
      count: capabilities.filter((c) => c.category === "Teacher Portal").length,
    },
    {
      id: "student",
      label: "Student Portal",
      count: capabilities.filter((c) => c.category === "Student Portal").length,
    },
  ]

  const filteredCapabilities = capabilities.filter((capability) => {
    const matchesSearch =
      capability.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capability.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capability.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "system-admin" && capability.category === "System Admin Portal") ||
      (selectedFilter === "teacher" && capability.category === "Teacher Portal") ||
      (selectedFilter === "student" && capability.category === "Student Portal")

    return matchesSearch && matchesFilter
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "System Admin Portal":
        return <Shield className="w-6 h-6 text-primary" />
      case "Teacher Portal":
        return <Users className="w-6 h-6 text-primary" />
      case "Student Portal":
        return <Brain className="w-6 h-6 text-primary" />
      default:
        return <Zap className="w-6 h-6 text-primary" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {isMobile ? (
        /* Mobile Layout */
        <div className="flex-1 pt-16">
          <div className="p-4">
            {/* Header */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold mb-3 text-white">Platform Capabilities</h1>
              <p className="text-sm text-gray-400">
                Explore FabriiQ's comprehensive educational technology capabilities designed for modern institutions.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              className="relative mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search capabilities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400 text-sm transition-all duration-200"
              />
            </motion.div>

            {/* Filters */}
            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 text-xs rounded transition-all duration-200 hover:scale-105 ${
                    selectedFilter === filter.id
                      ? "bg-primary/20 text-primary border border-primary/50"
                      : "bg-gray-950 text-gray-400 border border-gray-800 hover:text-white hover:border-primary/30"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </motion.div>

            <div className="max-h-[calc(100vh-300px)] overflow-y-auto space-y-6 pr-2">
              {filteredCapabilities.map((capability, index) => (
                <motion.div
                  key={capability.id}
                  className="bg-black border border-white/20 rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Capability Header */}
                  <div className="p-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <motion.div
                        className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20"
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {getCategoryIcon(capability.category)}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{capability.name}</h3>
                        <p className="text-sm text-primary mb-1">{capability.subtitle}</p>
                        <p className="text-xs text-gray-400 mb-2">{capability.category}</p>
                        <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                          {capability.status}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 mb-4">{capability.description}</p>

                    {/* Video Demo */}
                    {capability.videoUrl && (
                      <div className="mb-4">
                        <VideoPlayer src={capability.videoUrl} title={`${capability.name} Demo`} />
                      </div>
                    )}

                    {/* Multiple Videos */}
                    {capability.videoUrls && capability.videoUrls.length > 0 && (
                      <div className="mb-4 space-y-3">
                        {capability.videoUrls.map((videoUrl, videoIndex) => (
                          <div key={videoIndex}>
                            <h5 className="text-sm font-medium text-gray-300 mb-2">
                              Demo {videoIndex + 1}: {videoIndex === 0 ? "Creation" : "Grading"}
                            </h5>
                            <VideoPlayer src={videoUrl} title={`${capability.name} Demo ${videoIndex + 1}`} />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Features and Benefits Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                          <Zap className="w-4 h-4 mr-2 text-primary" />
                          Key Features
                        </h4>
                        <ul className="space-y-1">
                          {capability.features.map((feature, idx) => (
                            <motion.li
                              key={idx}
                              className="text-xs text-gray-300 flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.05 }}
                            >
                              <ChevronRight className="w-3 h-3 mr-1 mt-0.5 text-primary flex-shrink-0" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                          Expected Benefits
                        </h4>
                        <ul className="space-y-1">
                          {capability.benefits.map((benefit, idx) => (
                            <motion.li
                              key={idx}
                              className="text-xs text-gray-300 flex items-start"
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.05 }}
                            >
                              <Star className="w-3 h-3 mr-1 mt-0.5 text-green-400 flex-shrink-0" />
                              {benefit}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {capability.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs hover:bg-primary/20 hover:text-primary transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(capability.performance).map(([key, value]) => (
                        <motion.div
                          key={key}
                          className="text-center p-2 bg-gray-900/50 rounded-lg border border-gray-800"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-lg font-bold text-primary">{value}</p>
                          <p className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <div className="flex flex-1 pt-16">
          {/* Left Sidebar - Capabilities List */}
          <div className="w-1/3 border-r border-gray-800 bg-black h-[calc(100vh-64px)] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-2xl font-bold mb-3 text-white">Platform Capabilities</h1>
                <p className="text-sm text-gray-400">
                  Explore FabriiQ's comprehensive educational technology capabilities.
                </p>
              </motion.div>

              {/* Search */}
              <motion.div
                className="relative mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search capabilities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400 text-sm transition-all duration-200"
                />
              </motion.div>

              {/* Filters */}
              <motion.div
                className="flex flex-wrap gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-3 py-1 text-xs rounded transition-all duration-200 hover:scale-105 ${
                      selectedFilter === filter.id
                        ? "bg-primary/20 text-primary border border-primary/50"
                        : "bg-gray-950 text-gray-400 border border-gray-800 hover:text-white hover:border-primary/30"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </motion.div>

              {/* Capabilities List */}
              <div className="space-y-3">
                {filteredCapabilities.map((capability, index) => (
                  <motion.div
                    key={capability.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                      selectedCapability?.id === capability.id
                        ? "bg-primary/10 border-primary/50"
                        : "bg-gray-950 border-gray-800 hover:border-primary/30"
                    }`}
                    onClick={() => setSelectedCapability(capability)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                        {getCategoryIcon(capability.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">{capability.name}</h3>
                        <p className="text-xs text-primary truncate">{capability.subtitle}</p>
                        <p className="text-xs text-gray-400">{capability.category}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Capability Details */}
          <div className="flex-1 bg-background">
            {selectedCapability ? (
              <motion.div
                className="p-6 h-[calc(100vh-64px)] overflow-y-auto"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.div
                      className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20"
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {getCategoryIcon(selectedCapability.category)}
                    </motion.div>
                    <div>
                      <h1 className="text-2xl font-bold text-white mb-1">{selectedCapability.name}</h1>
                      <p className="text-lg text-primary mb-1">{selectedCapability.subtitle}</p>
                      <p className="text-sm text-gray-400 mb-2">{selectedCapability.category}</p>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {selectedCapability.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{selectedCapability.description}</p>
                </div>

                {/* Video Demo */}
                {selectedCapability.videoUrl && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Interactive Demo</h3>
                    <VideoPlayer src={selectedCapability.videoUrl} title={`${selectedCapability.name} Demo`} />
                  </div>
                )}

                {/* Multiple Videos */}
                {selectedCapability.videoUrls && selectedCapability.videoUrls.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Interactive Demos</h3>
                    <div className="space-y-4">
                      {selectedCapability.videoUrls.map((videoUrl, videoIndex) => (
                        <div key={videoIndex}>
                          <h4 className="text-md font-medium text-gray-300 mb-2">
                            Demo {videoIndex + 1}: {videoIndex === 0 ? "Creation Process" : "Grading & Analytics"}
                          </h4>
                          <VideoPlayer src={videoUrl} title={`${selectedCapability.name} Demo ${videoIndex + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features and Benefits Side by Side */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-primary" />
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedCapability.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="text-sm text-gray-300 flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                      Expected Benefits (Alpha Phase)
                    </h3>
                    <ul className="space-y-2">
                      {selectedCapability.benefits.map((benefit, idx) => (
                        <motion.li
                          key={idx}
                          className="text-sm text-gray-300 flex items-start"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          <Star className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Performance Metrics */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-3">Alpha Performance Expectations</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedCapability.performance).map(([key, value]) => (
                      <motion.div
                        key={key}
                        className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-primary/30 transition-all duration-200"
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-2xl font-bold text-primary mb-1">Expected {value}</p>
                        <p className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCapability.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-primary/20 hover:text-primary transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Select a Capability</h3>
                  <p className="text-gray-400">
                    Choose a capability from the list to view detailed information and demos.
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
