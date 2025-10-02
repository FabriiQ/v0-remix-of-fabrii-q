'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Agent } from '@/types/agent'
import { AIVYChatInterface as AivyChat } from '@/components/aivy/aivy-chat-interface'
import CookieConsent from '@/components/cookie-consent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Users } from 'lucide-react'

export default function AIDemoPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching agents for demo:', error)
      } else {
        setAgents(data as Agent[])
      }
      setLoading(false)
    }

    fetchAgents()
  }, [supabase])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">AIVY Agentic System Preview</h1>
          <p className="mt-2 text-lg text-gray-600">
            An overview of the specialized AI agents that power FabriiQ&apos;s marketing and operations.
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-1">
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-lg sticky top-8">
              <div className="p-4 bg-gray-100 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Live Demo</h3>
                <p className="text-sm text-gray-500">Interact with the Visitor Engagement Agent</p>
              </div>
              <div className="h-[600px] p-4">
                <AivyChat
                  contactInfo={{ name: 'Demo User', phone: 'N/A', organization: 'Demo Org' }}
                  userId="demo-user"
                  conversationId="demo-conversation"
                />
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Meet the AIVY Agents</CardTitle>
                    <CardDescription>
                      This multi-agent system automates key tasks, from visitor engagement to content creation.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center text-gray-500">Loading agents...</div>
                ) : agents.length === 0 ? (
                  <div className="text-center text-gray-500">
                    No agents found. Please run the database migration to seed the agents table.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agents.map((agent) => (
                      <div key={agent.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-4 transition-all hover:shadow-md hover:bg-white">
                        <Image
                          src={agent.avatar_url || '/default-avatar.png'}
                          alt={agent.name}
                          width={48}
                          height={48}
                          className="rounded-full border-2 border-white shadow-sm"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{agent.name}</h4>
                          <p className="text-sm font-medium text-primary">{agent.persona}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {(agent.metadata as any)?.description || 'No description available.'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Technical Info */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Status:</span>
                    <span className="font-medium text-green-600">Operational</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Backend:</span>
                    <span className="font-medium">Supabase + PostgreSQL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">LLM Provider:</span>
                    <span className="font-medium">Anthropic (Claude 3.5 Sonnet)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Architecture:</span>
                    <span className="font-medium">12-Factor Multi-Agent System</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5">
              ⚠️
            </div>
            <div className="text-sm text-amber-800">
              <strong>System Preview Notice:</strong> This page demonstrates the structure of the AIVY Agentic System.
              The chat interface is connected to a live agent, but full inter-agent orchestration is still in development.
              Data is fetched directly from the database to reflect the current agent configurations.
            </div>
          </div>
        </div>
      </div>
      <CookieConsent />
    </div>
  )
}