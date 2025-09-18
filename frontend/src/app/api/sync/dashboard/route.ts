import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // In a real application, this would fetch the latest dashboard data
    // For now, we'll return mock data
    
    const dashboardData = {
      stats: {
        pendingRequests: Math.floor(Math.random() * 20) + 5,
        occupiedRooms: Math.floor(Math.random() * 50) + 30,
        availableRooms: Math.floor(Math.random() * 30) + 10,
        revenueToday: Math.floor(Math.random() * 20000) + 5000,
        occupancyRate: Math.floor(Math.random() * 40) + 60,
        staffActive: Math.floor(Math.random() * 15) + 10,
        maintenanceRequests: Math.floor(Math.random() * 10) + 3,
        avgResponseTime: Math.floor(Math.random() * 20) + 15,
        guestSatisfaction: Math.floor(Math.random() * 20) + 80
      },
      activity: [
        {
          id: '1',
          title: 'Room 204 Cleaned',
          description: 'Housekeeping completed cleaning',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          type: 'room',
          status: 'COMPLETED'
        },
        {
          id: '2',
          title: 'Guest Request #1247',
          description: 'Extra towels requested',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          type: 'request',
          status: 'COMPLETED'
        }
      ],
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({ success: true, data: dashboardData })
  } catch (error) {
    console.error('Dashboard sync failed:', error)
    return NextResponse.json({ success: false, error: 'Sync failed' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // In a real application, this would save the data to your database
    console.log('Syncing dashboard data:', data)
    
    // Mock implementation
    // await saveDashboardData(data)
    
    return NextResponse.json({ success: true, message: 'Data synced successfully' })
  } catch (error) {
    console.error('Dashboard sync failed:', error)
    return NextResponse.json({ success: false, error: 'Sync failed' }, { status: 500 })
  }
}