const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');


router.post('/', async (req, res, next) => {  
  try {
    const { googleId, name, organization} = req.body;

    let user = null;
    const hashed = await bcrypt.hash(googleId, 10);

    const findUser = await User.findOne({
      where: {
          name: name,
          googleId: googleId,
        }
      })
    // No user, sign up
    if (findUser === null) { 
      user = await User.create({
        name: name,
        password:hashed,
        googleId: googleId,
        organization:organization,
        isAdmin: false,
      })
    } else {
      user = findUser
    }

    const requestToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', requestToken, { expiresIn: '1d' });

    const {id , isAdmin} = user

    return res.status(200).json({'user': {id, isAdmin, name}, 'requestToken':requestToken});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
