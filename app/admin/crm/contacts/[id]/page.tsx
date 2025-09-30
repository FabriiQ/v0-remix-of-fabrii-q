import { Metadata } from 'next';

// This is a server component that handles metadata
export const metadata: Metadata = {
  title: 'Contact Details | FabriiQ CRM',
  description: 'View and edit contact details in FabriiQ CRM',
};

import dynamic from 'next/dynamic';

// Client component wrapper
function ContactClientWrapper() {
  const ContactClient = dynamic(
    () => import('./contact-client'),
    { 
      loading: () => <div className="p-4">Loading contact details...</div>,
    }
  );
  
  return <ContactClient />;
}

export default function ContactPage() {
  return <ContactClientWrapper />;
}
