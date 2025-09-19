"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CodeRain } from "@/components/code-rain"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Star,
  Globe,
  Smartphone,
  Package,
  Palette,
  TrendingUp,
  Users,
  DollarSign,
  X,
} from "lucide-react"

export default function PortfolioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const categories = [
    { id: "all", name: "All Projects", count: 8 },
    { id: "web", name: "Web Development", count: 3 },
    { id: "mobile", name: "Mobile Apps", count: 2 },
    { id: "product", name: "Physical Products", count: 2 },
    { id: "branding", name: "Branding", count: 1 },
  ]

  const topClients = [
    {
      id: "nicfound",
      name: "Nicfound",
      category: "product",
      description: "Smart tracking case for nicotine products with IoT integration",
      longDescription:
        "Nicfound is a revolutionary smart tracking case for nicotine products that leverages IoT technology to help users monitor and reduce their consumption. The device connects to a mobile app that provides detailed analytics and personalized recommendations.",
      image: "/placeholder.svg?key=ingxa",
      logo: "/images/nicfound-logo.png",
      metrics: {
        revenue: "$2.1M",
        users: "15K+",
        rating: 4.8,
        growth: "+340%",
      },
      tags: ["IoT", "Hardware", "Mobile App", "Cloud"],
      year: "2024",
      featured: true,
      testimonial: {
        quote:
          "Working with Weltivation was a game-changer for our product. Their expertise in both hardware and software integration helped us create a seamless experience that our users love.",
        author: "Michael Chen",
        role: "CEO, Nicfound",
      },
    },
    {
      id: "pufftrak",
      name: "Pufftrak",
      category: "product",
      description: "Advanced taper device for smoking cessation with precision control",
      longDescription:
        "Pufftrak is an innovative smoking cessation device that uses precision engineering to gradually reduce nicotine intake. The device features advanced sensors and a companion app that tracks progress and provides support throughout the quitting journey.",
      image: "/placeholder.svg?key=ko5zz",
      logo: "/images/pufftrak-logo.png",
      metrics: {
        revenue: "$1.8M",
        users: "8K+",
        rating: 4.9,
        growth: "+280%",
      },
      tags: ["Medical Device", "Precision Engineering", "Health Tech"],
      year: "2024",
      featured: true,
      testimonial: {
        quote:
          "The engineering precision that Weltivation brought to our product development process was exceptional. They understood our vision perfectly and delivered beyond our expectations.",
        author: "Sarah Johnson",
        role: "Product Director, Pufftrak",
      },
    },
    {
      id: "chatchill",
      name: "ChatChill",
      category: "web",
      description: "AI-powered chat platform with advanced conversation management",
      longDescription:
        "ChatChill is a cutting-edge AI-powered chat platform designed for teams to communicate more effectively. The platform features intelligent conversation routing, sentiment analysis, and automated response suggestions to enhance productivity.",
      image: "/placeholder.svg?key=lhbon",
      logo: "/images/chatchill-logo.png",
      metrics: {
        revenue: "$3.2M",
        users: "45K+",
        rating: 4.7,
        growth: "+420%",
      },
      tags: ["AI", "Chat", "Real-time", "React"],
      year: "2023",
      featured: true,
      testimonial: {
        quote:
          "The AI capabilities that Weltivation built into our platform have transformed how our users communicate. Their technical expertise and innovative approach made all the difference.",
        author: "Alex Rivera",
        role: "CTO, ChatChill",
      },
    },
    {
      id: "motionrecords",
      name: "Motion Records",
      category: "web",
      description: "Digital music platform for independent artists and labels",
      longDescription:
        "Motion Records is a comprehensive digital music platform that empowers independent artists and labels with tools for distribution, analytics, and fan engagement. The platform features a sleek interface and powerful backend systems.",
      image: "/placeholder.svg?key=rjsmu",
      logo: "/images/motionrecords-logo.png",
      metrics: {
        revenue: "$2.5M",
        users: "30K+",
        rating: 4.6,
        growth: "+190%",
      },
      tags: ["Music", "Streaming", "Analytics", "Vue.js"],
      year: "2023",
      featured: false,
      testimonial: {
        quote:
          "Weltivation understood the unique challenges of the music industry and built us a platform that truly serves our artists' needs. Their attention to detail and technical prowess is unmatched.",
        author: "Damon Wright",
        role: "Founder, Motion Records",
      },
    },
    {
      id: "glasspatch",
      name: "GlassPatch",
      category: "mobile",
      description: "On-demand glass repair service platform with real-time tracking",
      longDescription:
        "GlassPatch connects customers with certified glass repair professionals through a seamless mobile experience. The platform features real-time technician tracking, instant quotes, and secure payment processing.",
      image: "/placeholder.svg?height=300&width=400",
      logo: "/images/glasspatch-logo.png",
      metrics: {
        revenue: "$500K+",
        users: "12K+",
        rating: 4.8,
        growth: "+230%",
      },
      tags: ["Service", "Mobile", "GPS", "Booking"],
      year: "2023",
      featured: false,
      testimonial: {
        quote:
          "The mobile app Weltivation developed for us has completely transformed our business model. The real-time tracking feature has been a game-changer for both our technicians and customers.",
        author: "Lisa Hernandez",
        role: "Operations Manager, GlassPatch",
      },
    },
    {
      id: "spermleague",
      name: "Sperm League",
      category: "gaming",
      description: "Competitive gaming platform with unique tournament system",
      longDescription:
        "Sperm League is an innovative gaming platform that brings together players from around the world in unique tournament formats. The platform features advanced matchmaking algorithms, live streaming integration, and a comprehensive ranking system.",
      image: "/placeholder.svg?height=300&width=400",
      logo: "/images/spermleague-logo.png",
      metrics: {
        revenue: "$4.2M",
        users: "120K+",
        rating: 4.9,
        growth: "+510%",
      },
      tags: ["Gaming", "Tournaments", "Real-time", "Community"],
      year: "2022",
      featured: true,
      testimonial: {
        quote:
          "Weltivation delivered a gaming platform that exceeded all our expectations. Their technical solutions for our complex tournament system were brilliant and our user base has grown exponentially.",
        author: "Marcus King",
        role: "Gaming Director, Sperm League",
      },
    },
  ]

  const filteredClients = topClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || client.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return <Globe className="w-4 h-4" />
      case "mobile":
        return <Smartphone className="w-4 h-4" />
      case "product":
        return <Package className="w-4 h-4" />
      case "branding":
        return <Palette className="w-4 h-4" />
      case "gaming":
        return <Globe className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <CodeRain />
      </div>
      <NavBar />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search clients, projects, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background/80 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <Filter className="text-muted-foreground w-5 h-5 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary/20 text-primary border border-primary/50"
                      : "bg-background/80 backdrop-blur-sm text-muted-foreground border border-border hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Client Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence>
              {filteredClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative"
                  onClick={() => setSelectedClient(client)}
                >
                  <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] cursor-pointer">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={client.image || "/placeholder.svg"}
                        alt={client.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                      {/* Featured Badge */}
                      {client.featured && (
                        <div className="absolute top-4 left-4">
                          <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-current" />
                            <span>Featured</span>
                          </div>
                        </div>
                      )}

                      {/* Category Icon */}
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white">
                          {getCategoryIcon(client.category)}
                        </div>
                      </div>

                      {/* Logo */}
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                          <img
                            src={client.logo || "/placeholder.svg"}
                            alt={`${client.name} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Year */}
                      <div className="absolute bottom-4 right-4">
                        <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-white text-xs">
                          {client.year}
                        </div>
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold line-clamp-1">{client.name}</h3>
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">{client.metrics.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-foreground mb-4 line-clamp-2">{client.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {client.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                        {client.tags.length > 3 && (
                          <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded border border-border">
                            +{client.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div className="text-center p-3 bg-primary/5 rounded-lg">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-primary">{client.metrics.revenue}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Revenue</div>
                        </div>
                        <div className="text-center p-3 bg-primary/5 rounded-lg">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-primary">{client.metrics.users}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Users</div>
                        </div>
                        <div className="col-span-2 text-center p-3 bg-green-500/5 rounded-lg">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-bold text-green-500">{client.metrics.growth}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Growth</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredClients.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No clients found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Client Detail Modal */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-md border border-border">
          {selectedClient && (
            <>
              <DialogHeader className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedClient.logo || "/placeholder.svg"}
                    alt={selectedClient.name}
                    className="w-12 h-12 object-contain bg-black/50 rounded-lg p-2"
                  />
                  <DialogTitle className="text-2xl font-bold">{selectedClient.name}</DialogTitle>
                </div>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="rounded-full p-2 hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </DialogHeader>

              <div className="mt-6 space-y-8">
                {/*  Project Image */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedClient.image || "/placeholder.svg"}
                    alt={selectedClient.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedClient.longDescription}</p>
                </div>

                {/* Metrics */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-xl font-bold text-primary">{selectedClient.metrics.revenue}</div>
                      <div className="text-sm text-muted-foreground">Revenue Generated</div>
                    </div>
                    <div className="text-center p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                      <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-blue-500">{selectedClient.metrics.users}</div>
                      <div className="text-sm text-muted-foreground">Active Users</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                      <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-yellow-500">{selectedClient.metrics.rating}</div>
                      <div className="text-sm text-muted-foreground">User Rating</div>
                    </div>
                    <div className="text-center p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                      <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-green-500">{selectedClient.metrics.growth}</div>
                      <div className="text-sm text-muted-foreground">Growth Rate</div>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedClient.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                {selectedClient.testimonial && (
                  <div className="bg-muted/20 rounded-lg p-6 border border-border">
                    <h3 className="text-lg font-semibold mb-4">Client Testimonial</h3>
                    <blockquote className="text-muted-foreground italic mb-4">
                      "{selectedClient.testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {selectedClient.testimonial.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{selectedClient.testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{selectedClient.testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  )
}
