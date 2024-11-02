const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const File = require('./models/File');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const bioRoutes = require('./routes/bio');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/cdn?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/bio', bioRoutes);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
