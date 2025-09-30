import { Metadata } from 'next';
import ConversationsWrapper from './conversations-wrapper';

export const metadata: Metadata = {
  title: 'Conversations | CRM',
  description: 'View and manage your conversations',
};

export default function ConversationsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">Conversations</h1>
        <p className="text-gray-600">View and manage your conversations with contacts</p>
      </header>
      <main className="flex-1 p-4 overflow-auto">
        <ConversationsWrapper />
      </main>
    </div>
  );
}
