# short-dealer-form

Trade show lead-capture landing page built for fast, reliable submissions in a live event environment.

## What it is
A single-page form designed for QR-code traffic at trade shows. It validates inputs client-side, blocks common bot patterns (honeypot), and posts clean lead data to a Google Sheet via a Google Apps Script web app endpoint.

## Why it exists
Trade shows are chaotic. This is built to:
- capture leads quickly on mobile
- minimize submission friction
- keep data structured and immediately accessible for follow-up

## Features
- **Required fields:** first name, last name, email, phone, ZIP, city, state, business
- **Client-side validation:** basic email format checks + phone digit normalization
- **Spam prevention:** hidden “website” honeypot field (bots fill it; real users never see it)
- **Clean payload:** `FormData` → normalized object → submitted as JSON
- **Source capture:** stores `location.href` with each submission for traceability
- **Demo mode:** if no endpoint is configured, the form “submits” locally and logs the payload to the console

## Data flow
1. User submits the form
2. Client validates required fields and basic formatting
3. Honeypot check blocks bot submissions
4. Valid submissions are sent via `fetch()` to a **Google Apps Script endpoint**
5. Apps Script writes the row into Google Sheets

## Tech stack
- HTML / CSS
- Vanilla JavaScript (ES modules)
- Vite (local dev)
- Google Apps Script (web app endpoint) → Google Sheets
- Cloudflare Pages (deployment)

## Security / anti-spam notes
This project uses a honeypot field to block common bot submissions. For a production hardening pass, consider:
- rate limiting (edge/workers)
- server-side validation
- CAPTCHA (only if spam becomes persistent)

## Configuration
The Google Apps Script endpoint is intentionally **not committed** in public versions of this repo.

1. Copy `.env.example` → `.env`
2. Set your endpoint:
   - `VITE_FORM_ENDPOINT=...`

If `VITE_FORM_ENDPOINT` is not set, the form runs in **demo mode** and logs the payload to the browser console.

## Local development
From the project root:
1. Install deps
2. Start dev server
3. Open the local URL and submit a test lead

(Use your usual `npm install` / `npm run dev` workflow.)

## Deployment
Deployed via Cloudflare Pages with a connected GitHub repo.
