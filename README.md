# BharatConnect – Swadeshi Transportation & Logistics Platform

A full-stack Swadeshi Transportation & Logistics platform built using the MERN stack with AI integration.

BharatConnect connects Shippers and Drivers on a unified digital platform to simplify bookings, vehicle management, routing, and logistics operations — supporting the vision of Atmanirbhar Bharat 🇮🇳.

---

## Table of Contents

- ### Images of Project
- ### About the Project
- ### Features
- ### Tech Stack
- ### Folder Structure
- ### Installation
- ### Environment Variables
- ### Usage
- ### API Endpoints
- ### AI Assistant (SetuAI)
- ### Deployment
- ### Contributing
- ### License
- ### Contact

---
<img width="1888" height="858" alt="image" src="https://github.com/user-attachments/assets/f2850a6d-c52d-449d-a900-fada3c6900a2" />
<img width="1893" height="866" alt="image" src="https://github.com/user-attachments/assets/dbd3b4e8-2fc3-4bec-9d59-23618ce5bed9" />
<img width="1906" height="854" alt="image" src="https://github.com/user-attachments/assets/63501248-0cdb-40df-9dbb-51399a867b9a" />
<img width="1882" height="863" alt="image" src="https://github.com/user-attachments/assets/fa0e99bd-a937-4432-a519-1ad5ec2b3670" />
<img width="1906" height="867" alt="image" src="https://github.com/user-attachments/assets/2992db3d-d16c-4d35-b1f6-ed699a0740fe" />
## Driver Dashboard:
<img width="1901" height="860" alt="image" src="https://github.com/user-attachments/assets/152abf78-1611-48a7-9a7f-4844f93b8055" />
<img width="1897" height="865" alt="image" src="https://github.com/user-attachments/assets/684540a5-bc6e-4b61-bb4e-3bd49fe18cda" />


 
## About the Project

BharatConnect is a smart logistics management platform designed specifically for the Indian transportation ecosystem.

It allows:

Shippers to book transport easily
Drivers to manage vehicles, bookings, and trips efficiently
The platform includes SetuAI, an AI-powered assistant that provides logistics-related help, booking guidance, and route assistance.

The system follows a secure, scalable, role-based architecture using:

JWT authentication
OTP verification
Redis caching
Cloud-based media storage
---

## Features

Secure authentication with JWT & OTP

Role-based access (Shipper & Driver)

Vehicle management (Add, Update, View)

Transport booking & order lifecycle

Live route mapping & distance calculation

Dynamic fare calculation

SetuAI – AI assistant for logistics & support

Booking status management (Pending, Paid, Accepted, Ongoing, Completed)

Built for Indian logistics & transport use-cases

---

## Tech Stack
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB (MongoDB Atlas)
- Caching & OTP Storage: Redis
- Authentication: JWT, OTP-based verification
- Media Storage: Cloudinary (vehicle images)
- Maps & Routing: OpenStreetMap, OSRM
- AI Integration: Gemini API (SetuAI Assistant)
- Email Service: Nodemailer (Gmail SMTP)
- Runtime: Node.js
- Package Manager: npm


## Folder Structure
```
/Transportation-and-Logistics
│── /f
│   ├── /components
│   ├── /pages
│   └── App.jsx
│
│── /b
│   ├── /controllers
│   ├── /routes
│   ├── /models
│   ├── /middlewares
│   ├── /services
│   ├── index.js
│
│── .env
│── package.json
└── README.md
```
---

## Installation

- Clone the repository
git clone https://github.com/Kush-012/Transportation-and-Logistics
- cd Transportation-and-Logistics
- cd b 
- Install dependencies
- npm install
- cd f
- npm install
- Setup Environment Variables

Create a .env file in the root directory:
```
# MongoDB
mongodburl="mongodb://localhost:27017/"

#JWT Authentication
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
CLOUDINARY_API_SECRET=-

#Open Source Route
ORS_KEY=

# Gemini api
GEMINI_API_KEY= 
```


- Usage
  
```
Start Backend Server
nodemon index.js
Server runs at: http://localhost:4500

Start Frontend
npm run dev
Frontend runs on http://localhost:5173

```

---

## API Endpoints
```
Authentication

POST /signup – User registration with OTP

POST /login – Login user

POST /resetpassword – Reset password with OTP

Vehicles

POST /addvehicle – Add vehicle (Driver)

GET /viewvehicle – View all vehicles

POST /updatevehicle/:VechicleNo – Update vehicle

DELETE /deletevehicle – Delete vehicle

Booking

POST /createbooking – Create booking

GET /getbooking – Get bookings

POST /updatebooking/:bookingid – Update booking status

AI

POST /api/ai – SetuAI assistant
```

---

## AI Assistant – SetuAI

SetuAI is an AI assistant integrated using Gemini API.

It helps users with:

- Logistics queries

- Booking issues

- Route & vehicle information

- Platform-specific assistance

SetuAI is issue-focused, not generic, and tailored specifically for BharatConnect.

---

## Deployment

You can deploy this project on:

- Render

- Railway

- Vercel (Frontend)

- AWS / DigitalOcean

Make sure to configure:

- Environment variables

- MongoDB connection

- Backend & frontend URLs

---

## How to Contribute

We welcome contributions from the community!

Step 1: Fork the repository
Click the Fork button at the top right.

Step 2: Clone your fork
git clone https://github.com/Kush-012/Transportation-and-Logistics.git

Step 3: Create a new branch
git checkout -b feature/your-feature-name

Step 4: Make your changes
Follow coding best practices and maintain clean, readable code.

Step 5: Commit your changes
git commit -m "Add: meaningful commit message"

Step 6: Push your branch
git push origin feature/your-feature-name

Step 7: Create a Pull Request
Open a Pull Request describing your changes clearly.

---
## Contribution Guidelines

Follow consistent code formatting

Use meaningful commit messages

Do not push directly to main

Test your changes before submitting

---

## License

This project is licensed under the MIT License.

---

## Contact

Kush Mehta

GitHub: https://github.com/Kush-012

LinkedIn: https://www.linkedin.com/in/kushm1

Email: kushmehta124@gmail.com
