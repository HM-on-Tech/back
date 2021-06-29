const express = require('express');


const router = express.Router();


router.post('/hello', async (req, res, next) => {
  try {
    console.log('router connected')
    res.status(200).json(9999999);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;