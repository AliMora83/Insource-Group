# InSource Group — Deployment Guide

> **Strategy:** Docker (Nginx) on Hostinger VPS · DNS via AfriHost cPanel  
> **VPS IP:** `147.93.18.188`  
> **VPS OS:** Ubuntu 24.04 (Docker pre-installed)  
> **Domain DNS:** Managed in AfriHost cPanel → Zone Editor

---

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        TRAFFIC FLOW                         │
│                                                             │
│   Browser → insourcegroup.co.za                             │
│       │                                                     │
│       ▼                                                     │
│   AfriHost DNS (Zone Editor)                                │
│   A Record → 147.93.18.188  ──────────────────────────┐    │
│                                                        │    │
│                                               Hostinger VPS │
│                                               Ubuntu 24.04  │
│                                               Docker        │
│                                               Nginx         │
│                                               React App     │
└─────────────────────────────────────────────────────────────┘
```

---

## Table of Contents

1. [Local — Build the React App](#1-local--build-the-react-app)
2. [Local — Create the Dockerfile](#2-local--create-the-dockerfile)
3. [Local — Create Nginx Config](#3-local--create-nginx-config)
4. [Local — Test with Docker](#4-local--test-with-docker)
5. [VPS — First-Time Server Setup](#5-vps--first-time-server-setup)
6. [Deploy — Push Code to VPS](#6-deploy--push-code-to-vps)
7. [VPS — Run the Docker Container](#7-vps--run-the-docker-container)
8. [SSL — HTTPS with Let's Encrypt](#8-ssl--https-with-lets-encrypt)
9. [DNS — Point AfriHost to Hostinger VPS](#9-dns--point-afrihost-to-hostinger-vps)
10. [Updates — Redeploying New Versions](#10-updates--redeploying-new-versions)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Local — Build the React App

On your local machine, inside the project folder:

```bash
# Make sure you're in the project root
cd Insource-Group

# Install dependencies (if not already done)
npm install

# Build the production bundle
npm run build
```

This creates a `dist/` folder containing optimised static HTML, CSS, and JS files — this is what gets served.

> **Before building**, make sure you've:
> - Replaced base64 hero images with imported files (see `InSource-create.md` Section 7)
> - Added your logo to `src/assets/logo/`
> - Verified all content and contact details

---

## 2. Local — Create the Dockerfile

In the **root of your project**, create a file called `Dockerfile` (no extension):

```dockerfile
# ── Stage 1: Build ────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: Serve ────────────────────────────────────────
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Why multi-stage?** The first stage builds the app using Node.js. The second stage is a tiny Nginx image — your final container has no Node.js in it, keeping it small and secure.

---

## 3. Local — Create Nginx Config

In the **root of your project**, create a file called `nginx.conf`:

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression for faster load times
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_min_length 1000;

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # React Router support — serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

---

## 4. Local — Test with Docker

Before pushing to the VPS, test the container locally:

```bash
# Build the Docker image
docker build -t insource-group .

# Run it locally on port 3000
docker run -d -p 3000:80 --name insource-test insource-group

# Open in browser
open http://localhost:3000
```

Check everything looks correct, then clean up:

```bash
docker stop insource-test
docker rm insource-test
```

---

## 5. VPS — First-Time Server Setup

SSH into your Hostinger VPS:

```bash
ssh root@147.93.18.188
```

> Get your root password from Hostinger hPanel → VPS → your server → **Root password → Change** (or use the one you set).

### Verify Docker is running

```bash
docker --version
# Should show: Docker version 24.x.x or later

docker ps
# Should show an empty table (no containers yet)
```

### Create a directory for the app

```bash
mkdir -p /var/www/insource-group
```

### Install Git (if not present)

```bash
apt update && apt install -y git
```

---

## 6. Deploy — Push Code to VPS

You have two options. **Option A (GitHub pull)** is recommended.

---

### Option A — Pull from GitHub (Recommended)

#### On your VPS:

```bash
cd /var/www/insource-group

# Clone the repo
git clone https://github.com/AliMora83/Insource-Group.git .
```

For future updates, just run:

```bash
cd /var/www/insource-group
git pull origin main
```

---

### Option B — Copy files directly via SCP

If you prefer to upload the built files without Git:

```bash
# Run this on your LOCAL machine (not the VPS)
scp -r ./* root@147.93.18.188:/var/www/insource-group/
```

Or use rsync for faster incremental uploads:

```bash
rsync -avz --exclude='node_modules' --exclude='.git' \
  ./ root@147.93.18.188:/var/www/insource-group/
```

---

## 7. VPS — Run the Docker Container

SSH into the VPS and navigate to the app directory:

```bash
ssh root@147.93.18.188
cd /var/www/insource-group
```

### Build and start the container

```bash
# Build the Docker image on the VPS
docker build -t insource-group .

# Run the container
# -d = detached (runs in background)
# -p 80:80 = map VPS port 80 to container port 80
# --restart always = auto-restart on reboot or crash
docker run -d \
  -p 80:80 \
  --name insource-group \
  --restart always \
  insource-group
```

### Verify it's running

```bash
docker ps
# You should see insource-group listed with status "Up"

# Test it responds
curl http://localhost
# Should return HTML
```

Your site is now live at `http://147.93.18.188` — you can test this in a browser right now before setting up the domain.

---

## 8. SSL — HTTPS with Let's Encrypt

Once DNS is pointing to your VPS (Step 9), add free SSL with Certbot.

### Install Certbot on the VPS

```bash
apt update
apt install -y certbot python3-certbot-nginx
```

