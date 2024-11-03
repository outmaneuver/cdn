# Content Management System

A fullstack TypeScript application for managing and delivering digital content with secure authentication.

## Features

- 🔐 JWT-based authentication
- 📄 Content management dashboard
- 🚀 Express.js REST API
- 💾 MongoDB data persistence
- 🔄 Real-time content updates
- 📱 Responsive React frontend
- 🔍 Search functionality
- 📊 Analytics dashboard

## Tech Stack

### Backend
- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Jest for testing

### Frontend
- React 18
- TypeScript
- Material-UI
- React Query
- Jest + React Testing Library

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/username/project.git
cd project
```
2. Install dependencies:
```bash
npm run install-all
```

### Running the Servers

#### Backend Server
1. Navigate to the backend directory:
```bash
cd backend
```
2. Start the backend server:
```bash
npm start
```

#### Frontend Server
1. Navigate to the frontend directory:
```bash
cd frontend
```
2. Start the frontend server:
```bash
npm start
```

### Configuring Environment Variables

1. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
2. Update the `.env` file with your configuration:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/cdn?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

## Usage Examples

### Example 1: Creating a New Content Item
1. Make a POST request to the backend API endpoint `/api/content` with the content data.
2. The backend will save the content to the database and return the created content item.

### Example 2: Fetching Content Items
1. Make a GET request to the backend API endpoint `/api/content`.
2. The backend will return a list of content items from the database.

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
```bash
git checkout -b feature/your-feature-name
```
3. Commit your changes:
```bash
git commit -m "Add your commit message"
```
4. Push to the branch:
```bash
git push origin feature/your-feature-name
```
5. Create a pull request.

We welcome contributions from the community! Please make sure to follow the code of conduct and adhere to the coding standards.

