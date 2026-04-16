# KristalBall Assignment Reference Document

# Objective

The goal of this assignment is to develop a **Military Asset Management System** that allows commanders and logistics personnel to manage critical assets such as vehicles, weapons, and ammunition across multiple bases. The system will provide features for tracking asset balances, recording assignments and expenditures, facilitating transfers between bases, and implementing role-based access control (RBAC) to ensure secure data access. You will be using **React** for the frontend and **Node.js** for the backend to build this application.

# Technical Requirements

- Frontend: React
- Backend: Node.js
- Database: MongoDB

# Step-by-Step Instructions

### Step 1: Set Up Your Development Environment

1. Install Node.js from the official website.
2. Set up a new React project using Create React App:
    
    ```bash
    npx create-react-app military-asset-management
    ```
    
3. Create a new directory for your backend and initialize a Node.js project:
    
    ```bash
    mkdir backend
    cd backend
    npm init -y
    ```
    

### Step 2: Install Required Packages

1. For the frontend, navigate to the React project directory and install Axios for API calls:
    
    ```bash
    cd military-asset-management
    npm install axios
    ```
    
2. For the backend, install Express and any other necessary packages:
    
    ```bash
    cd backend
    npm install express cors body-parser mongoose
    ```
    

### Step 3: Create the Backend Server

1. In the backend directory, create an `index.js` file and set up a basic Express server:
    
    ```jsx
    const express = require('express');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
    ```
    

### Step 4 : Design the database schema

Create a schema that includes tables or collections for assets, transfers, assignments, and users. For example, you might have collections like `assets`, `transfers`, and `users`. Each collection should have fields relevant to its purpose, such as `assetName`, `base`, `assignedTo`, etc.

### Step 5: Define API Endpoints

1. Create routes for managing assets, including purchases, transfers, and assignments. For example:

    
    ```jsx
    app.post('/api/purchases', (req, res) => {
        // Logic to record purchases
    });
    ```
    

### Step 6: Implement Role-Based Access Control (RBAC)

1. Create middleware to check user roles and restrict access to certain endpoints based on roles (Admin, Base Commander, Logistics Officer).

### Step 7: Build the Frontend Components

1. Create components for the Dashboard, Purchases Page, Transfer Page, and Assignments & Expenditures Page.
2. Use Axios to fetch data from the backend and display it in your components.

### Step 8: Add Filtering and Pop-up Display

1. Implement filtering options for the Dashboard and create a pop-up display for detailed views of net movements.

### Step 9: Testing the Application

1. Test all features to ensure they work as expected. Check API responses and UI interactions.

### Step 10: Deployment

1. Deploy the backend on a service like Render and the frontend on platforms like Netlify or Vercel.
2. Ensure that the deployed links are accessible and functional.

### Step 11: Documentation

1. Prepare a PDF file that includes:
    - Project Overview
    - Tech Stack & Architecture
    - Data Models / Schema
    - RBAC Explanation
    - API Logging
    - Setup Instructions
    - API Endpoints
    - Login Credentials

# Project Structure

military-asset-management/
├── backend/
│   ├── index.js
│   ├── routes/
│   │   ├── purchases.js
│   │   ├── transfers.js
│   │   └── assignments.js
│   ├── models/
│   │   ├── asset.js
│   │   └── user.js
│   └── middleware/
│       └── auth.js
└── military-asset-management/
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── Purchases.js
│   │   ├── Transfers.js
│   │   └── Assignments.js
│   ├── App.js
│   └── index.js
└── public/