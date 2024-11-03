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
- Backend: Node.js + Express.js, TypeScript, MongoDB + Mongoose
- Frontend: React 18, TypeScript, Material-UI, React Query
- Testing: Jest + React Testing Library

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

2. Install all dependencies:
```bash
npm run install-all
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the 

.env

 file with your configuration:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/cdn?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

### Development

Run both frontend and backend in development mode:
```bash
npm run dev
```

### Production Build

Build both frontend and backend:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Contribution Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request