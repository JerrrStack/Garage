# Badi Garage

Product demo for a Milan mobile mechanic: bilingual landing site (IT/EN) with live Google Calendar booking on Vercel.

**Live demo:** https://badi-garage.vercel.app

## What’s included

- Dark branded marketing site (cars, moto, vans/trucks, A/C, emergency call)
- IT / EN language switch
- Booking modal with real availability from Google Calendar
- Serverless APIs: `GET /api/availability`, `POST /api/book`
- Appointments written to Google Calendar (Europe/Rome, Mon–Sat 08:00–19:00)

## Stack

- Static HTML / CSS / JS
- Vercel Serverless Functions (Node 22)
- `googleapis` + `luxon`

## Environment variables

Set these in Vercel (Production + Preview):

| Variable | Notes |
|----------|--------|
| `GOOGLE_CLIENT_EMAIL` | Service account email |
| `GOOGLE_PRIVATE_KEY` | Full `private_key` from the JSON key (not `private_key_id`) |
| `GOOGLE_CALENDAR_ID` | Shared calendar ID |
| `GOOGLE_CALENDAR_TIMEZONE` | `Europe/Rome` |

Share the calendar with the service account as **Make changes to events**. Enable the Google Calendar API on the GCP project.

## Local check

```bash
npm install
npm run check
```

Static preview: any static server from the project root. APIs require Vercel or `vercel dev` with env vars loaded.

## Handoff / go-live checklist

- [ ] Replace placeholder phone / WhatsApp with Philip’s real number
- [ ] Replace Philip photo placeholders
- [ ] Confirm prices and service area copy
- [ ] Add real privacy / cookie pages
- [ ] Custom domain on Vercel
- [ ] Optional: email or WhatsApp booking alerts
