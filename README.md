# Task-Manager-API---Playwright-Metamorphic-Testing
This repository contains a Task Manager API built with Node.js, Express, and MongoDB, designed for managing tasks efficiently. It includes automated API testing using Playwright with Metamorphic Testing (MR) to ensure robustness and correctness.
📌 Overview
This repository contains a Task Manager API built with Node.js, Express, and MongoDB, designed for managing tasks efficiently. It includes automated API testing using Playwright with Metamorphic Testing (MR) to ensure robustness and correctness.

🛠 Tech Stack
Backend: Node.js, Express
Database: MongoDB (Mongoose ODM)
Testing Framework: Playwright
Testing Strategy: Metamorphic Testing
🧪 Automated Testing with Playwright
This project leverages Playwright for API testing, implementing Metamorphic Relations (MRs) to verify API consistency:

MR1: Additive Property - Adding a task increases the total count.
MR2: Deletion Property - Deleting a task decreases the total count.
MR3: Idempotency - Deleting a task twice should return a 404.
MR4: Update Consistency - Updating a task should reflect the correct changes.
🚀 Running the Project
1️⃣ Install Dependencies
sh
Copy
Edit
npm install
2️⃣ Start the Server
sh
Copy
Edit
npm start
3️⃣ Run Playwright Tests
sh
Copy
Edit
npx playwright test
4️⃣ View Test Report
sh
Copy
Edit
npx playwright show-report
📂 Project Structure
bash
Copy
Edit
📦 task-manager-api
├── 📂 config/               # Configuration files
├── 📂 controllers/          # API controllers
├── 📂 models/               # Mongoose models
├── 📂 routes/               # API routes
├── 📂 tests/                # Playwright test cases
├── server.js                # Express server setup
├── package.json             # Dependencies & scripts
└── .env                     # Environment variables
🔍 Features
✅ Create, Read, Update, Delete (CRUD) Tasks
✅ MongoDB Integration for persistent data storage
✅ Automated API Testing with Playwright
✅ Metamorphic Testing for Robustness Verification
✅ Detailed Test Reports with Playwright Dashboard
