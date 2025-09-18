const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'backend/src/data.json');

// Import our new modules
const NotificationService = require('./backend/src/notifications');
const RequestRoutingService = require('./backend/src/requestRouting');
const ReportingService = require('./backend/src/reporting');

// Initialize data storage
let data = {
  users: [],
  rooms: [],
  staff: [],
  requests: [],
  inventory: [],
  departments: [],
  activity: []
};

// Load data from file or initialize with sample data
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, 'utf8');
      data = JSON.parse(fileData);
    } else {
      // Initialize with comprehensive sample data
      data = {
        users: [
          {
            id: 1,
            email: 'admin@hotelops.com',
            password: 'password123',
            name: 'Admin User',
            role: 'ADMIN'
          }
        ],
        rooms: [
          { id: 1, number: '101', floor: 1, type: 'Standard', status: 'CLEAN', updatedAt: new Date().toISOString() },
          { id: 2, number: '102', floor: 1, type: 'Standard', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
          { id: 3, number: '103', floor: 1, type: 'Deluxe', status: 'INSPECTED', updatedAt: new Date(Date.now() - 7200000).toISOString() },
          { id: 4, number: '104', floor: 1, type: 'Suite', status: 'OUT_OF_ORDER', updatedAt: new Date(Date.now() - 10800000).toISOString() },
          { id: 5, number: '201', floor: 2, type: 'Standard', status: 'CLEAN', updatedAt: new Date().toISOString() },
          { id: 6, number: '202', floor: 2, type: 'Standard', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
          { id: 7, number: '203', floor: 2, type: 'Deluxe', status: 'CLEAN', updatedAt: new Date().toISOString() },
          { id: 8, number: '204', floor: 2, type: 'Suite', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
          { id: 9, number: '301', floor: 3, type: 'Standard', status: 'CLEAN', updatedAt: new Date().toISOString() },
          { id: 10, number: '302', floor: 3, type: 'Standard', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
          { id: 11, number: '303', floor: 3, type: 'Deluxe', status: 'INSPECTED', updatedAt: new Date(Date.now() - 7200000).toISOString() },
          { id: 12, number: '304', floor: 3, type: 'Suite', status: 'CLEAN', updatedAt: new Date().toISOString() }
        ],
        staff: [
          { id: 1, name: 'Alice Johnson', department: 'Housekeeping', position: 'Supervisor', status: 'Active', email: 'alice.johnson@example.com', phone: '+1234567890', hireDate: '2022-01-15', performance: 92, schedule: '9:00 AM - 5:00 PM' },
          { id: 2, name: 'Bob Smith', department: 'Housekeeping', position: 'Staff', status: 'Active', email: 'bob.smith@example.com', phone: '+1234567891', hireDate: '2022-03-22', performance: 87, schedule: '9:00 AM - 5:00 PM' },
          { id: 3, name: 'Carol Davis', department: 'Housekeeping', position: 'Staff', status: 'Offline', email: 'carol.davis@example.com', phone: '+1234567892', hireDate: '2021-11-05', performance: 95, schedule: '9:00 AM - 5:00 PM' },
          { id: 4, name: 'David Wilson', department: 'Maintenance', position: 'Supervisor', status: 'Active', email: 'david.wilson@example.com', phone: '+1234567893', hireDate: '2020-07-18', performance: 88, schedule: '8:00 AM - 4:00 PM' },
          { id: 5, name: 'Eva Brown', department: 'Maintenance', position: 'Staff', status: 'Break', email: 'eva.brown@example.com', phone: '+1234567894', hireDate: '2023-02-10', performance: 91, schedule: '8:00 AM - 4:00 PM' },
          { id: 6, name: 'Frank Miller', department: 'Food & Beverage', position: 'Manager', status: 'Active', email: 'frank.miller@example.com', phone: '+1234567895', hireDate: '2019-05-30', performance: 96, schedule: '7:00 AM - 3:00 PM' },
          { id: 7, name: 'Grace Lee', department: 'Food & Beverage', position: 'Staff', status: 'Active', email: 'grace.lee@example.com', phone: '+1234567896', hireDate: '2022-09-14', performance: 89, schedule: '7:00 AM - 3:00 PM' },
          { id: 8, name: 'Henry Taylor', department: 'Food & Beverage', position: 'Staff', status: 'Active', email: 'henry.taylor@example.com', phone: '+1234567897', hireDate: '2023-01-20', performance: 93, schedule: '7:00 AM - 3:00 PM' },
          { id: 9, name: 'Ivy Chen', department: 'Food & Beverage', position: 'Staff', status: 'Offline', email: 'ivy.chen@example.com', phone: '+1234567898', hireDate: '2022-12-03', performance: 85, schedule: '7:00 AM - 3:00 PM' },
          { id: 10, name: 'Jack Roberts', department: 'Front Desk', position: 'Receptionist', status: 'Active', email: 'jack.roberts@example.com', phone: '+1234567899', hireDate: '2021-04-12', performance: 94, schedule: '6:00 AM - 2:00 PM' },
          { id: 11, name: 'Kate Williams', department: 'Front Desk', position: 'Manager', status: 'Active', email: 'kate.williams@example.com', phone: '+1234567800', hireDate: '2020-09-08', performance: 97, schedule: '6:00 AM - 2:00 PM' }
        ],
        requests: [
          { id: 1, guestName: 'John Doe', roomNumber: '205', title: 'Extra towels', department: 'Housekeeping', priority: 'MEDIUM', status: 'PENDING', createdAt: new Date(Date.now() - 3600000).toISOString() },
          { id: 2, guestName: 'Jane Smith', roomNumber: '108', title: 'Breakfast order', department: 'Food & Beverage', priority: 'HIGH', status: 'IN_PROGRESS', createdAt: new Date(Date.now() - 7200000).toISOString() },
          { id: 3, guestName: 'Robert Johnson', roomNumber: '210', title: 'Leaky faucet', department: 'Maintenance', priority: 'URGENT', status: 'PENDING', createdAt: new Date(Date.now() - 10800000).toISOString() },
          { id: 4, guestName: 'Emily Wilson', roomNumber: '302', title: 'Late checkout', department: 'Front Desk', priority: 'LOW', status: 'COMPLETED', createdAt: new Date(Date.now() - 14400000).toISOString(), completedAt: new Date(Date.now() - 12600000).toISOString() }
        ],
        inventory: [
          { id: 1, name: 'Luxury Towels', category: 'Linens', quantity: 150, minStock: 100, supplier: 'Premium Linens Co.', price: 12.99, lastOrdered: '2023-08-15' },
          { id: 2, name: 'Hotel Shampoo', category: 'Toiletries', quantity: 85, minStock: 50, supplier: 'Spa Essentials', price: 3.50, lastOrdered: '2023-08-20' },
          { id: 3, name: 'Coffee Beans', category: 'Food & Beverage', quantity: 25, minStock: 20, supplier: 'Gourmet Coffee Supply', price: 18.75, lastOrdered: '2023-09-01' },
          { id: 4, name: 'Cleaning Supplies', category: 'Housekeeping', quantity: 40, minStock: 30, supplier: 'CleanCo', price: 8.99, lastOrdered: '2023-08-25' },
          { id: 5, name: 'Wine Glasses', category: 'Dining', quantity: 75, minStock: 50, supplier: 'Fine Glassware', price: 9.25, lastOrdered: '2023-07-30' }
        ],
        departments: [
          { id: 1, name: 'Housekeeping', head: 'Alice Johnson', staffCount: 5, performance: 92 },
          { id: 2, name: 'Maintenance', head: 'David Wilson', staffCount: 3, performance: 88 },
          { id: 3, name: 'Food & Beverage', head: 'Frank Miller', staffCount: 4, performance: 93 },
          { id: 4, name: 'Front Desk', head: 'Kate Williams', staffCount: 3, performance: 94 }
        ],
        activity: [
          { id: 1, type: 'request', title: 'New guest request', description: 'John Doe - Extra towels (Room 205)', timestamp: new Date().toISOString(), status: 'PENDING' },
          { id: 2, type: 'room', title: 'Room status updated', description: 'Room 302 marked as Clean', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'CLEAN' },
          { id: 3, type: 'request', title: 'Request completed', description: 'Jane Smith - Breakfast order (Room 108)', timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'COMPLETED' },
          { id: 4, type: 'room', title: 'Room status updated', description: 'Room 104 marked as Dirty', timestamp: new Date(Date.now() - 10800000).toISOString(), status: 'DIRTY' },
          { id: 5, type: 'request', title: 'New maintenance request', description: 'Robert Johnson - Leaky faucet (Room 210)', timestamp: new Date(Date.now() - 14400000).toISOString(), status: 'PENDING' },
          { id: 6, type: 'staff', title: 'Staff checked in', description: 'Alice Johnson started shift', timestamp: new Date(Date.now() - 18000000).toISOString(), status: 'ACTIVE' }
        ]
      };
      saveData();
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Save data to file
function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Load data on startup
loadData();

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Hotel Operations Management API' });
});

// Authentication routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // For prototype, we'll be more flexible with login
  // In a real app, you would hash passwords and use proper authentication
  const user = data.users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      token: 'fake-jwt-token'
    });
  } else {
    // For prototype, we'll be more permissive and allow login with any credentials
    // Create a user if one doesn't exist
    res.json({
      user: {
        id: Math.floor(Math.random() * 1000),
        email: email,
        name: email.split('@')[0],
        role: 'ADMIN'
      },
      token: 'fake-jwt-token'
    });
  }
});

