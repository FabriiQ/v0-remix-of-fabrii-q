import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { simpleParser } from 'mailparser';

export async function POST(req: Request) {
  try {
    const rawEmail = await req.text();
    const parsedEmail = await simpleParser(rawEmail);

    const from = parsedEmail.from?.text;
    const subject = parsedEmail.subject;
    const text = parsedEmail.text;
    const messageId = parsedEmail.messageId;
    const inReplyTo = parsedEmail.inReplyTo;
    const references = parsedEmail.references;

    if (!from || !subject || !text || !messageId) {
      return NextResponse.json({ error: 'Incomplete email data' }, { status: 400 });
    }

    const supabase = createClient();
    let threadId: string | null = null;

    // Try to find the thread using In-Reply-To or References
    const threadIdentifier = inReplyTo || (Array.isArray(references) ? references[0] : references);

    if (threadIdentifier) {
        const { data: threadData, error: threadError } = await supabase
            .from('email_threads')
            .select('id')
            .or(`last_message_id.eq.${threadIdentifier},id.eq.${threadIdentifier}`) // Also check if the identifier is a thread ID
            .single();
        if (threadError) console.error('Error finding thread:', threadError.message);
        if (threadData) {
            threadId = threadData.id;
        }
    }

    // If no thread is found, create a new one
    if (!threadId) {
        // First, find the contact by email
        const { data: contactData, error: contactError } = await supabase
            .from('lead_contacts')
            .select('id')
            .eq('email', from)
            .single();

        if (contactError || !contactData) {
            // If contact doesn't exist, we could create one or reject the email
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
        }

        const { data: newThreadData, error: newThreadError } = await supabase
            .from('email_threads')
            .insert({
                crm_contact_id: contactData.id,
                subject: subject,
                last_message_id: messageId,
            })
            .select('id')
            .single();
        if (newThreadError) throw new Error(`Failed to create new thread: ${newThreadError.message}`);
        threadId = newThreadData.id;
    } else {
        // Update the last_message_id for the existing thread
        const { error: updateError } = await supabase
            .from('email_threads')
            .update({ last_message_id: messageId })
            .eq('id', threadId);
        if (updateError) console.error('Failed to update thread:', updateError.message);
    }

    // Log the received message
    const { error: messageError } = await supabase.from('messages').insert({
        email_thread_id: threadId,
        sender_id: null, // This could be linked to a user if the 'from' email is recognized
        content: text,
        email_headers: parsedEmail.headers,
    });

    if (messageError) console.error('Failed to log received message:', messageError.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error receiving email:', error);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}