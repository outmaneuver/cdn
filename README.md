# CDN System

This repository contains a CDN system with a dashboard that allows users to upload files to a site that serves as a files CDN. The system includes both backend and frontend implementations using JavaScript.

## Features

- User registration and login
- File upload with configurable file length and upload password
- User dashboard to view, copy URL, and delete uploads
- Upload statistics and data usage display
- Profile page to change password and view registration email
- Settings page to edit upload settings
- Dynamic ShareX config generation based on user settings

## Backend

The backend is implemented using Node.js and Express, providing the following endpoints:

### User Authentication

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login a user

### File Management

- `POST /files/upload`: Upload a file
- `GET /files`: Get a list of user files
- `DELETE /files/:id`: Delete a file
- `GET /statistics`: Get upload statistics
- `GET /sharex-config`: Generate ShareX config dynamically

### Models

- `User`: Mongoose schema for user data
- `File`: Mongoose schema for file data

## Frontend

The frontend is implemented using React, providing the following components:

- `App`: Main React component for the dashboard
- `Register`: Component for user registration
- `Login`: Component for user login
- `Dashboard`: Component for the user dashboard
- `FileUpload`: Component for file upload
- `FileList`: Component for displaying user uploads
- `Statistics`: Component for displaying upload statistics
- `Profile`: Component for user profile
- `Settings`: Component for user settings

## Setup

### Backend

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Register a new user on the registration page.
2. Login with the registered user credentials.
3. Use the dashboard to upload files, manage uploads, and view statistics.
4. Edit profile and upload settings as needed.
5. Generate ShareX config dynamically based on user settings.

## API Endpoints

### User Authentication

- `POST /auth/register`
  - Request body: `{ "username": "string", "password": "string", "email": "string" }`
  - Response: `{ "message": "User registered successfully" }`

- `POST /auth/login`
  - Request body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "string" }`

### File Management

- `POST /files/upload`
  - Request headers: `{ "Authorization": "Bearer <token>" }`
  - Request body: `{ "file": "file", "fileLength": "number", "uploadPassword": "string" }`
  - Response: `{ "message": "File uploaded successfully", "file": "object" }`

- `GET /files`
  - Request headers: `{ "Authorization": "Bearer <token>" }`
  - Response: `[ { "fileName": "string", "url": "string", "fileLength": "number", "uploadPassword": "string" } ]`

- `DELETE /files/:id`
  - Request headers: `{ "Authorization": "Bearer <token>" }`
  - Response: `{ "message": "File deleted successfully" }`

- `GET /statistics`
  - Request headers: `{ "Authorization": "Bearer <token>" }`
  - Response: `{ "totalFiles": "number", "totalDataUsed": "number" }`

- `GET /sharex-config`
  - Request headers: `{ "Authorization": "Bearer <token>" }`
  - Response: `{ "Name": "string", "DestinationType": "string", "RequestType": "string", "RequestURL": "string", "FileFormName": "string", "Headers": "object", "Arguments": "object" }`
