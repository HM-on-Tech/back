const express = require('express');
const { Publication } = require('../models');


const router = express.Router();


/**
 * Add InitTable information to the database
 */
router.post('/add', async (req, res, next) => {  
  try {
    const existPublication = await Publication.findOne({where: {name: req.body.name}})

    if ( existPublication ) return res.json(null);

    const result = await Publication.create(req.body)

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/list', async (req, res, next) => {  
  try {
    const result = await Publication.findAll()
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/remove', async (req, res, next) => {  
  try {

    const ids = req.body;
    await Publication.destroy({ where: { id: ids }})
    
    return res.status(200).json({data:'successfully deleted', id: ids});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;