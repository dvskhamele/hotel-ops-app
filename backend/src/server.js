const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { config } = require('./config');
const HotelService = require('./services/hotelService');

const app = express();
const PORT = config.port;

// Middleware
app.use(cors(config.cors));
app.use(express.json());

// Initialize service
const hotelService = new HotelService();

// Initialize data
async function initialize() {
  await hotelService.init();
}

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Hotel Operations Management API' });
});

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await hotelService.authenticate(email, password);
    
    if (result.success) {
      res.json({
        user: result.user,
        token: 'fake-jwt-token'
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dashboard routes
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const stats = await hotelService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/dashboard/activity', async (req, res) => {
  try {
    const activity = await hotelService.getRecentActivity();
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/dashboard/rooms', async (req, res) => {
  try {
    const data = await hotelService.db.getData();
    res.json(data.rooms.slice(0, 4));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/dashboard/requests', async (req, res) => {
  try {
    const data = await hotelService.db.getData();
    res.json(data.requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/dashboard/performance', async (req, res) => {
  try {
    const performance = {
      housekeeping: 92,
      maintenance: 87,
      foodService: 95
    };
    res.json(performance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Room routes
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await hotelService.getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/rooms/:id/status', async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);
    const { status } = req.body;
    const room = await hotelService.updateRoomStatus(roomId, status);
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Staff routes
app.get('/api/staff', async (req, res) => {
  try {
    const staff = await hotelService.getAllStaff();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/staff/:id/status', async (req, res) => {
  try {
    const staffId = parseInt(req.params.id);
    const { status } = req.body;
    const staff = await hotelService.updateStaffStatus(staffId, status);
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Request routes
app.get('/api/requests', async (req, res) => {
  try {
    const requests = await hotelService.getAllRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/requests/:id/status', async (req, res) => {
  try {
    const requestId = parseInt(req.params.id);
    const { status } = req.body;
    const request = await hotelService.updateRequestStatus(requestId, status);
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inventory routes
app.get('/api/inventory', async (req, res) => {
  try {
    const inventory = await hotelService.getAllInventory();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/inventory/:id/quantity', async (req, res) => {
  try {
    const inventoryId = parseInt(req.params.id);
    const { quantity } = req.body;
    const item = await hotelService.updateInventoryQuantity(inventoryId, quantity);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Department routes
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await hotelService.getAllDepartments();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize and start server
initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Hotel Ops backend server running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Failed to initialize server:', error);
  process.exit(1);
});