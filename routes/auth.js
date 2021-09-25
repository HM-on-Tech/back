const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');


router.post('/', async (req, res, next) => {  
  try {
    const { name, email } = req.body;

    const findUser = await User.findOne({ where: {email: email} })
    // No user, sign up
    if (findUser == null) { 
      return res.status(200).json({statusCode:0, message: "No user in Database"})
    }
    const requestToken = jwt.sign({ _id: findUser }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // res.cookie('token', requestToken, { expiresIn: '1d' });
    
    return res.status(200).json({'user': findUser, 'requestToken':requestToken});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
