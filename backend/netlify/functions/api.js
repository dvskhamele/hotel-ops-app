// Netlify Edge Function for HotelOps API
import { Context } from '@netlify/edge-functions';

// Import the hotel service
import { HotelService } from '../services/hotelService.js';

// Initialize service
let hotelService;

// Initialize the service when the function is first loaded
async function initializeService() {
  if (!hotelService) {
    hotelService = new HotelService();
    await hotelService.init();
  }
}

// Helper function to parse request body
async function parseBody(request) {
  try {
    const contentType = request.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await request.json();
    }
    return {};
  } catch (error) {
    return {};
  }
}

// Helper function to create JSON response
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Main handler function
export default async (request, context) => {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Initialize service if not already done
  await initializeService();

  // Get the path and method
  const url = new URL(request.url);
  const path = url.pathname.replace('/.netlify/functions/api', '');
  const method = request.method;

  try {
    // Route handling
    switch (true) {
      // Root route
      case path === '/' && method === 'GET':
        return jsonResponse({ message: 'Hotel Operations Management API' });

      // Authentication routes
      case path === '/auth/login' && method === 'POST':
        const loginData = await parseBody(request);
        const { email, password } = loginData;
        const loginResult = await hotelService.authenticate(email, password);
        
        if (loginResult.success) {
          return jsonResponse({
            user: loginResult.user,
            token: 'fake-jwt-token'
          });
        } else {
          return jsonResponse({ error: 'Invalid credentials' }, 401);
        }

      // Dashboard routes
      case path === '/dashboard/stats' && method === 'GET':
        const stats = await hotelService.getDashboardStats();
        return jsonResponse(stats);

      case path === '/dashboard/activity' && method === 'GET':
        const activity = await hotelService.getRecentActivity();
        return jsonResponse(activity);

      case path === '/dashboard/rooms' && method === 'GET':
        const data = await hotelService.db.getData();
        return jsonResponse(data.rooms.slice(0, 4));

      case path === '/dashboard/requests' && method === 'GET':
        const requestData = await hotelService.db.getData();
        return jsonResponse(requestData.requests);

      case path === '/dashboard/performance' && method === 'GET':
        const performance = {
          housekeeping: 92,
          maintenance: 87,
          foodService: 95
        };
        return jsonResponse(performance);

      // Room routes
      case path.startsWith('/rooms/') && path.endsWith('/status') && method === 'PUT':
        const roomId = parseInt(path.split('/')[2]);
        const roomStatusData = await parseBody(request);
        const room = await hotelService.updateRoomStatus(roomId, roomStatusData.status);
        return jsonResponse(room);

      case path === '/rooms' && method === 'GET':
        const rooms = await hotelService.getAllRooms();
        return jsonResponse(rooms);

      // Staff routes
      case path.startsWith('/staff/') && path.endsWith('/status') && method === 'PUT':
        const staffId = parseInt(path.split('/')[2]);
        const staffStatusData = await parseBody(request);
        const staff = await hotelService.updateStaffStatus(staffId, staffStatusData.status);
        return jsonResponse(staff);

      case path === '/staff' && method === 'GET':
        const staff = await hotelService.getAllStaff();
        return jsonResponse(staff);

      // Request routes
      case path.startsWith('/requests/') && path.includes('/status') && method === 'PUT':
        const requestId = parseInt(path.split('/')[2]);
        const requestStatusData = await parseBody(request);
        const updatedRequest = await hotelService.updateRequestStatus(requestId, requestStatusData.status);
        return jsonResponse(updatedRequest);

      case path === '/requests' && method === 'GET':
        const requests = await hotelService.getAllRequests();
        return jsonResponse(requests);

      // Inventory routes
      case path.startsWith('/inventory/') && path.endsWith('/quantity') && method === 'PUT':
        const inventoryId = parseInt(path.split('/')[2]);
        const inventoryData = await parseBody(request);
        const item = await hotelService.updateInventoryQuantity(inventoryId, inventoryData.quantity);
        return jsonResponse(item);

      case path === '/inventory' && method === 'GET':
        const inventory = await hotelService.getAllInventory();
        return jsonResponse(inventory);

      // Department routes
      case path === '/departments' && method === 'GET':
        const departments = await hotelService.getAllDepartments();
        return jsonResponse(departments);

      // Default route
      default:
        return jsonResponse({ error: 'Route not found' }, 404);
    }
  } catch (error) {
    console.error('API Error:', error);
    return jsonResponse({ error: error.message }, 500);
  }
};

// Export config for Netlify
export const config = {
  path: '/api/*',
  method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};