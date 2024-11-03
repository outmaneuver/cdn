# Backend

This directory contains the backend part of the Content Management System project. The backend is built using Node.js, Express.js, and TypeScript. It provides a REST API for managing and delivering digital content, as well as handling authentication and data persistence.

## Setup Instructions

### Prerequisites
- Node.js 16+
- MongoDB
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```

## Usage Examples

### Example 1: Creating a New Content Item
1. Make a POST request to the backend API endpoint `/api/content` with the content data.
2. The backend will save the content to the database and return the created content item.

### Example 2: Fetching Content Items
1. Make a GET request to the backend API endpoint `/api/content`.
2. The backend will return a list of content items from the database.

## Running the Backend Server

1. Start the backend server:
```bash
npm start
```

## Configuring Environment Variables

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
