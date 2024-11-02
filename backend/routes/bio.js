const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/create', async (req, res) => {
  const { userId, name, bio, socialLinks, profilePicture } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bioPage = { name, bio, socialLinks, profilePicture };
    await user.save();

    res.status(201).json({ message: 'Bio page created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.bioPage);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update', async (req, res) => {
  const { userId, name, bio, socialLinks, profilePicture } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bioPage = { name, bio, socialLinks, profilePicture };
    await user.save();

    res.json({ message: 'Bio page updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
