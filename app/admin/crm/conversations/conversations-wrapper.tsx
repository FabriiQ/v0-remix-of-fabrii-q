'use client';

import ConversationsClient from './conversations-client';
import { Conversation } from '@/lib/services/crmService';

export default function ConversationsWrapper({ initialConversations }: { initialConversations: Conversation[] }) {
  return <ConversationsClient initialConversations={initialConversations} />;
}