export interface PartnershipAssessment {
  id: string;
  contact_id: string;
  contact_name: string;
  contact_email: string;
  organization: string;
  institution_name: string;
  institution_type: string;
  campus_count: number;
  student_population: number;
  investment_timeline: string;
  partnership_commitment_level: string;
  assessment_score: number;
  readiness_level: 'initial' | 'exploring' | 'evaluating' | 'ready' | 'committed';
  partnership_priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'submitted' | 'under_review' | 'approved' | 'declined' | 'follow_up_needed';
  submitted_at: string;
  reviewed_at?: string;
  custom_requirements?: string;
  vision_statement?: string;
}
