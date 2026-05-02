#!/bin/bash
set -e

echo "🔄 Pulling latest code..."
git pull origin main

echo "🔨 Building Docker image..."
docker build -t insource-group .

echo "🛑 Stopping old container..."
docker stop insource-group || true
docker rm insource-group || true

echo "🚀 Starting new container..."
docker run -d \
  -p 80:80 \
  -p 443:443 \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  --name insource-group \
  --restart always \
  insource-group

echo "🧹 Cleaning up old images..."
docker image prune -f

echo "✅ Deployment complete — $(date)"
