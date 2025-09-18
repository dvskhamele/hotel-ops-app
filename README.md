# HotelOps - Hotel Operations Management System

A beautiful, fully functional hotel operations management system built with Next.js and Vercel.

## Features

- Real-time dashboard with hotel metrics
- Room management system
- Staff scheduling and task assignment
- Guest request tracking
- Inventory management
- Department coordination
- Analytics and reporting
- Mobile-responsive design

## Prerequisites

1. Node.js (v14 or higher)
2. A Vercel account
3. A modern web browser

## Getting Started

### Automated Deployment with Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up/log in
   - Create a new project from your GitHub repository

2. **Configure Environment Variables**
   - In your Vercel project settings, go to "Environment Variables"
   - Add any required variables (e.g., API keys, database URLs)

3. **Set Build Settings**
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy to Vercel**
   - Push your code to GitHub and import the project to Vercel
   - Or use Vercel CLI: `vercel --prod`

## Architecture

- **Frontend**: Next.js with React (App Router)
- **Backend**: Vercel Serverless Functions
- **Database**: JSON files (simulated)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Customization

1. Modify the API routes in `backend/src/` to change API responses
2. Update the UI components in `frontend/src/components/` to change the look and feel
3. Add new pages by creating files in `frontend/src/app/`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.