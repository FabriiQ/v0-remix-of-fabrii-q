import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// This is a server component that handles metadata
export const metadata: Metadata = {
  title: 'New Contact | FabriiQ CRM',
  description: 'Add a new contact to FabriiQ CRM',
};

// Client component wrapper
function NewContactClientWrapper() {
  const NewContactClient = dynamic(
    () => import('./new-contact-client'),
    { 
      loading: () => <div className="p-4">Loading contact form...</div>,
    }
  );
  
  return <NewContactClient />;
}

export default function NewContactPage() {
  return <NewContactClientWrapper />;
}
