<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDBzN2V2OTZ3aDA0NDV5NnJ2NzQzaDR1dGNzZnE2dnVxbnU2emM5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7rc0qU6m5hneITuc/giphy.gif" alt="QuickShow Banner" width="120"/>

  # 🎬 QuickShow

  **The Ultimate Full-Stack Movie Booking Experience**

  <p align="center">
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" /></a>
    <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" /></a>
    <a href="https://stripe.com/"><img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" alt="Stripe" /></a>
  </p>

  **🚀 Live Project (Frontend)**: [https://quick-show-fro.vercel.app/](https://quick-show-fro.vercel.app/)  
  **⚙️ Live API (Backend)**: [https://quickshowserver-mocha.vercel.app/](https://quickshowserver-mocha.vercel.app/)
</div>

---

<details open>
  <summary><h2>📖 Table of Contents</h2></summary>
  
  - [Overview](#-overview)
  - [Key Features](#-key-features)
  - [Tech Stack & Architecture](#-tech-stack--architecture)
  - [Project Structure](#-project-structure)
  - [API Documentation](#-api-documentation)
  - [Getting Started](#-getting-started)
  - [Environment Variables](#-environment-variables)
  - [Deployment](#-deployment)
  - [Contributing & License](#-contributing--license)
</details>

---

## 📋 Overview

**QuickShow** is a robust, production-ready full-stack movie booking application. It is designed to bridge the gap between cinema enthusiasts and theater management. 

For **users**, it offers a seamless and highly responsive interface to discover new movies, watch trailers, select exact seats from an interactive theater map, and pay securely using Stripe.
For **administrators**, QuickShow provides a dedicated portal to manage the movie catalog, schedule showtimes, and monitor booking analytics in real-time.

---

## ✨ Key Features

### 👤 For Users (Moviegoers)
- **Authentication & Security:** Secure JWT-based registration and login, including password encryption using bcrypt.
- **Dynamic Movie Catalog:** Browse currently showing and upcoming movies. Features include search functionality, category filtering, and detailed movie pages with embedded trailers.
- **Interactive Seat Selection:** A visual representation of the cinema hall where users can click to select available seats. Real-time lock mechanisms prevent double-booking.
- **Secure Checkout via Stripe:** Integration with Stripe Elements for handling secure card payments, complete with webhooks to verify transactions.
- **User Dashboard:** A personalized space to view past bookings, upcoming tickets, and account details.

### 🛡️ For Administrators (Theater Management)
- **Movie Management:** Add, edit, and delete movie entries including uploading posters and updating metadata (director, cast, duration).
- **Showtime Scheduling:** Allocate movies to specific screens at specific times, setting dynamic pricing if necessary.
- **Booking Oversight:** Access a master list of all bookings to handle refunds, cancellations, and user support.

---

## 🛠️ Tech Stack & Architecture

This project adopts a modern MERN-like stack, utilizing Vite for an ultra-fast frontend build process and Tailwind CSS for rapid UI development.

| Domain | Technologies Used | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite | UI library and fast bundler |
| **Styling** | Tailwind CSS | Utility-first CSS for responsive design |
| **State/Routing** | Context API, React Router v6 | Global state management and client-side routing |
| **Backend** | Node.js, Express.js | High-performance asynchronous REST API |
| **Database** | MongoDB, Mongoose ODM | Flexible NoSQL document storage and schema validation |
| **Payments** | Stripe API | Secure, PCI-compliant payment processing |
| **Background Jobs** | Inngest | Managing asynchronous tasks |

---

## 📂 Project Structure

A comprehensive look at the repository architecture:

```text
QuickShow/
├── client/                      # Frontend (React + Vite)
│   ├── public/                  # Static assets
│   ├── src/                     
│   │   ├── api/                 # Axios interceptors and API call definitions
│   │   ├── components/          # Reusable UI components (Buttons, Modals, Cards)
│   │   ├── context/             # React Context for Auth and Cart state
│   │   ├── pages/               # Top-level route components (Home, Movie, Checkout)
│   │   ├── utils/               # Helper functions and formatters
│   │   ├── App.jsx              # Main application wrapper & Router setup
│   │   └── index.css            # Global Tailwind imports
│   └── package.json             # Frontend dependencies
│
├── server/                      # Backend (Node.js + Express)
│   ├── controllers/             # Request handlers (logic for auth, movies, bookings)
│   ├── middlewares/             # JWT verification, error handling, input validation
│   ├── models/                  # Mongoose schemas (User, Movie, Show, Booking)
│   ├── routes/                  # API route definitions
│   ├── config/                  # Database connection and third-party setups
│   ├── server.js                # Express app initialization
│   └── package.json             # Backend dependencies
│
└── README.md                    # Project documentation
```

---

## 📡 API Documentation

Below is a high-level overview of the exposed REST endpoints.

<details>
<summary><b>Authentication & Users (<code>/api/auth</code> & <code>/api/users</code>)</b></summary>

- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate user and return JWT
- `GET /api/users/profile` - Get current logged-in user profile
</details>

<details>
<summary><b>Movies & Shows (<code>/api/movies</code> & <code>/api/shows</code>)</b></summary>

- `GET /api/movies` - Retrieve all movies (supports search/filter queries)
- `GET /api/movies/:id` - Retrieve specific movie details
- `POST /api/movies` - (Admin) Add a new movie
- `GET /api/shows` - Get all scheduled shows
- `GET /api/shows/:movieId` - Get available showtimes for a specific movie
</details>

<details>
<summary><b>Bookings & Payments (<code>/api/bookings</code>)</b></summary>

- `POST /api/bookings` - Create a new booking (requires authentication)
- `GET /api/bookings/my-bookings` - Fetch booking history for the user
- `POST /api/bookings/create-payment-intent` - Initialize Stripe payment session
</details>

---

## 🚀 Getting Started

Follow these instructions to set up a local development environment.

### Prerequisites
Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/en/) (v16.0.0 or higher)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (or a local MongoDB instance running)
- A [Stripe Developer](https://stripe.com/) account to acquire API keys

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mannpatel7/QuickShow.git
   cd QuickShow
   ```

2. **Backend Setup**
   Open a terminal and navigate to the server directory:
   ```bash
   cd server
   npm install
   ```
   *Create a `.env` file based on the Environment Variables section below, then start the server:*
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   Open a new terminal window and navigate to the client directory:
   ```bash
   cd client
   npm install
   ```
   *Create a `.env` file, then start the Vite development server:*
   ```bash
   npm run dev
   ```

---

## 🔑 Environment Variables

For the application to function correctly, you must configure the following environment variables in their respective directories.

<details open>
<summary><b>Server Configuration (<code>server/.env</code>)</b></summary>

```env
# Application Port
PORT=5000

# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/quickshow?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=30d

# Stripe Payment Integration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
```
</details>

<details open>
<summary><b>Client Configuration (<code>client/.env</code>)</b></summary>

```env
# Backend API URL (Use localhost for local development)
VITE_API_URL=http://localhost:5000/api
# Or for production testing:
# VITE_API_URL=https://quickshowserver-mocha.vercel.app/api

# Stripe Public Key
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```
</details>

---

## 📊 Deployment

The application is configured for seamless deployment to modern cloud platforms.

- **Frontend (Vercel):** The Vite React app is deployed directly via Vercel. Continuous Integration triggers a new build on every push to the main branch.  
  👉 [Live Frontend App](https://quick-show-fro.vercel.app/)
  
- **Backend (Vercel):** The Express server is deployed as a serverless function on Vercel. Ensure `vercel.json` is correctly configured to handle API routing.  
  👉 [Live Backend API](https://quickshowserver-mocha.vercel.app/)

- **Database:** Hosted securely on MongoDB Atlas with IP whitelisting and automated backups.

---

## 🤝 Contributing & License

Contributions, issues, and feature requests are welcome! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**License**
Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <b>Made with ❤️ for movie lovers</b>
</p>
