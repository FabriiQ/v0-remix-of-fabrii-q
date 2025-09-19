"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Search, Filter, ArrowUpRight } from "lucide-react"

export default function ClientelePage() {
  const [filter, setFilter] = useState("all")

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "product", name: "Physical Products" },
    { id: "branding", name: "Branding" },
  ]

  const projects = [
    {
      id: "nicfound",
      name: "Nicfound",
      category: "product",
      description: "Tracking case for nicotine products",
      image: "/placeholder.svg?height=400&width=600",
      logo: "/images/nicfound-logo.png",
      featured: true,
    },
    {
      id: "pufftrak",
      name: "Pufftrak",
      category: "product",
      description: "Advanced taper device for smoking cessation",
      image: "/placeholder.svg?height=400&width=600",
      logo: "/images/pufftrak-logo.png",
      featured: true,
    },
    {
      id: "acme",
      name: "Acme Corp",
      category: "web",
      description: "Enterprise web platform with custom CMS",
      image: "/placeholder.svg?height=400&width=600",
      logo: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "quantum",
      name: "Quantum Mobile",
      category: "mobile",
      description: "Cross-platform mobile app for financial services",
      image: "/placeholder.svg?height=400&width=600",
      logo: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "vertex",
      name: "Vertex Industries",
      category: "branding",
      description: "Complete brand identity and design system",
      image: "/placeholder.svg?height=400&width=600",
      logo: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "pulse",
      name: "Pulse Analytics",
      category: "web",
      description: "Real-time data visualization platform",
      image: "/placeholder.svg?height=400&width=600",
      logo: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "horizon",
      name: "Horizon App",
      category: "mobile",
      description: "Location-based social networking app",
      image: "/placeholder.svg?height=400&width=600",
      logo: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "nova",
      name: "Nova Fitness",
      category: "product",
      description: "Smart fitness tracking wearable",
      image: "/placeholder.svg?height=400&width=600",
      logo: "/placeholder.svg?height=100&width=100",
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  // Featured projects at the top
  const featuredProjects = filteredProjects.filter((project) => project.featured)
  const regularProjects = filteredProjects.filter((project) => !project.featured)

  const displayProjects = [...featuredProjects, ...regularProjects]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <NavBar />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Clientele</h1>
          <p className="text-muted-foreground text-lg">
            Explore our portfolio of successful client projects across various industries
          </p>
        </div>

        {/* Search and filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter className="text-muted-foreground w-4 h-4 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                  filter === category.id
                    ? "bg-primary/20 text-primary border border-primary/50"
                    : "bg-muted/30 text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Netflix-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="rounded-lg overflow-hidden border border-border bg-background/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]">
                {/* Project image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                  {/* Logo overlay */}
                  <div className="absolute bottom-4 left-4 h-8">
                    <div className="bg-black/50 backdrop-blur-sm p-1 rounded">
                      <img src={project.logo || "/placeholder.svg"} alt={`${project.name} logo`} className="h-6" />
                    </div>
                  </div>

                  {/* Category tag */}
                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs">
                      {categories.find((c) => c.id === project.category)?.name}
                    </div>
                  </div>
                </div>

                {/* Project info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-primary">View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>

              {/* Featured badge */}
              {project.featured && (
                <div className="absolute -top-2 -left-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                  Featured
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
