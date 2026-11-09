# QuickBite

QuickBite is a premium direct-order restaurant experience and kitchen dashboard. This repository establishes the first frontend and API foundation. The original client CORE BUILD paragraph was not included, so product decisions and the menu shown here are clearly marked as sample assumptions.

## Stack

- **Client:** React 18, Vite, Tailwind CSS, React Router, Axios, Lucide React
- **Server:** Node.js, Express, Mongoose, MongoDB
- **Language:** JavaScript (ES modules)

## Structure

```text
client/                 React/Vite application
  src/components/       Shared UI and food components
  src/pages/             Route screen area (routes currently composed in App.jsx)
  src/layouts/           Customer site layout
  src/hooks/             Reserved for shared hooks
  src/services/          Axios API client
  src/context/           Cart state
  src/assets/            Reserved for local assets
  src/utils/             Reserved for shared utilities
server/
  src/config/            Database configuration
  src/models/            Reserved for Mongoose models
  src/controllers/       Request handlers
  src/routes/            Express routes
  src/middleware/        Error handling
  src/utils/             Reserved for shared utilities
```

## Prerequisites

- Node.js 20 or newer and npm
- MongoDB for database-backed development (the API health route can start without MongoDB)

## Windows setup

From PowerShell in the project folder:

```powershell
npm install
Copy-Item .env.example .env
```

Set values in `.env` for local use. `PORT` defaults to `5000`, and the client defaults to `http://localhost:5173` for API calls. `CLIENT_URL` accepts a comma-separated allowlist of browser origins. No real secrets belong in this repository.

## Run locally

Run both development servers from the root:

```powershell
npm run dev
```

Or run them separately in two terminals:

```powershell
npm run dev:client
npm run dev:server
```

The client is at `http://localhost:5173`, the API at `http://localhost:5000`, and its health check is `GET http://localhost:5000/api/health`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start client and server together |
| `npm run dev:client` | Start Vite only |
| `npm run dev:server` | Start Express with nodemon |
| `npm run build` | Build the client for production |
| `npm start` | Start the API |
| `npm run check -w server` | Check server entry/app JavaScript syntax |

## Current status

- Responsive restaurant landing page, sample menu with search and category filters, add-to-cart and quantity controls, cart summary, checkout preview, order history/tracking placeholder, and separate sample kitchen dashboard.
- Customer copy and food data are illustrative. The checkout form validates fields locally, but explicitly does not submit or persist an order. Tracking and history are placeholders.
- API environment setup, optional MongoDB connection, CORS allowlist, JSON parsing, `GET /api/health`, 404 response, and central error handler are in place.
- No authentication, live menu/order database, payment processing, or real-time kitchen feed is implemented.
- The `pages`, `hooks`, `assets`, and `utils` client directories are reserved; current screens are composed in `src/App.jsx` pending requirements for the original core build.

## Planned next steps

1. Confirm the original client CORE BUILD requirements and replace illustrative menu/story content.
2. Define restaurant, menu, customer, and order schemas and corresponding validated API routes.
3. Add authentication and role-based kitchen access.
4. Connect checkout, order history, and tracking to persisted orders and payment provider requirements.
5. Add kitchen live updates, production logging, accessibility review, and automated tests.
