const express = require('express');


const router = express.Router();


router.post('/', async (req, res, next) => {
  try {
    console.log('router connected')
    const url = req.body.url
    console.log('///////', url)
    res.status(200).json(url);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;