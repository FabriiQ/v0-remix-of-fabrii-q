import { NextRequest, NextResponse } from 'next/server'
import { routeRequest } from '@/lib/ai/custom-agentic-router'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationId, userId, parentTurnId } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const response = await routeRequest(
      message,
      conversationId,
      userId,
      parentTurnId
    )

    return NextResponse.json({
      response,
      conversationId,
      turnId: `turn-${Date.now()}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Chat API error:', error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  )
}