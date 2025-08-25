## Resume Builder Application

## Introduction

The Resume Builder Application is a full-stack web application that enables users to create, customize, and download professional resumes. It provides multiple templates, customization options, and an intuitive interface that makes resume building simple and efficient.

The app also supports user authentication and authorization, allowing users to securely register, log in, and manage their resumes. With features like editing, theme selection, previewing, and PDF export, it solves the common problem of creating a visually appealing and ATS-friendly resume without requiring advanced design skills.

## Project Type

Fullstack

## Deployed App

- Frontend: https://resume-builder-frontend-5yy4.onrender.com
- Backend: https://resume-builder-backend-0x50.onrender.com
- Database: MongoDB Atlas (cloud-hosted)

## Directory Structure

```bash
resume-builder/
├─ backend/
│ ├─ controllers/
│ ├─ models/
│ ├─ routes/
│ ├─ middlewares/
│ ├─ server.js
├─ frontend/
│ ├─ public/
│ ├─ src/
│ │ ├─ components/
│ │ ├─ contexts/
│ │ ├─ pages/
│ │ ├─ utils/
│ │ ├─ App.js
```

## Video Walkthrough of the Project

https://drive.google.com/file/d/1ppFAJ4i9ttLjXetk274APLZuto4jKnAv/view?usp=sharing

## Features

- User authentication (signup & login) with JWT and bcrypt
- Secure password storage with hashing
- Authorization for protected routes
- Create, view, edit, delete resumes
- Multiple professional templates to choose from
- Resume preview option
- Download resumes as PDF using html2pdf.js and jsPDF
- Upload and display images using Multer
- Responsive design with Tailwind CSS
- Real-time notifications with React Hot Toast & React Toastify

## Design Decisions or Assumptions

- Chose MongoDB as the database for flexibility in handling dynamic resume fields
- Used JWT for scalable authentication instead of sessions
- Multer was used for image handling to allow profile pictures or resume thumbnails
- Tailwind CSS was chosen for rapid UI development and consistent styling
- Assumed that users would prefer downloading resumes in PDF format for easy sharing and printing

## Installation & Getting Started

Clone the repository and install dependencies for both frontend and backend.

# Clone repo

```bash
git clone https://github.com/yogitaj-30/Resume-Builder.git
cd Resume-Builder
```

# Backend setup

```bash
cd backend
npm install
npm start  # starts backend server
```

# Frontend setup

```bash
cd frontend
npm install
npm run dev # starts frontend dev server
```

## Database

MongoDB Atlas connection string is required in .env file:
PORT=your_port
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

## Usage

- Register a new account or log in.
- Navigate to the dashboard.
- Create a new resume by filling in your details.
- Choose a template and theme.
- Preview and download your resume as PDF.

## Credentials

You can use your email id and password:
Email: testuser@gmail.com
Password: test1234

## APIs Used

This project does not depend on external APIs. It uses an internally built backend with Express & MongoDB.

# API Endpoints

Auth Routes

- POST /api/auth/register → Register a new user
- POST /api/auth/login → Login user and get JWT
- GET /api/auth/profile → Get user's profile(protected)

Resume Routes (Protected)

- POST /api/resume → Create a new resume
- GET /api/resume → Get all resumes of logged-in user
- GET /api/resume/:id → Get particular resume by resume id

- PUT /api/resume/:id → Update a resume
- PUT /api/resume/:id/upload-images → Upload images

- DELETE /api/resume/:id → Delete a resume

## Technology Stack

Frontend

- React.js (v19)
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast / Toastify
- jsPDF, html2canvas, html2pdf.js

Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- Bcrypt (for hashing passwords)
- JWT (for authentication)
- Multer (for image uploads)

✨ This project demonstrates a production-ready full-stack MERN application with authentication, file handling, and PDF export features.
