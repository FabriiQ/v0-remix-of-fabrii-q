"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Language configuration
export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
]

// Translation cache to store loaded translations
const translationCache: Record<string, any> = {}

// Load translations for a specific language
const loadTranslations = async (languageCode: string): Promise<any> => {
  if (translationCache[languageCode]) {
    return translationCache[languageCode]
  }

  try {
    const response = await fetch(`/locales/${languageCode}.json`)
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${languageCode}`)
    }
    const translations = await response.json()
    translationCache[languageCode] = translations
    return translations
  } catch (error) {
    console.error(`Error loading translations for ${languageCode}:`, error)
    // Fallback to English if available, otherwise return empty object
    if (languageCode !== 'en' && translationCache.en) {
      return translationCache.en
    }
    return {}
  }
}

// Helper function to get nested translation value
const getNestedTranslation = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path
}

type LanguageContextType = {
  currentLanguage: (typeof languages)[0]
  setLanguage: (code: string) => void
  t: (key: string, params?: Record<string, string | number>, options?: { returnObjects?: boolean }) => any
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])
  const [currentTranslations, setCurrentTranslations] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)

  // Detect browser language and load saved preference
  useEffect(() => {
    const initializeLanguage = async () => {
      const detectLanguage = () => {
        // First, try to get saved language from localStorage
        const savedLanguage = localStorage.getItem("language")
        if (savedLanguage) {
          const lang = languages.find((l) => l.code === savedLanguage)
          if (lang) return lang
        }
        
        // If no saved language, try to detect from browser
        const browserLang = navigator.language || navigator.languages?.[0] || 'en'
        const langCode = browserLang.split('-')[0].toLowerCase()
        
        // Find matching language or default to English
        const detectedLang = languages.find((l) => l.code === langCode)
        return detectedLang || languages[0] // Default to English
      }
      
      const initialLanguage = detectLanguage()
      setCurrentLanguage(initialLanguage)
      
      // Load translations for the detected language
      const translations = await loadTranslations(initialLanguage.code)
      setCurrentTranslations(translations)
      
      // Set document properties
      document.documentElement.lang = initialLanguage.code
      document.documentElement.dir = initialLanguage.code === "ar" ? "rtl" : "ltr"
      
      setIsLoading(false)
    }

    initializeLanguage()
  }, [])

  const setLanguage = async (code: string) => {
    const newLang = languages.find((l) => l.code === code)
    if (newLang) {
      setIsLoading(true)
      setCurrentLanguage(newLang)
      localStorage.setItem("language", code)
      document.documentElement.lang = code
      document.documentElement.dir = code === "ar" ? "rtl" : "ltr"
      
      // Load translations for the new language
      
      // Load translations for the new language
      const translations = await loadTranslations(code)
      setCurrentTranslations(translations)
      setIsLoading(false)
    }
  }

  // Translation function with parameter interpolation
  const t = (key: string, params?: Record<string, string | number>, options?: { returnObjects?: boolean }): any => {
    let translation = getNestedTranslation(currentTranslations, key)
    
    // If translation not found, try to get from English as fallback
    if (translation === key && currentLanguage.code !== 'en' && translationCache.en) {
      translation = getNestedTranslation(translationCache.en, key)
    }
    
    // If returnObjects is true, return the object as-is
    if (options?.returnObjects) {
      return translation
    }
    
    // If translation is an object and returnObjects is not explicitly true, return the key
    if (typeof translation === 'object' && translation !== null) {
      return key
    }
    
    // Parameter interpolation (only for strings)
    if (params && translation !== key && typeof translation === 'string') {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(new RegExp(`{${param}}`, 'g'), String(value))
      })
    }
    
    return translation
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}