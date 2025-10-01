'use client'

import AivyChat from '@/components/aivy/aivy-chat-interface'
import CookieConsent from '@/components/cookie-consent'

export default function AIDemoPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Demo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-1">
            <div className="rounded-xl overflow-hidden border border-gray-800/30 bg-black/40 backdrop-blur-sm p-4">
              <div className="h-[600px]">
                <AivyChat />
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Features */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                AI Assistant Features
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1F504B] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Educational Management</h4>
                    <p className="text-sm text-gray-600">Get help with student information systems, course planning, and academic workflows</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#5A8A84] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Platform Guidance</h4>
                    <p className="text-sm text-gray-600">Learn about FabriiQ features, capabilities, and best practices</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F59E0B] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Smart Analytics</h4>
                    <p className="text-sm text-gray-600">Understand data insights and generate meaningful reports</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Questions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Try These Questions
              </h3>
              <div className="space-y-2">
                {[
                  "What are FabriiQ's core capabilities?",
                  "How does the AI help with student management?",
                  "What administrative features are available?",
                  "Tell me about the analytics dashboard",
                  "How can I manage course assignments?"
                ].map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-[#D8E3E0] rounded-lg transition-colors border border-transparent hover:border-[#5A8A84]"
                    onClick={() => {
                      // This would trigger sending the question to the chat
                      console.log('Suggested question:', question)
                    }}
                  >
                    &quot;{question}&quot;
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Info */}
            <div className="bg-gradient-to-r from-[#1F504B] to-[#5A8A84] rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">
                Technical Implementation
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium">Alpha Development</span>
                </div>
                <div className="flex justify-between">
                  <span>Backend:</span>
                  <span className="font-medium">Supabase + pgvector</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Model:</span>
                  <span className="font-medium">Supabase/gte-small</span>
                </div>
                <div className="flex justify-between">
                  <span>Architecture:</span>
                  <span className="font-medium">RAG Pipeline</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5">
              ⚠️
            </div>
            <div className="text-sm text-amber-800">
              <strong>Alpha Version Notice:</strong> This AI assistant is currently in development. 
              Responses are generated using a mock system for demonstration purposes. 
              The production version will feature advanced RAG capabilities with vector search 
              and integration with your institution&apos;s knowledge base.
            </div>
          </div>
        </div>
      </div>
      <CookieConsent />
    </div>
  )
}