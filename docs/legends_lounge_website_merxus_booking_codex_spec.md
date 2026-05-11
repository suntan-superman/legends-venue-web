# Legends Lounge & Events Center Website + Merxus AI Event Booking Integration
## Codex-Ready Implementation Specification

## Project Summary

Build a public-facing React JavaScript website for **Legends Lounge & Events Center** in Bakersfield, California.

The primary purpose of the site is not general dining reservations. The site should focus on **private event venue rentals** and provide a public calendar showing the current rental status of available venue areas:

- Main Dining Room
- Banquet Room
- Outdoor Patio

Visitors should be able to view public availability, submit a private event reservation request, and receive follow-up after a Legends employee confirms the booking. The site must integrate with the existing **Merxus AI backend reservation/booking system** and support future seamless voice/SMS/AI booking flows.

The site must be modern, mobile-friendly, fast, clean, and deployable on Netlify.

---

# Business Information

## Venue Name

Legends Lounge & Events Center

## Address

7900 Downing Avenue  
Bakersfield, CA 93308

## Phone

(661) 218-9789

## Business Type

Event venue, lounge, bar, restaurant, entertainment venue.

## Venue Highlights

- Event-venue bar
- Dining
- Karaoke
- Pool table
- Cocktails
- Bottomless mimosas
- Multiple bars
- Large outdoor patio
- Full kitchen
- Multi-room venue
- Total capacity up to 700 guests

## Event Types to Highlight

- Weddings
- Christmas parties
- Birthday parties
- Retirement parties
- Sports watch parties
- Fundraisers
- Corporate events
- Private celebrations
- Banquets
- Large group gatherings

---

# Recommended Repository / Folder Structure

## Recommendation

Create the public website as a **separate frontend app inside the existing Merxus repository**, not inside the backend folder.

Recommended location:

```txt
C:\Users\sjroy\Source\Merxus\legends-venue-web
```

Do NOT place it inside:

```txt
C:\Users\sjroy\Source\Merxus\merxus-ai-backend
```

## Reasoning

The website is a standalone public frontend that consumes the Merxus backend through API endpoints. It should not be coupled to backend source files.

This structure allows:

- independent Netlify deployment
- independent build settings
- clean separation of public website from backend logic
- easy environment variable management
- easy future replication for other Merxus restaurant/venue customers
- reuse of backend booking APIs without exposing server internals

## Target Structure

```txt
C:\Users\sjroy\Source\Merxus\
  merxus-ai-backend\
  mobile\
  web\
  legends-venue-web\
    public\
    src\
      assets\
      components\
      pages\
      services\
      styles\
      utils\
      config\
    .env.example
    package.json
    vite.config.js
    netlify.toml
    README.md
```

---

# Technology Stack

Use:

- React JavaScript
- Vite
- Syncfusion Scheduler / Calendar
- Netlify deployment
- Existing Merxus AI backend
- Firebase-compatible authentication only for admin mode if needed
- CSS modules, plain CSS, or Tailwind if already standard in the Merxus frontend ecosystem

Avoid:

- MongoDB
- Next.js unless explicitly required later
- duplicating booking data locally
- writing directly to Firebase from public website
- exposing admin-only reservation details publicly

---

# Syncfusion Requirement

The existing Merxus AI web app already uses Syncfusion Scheduler/Calendar.

This project should also use Syncfusion Scheduler for:

- public venue availability calendar
- internal/admin event detail calendar
- venue area/resource grouping
- status color coding
- mobile-responsive calendar views

Use Syncfusion resources to represent venue areas:

```js
[
  { id: "main_dining_room", name: "Main Dining Room" },
  { id: "banquet_room", name: "Banquet Room" },
  { id: "outdoor_patio", name: "Outdoor Patio" }
]
```

---

# Website Pages

## 1. Home Page

Route: `/`

Purpose:

Introduce Legends Lounge & Events Center and drive visitors toward checking availability or requesting a private event booking.

Sections:

1. Hero section
2. Venue highlights
3. Event types
4. Venue spaces
5. Featured gallery
6. Call-to-action to check availability
7. Contact/location section

Hero copy direction:

```txt
Host your next event at Legends Lounge & Events Center in Bakersfield.
A multi-room venue with multiple bars, full kitchen, outdoor patio, dining, cocktails, karaoke, and space for up to 700 guests.
```

Primary CTA:

```txt
Check Event Availability
```

Secondary CTA:

```txt
Call (661) 218-9789
```

---

## 2. Event Spaces Page

