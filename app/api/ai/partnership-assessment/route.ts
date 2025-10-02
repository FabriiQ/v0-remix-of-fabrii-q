import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { AIVYConversationMemory } from '@/lib/ai/conversation-memory'
import type { LeadContact } from '@/lib/ai/conversation-memory.types'

interface PartnershipAssessmentData {
  // Institution Information
  institutionName: string
  institutionType: string
  campusCount: number
  studentPopulation: number
  
  // Strategic Contact Information
  primaryContactName: string
  primaryContactEmail: string
  primaryContactPhone: string
  primaryContactRole: string
  
  // Co-Development Partnership Details
  currentTechEcosystem: string
  strategicChallenges: string
  investmentTimeline: string
  partnershipCommitmentLevel: string
  
  // Custom Requirements & Vision
  customRequirements: string
  visionStatement: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { assessmentData, conversationId, userId, contactId }: {
      assessmentData: PartnershipAssessmentData
      conversationId: string
      userId?: string
      contactId?: string
    } = body

    if (!assessmentData || !assessmentData.institutionName || !assessmentData.primaryContactName) {
      return NextResponse.json(
        { error: 'Assessment data with institution name and contact name is required' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()
    const conversationMemory = new AIVYConversationMemory(supabase)
    
    // Get or create session
    const sessionIdentifier = conversationId || AIVYConversationMemory.generateSessionIdentifier()
    const sessionId = await conversationMemory.getOrCreateSession(sessionIdentifier, userId)
    
    // Get or determine contact ID
    let finalContactId: string | undefined = contactId || undefined;
    
    if (!finalContactId) {
      // Try to get existing contact from session
      const existingContact = await conversationMemory.getLeadContact(sessionId);
      if (existingContact && typeof existingContact === 'object' && 'id' in existingContact) {
        finalContactId = existingContact.id as string;
      } else {
        // Create new lead contact from assessment data
        const [firstName, ...lastNameParts] = assessmentData.primaryContactName.split(' ');
        const lastName = lastNameParts.join(' ') || null;
        const now = new Date().toISOString();
        
        // Create a partial contact object that matches the LeadContact type
        const contactData: Partial<LeadContact> & { 
          email: string;
          company: string;
          sessionId: string;
        } = {
          email: assessmentData.primaryContactEmail,
          phone: assessmentData.primaryContactPhone || null,
          firstName: firstName || null,
          lastName: lastName,
          company: assessmentData.institutionName,
          jobTitle: assessmentData.primaryContactRole || null,
          notes: `Created from partnership assessment on ${now}`,
          sessionId: sessionId,
          // These will be set by the database
          id: '',
          createdAt: new Date(now),
          updatedAt: new Date(now)
        };
        const newContactId = await conversationMemory.createLeadContact(sessionId, contactData as LeadContact);
        if (!newContactId) {
          throw new Error('Failed to create contact');
        }
        finalContactId = newContactId;
      }
    }

    if (!finalContactId) {
      throw new Error('No contact ID available for assessment');
    }

    // Create partnership assessment using database function
    const { data: assessmentResult, error } = await (supabase as any).rpc('create_partnership_assessment', {
      p_contact_id: finalContactId,
      p_session_id: sessionId,
      p_assessment_data: {
        institution_name: assessmentData.institutionName,
        institution_type: assessmentData.institutionType,
        campus_count: assessmentData.campusCount,
        student_population: assessmentData.studentPopulation,
        primary_contact_name: assessmentData.primaryContactName,
        primary_contact_email: assessmentData.primaryContactEmail,
        primary_contact_phone: assessmentData.primaryContactPhone || null,
        primary_contact_role: assessmentData.primaryContactRole || null,
        current_tech_ecosystem: assessmentData.currentTechEcosystem,
        strategic_challenges: assessmentData.strategicChallenges,
        investment_timeline: assessmentData.investmentTimeline,
        partnership_commitment_level: assessmentData.partnershipCommitmentLevel,
        custom_requirements: assessmentData.customRequirements || null,
        vision_statement: assessmentData.visionStatement || null
      }
    })
      
    const assessmentId = (assessmentResult as { id?: string })?.id || null;

    if (error) {
      throw new Error(`Failed to create assessment: ${error.message}`)
    }

    // Get the assessment results
    const { data: assessment, error: fetchError } = await (supabase as any)
      .from('partnership_assessments')
      .select('*')
      .eq('id', assessmentId)
      .single()

    if (fetchError || !assessment) {
      console.error('Failed to fetch assessment results:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch assessment results' },
        { status: 500 }
      )
    } else {
      return NextResponse.json({
        success: true,
        assessmentId,
        contactId: finalContactId,
        sessionId,
        assessmentScore: assessment?.assessment_score || 0,
        readinessLevel: assessment?.readiness_level || 'initial',
        partnershipPriority: assessment?.partnership_priority || 'medium',
        message: 'Partnership assessment created successfully'
      })
    }
  } catch (error) {
    console.error('Partnership assessment creation error:', error)
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}