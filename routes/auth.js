const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');


router.post('/', async (req, res, next) => {  
  try {
    const { accessToken, name} = req.body;

    let user = null;
    const hashed = await bcrypt.hash(accessToken, 10);

    const findUser = await User.findOne({
      where: {
          name: name,
          googleAccessToken: accessToken,
        }
      })
    // No user, sign up
    if (findUser === null) { 
      user = await User.create({
        name: name,
        password:hashed,
        googleAccessToken: accessToken,
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
