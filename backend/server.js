const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const File = require('./models/File');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/cdn?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/files', fileRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
