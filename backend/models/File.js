const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  fileLength: {
    type: Number,
    default: 0,
  },
  uploadPassword: {
    type: String,
    default: '',
  },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
