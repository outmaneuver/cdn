const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  uploadSettings: {
    fileLength: {
      type: Number,
      default: 0,
    },
    uploadPassword: {
      type: String,
      default: '',
    },
  },
  bioPage: {
    name: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    socialLinks: [
      {
        platform: {
          type: String,
          default: '',
        },
        url: {
          type: String,
          default: '',
        },
      },
    ],
    profilePicture: {
      type: String,
      default: '',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
