# Hotel Operations Management System

A beautiful, fully functional hotel operations management system built with Next.js and Netlify Edge Functions.

## Features

- Dashboard with key metrics and visualizations
- Room status management
- Guest request tracking
- Staff management
- Inventory tracking
- Department coordination
- Analytics and reporting

## Deployment Instructions

### Prerequisites

1. A GitHub account
2. A Netlify account

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: HotelOps application"
   git branch -M main
   git remote add origin https://github.com/yourusername/hotel-ops-app.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up/log in
   - Click "Add new site" → "Import an existing project"
   - Connect to your GitHub account
   - Select your hotel-ops-app repository
   - Configure the deployment settings:
     - **Build command**: `cd frontend && npm run build`
     - **Publish directory**: `frontend/.next`
   - Click "Deploy site"

3. **Wait for Deployment**
   - Netlify will automatically build and deploy your site
   - This typically takes 2-5 minutes
   - Your site will be available at a URL like `https://your-site-name.netlify.app`

### How It Works

This application uses:
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Netlify Edge Functions (serverless)
- **Data**: In-memory mock data that persists in localStorage
- **Authentication**: Mock authentication for demo purposes

All data is stored in the browser's localStorage, so no database is required. This makes the application perfect for demos and prototypes.

### Customization

To customize the application:
1. Modify the Edge Functions in `netlify/edge-functions/` to change API responses
2. Update the frontend components in `frontend/src/app/` to change the UI
3. Modify the mock data in the Edge Functions to simulate different scenarios

### Support

For any issues or questions, please open an issue on the GitHub repository.