const express = require('express');
const router = express.Router();
const { User } = require('../models');


router.post('/add', async (req, res, next) => {  
  try {
    const { name, email, role } = req.body;
    if (name.trim() === '' || email.trim() === '' ) {
      return res.status(200).json({status:1, message: 'fill in the blank'});

    }
    const findUser = await User.findOne({ where: {email: email} })
    // No user, sign up
    if (findUser == null) { 
      const user  = await User.create(req.body);
      return res.status(200).json(user);
    }
    return res.status(201).json({status:1, message: 'user already exist'});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/list', async (req, res, next) => {  
  try {
    const users = await User.findAll();
    return res.status(201).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post('/edit', async (req, res, next) => {  
  try {
    const id = req.body.targetUserId;
    const { email, name, role } = req.body;

    const user = await User.findByPk(id);
    user.email = email;
    user.name = name;
    user.role = role;
    user.save()
    
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/remove', async (req, res, next) => {  
  try {
    const selectionModel = req.body;
    await User.destroy({ where: { id: selectionModel }})
    return res.status(201).json(selectionModel);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
