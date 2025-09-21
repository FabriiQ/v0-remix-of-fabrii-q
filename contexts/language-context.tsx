"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
]

const translations = {
  en: {
    // Navigation
    "nav.capabilities": "Capabilities",
    "nav.partnership": "Partnership",
    "nav.support": "Support",
    "nav.about": "About",
    "nav.process": "Process",

    // CTA and Buttons
    "cta.lets_cocreate": "Let's co-create",
    "cta.partnership_application": "Partnership Application",
    "cta.learn_more": "Learn More",
    "cta.get_started": "Get Started",
    "cta.contact_us": "Contact Us",

    // Hero Section
    "hero.title": "FabriiQ - The First School Operating System",
    "hero.subtitle": "Educational Intelligence Platform",
    "hero.description":
      "Transforming education through AI-powered multi-agent systems and comprehensive school management.",

    // Footer
    "footer.powered_by": "Powered by FabriiQ",
    "footer.rights": "All rights reserved",
    "footer.phone": "Phone",
    "footer.address": "Address",
    "footer.linkedin": "LinkedIn",
  },
  nl: {
    // Navigation
    "nav.capabilities": "Mogelijkheden",
    "nav.partnership": "Partnerschap",
    "nav.support": "Ondersteuning",
    "nav.about": "Over Ons",
    "nav.process": "Proces",

    // CTA and Buttons
    "cta.lets_cocreate": "Laten we samen creëren",
    "cta.partnership_application": "Partnerschap Aanvraag",
    "cta.learn_more": "Meer Informatie",
    "cta.get_started": "Aan de Slag",
    "cta.contact_us": "Contact Opnemen",

    // Hero Section
    "hero.title": "FabriiQ - Het Eerste School Besturingssysteem",
    "hero.subtitle": "Educatieve Intelligentie Platform",
    "hero.description": "Onderwijs transformeren door AI-aangedreven multi-agent systemen en uitgebreid schoolbeheer.",

    // Footer
    "footer.powered_by": "Mogelijk gemaakt door FabriiQ",
    "footer.rights": "Alle rechten voorbehouden",
    "footer.phone": "Telefoon",
    "footer.address": "Adres",
    "footer.linkedin": "LinkedIn",
  },
  ar: {
    // Navigation
    "nav.capabilities": "القدرات",
    "nav.partnership": "الشراكة",
    "nav.support": "الدعم",
    "nav.about": "حول",
    "nav.process": "العملية",

    // CTA and Buttons
    "cta.lets_cocreate": "دعونا نبدع معاً",
    "cta.partnership_application": "طلب الشراكة",
    "cta.learn_more": "اعرف المزيد",
    "cta.get_started": "ابدأ الآن",
    "cta.contact_us": "اتصل بنا",

    // Hero Section
    "hero.title": "فابريك - أول نظام تشغيل مدرسي",
    "hero.subtitle": "منصة الذكاء التعليمي",
    "hero.description":
      "تحويل التعليم من خلال أنظمة الوكلاء المتعددة المدعومة بالذكاء الاصطناعي وإدارة المدارس الشاملة.",

    // Footer
    "footer.powered_by": "مدعوم من فابريك",
    "footer.rights": "جميع الحقوق محفوظة",
    "footer.phone": "الهاتف",
    "footer.address": "العنوان",
    "footer.linkedin": "لينكد إن",
  },
  zh: {
    // Navigation
    "nav.capabilities": "功能",
    "nav.partnership": "合作伙伴",
    "nav.support": "支持",
    "nav.about": "关于我们",
    "nav.process": "流程",

    // CTA and Buttons
    "cta.lets_cocreate": "让我们共同创造",
    "cta.partnership_application": "合作伙伴申请",
    "cta.learn_more": "了解更多",
    "cta.get_started": "开始使用",
    "cta.contact_us": "联系我们",

    // Hero Section
    "hero.title": "FabriiQ - 首个学校操作系统",
    "hero.subtitle": "教育智能平台",
    "hero.description": "通过AI驱动的多智能体系统和全面的学校管理来变革教育。",

    // Footer
    "footer.powered_by": "由FabriiQ提供支持",
    "footer.rights": "版权所有",
    "footer.phone": "电话",
    "footer.address": "地址",
    "footer.linkedin": "领英",
  },
  id: {
    // Navigation
    "nav.capabilities": "Kemampuan",
    "nav.partnership": "Kemitraan",
    "nav.support": "Dukungan",
    "nav.about": "Tentang",
    "nav.process": "Proses",

    // CTA and Buttons
    "cta.lets_cocreate": "Mari berkreasi bersama",
    "cta.partnership_application": "Aplikasi Kemitraan",
    "cta.learn_more": "Pelajari Lebih Lanjut",
    "cta.get_started": "Mulai Sekarang",
    "cta.contact_us": "Hubungi Kami",

    // Hero Section
    "hero.title": "FabriiQ - Sistem Operasi Sekolah Pertama",
    "hero.subtitle": "Platform Kecerdasan Pendidikan",
    "hero.description":
      "Mentransformasi pendidikan melalui sistem multi-agen bertenaga AI dan manajemen sekolah yang komprehensif.",

    // Footer
    "footer.powered_by": "Didukung oleh FabriiQ",
    "footer.rights": "Semua hak dilindungi",
    "footer.phone": "Telepon",
    "footer.address": "Alamat",
    "footer.linkedin": "LinkedIn",
  },
}

type LanguageContextType = {
  currentLanguage: (typeof languages)[0]
  setLanguage: (code: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])

  // Load saved language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      const lang = languages.find((l) => l.code === savedLanguage)
      if (lang) setCurrentLanguage(lang)
    }
  }, [])

  const setLanguage = (code: string) => {
    const newLang = languages.find((l) => l.code === code)
    if (newLang) {
      setCurrentLanguage(newLang)
      localStorage.setItem("language", code)
      document.documentElement.lang = code
      document.documentElement.dir = code === "ar" ? "rtl" : "ltr"
    }
  }

  // Translation function
  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage.code as keyof typeof translations] || translations.en
    return langTranslations[key as keyof typeof langTranslations] || key
  }

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