Route: `/event-spaces`

Show the three primary rental areas.

### Main Dining Room

Suggested positioning:

```txt
Perfect for large gatherings, dining events, watch parties, fundraisers, and celebrations.
```

### Banquet Room

Suggested positioning:

```txt
Ideal for weddings, retirement parties, birthdays, business events, and private receptions.
```

### Outdoor Patio

Suggested positioning:

```txt
A large outdoor space for relaxed celebrations, social events, sports watch parties, and evening gatherings.
```

Each space card should include:

- image
- short description
- suggested use cases
- capacity field if provided later
- "Request This Space" button

---

## 3. Events Page

Route: `/events`

Highlight event categories:

- Weddings
- Holiday parties
- Birthday parties
- Retirement parties
- Fundraisers
- Corporate events
- Sports watch parties
- Karaoke/private entertainment nights

Each category should include a short paragraph and CTA.

---

## 4. Availability Calendar Page

Route: `/availability`

This is the core page.

It must show a public calendar using Syncfusion Scheduler.

Visitors can:

- view venue area availability
- filter by venue area
- see color-coded booking statuses
- submit a reservation request
- understand that requests are not confirmed until approved by Legends staff

Important UX note:

This is for **private event reservations**, not simple dinner reservations.

Clearly display:

```txt
Private event requests are reviewed by Legends staff. Your reservation is not confirmed until you receive confirmation.
```

---

## 5. Request Event Page / Modal

Route: `/request-event`

Also usable as a modal launched from calendar date selection.

The request form should collect:

### Contact Information

- full name
- phone number
- email address

### Event Information

- event type
- requested date
- start time
- end time
- venue area requested
- estimated guest count
- food service needed
- bar service needed
- notes/special requests

### Optional Fields

- budget range
- setup needs
- entertainment needs
- indoor/outdoor preference
- alternate date
- whether customer wants staff to call back

### Required Fields

- name
- phone
- event type
- requested date
- start time
- estimated guest count
- venue area

Email should be strongly encouraged but not necessarily required if phone is provided.

---

## 6. Contact Page

Route: `/contact`

Include:

- business name
- address
- phone
- embedded map link
- FB link
- IG link
- CTA to request event
- CTA to call venue

---

## 7. Admin Booking View

Route: `/admin`

This route should be protected.

It is for Legends employees or Merxus internal users.

Admin users should be able to:

- view full reservation details
- see customer name
- see phone
- see email
- see notes
- confirm reservation
- reject reservation
- mark deposit pending
- mark deposit received
- mark completed
- mark cancelled
- add internal notes
- optionally edit event dates/times
- view projected rental revenue if enabled

Do not expose this data publicly.

---

# Public Calendar Privacy Rules

The owner should be able to decide whether public visitors see party/customer details.

Implement a configuration option:

```js
publicCalendarVisibility: "status_only" | "event_type_only" | "public_title"
```

## status_only

Public calendar shows only:

```txt
Banquet Room - Pending
Outdoor Patio - Confirmed
```

## event_type_only

Public calendar shows:

```txt
Birthday Party - Pending
Wedding - Confirmed
```

No customer names.

## public_title

Public calendar shows a configured public title:

```txt
Smith Wedding Reception
Company Holiday Party
```

Only show this if the admin explicitly provides public title.

Default should be:

```txt
status_only
```

---

# Reservation Statuses and Colors

Use a consistent reservation status model.

## Public-Facing Statuses

```js
[
  "available",
  "request_received",
  "pending_review",
  "confirmed",
  "deposit_pending",
  "blocked",
  "private_event"
]
```

## Internal Statuses

```js
[
  "request_received",
  "pending_review",
  "confirmed",
  "deposit_pending",
  "deposit_received",
  "cancelled",
  "rejected",
  "completed",
  "blocked",
  "hold"
]
```

## Recommended Colors

```js
const STATUS_COLORS = {
  request_received: "#60A5FA",
  pending_review: "#F59E0B",
  confirmed: "#10B981",
  deposit_pending: "#8B5CF6",
  deposit_received: "#059669",
  cancelled: "#6B7280",
  rejected: "#EF4444",
  completed: "#14B8A6",
  blocked: "#111827",
  hold: "#F97316",
  private_event: "#10B981"
};
```

Public display should avoid exposing sensitive information.

---

# Venue Areas / Resources

Create shared venue area config:

