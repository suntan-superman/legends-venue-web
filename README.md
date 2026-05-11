# Legends Lounge & Events Center

Public venue website for Legends Lounge & Events Center in Bakersfield, built as a standalone Vite React app that uses the shared Merxus AI restaurant booking backend.

## Local Setup

```powershell
npm install
npm run dev
```

Create a `.env` from `.env.example` and point `VITE_MERXUS_API_BASE_URL` to the deployed or local Merxus AI backend.

Use the same Syncfusion environment variable as the Merxus AI web app:

```txt
VITE_SYNCFUSION_KEY=<existing Syncfusion key>
```

The app also accepts `VITE_SYNCFUSION_LICENSE_KEY` for compatibility, but `VITE_SYNCFUSION_KEY` is preferred.

## Backend Contract

The site uses public, privacy-safe Merxus AI endpoints:

- `GET /public/venues/:tenantSlug/config`
- `GET /public/venues/:tenantSlug/availability`
- `POST /public/venues/:tenantSlug/event-requests`
- `GET /api/public/venues/:tenantSlug/config`
- `GET /api/public/venues/:tenantSlug/availability`
- `POST /api/public/venues/:tenantSlug/event-requests`

The public frontend does not write directly to Firebase and does not expose private booking details.

The frontend uses the `/api/public/...` endpoints by default. The non-`/api` paths are backend aliases for compatibility.

The backend needs to resolve the public tenant slug `legends` to the real Merxus tenant. The simplest deployment setting is:

```txt
LEGENDS_TENANT_ID=<existing Merxus restaurant tenant id>
```

You can also store a Firestore `publicVenueConfigs/legends` document with `tenantId`, public name, phone, address, and `publicCalendarVisibility`.

## Deployment

Netlify build command: `npm run build`

Publish directory: `dist`

Set these Netlify environment variables:

- `VITE_MERXUS_API_BASE_URL`
- `VITE_TENANT_SLUG`
- `VITE_SYNCFUSION_KEY`
