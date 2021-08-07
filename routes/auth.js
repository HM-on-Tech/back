const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');


router.post('/', async (req, res, next) => {  
  try {
    const { accessToken, name} = req.body;


    const hashed = await bcrypt.hash(accessToken, 10)
    const findUser = await User.findOrCreate({
      where: {
          name: name,
          password: hashed,
        }
      })
    
    const id = findUser[0].id
    const isAdmin = findUser[0].isAdmin
        
    const token = jwt.sign(req.body, 'RS256');

    return res.status(200).json({id, isAdmin, name,token});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
