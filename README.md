# QuickShow

QuickShow is a full-stack movie booking application built with a React/Vite front-end and a Node.js/Express back-end. It allows users to browse movies, view details, select seats, and book tickets. Admin functions include adding shows, managing bookings, and listing shows.

## Features

- User authentication and authorization
- Browse and search movies
- View movie details with trailers and information
- Select seats and complete bookings with Stripe integration
- Admin dashboard for managing shows and bookings
- Email notifications via Nodemailer

## Technologies Used

- **Client:** React, Vite, JSX, Tailwind CSS (if used), context API, React Router
- **Server:** Node.js, Express, MongoDB (via Mongoose), Stripe, Inngest, Nodemailer

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mannpatel7/QuickShow.git
   ```
2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```
3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```
4. Configure environment variables in both `server` and `client` as needed (e.g., database URI, Stripe keys, email credentials).

### Running the Application

- Start the server:
  ```bash
  cd server
  npm start
  ```
- Start the client:
  ```bash
  cd client
  npm run dev
  ```

## License

MIT License
