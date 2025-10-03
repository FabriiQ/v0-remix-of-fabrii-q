import { ChatOpenAI } from '@langchain/openai'
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents'
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'
import { AIMessage, HumanMessage } from '@langchain/core/messages'
import { createClient } from '@/lib/supabase/client'
import { TavilySearchResults } from '@langchain/community/tools/tavily_search'
import { DynamicTool } from '@langchain/core/tools'
import { ConsoleCallbackHandler } from '@langchain/core/callbacks'

const supabase = createClient()

const SYSTEM_PROMPT = `You are a helpful assistant for a company called FabriiQ. You have access to a suite of tools to help you answer questions and perform tasks.

You are a master at routing requests to the correct agent. The available agents are:

- **Visitor Engagement Agent:** Your primary role. You handle general inquiries, answer questions about Fabriq, and engage with users in a helpful and friendly manner.
- **Scheduler Agent:** You are responsible for scheduling meetings, demos, and follow-ups. When a user wants to schedule something, you should use the tools at your disposal to make it happen.

When a user sends a message, first, analyze their intent. If they want to schedule something, route the request to the Scheduler Agent. Otherwise, handle the request yourself as the Visitor Engagement Agent.`

const llm = new ChatOpenAI({
  modelName: 'gpt-4-turbo-preview',
  temperature: 0,
})

const tools = [
  new TavilySearchResults({ maxResults: 1 }),
  new DynamicTool({
    name: 'schedule_meeting',
    description:
      'Schedules a meeting with a user. Call this tool when a user asks to schedule a meeting, demo, or call.',
    func: async (input: string) => {
      const { data, error } = await supabase
        .from('schedules')
        .insert([{ details: input }])
        .select()

      if (error) {
        return `Error scheduling meeting: ${error.message}`
      }

      return `Meeting scheduled successfully. Details: ${JSON.stringify(data)}`
    },
  }),
]

const prompt = ChatPromptTemplate.fromMessages([
  ['system', SYSTEM_PROMPT],
  new MessagesPlaceholder('chat_history'),
  ['human', '{input}'],
  new MessagesPlaceholder('agent_scratchpad'),
])

const agent = createOpenAIFunctionsAgent({
  llm,
  tools,
  prompt,
})

const agentExecutor = new AgentExecutor({
  agent,
  tools,
  verbose: true,
})

export async function routeRequest(
  input: string,
  chat_history: (AIMessage | HumanMessage)[]
) {
  const result = await agentExecutor.invoke(
    {
      input,
      chat_history,
    },
    {
      callbacks: [new ConsoleCallbackHandler()],
    }
  )

  return result.output
}