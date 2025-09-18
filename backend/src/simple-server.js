const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/out')));

// Simple data
let data = {
  rooms: [
    { id: 1, number: '101', type: 'Standard', status: 'CLEAN' },
    { id: 2, number: '102', type: 'Standard', status: 'DIRTY' },
    { id: 3, number: '103', type: 'Deluxe', status: 'INSPECTED' }
  ],
  requests: [
    { id: 1, title: 'Extra Towels', status: 'PENDING' },
    { id: 2, title: 'Leaky Faucet', status: 'IN_PROGRESS' }
  ]
};

// API routes
app.get('/api/rooms', (req, res) => {
  res.json(data.rooms);
});

app.get('/api/requests', (req, res) => {
  res.json(data.requests);
});

// Serve frontend for all other routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/out/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/out/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});