#!/bin/bash

# SSL Setup script for VPS
DOMAIN="your-domain.com"
EMAIL="your-email@example.com"

echo "🔒 Setting up SSL for $DOMAIN..."

# Install certbot
sudo apt update
sudo apt install -y certbot

# Get SSL certificate
sudo certbot certonly --standalone -d $DOMAIN --email $EMAIL --agree-tos --non-interactive

# Create SSL directory
mkdir -p ssl

# Copy certificates
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/

# Set permissions
sudo chown $USER:$USER ssl/*

echo "✅ SSL setup completed!"
echo "📝 Don't forget to update nginx.conf with SSL configuration"
