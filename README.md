# 🇮🇳 BharatConnect – Swadeshi Transportation & Logistics Platform

A full‑stack **Swadeshi Transportation & Logistics platform** built using the **MERN stack with AI integration**. BharatConnect connects **Shippers and Drivers** on a unified digital ecosystem to simplify booking, vehicle management, routing, and logistics operations — supporting the vision of **Atmanirbhar Bharat**.

---

## 📑 Table of Contents

* Project Preview
* About the Project
* Features
* Tech Stack
* Folder Structure
* Installation
* Environment Variables
* Usage
* API Endpoints
* AI Assistant (SetuAI)
* Deployment
* Contributing
* License
* Contact

---

## 📸 Project Preview

### Platform Screenshots

<img width="1888" height="858" src="https://github.com/user-attachments/assets/f2850a6d-c52d-449d-a900-fada3c6900a2" />
<img width="1893" height="866" src="https://github.com/user-attachments/assets/dbd3b4e8-2fc3-4bec-9d59-23618ce5bed9" />
<img width="1906" height="854" src="https://github.com/user-attachments/assets/63501248-0cdb-40df-9dbb-51399a867b9a" />
<img width="1882" height="863" src="https://github.com/user-attachments/assets/fa0e99bd-a937-4432-a519-1ad5ec2b3670" />
<img width="1906" height="867" src="https://github.com/user-attachments/assets/2992db3d-d16c-4d35-b1f6-ed699a0740fe" />

### 🚛 Driver Dashboard

<img width="1901" height="860" src="https://github.com/user-attachments/assets/152abf78-1611-48a7-9a7f-4844f93b8055" />
<img width="1897" height="865" src="https://github.com/user-attachments/assets/684540a5-bc6e-4b61-bb4e-3bd49fe18cda" />

---

## 🧠 About the Project

**BharatConnect** is a modern logistics management platform designed specifically for India’s transportation ecosystem. It enables:

* Easy transport booking for shippers
* Vehicle and trip management for drivers
* Intelligent logistics assistance via AI

The platform follows a **secure, scalable, role‑based architecture** using:

* JWT authentication
* OTP verification
* Cloud‑based infrastructure
* AI integration for enhanced logistics workflows

---

## ✨ Features

* 🔐 Secure authentication (JWT + OTP)
* 👥 Role‑based access (Shipper & Driver)
* 🚛 Vehicle management system
* 📦 Transport booking lifecycle
* 🗺️ Live route mapping & distance calculation
* 💰 Dynamic fare calculation
* 🤖 SetuAI – AI logistics assistant
* 📊 Booking status tracking
* 🇮🇳 Built for Indian logistics ecosystem

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database & Storage

* MongoDB Atlas
* Redis (Caching & OTP storage)
* Cloudinary (Vehicle media storage)

### Authentication & Security

* JWT Authentication
* OTP Verification

### Maps & Routing

* OpenStreetMap
* OSRM Routing Engine

### AI Integration

* Gemini API (SetuAI Assistant)

### Additional Tools

* Nodemailer (Email Service)
* Node Runtime
* npm Package Manager

---

## 📂 Folder Structure

```
Transportation-and-Logistics
│
├── f (Frontend)
│   ├── components
│   ├── pages
│   └── App.jsx
│
├── b (Backend)
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middlewares
│   ├── services
│   └── index.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```
git clone https://github.com/Kush-012/Transportation-and-Logistics
cd Transportation-and-Logistics
```

### Install Backend Dependencies

```
cd b
npm install
```

### Install Frontend Dependencies

```
cd ../f
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in root directory:

```
# MongoDB
mongodburl="mongodb://localhost:27017/"

# JWT Authentication
JWT_SECRET=
JWT_EXPIRE=8h

# SMTP Configuration
SMTP_USER=
SMTP_PASS=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Redis
redis_endpoint=
redis_password=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Open Route Service
ORS_KEY=

# Gemini API
GEMINI_API_KEY=
```

---

## ▶️ Usage

### Start Backend

```
cd b
nodemon index.js
```

Backend runs at:

```
http://localhost:4500
```

### Start Frontend

```
cd f
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

### Authentication

* POST `/signup`
* POST `/login`
* POST `/resetpassword`

### Vehicles

* POST `/addvehicle`
* GET `/viewvehicle`
* POST `/updatevehicle/:vehicleNo`
* DELETE `/deletevehicle`

### Booking

* POST `/createbooking`
* GET `/getbooking`
* POST `/updatebooking/:bookingid`

### AI Assistant

* POST `/api/ai`

---

## 🤖 AI Assistant – SetuAI

SetuAI is an AI logistics assistant powered by Gemini API. It helps users with:

* Logistics queries
* Booking assistance
* Route information
* Platform‑specific support

It is tailored specifically for BharatConnect logistics workflows.

---

## 🚀 Deployment

Supported deployment platforms:

* Render
* Railway
* Vercel (Frontend)
* AWS / DigitalOcean

Ensure configuration of:

* Environment variables
* MongoDB connection
* Backend/frontend URLs

---

## 🤝 Contributing

Contributions are welcome and appreciated.

### Steps to Contribute:

1. Fork the repository
2. Create a branch:

   ```
   git checkout -b feature-name
   ```
3. Commit changes
4. Push branch
5. Open Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Contact

**Kush Mehta**

GitHub: [https://github.com/Kush-012](https://github.com/Kush-012)
LinkedIn: [https://www.linkedin.com/in/kushm1](https://www.linkedin.com/in/kushm1)
Email: [kushmehta124@gmail.com](mailto:kushmehta124@gmail.com)
