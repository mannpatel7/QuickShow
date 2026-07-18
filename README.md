<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDBzN2V2OTZ3aDA0NDV5NnJ2NzQzaDR1dGNzZnE2dnVxbnU2emM5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7rc0qU6m5hneITuc/giphy.gif" alt="QuickShow Banner" width="400"/>

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

  [Explore Features](#sparkles-features) •
  [Getting Started](#rocket-getting-started) •
  [Tech Stack](#zap-tech-stack) •
  [Environment](#key-environment-variables)
</div>

---

<details open>
  <summary><h2>📖 Table of Contents</h2></summary>
  
  - [About The Project](#about-the-project)
  - [Features](#sparkles-features)
  - [Tech Stack](#zap-tech-stack)
  - [Getting Started](#rocket-getting-started)
  - [Environment Variables](#key-environment-variables)
  - [Roadmap](#compass-roadmap)
  - [License](#balance_scale-license)
</details>

---

## 🍿 About The Project

**QuickShow** is a modern, responsive, and seamless movie booking application. It provides end-to-end functionality for users to browse the latest movies, watch trailers, select their preferred seats, and securely purchase tickets.

Administrators are empowered with a comprehensive dashboard to manage shows, monitor bookings, and oversee the entire catalog effortlessly.

---

## :sparkles: Features

<details>
  <summary><b>👤 For Users</b></summary>
  <ul>
    <li><b>Authentication & Authorization:</b> Secure login and registration.</li>
    <li><b>Movie Discovery:</b> Browse, search, and view detailed information including trailers.</li>
    <li><b>Interactive Seat Selection:</b> Real-time visual seat map to pick your favorite spot.</li>
    <li><b>Secure Payments:</b> Integrated with Stripe for safe and fast checkout.</li>
    <li><b>Notifications:</b> Automated email confirmations for bookings via Nodemailer.</li>
  </ul>
</details>

<details>
  <summary><b>🛡️ For Administrators</b></summary>
  <ul>
    <li><b>Show Management:</b> Add, edit, or remove movies and showtimes.</li>
    <li><b>Booking Oversight:</b> Track and manage all user bookings.</li>
    <li><b>Analytics Dashboard:</b> Get insights into sales and popular shows.</li>
  </ul>
</details>

---

## :zap: Tech Stack

| Frontend 🎨 | Backend ⚙️ | Database & Services 🗄️ |
| :--- | :--- | :--- |
| **React** + **Vite** | **Node.js** | **MongoDB** (Mongoose) |
| **Tailwind CSS** | **Express.js** | **Stripe** (Payments) |
| Context API |  | **Inngest** (Background Jobs) |
| React Router |  | **Nodemailer** (Emails) |

---

## :rocket: Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

* Node.js (v16+ recommended)
* MongoDB database (Local or Atlas)
* Stripe account (for payment keys)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mannpatel7/QuickShow.git
   cd QuickShow
   ```

2. **Install Dependencies**

   <details>
   <summary><b>Server Setup</b></summary>
   
   ```bash
   cd server
   npm install
   ```
   </details>

   <details>
   <summary><b>Client Setup</b></summary>
   
   ```bash
   cd client
   npm install
   ```
   </details>

---

## :key: Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files in both the `server` and `client` directories.

**`server/.env`**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

**`client/.env`**
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

---

## :runner: Running the Application

<details>
<summary><b>Start the Backend Server</b></summary>

```bash
cd server
npm start
```
*Server will run on `http://localhost:5000`*
</details>

<details>
<summary><b>Start the Frontend Client</b></summary>

```bash
cd client
npm run dev
```
*Client will run on `http://localhost:5173`*
</details>

---

## :compass: Roadmap

- [x] Basic UI and routing
- [x] User Authentication
- [x] Seat Booking Logic
- [x] Stripe Integration
- [ ] Admin Dashboard UI Enhancements
- [ ] Implement Push Notifications
- [ ] Add User Reviews and Ratings

---

## :balance_scale: License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="center">
  <i>Developed with ❤️ by <a href="https://github.com/mannpatel7">mannpatel7</a></i>
</p>