```js
export const VENUE_AREAS = [
  {
    id: "main_dining_room",
    label: "Main Dining Room",
    shortLabel: "Dining Room",
    description: "Large indoor space for dining events, watch parties, fundraisers, and celebrations."
  },
  {
    id: "banquet_room",
    label: "Banquet Room",
    shortLabel: "Banquet",
    description: "Private indoor room ideal for weddings, birthdays, retirement parties, and corporate events."
  },
  {
    id: "outdoor_patio",
    label: "Outdoor Patio",
    shortLabel: "Patio",
    description: "Large outdoor patio for social events, parties, and relaxed gatherings."
  }
];
```

---

# Backend Integration

The website must not write directly to Firebase from the public frontend.

Instead, use Merxus AI backend APIs.

Recommended public API endpoints:

```txt
GET  /public/venues/:tenantSlug/config
GET  /public/venues/:tenantSlug/availability
POST /public/venues/:tenantSlug/event-requests
```

Recommended admin API endpoints:

```txt
GET    /admin/venues/:tenantId/event-requests
GET    /admin/venues/:tenantId/event-requests/:id
PATCH  /admin/venues/:tenantId/event-requests/:id/status
PATCH  /admin/venues/:tenantId/event-requests/:id
POST   /admin/venues/:tenantId/event-requests/:id/notes
```

Use tenant slug:

```txt
legends
```

---

# Public API Details

## GET /public/venues/:tenantSlug/config

Returns public venue configuration.

Example response:

```json
{
  "tenantSlug": "legends",
  "tenantId": "LEGENDS_TENANT_ID",
  "name": "Legends Lounge & Events Center",
  "phone": "(661) 218-9789",
  "address": "7900 Downing Avenue, Bakersfield, CA 93308",
  "timezone": "America/Los_Angeles",
  "publicCalendarVisibility": "status_only",
  "venueAreas": [
    { "id": "main_dining_room", "label": "Main Dining Room" },
    { "id": "banquet_room", "label": "Banquet Room" },
    { "id": "outdoor_patio", "label": "Outdoor Patio" }
  ],
  "operatingHours": {}
}
```

The backend may already store operating hours. If so, reuse them through this endpoint.

If not available yet, return a safe default and mark operatingHours as optional.

---

## GET /public/venues/:tenantSlug/availability

Query params:

```txt
start=2026-05-01
end=2026-06-01
venueAreaId=banquet_room
```

Returns public-safe bookings.

Example response:

```json
{
  "items": [
    {
      "id": "public_abc123",
      "venueAreaId": "banquet_room",
      "startTime": "2026-05-15T18:00:00-07:00",
      "endTime": "2026-05-15T23:00:00-07:00",
      "status": "confirmed",
      "publicTitle": "Private Event",
      "eventType": "Birthday Party",
      "isPublicDetailsVisible": false
    }
  ]
}
```

Do not include customer name, phone, email, private notes, internal pricing, or staff notes.

---

## POST /public/venues/:tenantSlug/event-requests

Request payload:

```json
{
  "venueAreaId": "banquet_room",
  "eventType": "Birthday Party",
  "requestedDate": "2026-05-15",
  "startTime": "18:00",
  "endTime": "23:00",
  "estimatedGuestCount": 120,
  "customerName": "Jane Smith",
  "customerPhone": "+16615551234",
  "customerEmail": "jane@example.com",
  "foodServiceNeeded": true,
  "barServiceNeeded": true,
  "budgetRange": "$2,500 - $5,000",
  "alternateDate": "2026-05-22",
  "notes": "Interested in patio access and karaoke.",
  "source": "legends_website"
}
```

Response:

```json
{
  "success": true,
  "requestId": "booking_req_abc123",
  "status": "request_received",
  "message": "Your event request has been received. Legends staff will review and confirm availability."
}
```

---

# Backend Reservation Object

Use Firebase/Firestore-compatible structure.

Recommended collection path:

```txt
tenants/{tenantId}/eventReservations/{reservationId}
```

or adapt to the existing Merxus booking collection if one already exists.

Recommended document:

