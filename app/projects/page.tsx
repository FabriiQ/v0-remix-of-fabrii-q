"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import {
  Search,
  Monitor,
  Settings,
  BookOpen,
  Zap,
  CheckCircle,
  Heart,
  ThumbsDown,
  Maximize2,
  Minimize2,
  TrendingUp,
  Play,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import VideoPlayer from "@/components/video-player" // Assuming VideoPlayer component exists

export default function CapabilitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedCapability, setSelectedCapability] = useState<any>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [capabilityLikes, setCapabilityLikes] = useState<{ [key: string]: { liked: boolean; disliked: boolean } }>({})
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)
  const isMobile = useMobile()

  const videoData: Record<string, string[]> = {
    "enrollment-management": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Enrollments.mp4",
    ],
    "fee-management": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Fee%20Management.mp4",
    ],
    "attendance-management": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher-%20Student%20Attendance.mp4",
    ],
    "calendar-management": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Academic%20Calendar.mp4",
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20Calendar.mp4",
    ],
    "reports-dashboards": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Student%20class%20profile.mp4",
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Class%20Reports.mp4",
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20-%20Student%20Profile.mp4",
    ],
    "question-bank": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Question%20Bank.mp4",
    ],
    "curriculum-blooms": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/System%20Admin%20Subjects%20and%20learning%20outcomes.mp4",
    ],
    "activities-assessments": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Quiz%20Activities.mp4",
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/TEacher%20-%20Create%20Assessment.mp4",
    ],
    "grading-gradebook": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20assements%20view%20and%20grading.mp4",
    ],
    "content-studio": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20Assistant.mp4",
    ],
    "messaging-notifications": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/System%20Admin%20Communication%20hub.mp4",
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20Messeging.mp4",
    ],
    "rewards-gamification": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Student%20class%20profile.mp4",
    ],
    "social-wall": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20Social%20Wall.mp4",
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Student%20Social%20wall.mp4",
    ],
    "compliance-privacy": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Privacy%20and%20Compliance.mp4",
    ],
    "i18n-localization": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Localization.mp4",
    ],
    "offline-experiences": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Offline%20Mode.mp4",
    ],
    "aivy-multi-agent": [
      "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Teacher%20Assistant.mp4",
    ],
  }

  const handlePlayPause = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause()
      } else {
        videoRef.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef) {
      videoRef.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoChange = (index: number) => {
    setCurrentVideoIndex(index)
    setIsPlaying(false)
  }

  const handleFullscreen = () => {
    if (videoRef) {
      if (videoRef.requestFullscreen) {
        videoRef.requestFullscreen()
      }
    }
  }

  // Reset video index when capability changes
  useEffect(() => {
    setCurrentVideoIndex(0)
    setIsPlaying(false)
  }, [selectedCapability])

  const filters = [
    { id: "all", label: "All Capabilities", count: 17 },
    { id: "operational", label: "Core Operations", count: 5 },
    { id: "learning", label: "Learning & Engagement", count: 8 },
    { id: "advanced", label: "Advanced Features", count: 4 },
  ]

  const capabilities = [
    // Core Operations (5 capabilities)
    {
      id: "enrollment-management",
      name: "Enrollment Management",
      category: "Core Operations",
      status: "production-ready",
      adoptionRate: "95%",
      userSatisfaction: "98%",
      description:
        "Comprehensive student enrollment system with automated workflows, bulk operations, and multi-campus coordination",
      icon: "/icons/enrollment-icon.svg",
      video: "/videos/enrollment-demo.mp4",
      tags: ["Student Management", "Automation", "Multi-Campus", "Analytics"],
      metrics: {
        efficiency: "+85%",
        timeReduction: "70%",
        accuracy: "99.2%",
      },
      featured: true,
      details: {
        overview:
          "Streamline student enrollment processes with intelligent automation and comprehensive tracking across multiple campuses.",
        keyFeatures: [
          "Single & bulk enrollment creation",
          "Automated status management (ACTIVE, PENDING, COMPLETED, WITHDRAWN, INACTIVE)",
          "CSV import with real-time validation",
          "Multi-campus enrollment analytics",
          "Waitlist management and forecasting",
        ],
        technicalSpecs: [
          "Role-based access control",
          "Audit trail tracking",
          "Real-time data synchronization",
          "Automated enrollment workflows",
          "Integration with fee management",
        ],
        benefits: [
          "85% reduction in manual enrollment tasks",
          "Real-time enrollment analytics",
          "Automated student profile creation",
          "Cross-campus enrollment insights",
          "Predictive enrollment forecasting",
        ],
      },
    },
    {
      id: "fee-management",
      name: "Fee Management",
      category: "Core Operations",
      status: "production-ready",
      adoptionRate: "92%",
      userSatisfaction: "96%",
      description:
        "Advanced financial management system with automated billing, payment processing, and comprehensive reporting",
      icon: "/icons/fee-management-icon.svg",
      video: "/videos/fee-management-demo.mp4",
      tags: ["Financial Management", "Automated Billing", "Payment Processing", "Analytics"],
      metrics: {
        collectionRate: "+40%",
        processingTime: "-60%",
        accuracy: "99.8%",
      },
      details: {
        overview:
          "Comprehensive financial management solution handling fee structures, automated billing, payment processing, and financial analytics.",
        keyFeatures: [
          "Flexible fee component management",
          "Automated challan and invoice generation",
          "Multiple payment method support",
          "Late fee calculation with grace periods",
          "Scholarship and discount management",
        ],
        technicalSpecs: [
          "Multi-currency support",
          "Bank integration capabilities",
          "Automated reconciliation tools",
          "Financial performance dashboards",
          "Custom template support",
        ],
        benefits: [
          "40% improvement in collection rates",
          "60% reduction in processing time",
          "Automated financial reporting",
          "Real-time payment tracking",
          "Streamlined reconciliation process",
        ],
      },
    },
    {
      id: "attendance-management",
      name: "Attendance Tracking",
      category: "Core Operations",
      status: "production-ready",
      adoptionRate: "98%",
      userSatisfaction: "97%",
      description:
        "Intelligent attendance system with real-time tracking, analytics, and automated intervention triggers",
      icon: "/icons/attendance-icon.svg",
      video: "/videos/attendance-demo.mp4",
      tags: ["Attendance Tracking", "Analytics", "Automation", "Intervention"],
      metrics: {
        trackingAccuracy: "99.5%",
        interventionRate: "+75%",
        parentEngagement: "+60%",
      },
      details: {
        overview:
          "Advanced attendance management system providing real-time tracking, predictive analytics, and automated intervention capabilities.",
        keyFeatures: [
          "Daily attendance recording (PRESENT, ABSENT, LATE, EXCUSED)",
          "Bulk attendance entry capabilities",
          "Real-time status updates and historical tracking",
          "Teacher attendance management with check-in/out",
          "Automated low attendance alerts",
        ],
        technicalSpecs: [
          "Pattern recognition algorithms",
          "Predictive analytics engine",
          "Multi-campus tracking support",
          "Calendar integration",
          "Automated notification system",
        ],
        benefits: [
          "75% increase in early intervention",
          "60% improvement in parent engagement",
          "Real-time attendance insights",
          "Automated compliance reporting",
          "Predictive attendance patterns",
        ],
      },
    },
    {
      id: "calendar-management",
      name: "Calendar Management",
      category: "Core Operations",
      status: "production-ready",
      adoptionRate: "94%",
      userSatisfaction: "95%",
      description:
        "Unified calendar system integrating academic events, holidays, and personal scheduling with multi-campus coordination",
      icon: "/icons/calendar-icon.svg",
      video: "/videos/calendar-demo.mp4",
      tags: ["Calendar Integration", "Event Management", "Multi-Campus", "Scheduling"],
      metrics: {
        schedulingEfficiency: "+70%",
        conflictReduction: "-85%",
        eventCoordination: "+90%",
      },
      details: {
        overview:
          "Comprehensive calendar management system unifying academic events, holidays, and personal schedules across multiple campuses.",
        keyFeatures: [
          "Unified calendar view with role-based access",
          "Academic event management (exams, orientations, graduation)",
          "Multi-campus holiday management",
          "Personal calendar integration",
          "AI-powered schedule optimization",
        ],
        technicalSpecs: [
          "Real-time synchronization",
          "Conflict detection algorithms",
          "Resource scheduling capabilities",
          "Automated event dependencies",
          "Multi-timezone support",
        ],
        benefits: [
          "70% improvement in scheduling efficiency",
          "85% reduction in scheduling conflicts",
          "Unified institutional calendar view",
          "Automated event coordination",
          "Cross-campus scheduling alignment",
        ],
      },
    },
    {
      id: "reports-dashboards",
      name: "Analytics & Reporting",
      category: "Core Operations",
      status: "production-ready",
      adoptionRate: "96%",
      userSatisfaction: "98%",
      description:
        "Comprehensive analytics platform with real-time dashboards, predictive insights, and custom report builder",
      icon: "/icons/analytics-icon.svg",
      video: "/videos/analytics-demo.mp4",
      tags: ["Analytics", "Real-time Dashboards", "Predictive Insights", "Custom Reports"],
      metrics: {
        dataInsights: "+200%",
        decisionSpeed: "+85%",
        reportingTime: "-75%",
      },
      details: {
        overview:
          "Advanced analytics and reporting system providing real-time insights, predictive analytics, and comprehensive dashboard capabilities.",
        keyFeatures: [
          "Multi-level reporting (institution, campus, program, class)",
          "Real-time interactive dashboards",
          "Custom report builder with drag-and-drop interface",
          "Predictive analytics for at-risk students",
          "AI-powered insights and anomaly detection",
        ],
        technicalSpecs: [
          "Role-based dashboard customization",
          "Advanced data visualization",
          "Automated report scheduling",
          "Natural language query support",
          "Export capabilities (PDF, Excel, CSV)",
        ],
        benefits: [
          "200% increase in actionable insights",
          "85% faster decision-making process",
          "75% reduction in report generation time",
          "Predictive student intervention",
          "Comprehensive institutional analytics",
        ],
      },
    },

    // Learning & Engagement Tools (8 capabilities)
    {
      id: "question-bank",
      name: "Intelligent Question Bank",
      category: "Learning & Engagement",
      status: "production-ready",
      adoptionRate: "91%",
      userSatisfaction: "96%",
      description:
        "AI-powered question bank with Bloom's Taxonomy integration, automated generation, and quality management",
      icon: "/icons/question-bank-icon.svg",
      video: "/videos/question-bank-demo.mp4",
      tags: ["AI-Powered", "Bloom's Taxonomy", "Question Generation", "Quality Management"],
      metrics: {
        questionQuality: "+80%",
        creationSpeed: "+150%",
        cognitiveBalance: "95%",
      },
      featured: true,
      details: {
        overview:
          "Comprehensive question bank system with AI-powered generation, Bloom's Taxonomy integration, and advanced quality management.",
        keyFeatures: [
          "16 distinct question types (MCQ, essay, drag-and-drop, multimedia)",
          "Bloom's Taxonomy cognitive level tagging",
          "AI-powered question generation",
          "Advanced search and filtering capabilities",
          "Quality scoring and peer review system",
        ],
        technicalSpecs: [
          "Multi-format question support",
          "Version control and bulk operations",
          "Usage analytics and performance tracking",
          "Automated quality assurance",
          "Integration with assessment system",
        ],
        benefits: [
          "80% improvement in question quality",
          "150% faster question creation",
          "95% cognitive balance achievement",
          "Automated quality validation",
          "Comprehensive usage analytics",
        ],
      },
    },
    {
      id: "curriculum-blooms",
      name: "Curriculum Intelligence",
      category: "Learning & Engagement",
      status: "production-ready",
      adoptionRate: "89%",
      userSatisfaction: "97%",
      description:
        "Advanced curriculum management with Bloom's Taxonomy integration, learning outcomes tracking, and mastery analytics",
      icon: "/icons/curriculum-icon.svg",
      video: "/videos/curriculum-demo.mp4",
      tags: ["Curriculum Management", "Learning Outcomes", "Mastery Tracking", "Pedagogical Intelligence"],
      metrics: {
        outcomeAlignment: "98%",
        masteryTracking: "+120%",
        curriculumBalance: "94%",
      },
      details: {
        overview:
          "Sophisticated curriculum management system integrating Bloom's Taxonomy, learning outcomes tracking, and mastery analytics.",
        keyFeatures: [
          "Learning outcomes management with Bloom's alignment",
          "Six-level cognitive framework integration",
          "Holistic and analytic rubric system",
          "Topic mastery analytics and tracking",
          "Cognitive balance analysis and recommendations",
        ],
        technicalSpecs: [
          "Automated action verb suggestions",
          "Curriculum mapping capabilities",
          "Performance criteria definition",
          "Hierarchical outcome organization",
          "Standards compliance verification",
        ],
        benefits: [
          "98% learning outcome alignment",
          "120% improvement in mastery tracking",
          "94% curriculum balance achievement",
          "Evidence-based learning measurement",
          "Personalized intervention triggers",
        ],
      },
    },
    {
      id: "activities-assessments",
      name: "Unified Assessments",
      category: "Learning & Engagement",
      status: "production-ready",
      adoptionRate: "93%",
      userSatisfaction: "96%",
      description:
        "Comprehensive assessment platform with AI-powered grading, multiple formats, and intelligent design optimization",
      icon: "/icons/assessments-icon.svg",
      video: "/videos/assessments-demo.mp4",
      tags: ["AI Grading", "Multiple Formats", "Intelligent Design", "Collaborative Learning"],
      metrics: {
        gradingAccuracy: "96%",
        timeReduction: "-70%",
        engagementBoost: "+85%",
      },
      details: {
        overview:
          "Advanced assessment system supporting multiple formats with AI-powered grading and intelligent design optimization.",
        keyFeatures: [
          "Multiple assessment types (quiz, essay, project, presentation)",
          "AI-powered grading with confidence scoring",
          "Rubric integration and automation",
          "Flexible submission management",
          "Collaborative and peer assessment features",
        ],
        technicalSpecs: [
          "Adaptive assessment capabilities",
          "Cognitive load optimization",
          "Plagiarism detection integration",
          "Version control and draft support",
          "Bias detection algorithms",
        ],
        benefits: [
          "96% grading accuracy with AI assistance",
          "70% reduction in grading time",
          "85% increase in student engagement",
          "Automated feedback generation",
          "Comprehensive assessment analytics",
        ],
      },
    },
    {
      id: "grading-gradebook",
      name: "Advanced Gradebook",
      category: "Learning & Engagement",
      status: "production-ready",
      adoptionRate: "97%",
      userSatisfaction: "98%",
      description: "Intelligent gradebook with AI-powered grading, Bloom's Taxonomy analytics, and predictive insights",
      icon: "/icons/gradebook-icon.svg",
      video: "/videos/gradebook-demo.mp4",
      tags: ["AI Grading", "Bloom's Analytics", "Predictive Insights", "Mastery Tracking"],
      metrics: {
        gradingEfficiency: "+180%",
        insightAccuracy: "94%",
        interventionSuccess: "+75%",
      },
      featured: true,
      details: {
        overview:
          "Comprehensive gradebook system with AI-powered grading, Bloom's Taxonomy analytics, and predictive student performance insights.",
        keyFeatures: [
          "Multiple grading modes (automatic, manual, hybrid, rubric-based)",
          "AI-powered essay and content grading",
          "Bloom's Taxonomy performance tracking",
          "Real-time mastery updates with confidence intervals",
          "Predictive analytics for at-risk students",
        ],
        technicalSpecs: [
          "Unified gradebook interface",
          "Weighted scoring with decay modeling",
          "Configurable mastery thresholds",
          "Teacher performance analytics",
          "Automated intervention recommendations",
        ],
        benefits: [
          "180% improvement in grading efficiency",
          "94% accuracy in predictive insights",
          "75% success rate in interventions",
          "Real-time performance tracking",
          "Comprehensive learning analytics",
        ],
      },
    },
    {
      id: "content-studio",
      name: "AI Content Studio",
      category: "Learning & Engagement",
      status: "production-ready",
      adoptionRate: "88%",
      userSatisfaction: "95%",
      description:
        "AI-powered content creation and management system with multi-agent generation and quality assurance",
      icon: "/icons/content-studio-icon.svg",
      video: "/videos/content-studio-demo.mp4",
      tags: ["AI Content Generation", "Multi-Agent System", "Quality Assurance", "Resource Management"],
      metrics: {
        contentQuality: "+90%",
        creationSpeed: "+250%",
        engagementRate: "+65%",
      },
      details: {
        overview:
          "Revolutionary AI-powered content creation system with multi-agent generation, quality assurance, and comprehensive resource management.",
        keyFeatures: [
          "Multi-agent content generation for educational activities",
          "Real-time content creation based on curriculum",
          "Professional authoring tools with template system",
          "Smart resource sharing and distribution",
          "Advanced content analytics and optimization",
        ],
        technicalSpecs: [
          "Multi-type resource support",
          "Hierarchical organization system",
          "Role-based access control",
          "Version control and audit trails",
          "Integration with learning management",
        ],
        benefits: [
          "90% improvement in content quality",
          "250% increase in creation speed",
          "65% boost in student engagement",
          "Automated content optimization",
          "Intelligent resource recommendations",
        ],
      },
    },
    {
      id: "messaging-notifications",
      name: "Unified Communications",
      category: "Learning & Engagement",
      status: "production-ready",
      adoptionRate: "99%",
      userSatisfaction: "97%",
      description:
        "Comprehensive communication platform with FERPA compliance, AI-powered content classification, and multi-channel delivery",
      icon: "/icons/messaging-icon.svg",
      video: "/videos/messaging-demo.mp4",
      tags: ["FERPA Compliant", "Multi-Channel", "AI-Powered", "Real-Time"],
      metrics: {
        deliveryRate: "99.8%",
        responseTime: "-85%",
        complianceScore: "100%",
      },
      details: {
        overview:
          "Advanced communication system ensuring FERPA compliance while providing seamless multi-channel messaging and intelligent notifications.",
        keyFeatures: [
          "Multi-channel messaging (direct, group, broadcast, announcements)",
          "Real-time communication with WebSocket integration",
          "AI-powered content classification for privacy risk",
          "Smart notification management with priority routing",
          "Emergency broadcasting capabilities",
        ],
        technicalSpecs: [
          "FERPA compliance engine",
          "Privacy-by-design architecture",
          "Comprehensive audit trail",
          "Automated consent management",
          "Cross-device synchronization",
        ],
        benefits: [
          "99.8% message delivery rate",
          "85% reduction in response time",
          "100% compliance score maintenance",
          "Automated privacy protection",
          "Seamless cross-platform communication",
        ],
      },
    },
    {
      id: "rewards-gamification",
      name: "Gamification Engine",
      category: "Learning & Engagement",
      status: "production-ready",
      adoptionRate: "86%",
      userSatisfaction: "94%",
      description:
        "Comprehensive gamification system with points, achievements, leaderboards, and intelligent motivation strategies",
      icon: "/icons/gamification-icon.svg",
      video: "/videos/gamification-demo.mp4",
      tags: ["Points System", "Achievements", "Leaderboards", "Motivation Engine"],
      metrics: {
        engagementBoost: "+125%",
        motivationIndex: "+110%",
        completionRate: "+80%",
      },
      details: {
        overview:
          "Advanced gamification platform designed to boost student engagement through intelligent reward systems and social recognition.",
        keyFeatures: [
          "Multi-source points system (grades, attendance, streaks, achievements)",
          "Progressive achievement levels (Bronze, Silver, Gold, Platinum)",
          "Multi-scope leaderboards (class, campus, institution-wide)",
          "SMART goal framework integration",
          "Social recognition and sharing features",
        ],
        technicalSpecs: [
          "Dynamic point calculation algorithms",
          "Experience-based progression system",
          "Intelligent motivation engine",
          "Personalized reward recommendations",
          "Real-time rank tracking",
        ],
        benefits: [
          "125% increase in student engagement",
          "110% improvement in motivation levels",
          "80% higher activity completion rates",
          "Enhanced social learning dynamics",
          "Data-driven motivation strategies",
        ],
      },
    },
    {
      id: "social-wall",
      name: "Class Social Wall",
      category: "Learning & Engagement",
      status: "production-ready",
      adoptionRate: "82%",
      userSatisfaction: "93%",
      description:
        "Interactive social learning platform with real-time collaboration, moderation, and community building features",
      icon: "/icons/social-wall-icon.svg",
      video: "/videos/social-wall-demo.mp4",
      tags: ["Social Learning", "Real-Time Collaboration", "Moderation", "Community Building"],
      metrics: {
        collaborationBoost: "+95%",
        engagementRate: "+70%",
        communityHealth: "92%",
      },
      details: {
        overview:
          "Dynamic social learning platform fostering classroom community through interactive posts, collaboration, and positive peer recognition.",
        keyFeatures: [
          "Rich media post creation and sharing",
          "Real-time updates via Socket.IO integration",
          "Advanced moderation dashboard",
          "Peer recognition and mentorship programs",
          "Comprehensive analytics and insights",
        ],
        technicalSpecs: [
          "Role-based access control",
          "Content validation and filtering",
          "Rate limiting and security measures",
          "Detailed audit logs",
          "Conflict resolution tools",
        ],
        benefits: [
          "95% increase in collaborative activities",
          "70% boost in class engagement rates",
          "92% community health score",
          "Enhanced peer learning opportunities",
          "Improved classroom dynamics",
        ],
      },
    },

    // Advanced Cross-Cutting Capabilities (4 capabilities)
    {
      id: "compliance-privacy",
      name: "Privacy & Compliance",
      category: "Advanced Features",
      status: "production-ready",
      adoptionRate: "100%",
      userSatisfaction: "99%",
      description:
        "Comprehensive FERPA-compliant privacy system with AI-powered risk assessment and automated compliance management",
      icon: "/icons/privacy-icon.svg",
      video: "/videos/privacy-demo.mp4",
      tags: ["FERPA Compliant", "Privacy-by-Design", "AI Risk Assessment", "Automated Compliance"],
      metrics: {
        complianceScore: "100%",
        riskReduction: "-95%",
        auditReadiness: "100%",
      },
      featured: true,
      details: {
        overview:
          "Advanced privacy and compliance system ensuring FERPA compliance through AI-powered risk assessment and automated data protection.",
        keyFeatures: [
          "FERPA compliance engine with automated monitoring",
          "Privacy-by-design architecture implementation",
          "AI-powered content classification for privacy risk",
          "Comprehensive audit system with tamper-proof logs",
          "Automated data retention and lifecycle management",
        ],
        technicalSpecs: [
          "End-to-end encryption and access controls",
          "Granular consent management",
          "Cross-border data protection",
          "Automated privacy impact assessments",
          "Legal basis tracking and validation",
        ],
        benefits: [
          "100% FERPA compliance maintenance",
          "95% reduction in privacy risks",
          "100% audit readiness score",
          "Automated compliance reporting",
          "Proactive privacy protection",
        ],
      },
    },
    {
      id: "i18n-localization",
      name: "Global Localization",
      category: "Advanced Features",
      status: "production-ready",
      adoptionRate: "75%",
      userSatisfaction: "96%",
      description:
        "Comprehensive internationalization system supporting multiple languages, RTL text, and cultural adaptations",
      icon: "/icons/i18n-icon.svg",
      video: "/videos/i18n-demo.mp4",
      tags: ["Multi-Language", "RTL Support", "Cultural Adaptation", "Global Ready"],
      metrics: {
        languageSupport: "3+",
        localizationAccuracy: "98%",
        culturalAdaptation: "95%",
      },
      details: {
        overview:
          "Advanced internationalization system supporting multiple languages with RTL text support and comprehensive cultural adaptations.",
        keyFeatures: [
          "Multi-language support (English, Arabic, Spanish)",
          "Complete RTL implementation for Arabic",
          "Cultural adaptations (date/number formats, colors)",
          "Global timezone support with automatic detection",
          "Intelligent language detection and preferences",
        ],
        technicalSpecs: [
          "Extensible framework for additional languages",
          "CSS logical properties for direction-agnostic styling",
          "Centralized translation management",
          "Automated translation validation",
          "Cultural context-aware formatting",
        ],
        benefits: [
          "Support for 3+ primary languages",
          "98% localization accuracy",
          "95% cultural adaptation score",
          "Global accessibility enablement",
          "Seamless multi-language experience",
        ],
      },
    },
    {
      id: "offline-experiences",
      name: "Offline Capabilities",
      category: "Advanced Features",
      status: "production-ready",
      adoptionRate: "68%",
      userSatisfaction: "94%",
      description: "Comprehensive offline-first architecture enabling full functionality without internet connectivity",
      icon: "/icons/offline-icon.svg",
      video: "/videos/offline-demo.mp4",
      tags: ["Offline-First", "PWA", "Data Sync", "Mobile Ready"],
      metrics: {
        offlineReliability: "99%",
        syncAccuracy: "98%",
        performanceBoost: "+45%",
      },
      details: {
        overview:
          "Advanced offline-first architecture providing complete educational platform functionality without internet connectivity.",
        keyFeatures: [
          "Complete offline functionality for all core features",
          "Progressive Web App (PWA) capabilities",
          "Intelligent data synchronization with conflict resolution",
          "Teacher offline grading and attendance tracking",
          "Student offline learning and progress tracking",
        ],
        technicalSpecs: [
          "IndexedDB local data storage",
          "Service Worker integration",
          "Differential synchronization algorithms",
          "Priority-based sync strategies",
          "Multi-device synchronization",
        ],
        benefits: [
          "99% offline functionality reliability",
          "98% data synchronization accuracy",
          "45% performance improvement",
          "Uninterrupted learning continuity",
          "Remote area accessibility",
        ],
      },
    },
    {
      id: "aivy-multi-agent",
      name: "AIVY AI Agents",
      category: "Advanced Features",
      status: "production-ready",
      adoptionRate: "85%",
      userSatisfaction: "97%",
      description:
        "Revolutionary multi-agent AI system with specialized educational agents and advanced memory capabilities",
      icon: "/icons/aivy-icon.svg",
      video: "/videos/aivy-demo.mp4",
      tags: ["Multi-Agent AI", "Educational Intelligence", "Advanced Memory", "Personalized Support"],
      metrics: {
        aiAccuracy: "94%",
        responseTime: "<2s",
        userSatisfaction: "97%",
      },
      featured: true,
      details: {
        overview:
          "Revolutionary AI orchestration system featuring specialized educational agents with advanced memory and personalized learning support.",
        keyFeatures: [
          "Student Companion Agent for personalized learning support",
          "Teacher Assistant Agent for pedagogical assistance",
          "Content Generation Agent for curriculum-aligned materials",
          "Analytics Agent for educational data insights",
          "Safety & Compliance Agent for monitoring",
        ],
        technicalSpecs: [
          "Master orchestrator for central coordination",
          "Multi-type memory architecture (short-term, long-term, episodic)",
          "Context-aware routing to specialized agents",
          "Real-time coordination and resource optimization",
          "Learning adaptation from user interactions",
        ],
        benefits: [
          "94% AI accuracy in educational contexts",
          "Sub-2 second response times",
          "97% user satisfaction rating",
          "Personalized learning experiences",
          "Intelligent pedagogical support",
        ],
      },
    },
  ]

  const filteredCapabilities = capabilities.filter((capability) => {
    const matchesSearch =
      capability.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capability.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capability.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capability.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter = selectedFilter === "all" || capability.category.toLowerCase().includes(selectedFilter)

    return matchesSearch && matchesFilter
  })

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "core operations":
        return <Settings className="w-4 h-4" />
      case "learning & engagement":
        return <BookOpen className="w-4 h-4" />
      case "advanced features":
        return <Zap className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "production-ready":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "beta":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "alpha":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const handleLike = (capabilityId: string) => {
    setCapabilityLikes((prev) => ({
      ...prev,
      [capabilityId]: {
        liked: !prev[capabilityId]?.liked,
        disliked: false,
      },
    }))
    console.log(`Liked capability: ${capabilityId}`)
  }

  const handleDislike = (capabilityId: string) => {
    setCapabilityLikes((prev) => ({
      ...prev,
      [capabilityId]: {
        liked: false,
        disliked: !prev[capabilityId]?.disliked,
      },
    }))
    console.log(`Disliked capability: ${capabilityId}`)
  }

  // Set first capability as default selected
  if (!selectedCapability && filteredCapabilities.length > 0) {
    setSelectedCapability(filteredCapabilities[0])
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavBar />

      {/* Mobile Layout */}
      {isMobile ? (
        <div className="flex-1 pt-16">
          <div className="p-4">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-3 text-white">Platform Capabilities</h1>
              <p className="text-sm text-gray-400">
                Explore FabriiQ's comprehensive educational technology capabilities designed for modern institutions.
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search capabilities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400 text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 text-xs rounded transition-all ${
                    selectedFilter === filter.id
                      ? "bg-primary/20 text-primary border border-primary/50"
                      : "bg-gray-950 text-gray-400 border border-gray-800 hover:text-white hover:border-primary/30"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            <div className="max-h-[calc(100vh-300px)] overflow-y-auto space-y-6 pr-2">
              {filteredCapabilities.map((capability, index) => (
                <div key={capability.id} className="bg-black border border-white/20 rounded-lg overflow-hidden">
                  {/* Capability Header */}
                  <div className="p-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                        {getCategoryIcon(capability.category)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{capability.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{capability.category}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <span className="text-green-400">{capability.adoptionRate} adoption</span>
                          <span className="text-blue-400">{capability.userSatisfaction} satisfaction</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 mb-4">{capability.description}</p>

                    {videoData[capability.id] && (
                      <div className="mb-4">
                        <VideoPlayer src={videoData[capability.id][0]} title={`${capability.name} Demo`} />

                        {/* Multiple Demo Options */}
                        {videoData[capability.id].length > 1 && (
                          <div className="flex flex-wrap justify-center gap-2 mt-3">
                            {videoData[capability.id].slice(1).map((videoUrl, index) => (
                              <div key={index} className="w-full mt-4">
                                <h5 className="text-sm font-medium text-gray-300 mb-2">Demo {index + 2}</h5>
                                <VideoPlayer src={videoUrl} title={`${capability.name} Demo ${index + 2}`} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {capability.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(capability.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-lg font-bold text-primary">{value}</p>
                          <p className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <div className="flex flex-1 pt-16">
          {/* Left Sidebar - Capabilities List */}
          <div className="w-1/4 border-r border-gray-800 bg-black h-[calc(100vh-64px)] overflow-y-auto">
            <div className="p-4">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-3 text-white">Platform Capabilities</h1>
                <p className="text-sm text-gray-400">
                  Explore FabriiQ's comprehensive educational technology capabilities designed for modern institutions.
                </p>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">17+</p>
                      <p className="text-xs text-gray-400">Core Capabilities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search capabilities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400 text-sm"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-1 mb-4">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-2 py-1 text-xs rounded transition-all ${
                      selectedFilter === filter.id
                        ? "bg-primary/20 text-primary border border-primary/50"
                        : "bg-gray-950 text-gray-400 border border-gray-800 hover:text-white hover:border-primary/30"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* Capabilities List */}
              <div className="space-y-3 pb-4">
                {filteredCapabilities.map((capability) => (
                  <div
                    key={capability.id}
                    onClick={() => setSelectedCapability(capability)}
                    className={`cursor-pointer rounded-lg border transition-all duration-300 ${
                      selectedCapability?.id === capability.id
                        ? "bg-black border-white/30 shadow-lg"
                        : "bg-black border-white/10 hover:border-white/20 hover:shadow-md"
                    }`}
                  >
                    <div className="p-3">
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center flex-shrink-0 border border-primary/20">
                          {getCategoryIcon(capability.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-white truncate text-sm">{capability.name}</h3>
                            {capability.featured && (
                              <span className="px-1 py-0.5 bg-primary text-black rounded text-xs font-medium">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mb-1">{capability.category}</p>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{capability.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-400">{capability.adoptionRate}</span>
                            </div>
                            <ChevronRight className="w-3 h-3 text-gray-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Capability Details & Preview */}
          <div className="flex-1 flex flex-col bg-black relative">
            {selectedCapability ? (
              <>
                {/* Capability Header */}
                <div className="border-b border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-primary/10 rounded-xl p-4 border border-primary/20 flex items-center justify-center">
                        {getCategoryIcon(selectedCapability.category)}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{selectedCapability.name}</h2>
                        <p className="text-lg text-gray-400 mb-3">{selectedCapability.category}</p>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                              selectedCapability.status,
                            )}`}
                          >
                            {selectedCapability.status === "production-ready"
                              ? "Production Ready"
                              : selectedCapability.status}
                          </span>
                          <span className="text-sm text-gray-400">{selectedCapability.adoptionRate} Adoption Rate</span>
                          <span className="text-sm text-green-400 font-semibold">
                            {selectedCapability.userSatisfaction} Satisfaction
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" className="bg-primary/20 text-primary hover:bg-primary/30">
                        <Play className="w-4 h-4 mr-2" />
                        View Demo
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex">
                  {/* Capability Details */}
                  <div className={`${isFullscreen ? "hidden" : "w-2/5"} border-r border-gray-800 overflow-y-auto`}>
                    <div className="p-6 space-y-8">
                      {/* Overview */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
                        <p className="text-gray-300 leading-relaxed">{selectedCapability.details.overview}</p>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                        <div className="space-y-3">
                          {selectedCapability.details.keyFeatures.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technical Specifications */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Technical Specifications</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedCapability.details.technicalSpecs.map((spec: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Key Benefits</h3>
                        <div className="space-y-2">
                          {selectedCapability.details.benefits.map((benefit: string, index: number) => (
                            <div key={index} className="flex items-center text-gray-300">
                              <TrendingUp className="w-4 h-4 text-green-400 mr-3" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedCapability.tags.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Metrics */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Performance Metrics</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {Object.entries(selectedCapability.metrics).map(([key, value]) => (
                            <div key={key} className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                                <span className="text-green-400 font-semibold">{value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <Button
                          onClick={() => handleLike(selectedCapability.id)}
                          variant="outline"
                          className={`border-gray-600 ${
                            capabilityLikes[selectedCapability.id]?.liked
                              ? "bg-red-500 text-white border-red-500"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          {capabilityLikes[selectedCapability.id]?.liked ? "Liked" : "Like"}
                        </Button>
                        <Button
                          onClick={() => handleDislike(selectedCapability.id)}
                          variant="outline"
                          className={`border-gray-600 ${
                            capabilityLikes[selectedCapability.id]?.disliked
                              ? "bg-gray-700 text-white border-gray-500"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <ThumbsDown className="w-4 h-4 mr-2" />
                          {capabilityLikes[selectedCapability.id]?.disliked ? "Disliked" : "Dislike"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Capability Preview/Demo */}
                  <div className={`${isFullscreen ? "w-full" : "flex-1"} bg-gray-900`}>
                    <div className="w-full h-full overflow-y-auto p-8">
                      <div className="max-w-4xl mx-auto space-y-8">
                        {/* Overview Section */}
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-4">Overview</h3>
                          <p className="text-gray-300 leading-relaxed text-lg">{selectedCapability.details.overview}</p>
                        </div>

                        {/* Video Demo Section */}
                        {videoData[selectedCapability.id] ? (
                          <div>
                            <h3 className="text-2xl font-semibold text-white mb-4">Interactive Demo</h3>
                            <div className="space-y-6">
                              <VideoPlayer
                                src={videoData[selectedCapability.id][0]}
                                title={`${selectedCapability.name} Demo`}
                              />

                              {/* Additional Demo Videos */}
                              {videoData[selectedCapability.id].length > 1 && (
                                <div className="space-y-6">
                                  {videoData[selectedCapability.id].slice(1).map((videoUrl, index) => (
                                    <div key={index}>
                                      <h4 className="text-lg font-medium text-white mb-3">Demo {index + 2}</h4>
                                      <VideoPlayer
                                        src={videoUrl}
                                        title={`${selectedCapability.name} Demo ${index + 2}`}
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                              <Play className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4">Demo Coming Soon</h3>
                            <p className="text-gray-400">
                              Interactive demonstration for {selectedCapability.name} will be available soon.
                            </p>
                          </div>
                        )}

                        {/* Additional Overview/Details */}
                        <div className="space-y-6">
                          {/* Key Features */}
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {selectedCapability.details.keyFeatures.map((feature: string, index: number) => (
                                <div key={index} className="flex items-center text-gray-300">
                                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Benefits */}
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Key Benefits</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {selectedCapability.details.benefits.map((benefit: string, index: number) => (
                                <div key={index} className="flex items-center text-gray-300">
                                  <TrendingUp className="w-4 h-4 text-green-400 mr-3" />
                                  {benefit}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-white mb-4">Select a Capability</h3>
                  <p className="text-gray-400">
                    Choose a capability from the list to view details and interactive demo
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
