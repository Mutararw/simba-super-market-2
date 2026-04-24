# Deployment

## Backend on Render

Create a Render Web Service from this repo with:

- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`

Set these environment variables in Render:

- `DATABASE_URL=postgresql://neondb_owner:...@ep-noisy-shadow-akygwnj4-pooler.c-3.us-west-2.aws.neon.tech/simba-prod-db?sslmode=verify-full&channel_binding=require`
- `BETTER_AUTH_SECRET=<generate-a-long-random-secret>`
- `BETTER_AUTH_URL=https://simba-backend.onrender.com`
- `CLIENT_URL=https://your-frontend-domain.vercel.app`
- `TRUSTED_ORIGINS=https://your-frontend-domain.vercel.app`

If you later add a custom frontend domain, update both `CLIENT_URL` and `TRUSTED_ORIGINS`.

Generate `BETTER_AUTH_SECRET` with PowerShell:

```powershell
[Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 }))
```

## Frontend on Vercel

Import the repo into Vercel and set:

- Root Directory: `client`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

Set this environment variable in Vercel:

- `VITE_API_BASE_URL=https://simba-backend.onrender.com/api`

## First Production Bring-up

1. Deploy the backend on Render.
2. Deploy the frontend on Vercel.
3. Copy the real Vercel frontend URL.
4. Update Render:
   - `CLIENT_URL=https://that-vercel-url`
   - `TRUSTED_ORIGINS=https://that-vercel-url`
5. Redeploy the Render backend.
6. Open the frontend and verify:
   - sign up
   - sign in
   - products load from backend
   - checkout creates an order

## Optional Next Step

If the database is empty, run this from the backend service or locally inside `server/`:

```bash
npm run seed:products
```
