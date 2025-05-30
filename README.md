
# 🚆 IRCTC Railway Booking System (Backend)

A backend API that simulates a real-world railway seat booking system inspired by IRCTC. Built using **Node.js**, **Express**, and **PostgreSQL** with secure JWT authentication, role-based access, and proper concurrency handling.

---

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/manasvirana/IRCTC.git
cd IRCTC
````

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file  and fill in your database credentials and JWT secret.

4. **Create Database and Tables**

Import the SQL schema using `psql`:

```bash
psql -U your_username -d your_database -f schema.sql
```

5. **Start the server**

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

---

## 🔐 Authentication

* JWT is used to protect user endpoints.
* `x-api-key` header is required for all **admin-only** actions.

---

## 📂 Folder Structure

```
IRCTC/
├── controllers/        # Route logic (Users, Trains, Bookings)
├── middlewares/        # Auth, Role checks, API Key verification
├── models/             # DB queries and logic
├── routes/             # Route definitions
├── utils/              # DB connection & helpers
├── schema.sql          # DB schema setup
├── server.js           # Entry point
├── package.json
├── .env.example
├── README.md
```

---

## 📸 API Endpoints (via Postman)

### ✅ Register User

![Register User Screenshot](![Screenshot 2025-05-30 134805](https://github.com/user-attachments/assets/8bcbd96b-a0e7-4627-8006-34c5e69d1528)


---

### 🔐 Login User

![Login User Screenshot](https://github.com/user-attachments/assets/67f5a833-bf68-49ac-a386-35f0c4d77159)

---

### ➕ Add Train (Admin Only)

![Add Train Screenshot](https://github.com/user-attachments/assets/6ed02df1-87cf-4517-b37b-7ddce309fe26)

---

### 📊 Check Seat Availability

![Seat Availability Screenshot](https://github.com/user-attachments/assets/4df5329a-4f8d-40bb-b70b-e1141170f71c)

---

### 🎫 Book Seat

![Book Seat Screenshot](https://github.com/user-attachments/assets/e792bbfc-5f4c-4979-85b3-121ad9b23684)

---

### 📄 Get Booking Details

![Get Booking Screenshot](https://github.com/user-attachments/assets/7232960f-80b8-4965-9a8c-63d4f7cfe5c5)

---

### 🗃️ Database Previews

#### 🔒 Users Table (Passwords Hashed)

![Users Table](https://github.com/user-attachments/assets/3d8709ea-bd7d-4644-9a4d-60602e6c0fee)

#### 📋 All Tables Overview

![All Tables](https://github.com/user-attachments/assets/aaacdf5a-2211-4f70-9737-fc01c80417aa)

---

## 📌 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **Authentication:** JWT, bcrypt
* **Admin Auth:** x-api-key based middleware

---

## 🧠 Features

* User registration & login with hashed passwords
* Admin-only train management (Add new trains)
* Seat availability checks
* Secure seat booking with concurrency-safe logic
* Role-based access and token protection

---

## 📄 .env.example

```env
# Server Port
PORT=3000

# PostgreSQL Database URL
DATABASE_URL=postgres://your_username:your_password@localhost:5432/your_database_name

# JWT Secret for signing tokens
JWT_SECRET=your_jwt_secret_here

# Admin API Key for admin-only routes
ADMIN_API_KEY=your_admin_api_key_here
```
### ⚠️ Note on Admin Authentication

In this project, admin-only routes (like adding trains) are protected by requiring an API key (`x-api-key` header). However, during user registration and login, the admin API key is **not** required. Instead, users can be assigned the role `"admin"` or `"user"` via the registration request.

This design keeps the authentication flow straightforward and meets the project requirements. For a real-world system, admin registration and login could also verify the API key, and role-based access control can be strengthened by checking user roles in JWT tokens.

This note is added to clarify the current approach and possible future improvements.


