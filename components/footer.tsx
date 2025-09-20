"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Users } from "lucide-react"
import { NewsletterForm } from "./newsletter-form"
import { FooterPopup } from "./footer-popup"
import { Button } from "@/components/ui/button"

export function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const footerSections = [
    {
      id: "platform",
      title: "Platform",
      items: [
        "AIVY Multi-Agent System",
        "Unified Operations",
        "Bloom's Taxonomy",
        "Privacy & Compliance",
        "Offline-First",
        "Multi-Campus",
      ],
    },
    {
      id: "partnership",
      title: "Partnership",
      items: [
        "Development Partners",
        "Alpha Access",
        "Co-creation",
        "Early Adopters",
        "Institutional Benefits",
        "Partnership Application",
      ],
    },
    {
      id: "resources",
      title: "Resources",
      items: [
        "Alpha Documentation",
        "API Reference",
        "Integration Guides",
        "Best Practices",
        "Support Center",
        "Community",
      ],
    },
    {
      id: "company",
      title: "Company",
      items: ["About FabriiQ", "Our Mission", "Team", "Careers", "News", "Contact"],
    },
  ]

  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-border/50 relative overflow-hidden">
      {/* Code background - updated with FabriiQ code */}
      <div className="absolute inset-0 opacity-5">
        <pre className="text-xs text-fabriiq-primary/30 font-mono leading-relaxed transform rotate-6 scale-150 absolute -top-20 -left-20">
          {`function educationalIntelligence() {
  const fabriiq = {
    // AIVY Multi-Agent System
    aivy: {
      agents: ['Student Companion', 'Teacher Assistant'],
      orchestration: 'Real-time collaboration',
      memory: 'Persistent cross-session context'
    },
    
    // Bloom's Taxonomy Integration  
    pedagogy: {
      framework: 'Six cognitive levels',
      classification: 'Automated content analysis',
      tracking: 'Real-time mastery measurement'
    }
  };
  
  return fabriiq.transform(education);
}`}
        </pre>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Desktop Footer */}
        <div className="hidden md:flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-4">
            <img src="/images/fabriiq-logo.png" alt="FabriiQ" className="h-14" />
            <FooterPopup />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} FabriiQ. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => (window.location.href = "/partnership")}
                className="bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal hover:from-fabriiq-teal hover:to-fabriiq-primary text-white font-medium px-4 py-2 text-sm"
              >
                <Users className="w-4 h-4 mr-2" />
                Start Partnership Discussion
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Subscribe for Alpha updates</span>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer - Stacked with collapsible sections */}
        <div className="md:hidden space-y-6">
          {/* Logo and main info */}
          <div className="text-center space-y-4">
            <img src="/images/fabriiq-logo.png" alt="FabriiQ" className="h-12 mx-auto" />
            <div className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} FabriiQ. All rights reserved.
            </div>
          </div>

          {/* Collapsible sections */}
          <div className="space-y-2">
            {footerSections.map((section) => (
              <div key={section.id} className="border border-border/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 bg-background/50 hover:bg-muted/30 transition-colors"
                >
                  <span className="font-medium text-sm">{section.title}</span>
                  {expandedSection === section.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 space-y-2 border-t border-border/30">
                        {section.items.map((item, index) => (
                          <motion.div
                            key={index}
                            className="text-sm text-muted-foreground hover:text-fabriiq-primary transition-colors py-1"
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Newsletter signup and partnership button */}
          <div className="text-center space-y-4 pt-4 border-t border-border/30">
            <span className="text-sm text-muted-foreground">Stay updated on Alpha development</span>
            <div className="px-4">
              <NewsletterForm />
            </div>
            <Button
              onClick={() => (window.location.href = "/partnership")}
              className="w-full bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal hover:from-fabriiq-teal hover:to-fabriiq-primary text-white font-medium px-4 py-2 text-sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Start Partnership Discussion
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
