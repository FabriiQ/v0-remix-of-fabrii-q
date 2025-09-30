'use server'

export async function createContact(formData: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/crm/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        social_links: {
          linkedin: formData.linkedIn,
          twitter: formData.twitter
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create contact');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in createContact:', error);
    throw error;
  }
}
