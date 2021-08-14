const express = require('express');
const { Post } = require('../models');


const router = express.Router();


/**
 * Add InitTable information to the database
 */
router.post('/add', async (req, res, next) => {  
  try {
    console.log('post add request on the server.')
    const result = await Post.create({
        title: req.body.title,
        content: req.body.content,
    })

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/list', async (req, res, next) => {  
  try {
    const result = await Post.findAll()
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post('/remove', async (req, res, next) => {  
  try {
    const ids = req.body;

    const result = await Post.destroy({ where: { id: ids }})
    if (result === 1) {
      // succ
      return res.status(200).json({data:'successfully deleted'});
    }
    return res.status(500).json({data: 'failed to delete'})
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.post('/', async (req, res, next) => {  
  try {
    const blogId = req.body.blogId;
    const result = await Post.findByPk(blogId)
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;