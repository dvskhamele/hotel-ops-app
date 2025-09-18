# Hotel Operations Management System

A comprehensive hotel management system with features for room status tracking, guest request management, staff scheduling, and analytics.

## Features

- **Dashboard Analytics**: Real-time insights into hotel performance
- **Room Management**: Track room status, housekeeping tasks, and maintenance requests
- **Guest Request System**: Streamline guest requests with priority management
- **Staff Management**: Track staff performance, schedules, and department assignments
- **Inventory Tracking**: Monitor hotel inventory levels with automated alerts
- **Reporting & Analytics**: Generate detailed reports on occupancy, revenue, and staff performance

## Pricing

- **Template**: $0 - Basic frontend template with core UI components
- **Backend**: $5000 - Complete backend API with database integration
- **Full Application**: $10,000 - Complete hotel management system with frontend and backend

## Technologies

- **Frontend**: Next.js 13+, TypeScript, Tailwind CSS, React
- **Backend**: Node.js, Express
- **Database**: MongoDB (in full version)
- **Authentication**: JWT
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   cd hotel-ops-app
   npm install
   ```

3. Build the frontend:
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser to http://localhost:3001

## Deployment

### Vercel Deployment

1. Push the code to a GitHub repository
2. Connect the repository to Vercel
3. Vercel will automatically detect the project and deploy it

### Environment Variables

For production deployment, set the following environment variables:

- `PORT` - Port to run the server on (default: 3001)
- `NODE_ENV` - Environment (development/production)

## Development

To run in development mode:

```bash
npm run dev
```

This will start both the frontend and backend servers.

## License

MIT License