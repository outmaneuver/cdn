# Frontend

This directory contains the frontend part of the Content Management System project. The frontend is built using React, TypeScript, and Material-UI. It provides a user interface for managing and delivering digital content, as well as handling user authentication and interaction.

## Setup Instructions

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```

## Usage Examples

### Example 1: Creating a New Content Item
1. Navigate to the content creation page in the frontend application.
2. Fill in the content details and submit the form.
3. The frontend will send a request to the backend API to create the content item and display the result.

### Example 2: Fetching Content Items
1. Navigate to the content list page in the frontend application.
2. The frontend will fetch the list of content items from the backend API and display them.

## Running the Frontend Server

1. Start the frontend server:
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
REACT_APP_API_URL=http://localhost:5000/api
```
