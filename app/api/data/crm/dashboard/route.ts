import { NextRequest, NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/services/crmService';

export const dynamic = 'force-dynamic';

// GET /api/crm/dashboard - Get CRM dashboard statistics and recent activity
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '30';

    const data = await getDashboardData(timeRange);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data', details: errorMessage },
      { status: 500 }
    );
  }
}