// Dashboard routes
app.get('/api/dashboard/stats', (req, res) => {
  const avgResponseTime = ReportingService.calculateAverageResponseTime(data.requests);
  
  const stats = {
    pendingRequests: data.requests.filter(r => r.status === 'PENDING').length,
    occupiedRooms: data.rooms.filter(r => r.status === 'DIRTY' || r.status === 'INSPECTED').length,
    availableRooms: data.rooms.filter(r => r.status === 'CLEAN').length,
    staffActive: data.staff.filter(s => s.status === 'Active').length,
    maintenanceRequests: data.requests.filter(r => r.department === 'Maintenance').length,
    avgResponseTime: avgResponseTime,
    guestSatisfaction: 94,
    revenueToday: 12500,
    occupancyRate: 65
  };
  
  res.json(stats);
});

app.get('/api/dashboard/activity', (req, res) => {
  // Return recent activity (last 10 items)
  const recentActivity = data.activity.slice(-10).reverse();
  res.json(recentActivity);
});

app.get('/api/dashboard/rooms', (req, res) => {
  // Return first 4 rooms for dashboard preview
  res.json(data.rooms.slice(0, 4));
});

app.get('/api/dashboard/requests', (req, res) => {
  res.json(data.requests);
});

app.get('/api/dashboard/performance', (req, res) => {
  const performance = {
    housekeeping: 92,
    maintenance: 87,
    foodService: 95
  };
  
  res.json(performance);
});

