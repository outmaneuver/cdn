import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from '../config';
import routes from './routes';
import path from 'path';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', routes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist/client')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/client/index.html'));
  });
}

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app; 