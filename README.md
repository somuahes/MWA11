# Inventory Management System
A full-stack inventory management application with Reactjs frontend and Node.js/Express/MongoDB backend.

**Live URL:** https://mwa-11.vercel.app/ 

NB: Register to proceed for first-time users

## Project Structure
````
inventory-app/
├── backend/          # Node.js/Express API server
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env          # Environment variables (create this if missing)
│   ├── server.js
│   └── package.json
└── frontend/         # React application
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── services/
    ├── .env          # Environment variables (create this if missing)
    ├── package.json
    └── README.md 
```` 

## 🚀 Quick Start
### Prerequisites
Node.js (v14 or higher)

MongoDB Atlas account (free tier)

Git

### Clone the Repository
`git clone your-repo-url`

`cd inventory-app // or appropriate folder name`

### Backend Setup
Navigate to backend folder:

`cd backend`

Install dependencies:

`npm install`

Create a file named .env if missing in the backend folder with the following content:

**MongoDB Atlas Connection String**

`MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/inventory-app?retryWrites=true&w=majority` 

**JWT Secret Key (generate your own)**

`JWT_SECRET=your_super_secret_key_here_change_this`

**Server Port**

`PORT=5000`
 
**How to get MONGO_URI:**

Go to MongoDB Atlas

Create a cluster (free tier available)

Click "Connect" → "Drivers" → "Node.js"

Copy the connection string

Replace your_username, your_password, and add your database name

**How to generate JWT_SECRET:**

Run in terminal to generate a random secret

`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Run the backend server:
`npm start`

The backend will run at: http://localhost:5000

### Frontend Setup
Navigate to frontend folder:

`cd ../frontend`

Install dependencies:

`npm install`

Create a file named .env if missing in the frontend folder with:

#Backend API URL

`REACT_APP_API_URL=http://localhost:5000`

### Run the React application:
`npm start`

The frontend will open at: http://localhost:3000

## 🌐 API Endpoints
**Authentication**

POST /api/auth/register - Register new user

POST /api/auth/login - Login user

**Products (Require Authentication)**

GET /api/products - Get all products

POST /api/products - Create new product

GET /api/products/:id - Get single product

PUT /api/products/:id - Update product

DELETE /api/products/:id - Delete product

## 🔧 Development
**Running Both Servers Simultaneously**

Open two terminal windows:

Terminal 1 (Backend):

`cd backend`

`npm start`

Terminal 2 (Frontend):

`cd frontend`


`npm start`

