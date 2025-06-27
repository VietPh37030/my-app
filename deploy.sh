#!/bin/bash

# Deploy script for VPS
echo "🚀 Starting deployment..."

# Pull latest code
git pull origin main

# Build and deploy with Docker Compose
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Clean up old images
docker image prune -f

echo "✅ Deployment completed!"
echo "🌐 App is running on http://localhost"

# Check if app is running
sleep 5
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "✅ Health check passed!"
else
    echo "❌ Health check failed!"
    exit 1
fi
