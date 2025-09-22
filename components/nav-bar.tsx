"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Monitor, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: t("navigation.home"), href: "/" },
    { name: t("navigation.philosophy"), href: "/philosophy" },
    { name: t("navigation.capabilities"), href: "/projects" },
    { name: t("navigation.partnership"), href: "/partnership", icon: <Handshake className="w-4 h-4" /> },
    { name: t("navigation.about"), href: "/about" },
    { name: t("navigation.process"), href: "/process" },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : "bg-background/30 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={scrollToTop}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-fabriiq-primary to-fabriiq-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-fabriiq-primary to-fabriiq-teal bg-clip-text text-transparent">
                FabriiQ
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 nav-items">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={scrollToTop}
                className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 btn-micro nav-item ${
                  pathname === item.href ? "text-fabriiq-primary" : "text-muted-foreground hover:text-fabriiq-teal"
                }`}
              >
                {item.icon && item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right side items - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSelector />
            <Link
              href="/corporate-login"
              onClick={scrollToTop}
              className="text-muted-foreground hover:text-fabriiq-teal transition-colors btn-micro"
            >
              <Monitor className="w-5 h-5" />
            </Link>
            <Link href="/partnership" onClick={scrollToTop}>
              <Button className="btn-primary btn-micro">
                <Handshake className="w-4 h-4 mr-2" />
                {t("cta.lets_cocreate")}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button and Partnership Application */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSelector />
            <Link href="/partnership" onClick={scrollToTop}>
              <Button size="sm" className="btn-primary btn-micro text-xs px-2 py-1.5 h-8">
                <Handshake className="w-3 h-3 mr-1" />
                <span className="hidden xs:inline">{t("cta.cocreate_short")}</span>
                <span className="xs:hidden">{t("cta.cocreate_letter")}</span>
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-fabriiq-teal btn-micro p-1"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`lg:hidden absolute top-full left-0 right-0 backdrop-blur-md border-b border-border/50 shadow-lg ${
                scrolled ? "bg-background/95" : "bg-background/90"
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setIsOpen(false)
                      scrollToTop()
                    }}
                    className={`flex items-center space-x-3 text-base font-medium py-2 px-3 rounded-lg transition-all duration-200 ${
                      pathname === item.href
                        ? "text-fabriiq-primary bg-fabriiq-primary/10"
                        : "text-muted-foreground hover:text-fabriiq-teal hover:bg-muted/50"
                    }`}
                  >
                    {item.icon && <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>}
                    <span>{item.name}</span>
                  </Link>
                ))}

                <div className="pt-4 border-t border-border space-y-4">
                  <Link
                    href="/corporate-login"
                    onClick={() => {
                      setIsOpen(false)
                      scrollToTop()
                    }}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-fabriiq-teal py-2 px-3 rounded-lg transition-all duration-200"
                  >
                    <Monitor className="w-5 h-5" />
                    <span>{t("navigation.corporate_login")}</span>
                  </Link>

                  <Link
                    href="/partnership"
                    onClick={() => {
                      setIsOpen(false)
                      scrollToTop()
                    }}
                    className="w-full"
                  >
                    <Button className="btn-primary btn-micro w-full justify-center">
                      <Handshake className="w-4 h-4 mr-2" />
                      {t("cta.lets_cocreate")}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
