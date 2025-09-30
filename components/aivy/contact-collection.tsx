'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'

interface ContactInfo {
  name: string
  phone: string
  organization: string
}
interface ContactCollectionProps {
  onComplete: (contactInfo: ContactInfo) => void
  isSubmitting?: boolean
}

type Step = 'name' | 'phone' | 'organization' | 'completed'

export function ContactCollection({ onComplete, isSubmitting = false }: ContactCollectionProps) {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState<Step>('name')
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    phone: '',
    organization: ''
  })

  const handleNext = () => {
    switch (currentStep) {
      case 'name':
        if (contactInfo.name.trim()) {
          setCurrentStep('phone')
        }
        break
      case 'phone':
        if (contactInfo.phone.trim()) {
          setCurrentStep('organization')
        }
        break
      case 'organization':
        if (contactInfo.organization.trim()) {
          handleSubmit()
        }
        break
    }
  }

  const handleSubmit = async () => {
    setCurrentStep('completed')
    onComplete(contactInfo)
  }

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext()
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 'name':
        return contactInfo.name.trim().length > 0
      case 'phone':
        return contactInfo.phone.trim().length > 0
      case 'organization':
        return contactInfo.organization.trim().length > 0
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {(currentStep === 'name' || currentStep === 'phone' || currentStep === 'organization') && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {currentStep === 'name' && t('aivy.collect.name_question')}
                  {currentStep === 'phone' && t('aivy.collect.phone_question')}
                  {currentStep === 'organization' && t('aivy.collect.organization_question')}
                </h2>
                <p className="text-gray-300">
                  {currentStep === 'name' && t('aivy.collect.name_hint')}
                  {currentStep === 'phone' && t('aivy.collect.phone_hint')}
                  {currentStep === 'organization' && t('aivy.collect.organization_hint')}
                </p>
              </div>

              <div className="relative max-w-md mx-auto">
                <input
                  type={currentStep === 'phone' ? 'tel' : 'text'}
                  value={
                    currentStep === 'name' ? contactInfo.name :
                    currentStep === 'phone' ? contactInfo.phone :
                    contactInfo.organization
                  }
                  onChange={(e) => {
                    const field = currentStep === 'name' ? 'name' :
                                  currentStep === 'phone' ? 'phone' : 'organization'
                    let value = e.target.value
                    
                    // Only allow numbers for phone input
                    if (field === 'phone') {
                      value = value.replace(/[^0-9]/g, '')
                    }
                    
                    handleInputChange(field, value)
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    currentStep === 'name' ? t('aivy.collect.name_placeholder') :
                    currentStep === 'phone' ? t('aivy.collect.phone_placeholder') :
                    t('aivy.collect.organization_placeholder')
                  }
                  className="w-full px-6 py-4 text-lg border-2 border-gray-600 rounded-full focus:border-fabriiq-primary focus:ring-0 focus:outline-none transition-colors bg-gray-800 text-white placeholder-gray-400"
                  autoFocus
                />
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
                    canProceed()
                      ? 'bg-fabriiq-primary hover:bg-fabriiq-primary/90 text-white hover:scale-110'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>

              {currentStep === 'phone' && (
                <p className="text-center text-sm text-gray-400">
                  {t('aivy.collect.phone_disclaimer')}
                </p>
              )}
            </motion.div>
          )}

          {currentStep === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  {t('aivy.collect.completed_title')}
                </h2>
                <p className="text-gray-300">
                  {isSubmitting ? t('aivy.collect.completed_saving') : t('aivy.collect.completed_connecting')}
                </p>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fabriiq-primary"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}