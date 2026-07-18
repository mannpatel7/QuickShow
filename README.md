<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDBzN2V2OTZ3aDA0NDV5NnJ2NzQzaDR1dGNzZnE2dnVxbnU2emM5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7rc0qU6m5hneITuc/giphy.gif" alt="QuickShow Banner" width="120"/>

  # 🎬 QuickShow

  **The Ultimate Full-Stack Movie Booking Experience allowing users to browse movies, select seats, and book tickets.**

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
  - [Tech Stack](#-tech-stack)
  - [Project Structure](#-project-structure)
  - [Quick Start](#-quick-start)
  - [Features in Detail](#-features-in-detail)
  - [Environment Variables](#-environment-variables)
  - [Deployment](#-deployment)
</details>

---

## 📋 Overview

QuickShow is a modern, responsive, and seamless movie booking application. It provides end-to-end functionality for users to browse the latest movies, watch trailers, select their preferred seats, and securely purchase tickets.

### Key Features

<details>
<summary><b>View Features</b></summary>
<ul>
  <li><b>👤 User Authentication</b>: Secure login and registration</li>
  <li><b>🎥 Movie Discovery</b>: Browse, search, and view detailed information with trailers</li>
  <li><b>💺 Interactive Seat Selection</b>: Real-time visual seat map to pick your favorite spot</li>
  <li><b>💳 Secure Payments</b>: Integrated with Stripe for safe and fast checkout</li>
  <li><b>🛡️ Admin Dashboard</b>: Comprehensive dashboard for managing shows and bookings</li>
</ul>
</details>

---

## 🛠️ Tech Stack

| Frontend 🎨 | Backend ⚙️ | Infrastructure 🚀 |
| :--- | :--- | :--- |
| **React** | **Node.js** & **Express** | **Vercel** (Hosting) |
| **Vite** | **MongoDB** & **Mongoose** | **MongoDB Atlas** |
| **Tailwind CSS** | **Stripe** (Payments) | |
| **Context API** | **Inngest** (Background Jobs) | |
| **React Router** |  | |

---

## 📂 Project Structure

```text
QuickShow/
├── server/               # Node.js Express server
│   ├── ...               # Backend code
│   └── package.json
├── client/               # React Vite application
│   ├── src/              # Frontend code
│   └── package.json
└── README.md             # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account (or local MongoDB)
- Stripe account (for payment keys)

<details>
<summary><b>Backend Setup</b></summary>

```bash
cd server

# Install dependencies
npm install

# Set up environment variables (see Environment Variables section)

# Start server
npm start
```
</details>

<details>
<summary><b>Frontend Setup</b></summary>

```bash
cd client

# Install dependencies
npm install

# Set up environment variables (see Environment Variables section)

# Start dev server
npm run dev
```
</details>

---

## 🔑 Environment Variables

<details>
<summary><b>Server (.env)</b></summary>

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
```
</details>

<details>
<summary><b>Client (.env)</b></summary>

```env
VITE_API_URL=https://quickshowserver-mocha.vercel.app/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```
</details>

---

## 🎯 Features in Detail

### User Experience
- Clean, intuitive interface for browsing movies
- Real-time seat booking logic
- Saved bookings accessible in user profile

### Admin Capabilities
- Add, edit, or remove movies and showtimes
- Track and manage all user bookings
- View insights into sales and popular shows

---

## 📊 Deployment

### Frontend
- Deployed on Vercel: [https://quick-show-fro.vercel.app/](https://quick-show-fro.vercel.app/)

### Backend
- Deployed on Vercel: [https://quickshowserver-mocha.vercel.app/](https://quickshowserver-mocha.vercel.app/)

### Database
- MongoDB Atlas for cloud database storage

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <b>Made with ❤️ for movie lovers</b>
</p>
