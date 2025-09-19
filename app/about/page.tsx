"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Target, Lightbulb, Shield, Globe, Brain, Building2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CodeRain } from "@/components/code-rain"
import { SpinningEarth } from "@/components/spinning-earth"

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-foreground overflow-x-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        {/* Spinning Earth */}
        <div className="opacity-10">
          <SpinningEarth />
        </div>
        {/* Code rain */}
        <div className="opacity-10 dark:opacity-10 light:opacity-3">
          <CodeRain />
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10">
        <NavBar />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 pt-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-fabriiq-primary/10 border border-fabriiq-primary/20 text-fabriiq-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-fabriiq-primary rounded-full mr-2 animate-pulse"></span>
                Our Story
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                <span className="text-foreground">Revolutionizing </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  Educational Technology
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
                Eight years of educational technology experience led us to one realization: institutions need a School
                Operating System, not another fragmented tool.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-fabriiq-primary/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <Target className="h-8 w-8 text-fabriiq-primary mr-3" />
                      <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                    </div>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      To eliminate the complexity and fragmentation that prevents educational institutions from reaching
                      their full potential by providing the first comprehensive School Operating System designed
                      specifically for modern educational excellence.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-fabriiq-teal/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <Lightbulb className="h-8 w-8 text-fabriiq-teal mr-3" />
                      <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                    </div>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      A world where every educational institution has unified, intelligent, and intuitive technology
                      that empowers educators, engages students, and enables institutional growth.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-foreground">The </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  FabriiQ Origin Story
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">How eight years of experience revealed the true problem</p>
            </motion.div>

            <div className="space-y-12">
              {/* Problem Discovery */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-6 border border-red-500/30">
                    <span className="text-red-400 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">The Problem We Discovered</h3>
                    <p className="text-muted-foreground mb-4 text-pretty leading-relaxed">
                      For eight years, we've been deeply embedded in the educational technology landscape, working with
                      institutions across different scales and contexts. What started as enthusiasm for "improving
                      education through technology" gradually revealed a troubling pattern.
                    </p>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      We watched institutions struggle with 3-7 different systems that couldn't communicate. Student
                      information lived in one place, learning management in another, financial data in a third, and
                      communication scattered across multiple platforms.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* The Revelation */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mr-6 border border-yellow-500/30">
                    <span className="text-yellow-400 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">The Revelation</h3>
                    <p className="text-muted-foreground mb-4 text-pretty leading-relaxed">
                      The breakthrough came when we realized we were asking the wrong question. Instead of "How can we
                      build a better LMS?" we should have been asking: "Why are educational institutions forced to
                      operate like a collection of disconnected departments?"
                    </p>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      No one was thinking about education as a complete, integrated ecosystem.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Our Solution */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-fabriiq-primary/20 rounded-full flex items-center justify-center mr-6 border border-fabriiq-primary/30">
                    <span className="text-fabriiq-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Our Solution Philosophy</h3>
                    <p className="text-muted-foreground mb-4 text-pretty leading-relaxed">
                      Rather than building another tool to add to the institutional technology stack, we designed
                      something fundamentally different: the first comprehensive School Operating System.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="bg-fabriiq-primary/10 p-4 rounded-lg border border-fabriiq-primary/20">
                        <h4 className="font-semibold text-fabriiq-primary mb-2">Not an LMS Plus</h4>
                        <p className="text-sm text-muted-foreground">
                          We started with the complete institutional mission
                        </p>
                      </div>
                      <div className="bg-fabriiq-teal/10 p-4 rounded-lg border border-fabriiq-teal/20">
                        <h4 className="font-semibold text-fabriiq-teal mb-2">AI-Native Architecture</h4>
                        <p className="text-sm text-muted-foreground">
                          Built for educational relationships from the ground up
                        </p>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-primary mb-2">Multi-Campus First</h4>
                        <p className="text-sm text-muted-foreground">Designed for complexity from day one</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Development Philosophy */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  Partnership Over Product
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">Why we chose collaborative development</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-fabriiq-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <Users className="h-8 w-8 text-fabriiq-primary mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-3">Alpha Phase Development</h3>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      Most educational technology is built in boardrooms by people who haven't been in a classroom in
                      years. We believe the best educational technology emerges from genuine collaboration with
                      educators.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-fabriiq-teal/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <Shield className="h-8 w-8 text-fabriiq-teal mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-3">Transparency Promise</h3>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      We clearly communicate what works today versus what we're building tomorrow. No overselling. No
                      false timelines. No hidden limitations.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Alpha Journey */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-fabriiq-primary/10 border border-fabriiq-primary/20 text-fabriiq-primary text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-fabriiq-primary rounded-full mr-2 animate-pulse"></span>
                Current Status
              </div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-foreground">One Year Journey to </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  Alpha
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">From concept to operational School Operating System</p>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                className="flex items-center p-4 bg-fabriiq-primary/10 rounded-lg border border-fabriiq-primary/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-3 h-3 bg-fabriiq-primary rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-fabriiq-primary">Core Systems Operational</h4>
                  <p className="text-muted-foreground text-sm">
                    All essential institutional operations function reliably
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center p-4 bg-fabriiq-teal/10 rounded-lg border border-fabriiq-teal/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-3 h-3 bg-fabriiq-teal rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-fabriiq-teal">AI Features Active</h4>
                  <p className="text-muted-foreground text-sm">
                    AIVY agents provide intelligent assistance across the platform
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center p-4 bg-primary/10 rounded-lg border border-primary/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-3 h-3 bg-primary rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-primary">Multi-Campus Proven</h4>
                  <p className="text-muted-foreground text-sm">
                    Successfully managing complex institutional hierarchies
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why School Operating System */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-fabriiq-primary/20 to-fabriiq-teal/20 backdrop-blur-sm border-y border-border/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-foreground">Why </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  "School Operating System"?
                </span>
              </h2>
              <p className="text-xl mb-8 text-muted-foreground text-pretty leading-relaxed">
                Like computer operating systems manage hardware resources and enable applications, educational operating
                systems should manage institutional resources and enable educational excellence.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Globe,
                  title: "Unified Data Model",
                  desc: "All institutional information connected",
                  color: "text-fabriiq-primary",
                },
                {
                  icon: Brain,
                  title: "Intelligent Automation",
                  desc: "Humans focus on education",
                  color: "text-fabriiq-teal",
                },
                {
                  icon: Building2,
                  title: "Extensible Architecture",
                  desc: "Platform grows with needs",
                  color: "text-primary",
                },
                {
                  icon: Shield,
                  title: "Resource Optimization",
                  desc: "Efficient use of time and resources",
                  color: "text-fabriiq-primary",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <item.icon className={`h-8 w-8 mx-auto mb-3 ${item.color}`} />
                  <h3 className="font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Invitation */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal">
                  Partnership Invitation
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
                We're not looking for customers - we're looking for co-creators. Educational institutions who understand
                that the future of education requires unified, intelligent technology.
              </p>
            </motion.div>

            <motion.div
              className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Limited Partnership Positions Available</h3>
              <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">
                We're accepting a maximum of 12 development partners to ensure meaningful collaboration and
                comprehensive customization for each institution.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal hover:from-fabriiq-teal hover:to-fabriiq-primary text-white"
                >
                  <Link href="/partnership">
                    Explore Partnership <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border/50 hover:border-primary/50 bg-transparent"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>

            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The future of educational technology isn't about better tools - it's about unified intelligence that
              empowers educational excellence.
            </motion.p>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