// Room routes
app.get('/api/rooms', (req, res) => {
  res.json(data.rooms);
});

app.put('/api/rooms/:id/status', (req, res) => {
  const roomId = parseInt(req.params.id);
  const { status } = req.body;
  
  const room = data.rooms.find(r => r.id === roomId);
  if (room) {
    room.status = status;
    room.updatedAt = new Date().toISOString();
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'room',
      title: 'Room status updated',
      description: `Room ${room.number} marked as ${status}`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(room);
  } else {
    // For prototype, we'll be more permissive and create a room if it doesn't exist
    const newRoom = {
      id: roomId,
      number: roomId.toString(),
      floor: Math.floor(roomId / 100),
      type: 'Standard',
      status: status,
      updatedAt: new Date().toISOString()
    };
    data.rooms.push(newRoom);
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'room',
      title: 'Room status updated',
      description: `Room ${newRoom.number} marked as ${status}`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(newRoom);
  }
});

// Staff routes
app.get('/api/staff', (req, res) => {
  res.json(data.staff);
});

app.put('/api/staff/:id/status', (req, res) => {
  const staffId = parseInt(req.params.id);
  const { status } = req.body;
  
  const staff = data.staff.find(s => s.id === staffId);
  if (staff) {
    staff.status = status;
    saveData();
    res.json(staff);
  } else {
    // For prototype, we'll be more permissive and create a staff member if not found
    const newStaff = {
      id: staffId,
      name: `Staff ${staffId}`,
      department: 'General',
      position: 'Staff',
      status: status,
      email: `staff${staffId}@hotelops.com`,
      phone: '+1234567890',
      hireDate: new Date().toISOString(),
      performance: 85,
      schedule: '9:00 AM - 5:00 PM'
    };
    data.staff.push(newStaff);
    saveData();
    res.json(newStaff);
  }
});

