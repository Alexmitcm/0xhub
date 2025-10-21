# Render Deployment Guide for Hey API

This guide will help you deploy your Hey API to Render.com.

## Prerequisites

1. A Render.com account
2. Your GitHub repository connected to Render
3. Environment variables configured

## Deployment Steps

### 1. Create a New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `https://github.com/Alexmitcm/0xhub.git`
4. Select the repository and click "Connect"

### 2. Configure the Service

**Basic Settings:**

- **Name**: `hey-api`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `master`

**Build & Deploy:**

- **Build Command**:

  ```bash
  cd apps/api && pnpm install --frozen-lockfile && pnpm run build
  ```

- **Start Command**:

  ```bash
  cd apps/api && pnpm run start:prod
  ```

**Advanced Settings:**

- **Health Check Path**: `/ping`
- **Auto-Deploy**: `Yes` (recommended)

### 3. Set Environment Variables

In the Render dashboard, go to your service → Environment tab and add:

#### Required Environment Variables

```
NODE_ENV=production
PORT=10000
DATABASE_URL=<your_postgres_connection_string>
LENS_DATABASE_URL=<your_postgres_connection_string>
DIRECT_URL=<your_postgres_connection_string>
SUPABASE_URL=<your_supabase_url>
SUPABASE_KEY=<your_supabase_key>
PRIVATE_KEY=<your_private_key>
SHARED_SECRET=<your_shared_secret>
JWT_SECRET=<your_jwt_secret>
REFERRAL_CONTRACT_ADDRESS=<contract_address>
BALANCED_GAME_VAULT_ADDRESS=<contract_address>
UNBALANCED_GAME_VAULT_ADDRESS=<contract_address>
VIP_VAULT_ADDRESS=<contract_address>
USDT_CONTRACT_ADDRESS=<contract_address>
INFURA_URL=<your_infura_url>
INFURA_WS_URL=<your_infura_ws_url>
PGPASSWORD=<your_postgres_password>
REDIS_URL=<your_redis_connection_string>
```

#### Optional Environment Variables

```
NEXT_PUBLIC_LENS_NETWORK=testnet
LENS_API_URL=https://api-mumbai.lens.dev
DEFAULT_LENS_HANDLE=nftgamer.lens
```

### 4. Create Database Services

#### PostgreSQL Database

1. Go to Render Dashboard → "New +" → "PostgreSQL"
2. Name: `hey-database`
3. Database: `hey_main`
4. User: `hey_user`
5. Plan: `Starter` (or higher for production)

#### Redis Database

1. Go to Render Dashboard → "New +" → "Redis"
2. Name: `hey-redis`
3. Plan: `Starter` (or higher for production)

### 5. Update Environment Variables with Database URLs

After creating the databases, update your service environment variables:

- `DATABASE_URL`: Use the connection string from PostgreSQL service
- `LENS_DATABASE_URL`: Same as DATABASE_URL
- `DIRECT_URL`: Same as DATABASE_URL
- `REDIS_URL`: Use the connection string from Redis service

### 6. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Monitor the build logs for any issues
4. Once deployed, your API will be available at: `https://hey-api.onrender.com`

## Alternative: Using render.yaml

If you prefer infrastructure as code, you can use the included `render.yaml` file:

1. Go to Render Dashboard → "New +" → "Blueprint"
2. Connect your GitHub repository
3. Render will automatically detect and use the `render.yaml` configuration

## Health Checks

Your API includes several health check endpoints:

- `/ping` - Basic ping endpoint
- `/health` - Health check with database connectivity
- `/health/ready` - Readiness check
- `/health/live` - Liveness check

## Monitoring

- **Logs**: Available in the Render dashboard under "Logs" tab
- **Metrics**: Basic metrics available in the dashboard
- **Uptime**: Monitor service uptime and performance

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that all dependencies are properly installed
   - Verify TypeScript compilation passes
   - Ensure Prisma schema is valid

2. **Database Connection Issues**:
   - Verify DATABASE_URL is correctly set
   - Check database service is running
   - Ensure database migrations have run

3. **Memory Issues**:
   - Consider upgrading to a higher plan
   - Optimize your application code
   - Check for memory leaks

4. **Environment Variables**:
   - Ensure all required variables are set
   - Check for typos in variable names
   - Verify sensitive values are properly configured

## Production Considerations

1. **Scaling**: Consider upgrading to higher plans for production
2. **Security**: Use strong, unique secrets and keys
3. **Monitoring**: Set up proper logging and monitoring
4. **Backups**: Ensure database backups are configured
5. **SSL**: Render provides automatic SSL certificates

## Support

- Render Documentation: <https://render.com/docs>
- Render Support: <https://render.com/support>
- Your API Documentation: `https://your-app.onrender.com/docs`
