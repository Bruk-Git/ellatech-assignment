Ellatech Inventory Management System

A full-stack inventory management web application built for the Ellatech internship assignment.
It provides user management, product management, stock control, and a transaction ledger with a modern responsive UI.

📌 Features
👤 User Management
Register users with full name and email
Stored in SQLite database

📦 Product Management
Add products with SKU, name, price, and quantity
View all products in a dashboard

📊 Inventory Control
Increase stock quantity
Decrease stock quantity

📜 Transaction Ledger
Tracks all stock changes
Records previous and new quantities
Includes timestamp
Supports pagination

🧭 Dashboard UI
Responsive design
Navigation bar for easy access
Summary tables for quick insights

🛠️ Tech Stack
Frontend: React (Vite)
Tailwind CSS

Backend: Node.js, Express.js, SQLite3

Database: SQLite (file-based database)

📁 Project Structure
ellatech-assignment/
│
├── backend/
│ ├── src/
│ │ ├── server.js
│ │ ├── routes/
│ │ └── database.db
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ └── App.jsx
│ └── package.json

⚙️ Setup Instructions

1. Clone repository
   git clone https://github.com/Bruk-Git/ellatech-assignment.git
   cd ellatech-assignment

2. Backend setup
   cd backend
   npm install
   npm start

Backend runs on:

http://localhost:5000 3. Frontend setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🌐 API Endpoints
Users
POST /api/users – Create user
GET /api/users – Get all users

Products
POST /api/products – Create product
GET /api/products – Get all products

Inventory
PUT /api/inventory/increase/:id
PUT /api/inventory/decrease/:id

Transactions
GET /api/transactions?page=1&limit=10

🧠 Architecture Overview

React frontend communicates with Express backend via REST API
Backend handles all business logic and validation

SQLite is used for lightweight persistent storage
Inventory changes automatically generate transaction logs

🔐 Key Design Decisions
SQLite chosen for simplicity and fast setup
REST API design for scalability and clarity
Component-based React structure for maintainability
Centralized API service using Axios
