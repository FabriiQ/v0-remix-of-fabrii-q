'use client';

import dynamic from 'next/dynamic';

const ConversationsClient = dynamic(
  () => import('./conversations-client'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F504B]"></div>
      </div>
    ),
  }
);

export default function ConversationsWrapper() {
  return <ConversationsClient initialConversations={[]} />;
}
