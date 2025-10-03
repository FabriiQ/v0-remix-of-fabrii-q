import { createServiceClient } from '@/lib/supabase/server'
import { generateRAGResponse } from '@/lib/ai/gemini'
import { AIVYConversationMemory } from '@/lib/ai/conversation-memory'
import { generateEmbedding } from '@/lib/embeddings/openai-embeddings'
import { ExecutiveKnowledgePrioritizer } from '@/lib/ai/executive-knowledge-prioritizer'
import type { Database } from '@/lib/supabase/database.types'

const supabase = createServiceClient()

// --- Agent Tools ---

async function scheduleMeeting(details: string) {
  console.log('Tool: scheduleMeeting, Details:', details)
  const { data, error } = await supabase.from('schedules').insert([{ details }]).select()
  if (error) {
    console.error('Error in scheduleMeeting tool:', error)
    return `Error scheduling meeting: ${error.message}`
  }
  return `Meeting scheduled successfully. Details: ${JSON.stringify(data)}`
}

async function createTaskForContact(contactId: string, title: string, description?: string) {
  console.log(`Tool: createTaskForContact, Contact ID: ${contactId}, Title: ${title}`)
  // A real implementation would parse the contact from the message.
  // For now, we rely on the context.
  if (!contactId) {
    return "I need a contact to associate this task with. Please specify one."
  }
  const { data, error } = await supabase.from('tasks').insert([{ contact_id: contactId, title, description }]).select()
  if (error) {
    console.error('Error in createTaskForContact tool:', error)
    return `Error creating task: ${error.message}`
  }
  return `Task created successfully. Details: ${JSON.stringify(data)}`
}

// --- Agent Definitions ---

class SchedulerAgent {
  async execute(message: string) {
    console.log('SchedulerAgent executing...')
    // Simplified: using the full message as details. A real agent would parse this.
    return await scheduleMeeting(message)
  }
}

class TaskManagerAgent {
  async execute(message: string, context: any) {
    console.log('TaskManagerAgent executing...')
    const contactId = context.conversationState?.lead_contact_id
    if (!contactId) {
      return "I need to know which contact this task is for. Please provide a contact name or email."
    }
    const title = message.replace(/create task/i, '').trim()
    return await createTaskForContact(contactId, title, message)
  }
}

class VisitorEngagementAgent {
  async execute(message: string, context: any) {
    console.log('VisitorEngagementAgent executing with RAG pipeline...')

    const queryEmbedding = await generateEmbedding(message)

    type MatchDocument = Database['public']['Functions']['match_documents']['Returns'][number]
    const { data: relevantChunks, error: searchError } = await ((supabase as any).rpc('match_documents', {
      query_embedding: queryEmbedding,
      similarity_threshold: 0.7,
      match_count: 5,
    }) as Promise<{ data: MatchDocument[] | null; error: any }>)

    if (searchError) {
      console.error('Vector search error:', searchError)
    }

    let finalRelevantChunks = (relevantChunks as MatchDocument[]) || []
    if (finalRelevantChunks.length === 0) {
      const { data: fallbackChunks } = await ((supabase as any).rpc('match_documents', {
        query_embedding: queryEmbedding,
        similarity_threshold: 0.5,
        match_count: 5,
      }) as Promise<{ data: MatchDocument[] | null; error: any }>)
      finalRelevantChunks = (fallbackChunks as MatchDocument[]) || []
    }

    const prioritizedChunks = ExecutiveKnowledgePrioritizer.prioritizeForExecutive(
      finalRelevantChunks.map((chunk) => ({
        content: chunk.content,
        similarity: chunk.similarity,
      })),
      {
        profile: context.executiveProfile,
        state: context.conversationState,
        intent: context.intentAnalysis,
      },
    )

    const conversationHistory = context.recentHistory.map((turn: any) => ({
      role: 'user',
      content: `${turn.userQuery} | Response: ${turn.responseContent}`
    }))

    return await generateRAGResponse({
      query: message,
      relevantChunks: prioritizedChunks || [],
      conversationHistory,
      executiveContext: {
        profile: context.executiveProfile,
        state: context.conversationState,
        intent: context.intentAnalysis,
      },
    })
  }
}

// --- Intent Analysis ---

type Intent = 'scheduling' | 'task_management' | 'general_inquiry'

function analyzeIntent(message: string): Intent {
  const lowerCaseMessage = message.toLowerCase()
  if (/\b(schedule|meeting|demo|call)\b/.test(lowerCaseMessage)) {
    return 'scheduling'
  }
  if (/\b(task|assign|to-do|reminder)\b/.test(lowerCaseMessage)) {
    return 'task_management'
  }
  return 'general_inquiry'
}

// --- Main Router ---

export async function routeRequest(
  message: string,
  conversationId: string,
  userId: string,
  parentTurnId?: string | null
): Promise<string> {
  const conversationMemory = new AIVYConversationMemory(supabase)
  const sessionId = await conversationMemory.getOrCreateSession(conversationId, userId)
  const context = await conversationMemory.getSessionContext(sessionId)

  const intent = analyzeIntent(message)
  console.log(`Detected Intent: ${intent}`)

  let response: string

  switch (intent) {
    case 'scheduling':
      const schedulerAgent = new SchedulerAgent()
      response = await schedulerAgent.execute(message)
      break
    case 'task_management':
      const taskManagerAgent = new TaskManagerAgent()
      response = await taskManagerAgent.execute(message, context)
      break
    case 'general_inquiry':
    default:
      const visitorEngagementAgent = new VisitorEngagementAgent()
      response = await visitorEngagementAgent.execute(message, context)
      break
  }

  // Save the turn to conversation memory
  await conversationMemory.saveConversationTurn(
    sessionId,
    message,
    response,
    { primaryIntent: intent, confidence: 0.9, details: {} }, // Simplified intent analysis
    [],
    parentTurnId
  );

  return response;
}