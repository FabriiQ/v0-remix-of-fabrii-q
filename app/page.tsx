"use client"

import Image from "next/image"
import Link from "next/link"
import { CodeRain } from "@/components/code-rain"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { SpinningEarth } from "@/components/spinning-earth"
import { TypingHero } from "@/components/typing-hero"
import { motion } from "framer-motion"
import { Zap, Users, Brain, Shield, Building2, Lightbulb, Target, Trophy, Wifi, Lock } from "lucide-react"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { useLanguage } from "@/contexts/language-context"
import { useDynamicMetadata } from "@/hooks/use-dynamic-metadata"
import VideoPlayer from "@/components/video-player"

export default function Home() {
  const { t } = useLanguage()
  useDynamicMetadata()
  
  return (
    <main className="relative min-h-screen bg-black text-foreground overflow-x-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/abstract-educational-technology-network-with-inter.jpg"
            alt="Educational Technology Background"
            width={1920}
            height={1080}
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
          <Image
            src="/abstract-animation-showing-interconnected-educatio.jpg"
            alt="Hero Animation"
            width={1920}
            height={1080}
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
        <section className="flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6 pt-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="mb-8">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-fabriiq-primary/20 border border-fabriiq-primary/40 text-fabriiq-primary text-base font-semibold backdrop-blur-sm">
                <span className="w-3 h-3 bg-fabriiq-primary rounded-full mr-3 animate-pulse"></span>
                {t("hero.alpha_status")}
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
                {t("hero.description_detailed")}
              </p>
            </div>

            <div className="pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/projects"
                  className="group relative px-8 py-4 bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal text-white rounded-lg font-medium text-base hover:from-fabriiq-teal hover:to-fabriiq-primary transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(31,80,75,0.3)]"
                >
                  <span className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>{t("cta.explore_core_capabilities")}</span>
                  </span>
                </Link>

                <Link
                  href="/partnership"
                  className="group relative px-8 py-4 bg-gray-800 text-white rounded-lg font-medium text-base hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-700"
                >
                  <span className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>{t("cta.become_development_partner")}</span>
                  </span>
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
                <span className="text-foreground">{t("homepage.sections.key_cornerstones.title_key")} </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  {t("homepage.sections.key_cornerstones.title_cornerstones")}
                </span>
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t("homepage.sections.key_cornerstones.description")}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  key: "aivy",
                  image: "/network-of-interconnected-ai-nodes-with-educationa.jpg",
                  color: "text-fabriiq-primary",
                },
                {
                  icon: Lightbulb,
                  key: "pedagogical",
                  image: "/pyramid-structure-with-cognitive-levels--bloom-s-t.jpg",
                  color: "text-fabriiq-teal",
                },
                {
                  icon: Trophy,
                  key: "gamification",
                  image: "/achievement-badges--leaderboards--social-interacti.png",
                  color: "text-primary",
                },
                {
                  icon: Building2,
                  key: "multi_campus",
                  image: "/interconnected-campus-buildings-with-data-flow-vis.png",
                  color: "text-fabriiq-primary",
                },
                {
                  icon: Wifi,
                  key: "offline_first",
                  image: "/device-synchronization-with-cloud-connectivity-ind.png",
                  color: "text-fabriiq-teal",
                },
                {
                  icon: Lock,
                  key: "privacy_compliance",
                  image: "/privacy.png",
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
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={t(`homepage.sections.key_cornerstones.features.${feature.key}.title`)}
                      width={400}
                      height={300}
                      className="w-full h-48 object-contain object-center group-hover:scale-105 transition-transform duration-300 bg-gray-900/20 rounded-lg"
                    />
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{t(`homepage.sections.key_cornerstones.features.${feature.key}.title`)}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{t(`homepage.sections.key_cornerstones.features.${feature.key}.description`)}</p>
                  <div className="text-xs text-fabriiq-primary bg-fabriiq-primary/10 px-2 py-1 rounded-full inline-block">
                    {t("homepage.sections.key_cornerstones.status_prefix")} {t(`homepage.sections.key_cornerstones.features.${feature.key}.status`)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Philosophy Section */}
        <section className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl sm:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white">{t("homepage.sections.platform_philosophy.title_platform")} </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  {t("homepage.sections.platform_philosophy.title_philosophy")}
                </span>
              </motion.h2>
              <motion.p
                className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t("homepage.sections.platform_philosophy.description")}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  key: "school_os_vs_lms",
                  icon: Building2,
                },
                {
                  key: "unified_vs_fragmented",
                  icon: Zap,
                },
                {
                  key: "ai_native_vs_added",
                  icon: Brain,
                },
                {
                  key: "online_vs_blended",
                  icon: Users,
                },
              ].map((comparison, index) => (
                <motion.div
                  key={comparison.key}
                  className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-fabriiq-primary/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 bg-fabriiq-primary/10 rounded-lg flex items-center justify-center mb-4 border border-fabriiq-primary/20">
                    <comparison.icon className="w-6 h-6 text-fabriiq-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {t(`homepage.sections.platform_philosophy.comparisons.${comparison.key}.title`)}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t(`homepage.sections.platform_philosophy.comparisons.${comparison.key}.description`)}
                  </p>
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
                <span className="text-sm font-medium text-fabriiq-primary">{t("homepage.sections.comprehensive_capabilities.badge")}</span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                {t("homepage.sections.comprehensive_capabilities.title_capabilities")}{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  {t("homepage.sections.comprehensive_capabilities.title_transform")}
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {t("homepage.sections.comprehensive_capabilities.description")}
              </p>
            </motion.div>

            <div className="space-y-20">
              {[
                {
                  key: "enrollment_mgmt",
                  techStack: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
                  videoUrl:
                    "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Enrollments.mp4",
                  image: "/intelligent-enrollment-management-dashboard-with-.jpg",
                },
                {
                  key: "financial_ops",
                  techStack: ["Node.js", "Stripe API", "PostgreSQL", "Redis"],
                  videoUrl:
                    "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/Fee%20Management.mp4",
                  image: "/financial-operations-automation-dashboard-with-m.jpg",
                },
                {
                  key: "pedagogical_intel",
                  techStack: ["Python", "scikit-learn", "PostgreSQL", "React"],
                  videoUrl:
                    "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/System%20Admin%20Subjects%20and%20learning%20outcomes.mp4",
                  image: "/pedagogical-intelligence-framework-with-bloom-s-.jpg",
                },
                {
                  key: "communication_intel",
                  techStack: ["WebSocket", "Node.js", "Redis", "PostgreSQL"],
                  videoUrl:
                    "https://mpfpuxztvmbmcdajkojf.supabase.co/storage/v1/object/public/Website%20Contnet/System%20Admin%20Communication%20hub.mp4",
                  image: "/strategic-communication-intelligence-hub-with-mu.jpg",
                },
                {
                  key: "teaching_analytics",
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
                      <h3 className="text-3xl font-bold text-white mb-4">{t(`homepage.sections.comprehensive_capabilities.capabilities.${capability.key}.title`)}</h3>
                      <p className="text-lg text-gray-300 leading-relaxed mb-6">{t(`homepage.sections.comprehensive_capabilities.capabilities.${capability.key}.description`)}</p>
                    </div>

                    {/* Features and Benefits Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Features */}
                      <div>
                        <h4 className="text-lg font-semibold text-fabriiq-primary mb-4">{t("homepage.sections.comprehensive_capabilities.labels.key_features")}</h4>
                        <ul className="space-y-3">
                          {Object.values(t(`homepage.sections.comprehensive_capabilities.capabilities.${capability.key}.features`, undefined, { returnObjects: true }) as Record<string, string>).map((feature, featureIndex) => (
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
                        <h4 className="text-lg font-semibold text-fabriiq-teal mb-4">{t("homepage.sections.comprehensive_capabilities.labels.expected_benefits")}</h4>
                        <div className="space-y-3">
                          {Object.values(t(`homepage.sections.comprehensive_capabilities.capabilities.${capability.key}.benefits`, undefined, { returnObjects: true }) as Record<string, string>).map((benefit, benefitIndex) => (
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
                        {t("homepage.sections.comprehensive_capabilities.labels.development_status")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(t(`homepage.sections.comprehensive_capabilities.capabilities.${capability.key}.status`, undefined, { returnObjects: true }) as Record<string, string>).map(([status, label], statusIndex) => (
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
                      <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">{t("homepage.sections.comprehensive_capabilities.labels.tech_stack")}</h4>
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

                  {/* Video Demo */}
                  <motion.div
                    className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <VideoPlayer
                      src={capability.videoUrl}
                      title={t(`homepage.sections.comprehensive_capabilities.capabilities.${capability.key}.title`)}
                      className="w-full"
                    />
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
                <span className="text-sm font-medium text-fabriiq-primary">{t("homepage.sections.platform_showcase.badge")}</span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                {t("homepage.sections.platform_showcase.title_built")}{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  {t("homepage.sections.platform_showcase.title_education")}
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {t("homepage.sections.platform_showcase.description")}
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
                  <Image
                    src="/blended-learning.png"
                    alt={t("homepage.sections.platform_showcase.platform_name")}
                    width={600}
                    height={400}
                    className="w-full h-96 object-contain object-center bg-gray-900/20 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-semibold mb-2">{t("homepage.sections.platform_showcase.platform_name")}</h4>
                    <p className="text-gray-300 text-sm">{t("homepage.sections.platform_showcase.platform_tagline")}</p>
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
                  <h3 className="text-3xl font-bold text-white mb-6">{t("homepage.sections.platform_showcase.title_built")} {t("homepage.sections.platform_showcase.title_education")}</h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    {t("homepage.sections.platform_showcase.excellence.description")}
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Brain,
                      key: "aivy_system",
                      color: "text-fabriiq-primary",
                    },
                    {
                      icon: Target,
                      key: "blooms_native",
                      color: "text-fabriiq-teal",
                    },
                    {
                      icon: Shield,
                      key: "privacy_design",
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
                        <h4 className="text-lg font-semibold text-white mb-2">{t(`homepage.sections.platform_showcase.excellence.features.${feature.key}.title`)}</h4>
                        <p className="text-gray-300 leading-relaxed">{t(`homepage.sections.platform_showcase.excellence.features.${feature.key}.description`)}</p>
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
                    <h4 className="text-lg font-semibold text-white mb-2">{t("homepage.sections.platform_showcase.excellence.status.title")}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {t("homepage.sections.platform_showcase.excellence.status.description")}
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
                <span className="text-foreground">{t("homepage.sections.contact.title_ready")} </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  {t("homepage.sections.contact.title_cocreate")}
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
                {t("homepage.sections.contact.description")}
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
                      <span>{t("homepage.sections.contact.cta.apply_partnership")}</span>
                    </span>
                  </Link>

                  <Link
                    href="/contact"
                    className="group relative px-8 py-4 bg-gray-800 text-white rounded-lg font-medium text-base hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-700"
                  >
                    <span className="flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>{t("homepage.sections.contact.cta.schedule_discussion")}</span>
                    </span>
                  </Link>

                  <Link
                    href="/resources"
                    className="group relative px-8 py-4 bg-gray-800 text-white rounded-lg font-medium text-base hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-700"
                  >
                    <span className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>{t("homepage.sections.contact.cta.alpha_documentation")}</span>
                    </span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center max-w-2xl">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{t("homepage.sections.contact.process.strategic_investment")}</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{t("homepage.sections.contact.process.codevelopment")}</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{t("homepage.sections.contact.process.competitive_advantage")}</p>
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
