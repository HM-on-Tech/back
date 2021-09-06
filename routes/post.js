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
        author: req.body.author,
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
    console.log(result)
    return res.status(200).json(result);
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


router.get('/get/:edit', async (req, res, next) => {  
  const editId = req.params.edit;
  const result = await Post.findByPk(editId)
  return res.status(200).json(result);
});

router.post('/edit/:edit', async (req, res, next) => {  
  const editId = req.params.edit;
  const { title, content, author} = req.body;

  const result = await Post.update(
    {title: title, content: content, author: author,},
    { where: { id: editId}}
  )
  if (result[0] == 1) {
    return res.status(200).json({'result':'success'});
  }
  return res.status(500).json({'result':'failed'})
});

module.exports = router;