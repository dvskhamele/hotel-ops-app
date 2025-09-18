import { NextResponse } from 'next/server'

const CURRENT_VERSION = '1.0.0'

export async function GET() {
  return NextResponse.json({ 
    version: CURRENT_VERSION,
    timestamp: new Date().toISOString()
  })
}