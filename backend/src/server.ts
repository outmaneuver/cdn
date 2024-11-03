// backend/src/server.ts
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'CDN API Running' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});