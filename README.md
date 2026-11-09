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
Copy-Item .env.example server/.env
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
- Authentication, account roles, menu reads, customer-owned order reads and kitchen order status APIs are implemented. Payment processing and real-time kitchen updates are not implemented.
- The `pages`, `hooks`, `assets`, and `utils` client directories are reserved; current screens are composed in `src/App.jsx` pending requirements for the original core build.

## Planned next steps

1. Confirm the original client CORE BUILD requirements and replace illustrative menu/story content.
2. Implement validated order creation and payment provider integration.
3. Connect the kitchen dashboard to persisted order feeds and add real-time updates.
4. Add accessibility review, production observability and deployment hardening.

## Authentication and backend foundation

The API uses signed HS256 JWTs in the `qb_auth` HTTP-only cookie. The browser never reads or stores the token; Axios sends cookies with `withCredentials`. Cookies use `SameSite=Lax`, `Secure` in production, and a two-hour expiry. Set a unique `JWT_SECRET` of at least 32 characters outside source control. Authentication routes use a 10-request / 15-minute rate limit. Helmet is enabled and CORS accepts only origins listed in `CLIENT_URL` (comma-separated when needed).

Registration always creates a `customer`; submitted role fields are rejected. Kitchen staff accounts are provisioned out of band by the development seed or trusted database administration. No public user administration or role mutation API exists. Authorization is enforced server-side: customers can only list/read orders whose `customer` id matches their account; kitchen staff alone can list and transition restaurant order statuses. Menu reads are public and only return available database items. Order creation and payment are deliberately not implemented.

### Models

- `User`: normalized unique email, selected-out password hash, customer/kitchen_staff role, active flag, timestamps.
- `MenuItem`: validated menu fields, availability and category indexes, timestamps.
- `Order`: unique number, customer reference, required item snapshots and quantities, totals, delivery details, enumerated status/payment fields and customer/status indexes.

### API routes

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | API health |
| `POST` | `/api/auth/register` | Public, rate limited | Customer registration |
| `POST` | `/api/auth/login` | Public, rate limited | Sign in and set cookie |
| `POST` | `/api/auth/logout` | Public | Clear auth cookie |
| `GET` | `/api/auth/me` | Authenticated | Current account |
| `GET` | `/api/menu` | Public | Available menu, optional category/search filters |
| `GET` | `/api/orders` | Customer | Own orders |
| `GET` | `/api/orders/:id` | Customer | Own order detail |
| `GET` | `/api/kitchen/orders` | Kitchen staff | Real orders in kitchen queue |
| `PATCH` | `/api/kitchen/orders/:id/status` | Kitchen staff | Valid status transition |

### Environment and Windows setup

Copy `.env.example` to `server/.env` for local API execution and set `PORT`, `MONGO_URI`, `JWT_SECRET` (at least 32 characters), and `CLIENT_URL` (usually `http://localhost:5173`). `JWT_EXPIRES_IN` is optional and defaults to two hours. `VITE_API_URL` is an optional client API base URL. `OPENAI_API_KEY` is reserved and unused. Never use production database credentials in development or tests.

Install updated workspace dependencies from the repository root with `npm install`, then run `npm run dev`. The API can start without MongoDB for its health route, but database-backed routes require a reachable `MONGO_URI`.

### Development seed

The seed is manual and refuses to run when `NODE_ENV=production`. It inserts sample menu items and these demo accounts only when the matching email does not already exist; existing records are left unchanged. Run `npm run seed -w server` after setting a local `MONGO_URI`.

- Customer: `customer@quickbite.local` / `QuickBiteDemo123`
- Kitchen staff: `kitchen@quickbite.local` / `QuickBiteKitchen123`

These fixed credentials are strictly for a disposable local development database. The seed refuses production mode; do not deploy these accounts or use these passwords elsewhere.

### Automated tests

Run `npm test -w server` with `MONGO_TEST_URI` set to a loopback-only test database whose database name includes `test` (for example, a dedicated `quickbite_test`). Test setup refuses non-loopback hosts and database names without `test`, clears only that database, and disconnects after the suite. Never point it at production or a database containing user data. Without `MONGO_TEST_URI`, integration tests are skipped rather than sent to the application database.

The frontend has login and registration pages, a current-user provider, role-based route guards for customer orders/checkout and the kitchen dashboard, and a sign-out action. Checkout remains a non-submitting preview because order creation and payment are not part of this backend step.
