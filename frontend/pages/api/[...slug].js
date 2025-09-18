// Next.js API route that uses the backend functionality
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import the backend handler
let backendHandler;

try {
  // Try to import the backend handler
  const backendModule = require('../../backend/src/vercelHandler.js');
  backendHandler = backendModule.default || backendModule;
} catch (error) {
  console.error('Failed to import backend handler:', error);
  
  // Fallback handler for when backend is not available
  backendHandler = async (req, res) => {
    res.status(200).json({ 
      message: 'API endpoint working', 
      mock: true,
      endpoints: [
        '/api/rooms',
        '/api/staff',
        '/api/requests',
        '/api/inventory',
        '/api/departments'
      ]
    });
  };
}

export default async function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    // Call the backend handler
    return await backendHandler(req, res);
  } catch (error) {
    console.error('API Handler Error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

// Configure for Vercel
export const config = {
  api: {
    externalResolver: true,
  },
};