const express = require('express');
const { Post, Publication } = require('../models');


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
        author: req.body.author,
    })

    res.status(200).json({data: result});
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
    await Post.destroy({ where: { id: ids }})
    
    return res.status(200).json({data:'successfully deleted', id: ids});
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

router.post('/publication', async (req, res, next) => {  
  try {
    const name = req.body.name;
    const result = await Publication.findOne({
      where: {name:name},
      include: {
        model: Post,
      }
    })
    console.log('--==-=-=-=-=-=-=-=')
    console.log(result)

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;