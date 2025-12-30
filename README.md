# Student Feedback Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows students to submit and view feedback comments. Built as a Single Page Application (SPA) with a modern, responsive user interface.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- ✍️ **Submit Feedback**: Users can submit their name and feedback message
- 📋 **View All Feedback**: Display all submitted feedback in a beautiful list
- 💾 **Persistent Storage**: All feedback is stored in MongoDB database
- 🎨 **Modern UI**: Clean, responsive design with animations
- ⚡ **Real-time Updates**: Instant feedback display after submission

## Tech Stack

### Frontend
- **React** - UI library with functional components
- **React Hooks** - useState, useEffect for state management
- **CSS3** - Modern styling with animations and responsive design
- **Fetch API** - HTTP requests to backend

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB** - NoSQL database (local or MongoDB Atlas)

## Project Structure

```
week_16/
├── backend/
│   ├── models/
│   │   └── Feedback.js      # Mongoose schema/model
│   ├── server.js            # Express server & API routes
│   └── package.json         # Backend dependencies
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeedbackForm.js   # Form component
│   │   │   ├── FeedbackList.js   # List component
│   │   │   └── FeedbackItem.js   # Individual feedback
│   │   ├── App.js           # Main app component
│   │   ├── App.css          # Styles
│   │   └── index.js         # React entry point
│   └── package.json         # Frontend dependencies
└── README.md
```

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account)
  - Local: [Download MongoDB](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/student-feedback-tracker.git
cd student-feedback-tracker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from example or create new)
# Add your MongoDB connection string:
# MONGODB_URI=mongodb://localhost:27017/student_feedback
# PORT=5000

# Start the server
npm start
# Or for development with auto-reload:
npm run dev
```

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/feedback` | Fetch all feedback |
| POST | `/api/feedback` | Submit new feedback |
| GET | `/api/health` | Server health check |

### Example API Responses

**GET /api/feedback**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "message": "Great course!",
      "createdAt": "2024-12-30T10:00:00.000Z"
    }
  ]
}
```

**POST /api/feedback**
```json
// Request body
{
  "name": "Jane Smith",
  "message": "Very helpful content!"
}

// Response
{
  "success": true,
  "message": "Feedback submitted successfully",
  "data": {
    "_id": "...",
    "name": "Jane Smith",
    "message": "Very helpful content!",
    "createdAt": "2024-12-30T10:30:00.000Z"
  }
}
```

## MongoDB Setup Options

### Option 1: Local MongoDB
1. Install MongoDB Community Server
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/student_feedback`

### Option 2: MongoDB Atlas (Cloud)
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and replace in `.env`:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/student_feedback?retryWrites=true&w=majority
```

## Deployment to GitHub

```bash
# Initialize git repository (if not already)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Student Feedback Tracker MERN App"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/student-feedback-tracker.git

# Push to GitHub
git push -u origin main
```

## Screenshots

The application features:
- 🎨 Dark theme with gradient accents
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🎯 Clean, intuitive user interface

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/student_feedback
PORT=5000
```

## Error Handling

The application includes:
- ✅ Input validation on both frontend and backend
- ✅ Try-catch blocks for database operations
- ✅ User-friendly error messages
- ✅ Loading states during API calls

## License

This project is licensed under the MIT License.

## Author

Created for educational purposes - MERN Stack Assignment

---

**Note**: Make sure MongoDB is running before starting the backend server!

