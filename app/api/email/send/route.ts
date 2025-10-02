import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { to, subject, text, html, threadId, crmContactId } = await req.json();

    if (!to || !subject || (!text && !html)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createClient();

    // Nodemailer transporter setup - replace with actual SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let currentThreadId = threadId;
    let lastMessageId: string | null = null;
    let references: string[] = [];

    // If a threadId is provided, fetch the thread details
    if (currentThreadId) {
        const { data: threadData, error: threadError } = await supabase
            .from('email_threads')
            .select('last_message_id')
            .eq('id', currentThreadId)
            .single();
        if (threadError) throw new Error(`Failed to fetch email thread: ${threadError.message}`);
        lastMessageId = threadData?.last_message_id || null;
    }

    // Generate a new Message-ID for this email
    const newMessageId = `<${Date.now()}.${Math.random().toString(36).substring(2)}@yourdomain.com>`;

    // Construct email headers for threading
    const mailOptions: any = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html,
      headers: {
        'Message-ID': newMessageId,
      },
    };

    if (lastMessageId) {
      mailOptions.headers['In-Reply-To'] = lastMessageId;
      mailOptions.headers['References'] = lastMessageId;
    }

    // Send the email
    await transporter.sendMail(mailOptions);

    // If no threadId was provided, create a new one
    if (!currentThreadId) {
        const { data: newThreadData, error: newThreadError } = await supabase
            .from('email_threads')
            .insert({
                crm_contact_id: crmContactId,
                subject: subject,
                last_message_id: newMessageId,
            })
            .select('id')
            .single();
        if (newThreadError) throw new Error(`Failed to create new email thread: ${newThreadError.message}`);
        currentThreadId = newThreadData.id;
    } else {
        // Update the last_message_id for the existing thread
        const { error: updateError } = await supabase
            .from('email_threads')
            .update({ last_message_id: newMessageId })
            .eq('id', currentThreadId);
        if (updateError) console.error('Failed to update email thread:', updateError.message);
    }

    // Log the sent message in the messages table
    const { error: messageError } = await supabase.from('messages').insert({
        email_thread_id: currentThreadId,
        sender_id: null, // Assuming sent by the system/agent
        content: text || html,
        email_headers: mailOptions.headers,
    });

    if (messageError) console.error('Failed to log sent message:', messageError.message);

    return NextResponse.json({ success: true, messageId: newMessageId, threadId: currentThreadId });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}