### Stop the Docker container temporarily

```bash
docker stop insource-group
docker rm insource-group
```

### Obtain the SSL certificate

```bash
# Replace with your actual domain
certbot certonly --standalone -d insourcegroup.co.za -d www.insourcegroup.co.za
```

Follow the prompts — enter your email and agree to terms.

Certificates will be saved to:
```
/etc/letsencrypt/live/insourcegroup.co.za/fullchain.pem
/etc/letsencrypt/live/insourcegroup.co.za/privkey.pem
```

### Update nginx.conf for HTTPS

Replace the contents of `nginx.conf` with:

```nginx
server {
    listen 80;
    server_name insourcegroup.co.za www.insourcegroup.co.za;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name insourcegroup.co.za www.insourcegroup.co.za;

    ssl_certificate     /etc/letsencrypt/live/insourcegroup.co.za/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/insourcegroup.co.za/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_min_length 1000;

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

### Rebuild and run with SSL certificates mounted

```bash
docker build -t insource-group .

docker run -d \
  -p 80:80 \
  -p 443:443 \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  --name insource-group \
  --restart always \
  insource-group
```

### Auto-renew SSL (certificates expire every 90 days)

```bash
# Test renewal works
certbot renew --dry-run

# Add a cron job to auto-renew monthly
crontab -e
```

Add this line at the bottom of the crontab:

```
0 3 1 * * certbot renew --quiet && docker restart insource-group
```

---

## 9. DNS — Point AfriHost to Hostinger VPS

This is done entirely in **AfriHost cPanel → Zone Editor**.

### Step-by-step

1. Log into **AfriHost cPanel**
2. Scroll to the **Domains** section
3. Click **Zone Editor**
4. Find your domain (e.g. `insourcegroup.co.za`) → click **Manage**

### Records to add / update

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `A` | `insourcegroup.co.za` | `147.93.18.188` | 3600 |
| `A` | `www.insourcegroup.co.za` | `147.93.18.188` | 3600 |

> **If an A record already exists** pointing to the AfriHost shared IP (`154.0.163.158`), **edit it** rather than adding a new one — there should only be one A record per subdomain.

### How to edit an existing A record

1. In Zone Editor, find the row where **Type = A** and **Name = insourcegroup.co.za**
2. Click **Edit**
3. Change the **Address** from `154.0.163.158` → `147.93.18.188`
4. Click **Save Record**
5. Repeat for the `www` record

### DNS propagation

DNS changes take **15 minutes to 48 hours** to propagate globally. You can check progress at:

- [https://dnschecker.org](https://dnschecker.org) — paste your domain and watch A records update worldwide
- [https://whatsmydns.net](https://whatsmydns.net) — alternative checker

> **During propagation**, some visitors may still see the old AfriHost page. This is normal and resolves on its own.

---

## 10. Updates — Redeploying New Versions

When you make changes to the website, redeploy with these commands on the VPS:

```bash
ssh root@147.93.18.188
cd /var/www/insource-group

# Pull latest code from GitHub
git pull origin main

# Rebuild the Docker image
docker build -t insource-group .

# Stop and remove the old container
docker stop insource-group
docker rm insource-group

# Start the new container
docker run -d \
  -p 80:80 \
  -p 443:443 \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  --name insource-group \
  --restart always \
  insource-group

echo "✅ Deployment complete"
```

### Optional — One-command deploy script

Create a file `/var/www/insource-group/deploy.sh` on the VPS:

```bash
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
```

Make it executable:

```bash
chmod +x /var/www/insource-group/deploy.sh
```

From now on, deploying updates is just:

```bash
ssh root@147.93.18.188 "cd /var/www/insource-group && bash deploy.sh"
```

---

## 11. Troubleshooting

### Site not loading after DNS change

```bash
# Check DNS has propagated
nslookup insourcegroup.co.za
# Should return 147.93.18.188

# Check container is running on VPS
ssh root@147.93.18.188 "docker ps"

# Check port 80 is open
ssh root@147.93.18.188 "curl -I http://localhost"
```

### Container won't start

```bash
# View container logs
docker logs insource-group

# Check if port 80 is already in use
ss -tlnp | grep :80
```

### SSL certificate error

```bash
# Check certificate validity
certbot certificates

# Force renewal if needed
certbot renew --force-renewal
docker restart insource-group
```

### Out of disk space

```bash
# Check disk usage
df -h

# Clean up unused Docker images/containers
docker system prune -af
```

### Firewall — ports not accessible

Hostinger VPS may block ports by default. Open ports 80 and 443:

```bash
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw enable
ufw status
```

---

## Quick Reference

| Task | Command |
|------|---------|
| SSH into VPS | `ssh root@147.93.18.188` |
| View running containers | `docker ps` |
| View container logs | `docker logs insource-group` |
| Restart container | `docker restart insource-group` |
| Stop container | `docker stop insource-group` |
| Full redeploy | `bash /var/www/insource-group/deploy.sh` |
| Check SSL cert | `certbot certificates` |
| Check disk space | `df -h` |

---

## Files to Add to the Repository

Before your first deploy, make sure these files are committed to GitHub:

```
Insource-Group/
├── Dockerfile          ← Docker build instructions
├── nginx.conf          ← Nginx server config
├── deploy.sh           ← One-command deploy script
└── .dockerignore       ← Speeds up Docker builds
```

Create `.dockerignore` in your project root:

```
node_modules
.git
.gitignore
*.md
.env
dist
.DS_Store
```

---

*InSource Group · Hosted on Hostinger VPS · DNS via AfriHost cPanel · 2025*