// Request routes
app.get('/api/requests', (req, res) => {
  res.json(data.requests);
});

app.put('/api/requests/:id/status', (req, res) => {
  const requestId = parseInt(req.params.id);
  const { status } = req.body;
  
  const request = data.requests.find(r => r.id === requestId);
  if (request) {
    request.status = status;
    
    // If request is being completed, add completedAt timestamp
    if (status === 'COMPLETED') {
      request.completedAt = new Date().toISOString();
    }
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'request',
      title: `Request ${status.toLowerCase()}`,
      description: `${request.guestName} - ${request.title} (${request.department})`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(request);
  } else {
    // For prototype, we'll be more permissive and create a request if not found
    const newRequest = {
      id: requestId,
      guestName: 'Guest ' + requestId,
      roomNumber: '100',
      title: 'Sample Request',
      department: 'General',
      priority: 'MEDIUM',
      status: status,
      createdAt: new Date().toISOString()
    };
    data.requests.push(newRequest);
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'request',
      title: `Request ${status.toLowerCase()}`,
      description: `${newRequest.guestName} - ${newRequest.title} (${newRequest.department})`,
      timestamp: new Date().toISOString(),
      status: status
    };
    data.activity.push(activity);
    
    saveData();
    res.json(newRequest);
  }
});

// Enhanced request management routes
app.get('/api/requests', (req, res) => {
  res.json(data.requests);
});

app.post('/api/requests', (req, res) => {
  const { guestName, roomNumber, title, description } = req.body;
  
  // Auto-route the request to the appropriate department
  const department = RequestRoutingService.routeRequest(title, description);
  const priority = RequestRoutingService.getPriority(title, description);
  const estimatedResponseTime = RequestRoutingService.getEstimatedResponseTime(department, priority);
  
  // Create new request
  const newRequest = {
    id: data.requests.length > 0 ? Math.max(...data.requests.map(r => r.id)) + 1 : 1,
    guestName,
    roomNumber,
    title,
    description: description || '',
    department,
    priority,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    estimatedResponseTime // in minutes
  };
  
  data.requests.push(newRequest);
  
  // Add activity log
  const activity = {
    id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
    type: 'request',
    title: 'New guest request',
    description: `${guestName} - ${title} (${department})`,
    timestamp: new Date().toISOString(),
    status: 'PENDING'
  };
  data.activity.push(activity);
  
  // Send push notifications to relevant department
  const notifications = NotificationService.notifyDepartment(
    department, 
    data.staff, 
    `New request: ${title} for room ${roomNumber}`
  );
  
  // Add notification activities
  notifications.forEach(notification => {
    data.activity.push(notification);
  });
  
  saveData();
  res.json(newRequest);
});

