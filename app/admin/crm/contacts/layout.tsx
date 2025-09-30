import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacts | FabriiQ CRM',
  description: 'Manage your contacts in FabriiQ CRM',
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
