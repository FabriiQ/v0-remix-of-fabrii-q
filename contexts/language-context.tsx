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

// Deep merge function to properly combine nested objects
const deepMerge = (target: any, source: any): any => {
  const result = { ...target }
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(target[key] || {}, source[key])
      } else {
        result[key] = source[key]
      }
    }
  }
  
  return result
}

// Load translations for a specific language
const loadTranslations = async (languageCode: string): Promise<any> => {
  if (translationCache[languageCode]) {
    return translationCache[languageCode]
  }

  try {
    // First try to load the main language file
    let translations = {}
    
    try {
      const mainResponse = await fetch(`/locales/${languageCode}.json`)
      if (mainResponse.ok) {
        translations = await mainResponse.json()
      }
    } catch (e) {
      console.log(`Main file /locales/${languageCode}.json not found, trying directory structure`)
    }
    
    // Always also load from directory structure and merge with main file
    const files = ['common', 'navigation', 'homepage', 'footer', 'about', 'partnership', 'projects']
    
    for (const file of files) {
      try {
        const response = await fetch(`/locales/${languageCode}/${file}.json`)
        if (response.ok) {
          const fileData = await response.json()
          console.log(`Successfully loaded /locales/${languageCode}/${file}.json`)
          // Deep merge to preserve existing nested structures
          translations = deepMerge(translations, fileData)
        }
      } catch (e) {
        // Continue if individual file fails with detailed logging
        console.log(`File /locales/${languageCode}/${file}.json not found or failed to load:`, e)
      }
    }
    
    if (Object.keys(translations).length === 0) {
      throw new Error(`No translations found for ${languageCode}`)
    }
    
    translationCache[languageCode] = translations
    console.log(`Translation cache for ${languageCode}: ${Object.keys(translations).length} top-level keys loaded`)
    if (translations.pages) {
      console.log(`Pages keys available: ${Object.keys(translations.pages)}`)
    }
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
  const pathParts = path.split('.')
  let current = obj
  let debugPath = ''
  
  for (let i = 0; i < pathParts.length; i++) {
    const key = pathParts[i]
    debugPath += (i > 0 ? '.' : '') + key
    
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      // Debug: log where the path breaks (only for first few about keys to reduce noise)
      if (path.startsWith('pages.about.hero') || path.startsWith('pages.about.mission')) {
        console.log(`Translation path broken at: ${debugPath}, available keys:`, current ? Object.keys(current) : 'null/undefined')
      }
      return path // Return original key if path is broken
    }
  }
  
  return current || path
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
  const [isMounted, setIsMounted] = useState(false)

  // Detect browser language and load saved preference
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const initializeLanguage = async () => {
      const detectLanguage = () => {
        // First, try to get saved language from localStorage
        if (typeof window !== 'undefined') {
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
        
        return languages[0] // Default to English for SSR
      }
      
      const initialLanguage = detectLanguage()
      setCurrentLanguage(initialLanguage)
      
      // Load translations for the detected language
      const translations = await loadTranslations(initialLanguage.code)
      setCurrentTranslations(translations)
      
      // Set document properties only on client side
      if (typeof window !== 'undefined') {
        document.documentElement.lang = initialLanguage.code
        document.documentElement.dir = initialLanguage.code === "ar" ? "rtl" : "ltr"
      }
      
      setIsLoading(false)
    }

    initializeLanguage()
  }, [isMounted])

  const setLanguage = async (code: string) => {
    const newLang = languages.find((l) => l.code === code)
    if (newLang && typeof window !== 'undefined') {
      setIsLoading(true)
      setCurrentLanguage(newLang)
      localStorage.setItem("language", code)
      document.documentElement.lang = code
      document.documentElement.dir = code === "ar" ? "rtl" : "ltr"
      
      // Load translations for the new language
      const translations = await loadTranslations(code)
      setCurrentTranslations(translations)
      setIsLoading(false)
    }
  }

  // Translation function with parameter interpolation
  const t = (key: string, params?: Record<string, string | number>, options?: { returnObjects?: boolean }): any => {
    let translation = getNestedTranslation(currentTranslations, key)
    
    // Reduced debug logging for missing translations
    if (translation === key && currentLanguage.code !== 'en' && (key.startsWith('pages.about.hero') || key.startsWith('pages.about.mission'))) {
      console.log(`Missing translation for key: ${key} in language: ${currentLanguage.code}`)
    }
    
    // If translation not found, try to get from English as fallback
    if (translation === key && currentLanguage.code !== 'en' && translationCache.en) {
      translation = getNestedTranslation(translationCache.en, key)
      if (translation !== key) {
        console.log(`Using English fallback for key: ${key}`)
      }
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