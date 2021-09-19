const express = require('express');
const { Post } = require('../models');


const router = express.Router();


/**
 * Add InitTable information to the database
 */
router.post('/add', async (req, res, next) => {  
  try {
    console.log('post add request on the server.')
    console.log(req.body)
    const result = await Post.create(
        req.body
)

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

router.get('/get/:article', async (req, res, next) => {  
  const articleId = req.params.article;
  // Get Article info
  const result = await Post.findByPk(articleId)

  // Database => ViewCount + 1
  await Post.update({viewCount: result.viewCount + 1}, { where: {id: articleId} }); 

  return res.status(200).json(result);
});

router.post('/edit/:edit', async (req, res, next) => {  
  const editId = req.params.edit;
  const { title, content, author, thumbnail} = req.body;


  const result = await Post.update(
    {title: title, content: content, author: author, thumbnail:thumbnail},
    { where: { id: editId}}
  )
  if (result[0] == 1) {
    return res.status(200).json({'result':'success'});
  }
  return res.status(500).json({'result':'failed'})
});

module.exports = router;