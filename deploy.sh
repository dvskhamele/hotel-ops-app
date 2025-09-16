#!/bin/bash

# HotelOps Deployment Script for Netlify

echo "Preparing HotelOps application for Netlify deployment..."

# Create a deployment package
echo "Creating deployment package..."

# Make sure we're in the right directory
cd /Users/test/startups/hotelmanagement/hotel-ops-app

# Create a temporary directory for deployment
mkdir -p deployment
cp -r frontend deployment/
cp -r netlify deployment/
cp netlify.toml deployment/
cp README.md deployment/
cp package.json deployment/

# Create a simple package.json for the root
cat > deployment/package.json << EOF
{
  "name": "hotel-ops-app-deployment",
  "version": "1.0.0",
  "description": "Hotel Operations Management System for Netlify Deployment",
  "scripts": {
    "build": "cd frontend && npm run build"
  },
  "keywords": [
    "hotel",
    "management",
    "operations"
  ],
  "author": "Hotel Operations Team",
  "license": "MIT"
}
EOF

echo "Deployment package created successfully!"
echo ""
echo "To deploy to Netlify:"
echo "1. Create a new GitHub repository"
echo "2. Push the contents of the 'deployment' directory to your repository"
echo "3. Connect Netlify to your repository"
echo "4. Set build command to: cd frontend && npm run build"
echo "5. Set publish directory to: frontend/.next"
echo "6. Deploy!"

echo ""
echo "Your application is ready for deployment!"