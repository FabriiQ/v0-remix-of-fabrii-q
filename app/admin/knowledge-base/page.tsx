import { getKnowledgeBaseStats } from './actions'
import KnowledgeBaseClient from './knowledge-base-client'

export const dynamic = 'force-dynamic'

export default async function KnowledgeBasePage() {
  const { data: stats, error } = await getKnowledgeBaseStats()
  
  return <KnowledgeBaseClient initialStats={stats} error={error} />
}