```js
{
  tenantId: "LEGENDS_TENANT_ID",
  tenantSlug: "legends",
  venueAreaId: "banquet_room",
  venueAreaLabel: "Banquet Room",
  eventType: "Birthday Party",
  requestedDate: "2026-05-15",
  startTime: "2026-05-15T18:00:00-07:00",
  endTime: "2026-05-15T23:00:00-07:00",
  timezone: "America/Los_Angeles",
  estimatedGuestCount: 120,
  customer: {
    name: "Jane Smith",
    phone: "+16615551234",
    email: "jane@example.com"
  },
  services: {
    foodServiceNeeded: true,
    barServiceNeeded: true,
    karaokeRequested: false,
    patioRequested: false
  },
  pricing: {
    rentalFeeEstimate: null,
    foodEstimate: null,
    barEstimate: null,
    depositRequired: null,
    depositPaid: false,
    projectedRevenue: null,
    currency: "USD"
  },
  status: "request_received",
  publicDisplay: {
    visibility: "status_only",
    publicTitle: null,
    showEventType: false,
    showCustomerName: false
  },
  source: "legends_website",
  internalNotes: [],
  customerNotes: "Interested in patio access and karaoke.",
  notifications: {
    smsSentToStaff: false,
    emailSentToStaff: false,
    customerConfirmationSmsSent: false,
    customerConfirmationEmailSent: false
  },
  createdAt: "serverTimestamp()",
  updatedAt: "serverTimestamp()"
}
```

---

# Reservation Conflict Handling

The public website should prevent obvious double booking but final authority remains staff confirmation.

Conflict logic should check:

- same venueAreaId
- overlapping start/end time
- statuses that block availability

Blocking statuses:

```js
[
  "confirmed",
  "deposit_pending",
  "deposit_received",
  "blocked",
  "hold"
]
```

Non-blocking or soft statuses:

```js
[
  "request_received",
  "pending_review"
]
```

If a user requests a time with a pending request:

```txt
There is already a pending request for this space and time. You may still submit your request, and Legends staff will review availability.
```

If a user requests a confirmed/blocked time:

```txt
This space appears unavailable at that time. Please select another date, time, or venue area.
```

---

# Notifications

When a new event request is submitted, send notifications.

## Staff SMS Notification

Use Twilio through the existing Merxus backend.

Example:

```txt
New Legends event request:
Birthday Party
Banquet Room
May 15, 6:00 PM - 11:00 PM
Guests: 120
Customer: Jane Smith
Phone: (661) 555-1234
```

## Staff Email Notification

Subject:

```txt
New Legends Event Request — Birthday Party on May 15
```

Body should include:

- event type
- venue area
- date/time
- guest count
- customer name
- phone
- email
- services requested
- notes
- admin review link

## Customer Confirmation SMS

```txt
Thanks for your event request at Legends Lounge & Events Center. Our team will review availability and contact you to confirm. Your reservation is not confirmed yet.
```

## Customer Confirmation Email

Same message with more detail.

---

# Optional Revenue Projection

Support optional rental cost tracking for internal/admin use.

Do NOT show internal pricing publicly unless configured later.

Admin fields:

```js
pricing: {
  rentalFeeEstimate: number | null,
  foodEstimate: number | null,
  barEstimate: number | null,
  depositRequired: number | null,
  depositReceived: number | null,
  projectedRevenue: number | null,
  finalRevenue: number | null
}
```

Potential UI:

- projected revenue by month
- projected revenue by venue area
- pending deposit amount
- confirmed event revenue
- cancelled lost revenue

This can be Phase 2 if needed.

---

# Admin Workflow

1. Visitor submits event request.
2. Backend creates reservation with status `request_received`.
3. Staff SMS/email notification is sent.
4. Admin reviews in Merxus AI web app or Legends admin route.
5. Staff contacts customer.
6. Staff changes status to confirmed, pending review, deposit pending, rejected, or hold.
7. Calendar updates publicly using safe display rules.

---

# Public UX Rules

Always make this clear:

```txt
Submitting a request does not guarantee availability. A Legends staff member will confirm your reservation.
```

Use confirmation page after form submission:

```txt
Your event request has been received.
A Legends team member will review the request and contact you to confirm availability.
```

Include call CTA:

```txt
Need help now? Call (661) 218-9789.
```

---

# Website Design Direction

## Visual Style

Clean, modern, nightlife/event venue style.

Suggested tone:

- dark elegant background
- gold/amber accents
- white text
- large imagery
- warm hospitality feel
- modern cards
- strong CTAs

Avoid:

- clutter
- old nightclub flyer style
- too many animations
- low-contrast text
- overly corporate feel

## Suggested Palette

```js
const colors = {
  background: "#080808",
  surface: "#141414",
  surfaceSoft: "#1E1E1E",
  text: "#FFFFFF",
  mutedText: "#B6B6B6",
  gold: "#D4A017",
  amber: "#F59E0B",
  green: "#10B981",
  red: "#EF4444"
};
```

---

# Mobile Requirements