app.put('/api/requests/:id/assign', (req, res) => {
  const requestId = parseInt(req.params.id);
  const { staffId } = req.body;
  
  const request = data.requests.find(r => r.id === requestId);
  const staffMember = data.staff.find(s => s.id === staffId);
  
  if (request && staffMember) {
    request.assignedTo = staffId;
    request.status = 'IN_PROGRESS';
    request.assignedAt = new Date().toISOString();
    
    // Add activity log
    const activity = {
      id: data.activity.length > 0 ? Math.max(...data.activity.map(a => a.id)) + 1 : 1,
      type: 'request',
      title: 'Request assigned',
      description: `${request.guestName} - ${request.title} assigned to ${staffMember.name}`,
      timestamp: new Date().toISOString(),
      status: 'IN_PROGRESS'
    };
    data.activity.push(activity);
    
    // Send notification to assigned staff
    const notification = NotificationService.notifyStaffById(
      staffId, 
      data.staff, 
      `You have been assigned request: ${request.title} for room ${request.roomNumber}`
    );
    
    if (notification) {
      data.activity.push(notification);
    }
    
    saveData();
    res.json(request);
  } else {
    res.status(404).json({ error: 'Request or staff member not found' });
  }
});

// Reporting routes
app.get('/api/reports/request-metrics', (req, res) => {
  const metrics = {
    totalRequests: data.requests.length,
    avgResponseTime: ReportingService.calculateAverageResponseTime(data.requests),
    requestsByDepartment: ReportingService.getRequestVolumeByDepartment(data.requests),
    requestsByStatus: ReportingService.getRequestVolumeByStatus(data.requests),
    peakRequestTimes: ReportingService.getRequestTrends(data.requests)
  };
  
  res.json(metrics);
});

app.get('/api/reports/staff-performance', (req, res) => {
  const performanceMetrics = ReportingService.getStaffPerformanceMetrics(data.staff, data.requests);
  res.json(performanceMetrics);
});

// Inventory routes
app.get('/api/inventory', (req, res) => {
  res.json(data.inventory);
});

app.put('/api/inventory/:id/quantity', (req, res) => {
  const inventoryId = parseInt(req.params.id);
  const { quantity } = req.body;
  
  const item = data.inventory.find(i => i.id === inventoryId);
  if (item) {
    item.quantity = quantity;
    saveData();
    res.json(item);
  } else {
    // For prototype, we'll be more permissive and create an item if not found
    const newItem = {
      id: inventoryId,
      name: 'Item ' + inventoryId,
      category: 'General',
      quantity: quantity,
      minStock: 10,
      supplier: 'Supplier',
      price: 10.00,
      lastOrdered: new Date().toISOString()
    };
    data.inventory.push(newItem);
    saveData();
    res.json(newItem);
  }
});

// Department routes
app.get('/api/departments', (req, res) => {
  res.json(data.departments);
});

// Serve static files from the frontend build
// Handle both local development and Vercel deployment paths
const frontendPath = path.join(__dirname, 'frontend/out');

// Always serve static files from the frontend build directory
app.use(express.static(frontendPath));

// Serve frontend for all other routes (this should be last)
app.get('*', (req, res) => {
  // For static export with Next.js, we should serve index.html for all routes
  // to let client-side routing handle the navigation
  const indexPath = path.join(frontendPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Fallback to API response if frontend files are not found
    res.json({ 
      message: 'Hotel Operations Management API', 
      version: '1.0.0',
      description: 'This is the backend API for HotelOps. For the frontend, please visit the deployed frontend URL.',
      available_endpoints: [
        'GET /api/dashboard/stats',
        'GET /api/dashboard/activity',
        'GET /api/rooms',
        'PUT /api/rooms/:id/status',
        'GET /api/staff',
        'PUT /api/staff/:id/status',
        'GET /api/requests',
        'POST /api/requests',
        'PUT /api/requests/:id/status',
        'PUT /api/requests/:id/assign',
        'GET /api/reports/request-metrics',
        'GET /api/reports/staff-performance',
        'GET /api/inventory',
        'PUT /api/inventory/:id/quantity',
        'GET /api/departments'
      ]
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Hotel Operations Management server running on http://localhost:${PORT}`);
});