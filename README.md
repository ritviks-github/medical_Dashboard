# Medical Dashboard

A full-stack web application designed to manage and view patient information, built with React (front-end), Node.js/Express (back-end), and MongoDB (database). The app provides a responsive and intuitive interface for healthcare professionals to track patient details, search by mobile number, and view medical history and treatment plans.
It also provides an Administrator functionality to grant or Reject authorization requests for mediclaim

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)

## Features

- **Patient Management:** View and manage detailed patient information.
- **Search Functionality:** Filter patients by mobile number.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **REST API:** A Node.js-based API for handling patient data operations.
- **Error Handling:** User-friendly error messages and feedback.

## Technologies Used

### Front-end
- **React**
- **CSS/Bootstrap** for styling

### Back-end
- **Node.js**
- **Express.js**
- **MongoDB** using Mongoose for database operations

  
## Project Structure

```plaintext
medical-dashboard/
├── client/                 # Front-end React application
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components (Sidebar, Patient Table, etc.)
│       ├── pages/          # Pages (Dashboard, PatientInfo, etc.)
│       ├── App.js
│       └── index.js
├── server/                 # Back-end Express application
│   ├── models/             # MongoDB models
│   ├── routes/             # API route definitions
│   ├── server.js           # Server setup
│   └── config/             # Database and environment configurations
└── README.md               # Project documentation
```

**Installation**
Follow these steps to set up the project locally.

**Prerequisites**
->Node.js (v14 or higher)
->npm or yarn
->MongoDB (local or cloud instance)

**Clone the Repository**
git clone https://github.com/ritviksgit16/medical_dashboard.git
cd medical_dashboard


**Front-end Setup**
1)Navigate to the client directory:
cd client
2)Install the dependencies:
npm install axios react-router-dom

**Back-end Setup**
1)Navigate to the server directory:
cd server
2)Install the dependencies:
npm install express mongoose mongodb cors bcrypt jsonwebtoken
3) You need not setup mongodb database, I've provided the url for my mongodb database being used, as it contains sample data which you can use
**
Running the Application
Start the Back-end Server**

cd server
npm start

**
Start the Front-end Server**

cd client
npm start

**
The application should be running on:
**
Front-end: http://localhost:3000
Back-end: http://localhost:5000

Note - the frontend port being used may vary, it will use any free port of you system
Note - If you want to explore out the admin functionality, sample email is : example@gmail.com, password : 123456
   
