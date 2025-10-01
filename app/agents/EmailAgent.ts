import { SupabaseClient } from '@supabase/supabase-js';

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
  threadId?: string;
  crmContactId?: string;
}

export class EmailAgent {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  /**
   * Sends an email using the backend API route.
   * This method ensures that all emails are sent from the server, keeping API keys secure.
   * It also handles the logic for creating and updating email threads.
   *
   * @param params The parameters for the email to be sent.
   * @returns The result of the send email operation.
   */
  async sendEmail(params: SendEmailParams): Promise<any> {
    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in EmailAgent.sendEmail:', error);
      throw error;
    }
  }
}