The site must work well on:

- iPhone
- Android
- tablets
- desktop

Mobile calendar must not feel cramped.

Recommended mobile behavior:

- default to agenda/list view
- allow date picker
- allow venue area filter
- show availability cards below calendar
- launch request form in full-screen modal

Desktop behavior:

- use Syncfusion month/week/schedule views
- resource grouping by venue area
- side panel filters

---

# Calendar Views

## Desktop

Use:

- Month
- Week
- Agenda

Default:

```txt
Month
```

## Mobile

Use:

- Agenda
- Day
- Month with limited detail

Default:

```txt
Agenda
```

---

# Calendar Event Display

Public event title generation:

```js
function getPublicEventTitle(event, visibilityMode) {
  if (visibilityMode === "public_title" && event.publicTitle) {
    return event.publicTitle;
  }

  if (visibilityMode === "event_type_only" && event.eventType) {
    return `${event.eventType} - ${formatStatus(event.status)}`;
  }

  return `${event.venueAreaLabel} - ${formatStatus(event.status)}`;
}
```

---

# Frontend Environment Variables

Create `.env.example`:

```txt
VITE_MERXUS_API_BASE_URL=https://api.merxus.ai
VITE_TENANT_SLUG=legends
VITE_SITE_NAME=Legends Lounge & Events Center
VITE_PUBLIC_PHONE=(661) 218-9789
VITE_PUBLIC_ADDRESS=7900 Downing Avenue, Bakersfield, CA 93308
```

For local development:

```txt
VITE_MERXUS_API_BASE_URL=http://localhost:4000
VITE_TENANT_SLUG=legends
```

---

# Netlify Deployment

Add `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

# Suggested Frontend File Structure

```txt
src/
  assets/
    logo/
    gallery/
  components/
    layout/
      Header.jsx
      Footer.jsx
      MobileNav.jsx
    calendar/
      VenueAvailabilityCalendar.jsx
      CalendarLegend.jsx
      VenueAreaFilter.jsx
      EventRequestModal.jsx
    forms/
      EventRequestForm.jsx
      FormField.jsx
      SubmitButton.jsx
    venue/
      VenueSpaceCard.jsx
      EventTypeCard.jsx
      GalleryGrid.jsx
    common/
      CTAButton.jsx
      SectionHeader.jsx
      StatusBadge.jsx
  config/
    venueAreas.js
    statusColors.js
    siteConfig.js
  pages/
    HomePage.jsx
    EventSpacesPage.jsx
    EventsPage.jsx
    AvailabilityPage.jsx
    ContactPage.jsx
    AdminPage.jsx
  services/
    apiClient.js
    publicVenueApi.js
    adminVenueApi.js
  utils/
    dateTime.js
    calendarMapper.js
    validation.js
  styles/
    global.css
```

---

# API Client

Create:

```txt
src/services/apiClient.js
```

Responsibilities:

- use `VITE_MERXUS_API_BASE_URL`
- attach JSON headers
- handle errors gracefully
- avoid exposing secrets

Example:

```js
const API_BASE_URL = import.meta.env.VITE_MERXUS_API_BASE_URL;

export async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API GET failed: ${res.status}`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `API POST failed: ${res.status}`);
  }

  return res.json();
}
```

---

# Validation Rules

Validate:

- name required
- phone required
- event type required
- venue area required
- requested date required
- start time required
- end time required
- guest count required
- guest count must be greater than 0
- guest count should warn if greater than 700
- end time must be after start time
- email must be valid if provided

If guest count > 700:

```txt
Legends has a total capacity of approximately 700 guests. Please contact the venue directly for special arrangements.
```

---

# Event Types Enum

```js
export const EVENT_TYPES = [
  "Wedding",
  "Birthday Party",
  "Retirement Party",
  "Christmas Party",
  "Holiday Party",
  "Sports Watch Party",
  "Fundraiser",
  "Corporate Event",
  "Private Party",
  "Banquet",
  "Other"
];
```

---

# Operating Hours

The user stated that operating hours are already in the Merxus AI backend.

Codex should:

1. Search backend for existing tenant/business hours model.
2. Reuse existing hours if available.
3. Expose them through `/public/venues/:tenantSlug/config`.
4. If unavailable, do not hard-code permanently.
5. Add fallback display:

```txt
Contact Legends for current event availability.
```

Do not block event requests solely based on missing operating hours.

---

# Image and Logo Handling

The user has access to the company logo and images from FB/IG.

Create placeholder structure:

```txt
public/images/logo/
public/images/gallery/
```

Do not scrape social media automatically unless assets are manually provided.

Support easy replacement:

```js
const galleryImages = [
  "/images/gallery/venue-1.jpg",
  "/images/gallery/patio-1.jpg",
  "/images/gallery/bar-1.jpg"
];
```

---

# Security Requirements

Public website must:

- never expose backend secrets
- never expose Twilio keys
- never expose email keys
- never expose Firebase admin credentials
- never expose customer information publicly
- call backend only through safe public endpoints
- sanitize all form inputs
- rate-limit public reservation requests on backend
- validate server-side, not only client-side

Backend should include:

- request throttling
- validation
- spam protection
- CORS allowlist for Legends Netlify domain
- optional CAPTCHA if spam becomes a problem

---

# CORS

Backend should allow:

- local dev origin
- Netlify preview origin
- production Legends website domain when known

Example:

```txt
http://localhost:5173
https://legends-lounge-events.netlify.app
https://www.<future-domain>.com
```

---

# Phased Implementation Plan

## Phase 1 — Website Foundation

Build:

- Vite React app
- routing
- global styles
- responsive layout
- home page
- event spaces page
- contact page
- gallery placeholders
- Netlify config

Acceptance:

- site runs locally
- site builds successfully
- site is responsive
- site can deploy to Netlify

---

## Phase 2 — Public Calendar

Build:

- Syncfusion Scheduler calendar
- venue area resources
- status color legend
- public-safe event mapping
- availability API client
- mobile agenda behavior

Acceptance:

- calendar loads public availability
- public details are privacy-safe
- area filters work
- status colors display correctly

---

## Phase 3 — Event Request Form

Build:

- request form
- modal launch from calendar
- validation
- submit to Merxus backend
- success screen
- error handling

Acceptance:

- visitors can submit private event requests
- request creates backend record
- user sees clear pending confirmation message

---

## Phase 4 — Backend API Integration

Build or connect:

- venue config endpoint
- availability endpoint
- event request endpoint
- Firebase reservation document writes
- conflict checking
- server-side validation

Acceptance:

- website communicates with Merxus backend
- no direct Firebase writes from public frontend
- public availability reflects backend data

---

## Phase 5 — Notifications

Build:

- staff SMS notification
- staff email notification
- customer request received SMS
- customer request received email

Acceptance:

- staff receives new request alert
- customer receives pending confirmation
- all notification failures are logged

---

## Phase 6 — Admin Workflow

Build:

- protected admin view or integrate into existing Merxus admin
- full reservation detail view
- status update flow
- internal notes
- public visibility settings
- optional pricing fields

Acceptance:

- employee can confirm/reject/update request
- public calendar updates after status change
- private customer details remain protected

---

## Phase 7 — Revenue Projection

Build:

- optional rental estimate fields
- deposit tracking
- projected revenue summary
- revenue by venue area

Acceptance:

- admin can enter projected revenue
- reporting shows venue rental opportunity
- public site never exposes internal pricing unless explicitly enabled

---

# Codex Execution Instructions

Codex should proceed carefully and avoid breaking the existing Merxus backend.

## Before Coding

1. Inspect the existing Merxus repository.
2. Identify current backend structure.
3. Identify existing reservations/booking implementation.
4. Identify existing tenant model.
5. Identify existing operating hours model.
6. Identify current notification services.
7. Identify Syncfusion usage in existing Merxus web app.
8. Reuse existing conventions wherever possible.

## Do Not

- create a new database
- add MongoDB
- write directly from public frontend to Firebase
- expose admin fields publicly
- assume operating hours if already stored
- hard-code production API URLs outside env vars
- break current Merxus web/mobile apps

## Do

- create a standalone website folder
- use React JavaScript
- use Syncfusion Scheduler
- integrate with backend API
- keep data privacy strict
- keep UI clean and mobile-friendly
- use reusable config for future venues
- make this replicable for future Merxus restaurant/event customers

---

# Final Success Criteria

The project is successful when:

1. Legends has a modern public website.
2. Visitors can learn about the venue and event spaces.
3. Visitors can view public event availability.
4. Visitors can request private event reservations.
5. Requests flow into Merxus AI backend.
6. Legends staff receive SMS/email alerts.
7. Staff can confirm or reject reservations.
8. Public calendar updates without exposing private customer details.
9. Website works on desktop and mobile.
10. Website deploys cleanly to Netlify.
11. The system can become a reusable Merxus venue-booking template.
