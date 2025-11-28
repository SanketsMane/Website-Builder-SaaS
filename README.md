# Store.link SaaS Platform

A full-featured SaaS platform for building online stores, similar to Store.link. Built with the PERN stack (PostgreSQL, Express, React, Node.js).

## Features

- **Multi-Tenant Architecture**: Create and manage multiple stores under one account.
- **Store Builder**: Customize homepage, checkout, and custom pages with a visual editor.
- **Product Management**: Sync products directly from Google Sheets.
- **E-commerce**: Public storefronts, cart, checkout, and order management.
- **Marketing**: Coupons and basic analytics.
- **Authentication**: Secure signup/login with Twilio OTP verification.
- **Subscriptions**: Stripe integration for paid plans.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Zustand, React Router.
- **Backend**: Node.js, Express, Prisma ORM.
- **Database**: PostgreSQL.
- **Integrations**: Google Sheets API, Stripe, Twilio.

## Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

## Local Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Web_Builder
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    - Create a `.env` file in the `backend` directory:
      ```env
      PORT=5000
      DATABASE_URL="postgresql://user:password@localhost:5432/store_builder_db?schema=public"
      JWT_SECRET="your_jwt_secret"
      # Optional: External Service Keys
      # STRIPE_SECRET_KEY=...
      # TWILIO_ACCOUNT_SID=...
      # TWILIO_AUTH_TOKEN=...
      # GOOGLE_CLIENT_ID=...
      # GOOGLE_CLIENT_SECRET=...
      ```
    - Run Database Migrations:
      ```bash
      npx prisma migrate dev --name init
      ```
    - Start the server:
      ```bash
      npm run dev
      ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    ```
    - Create a `.env` file in the `frontend` directory (optional, defaults to localhost:5000):
      ```env
      VITE_API_URL=http://localhost:5000/api
      ```
    - Start the development server:
      ```bash
      npm run dev
      ```

4.  **Access the App**
    - Open `http://localhost:5173` in your browser.

## Deployment

### Frontend (Vercel)
1.  Push code to GitHub.
2.  Import the `frontend` directory project into Vercel.
3.  Set Build Command: `npm run build`.
4.  Set Output Directory: `dist`.
5.  Add Environment Variables (e.g., `VITE_API_URL`).

### Backend (Render/Railway)
1.  Push code to GitHub.
2.  Create a new Web Service pointing to the `backend` directory.
3.  Set Build Command: `npm install && npx prisma generate`.
4.  Set Start Command: `npm start`.
5.  Add Environment Variables (`DATABASE_URL`, `JWT_SECRET`, etc.).

## Project Structure

- `frontend/`: React application.
  - `src/pages/`: Route components (Dashboard, Public Store, Auth).
  - `src/components/`: Reusable UI components.
  - `src/store/`: Zustand state stores.
- `backend/`: Node.js Express API.
  - `controllers/`: Request handlers.
  - `routes/`: API route definitions.
  - `prisma/`: Database schema and migrations.
