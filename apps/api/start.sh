#!/bin/bash

# Exit on any error
set -e

echo "Starting Hey API on Render..."

# Set production environment
export NODE_ENV=production

# Run database migrations
echo "Running database migrations..."
pnpm prisma:migrate:deploy

# Start the application
echo "Starting application..."
pnpm start:prod
