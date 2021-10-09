const express = require('express');
const { Article, User } = require('../models');


const router = express.Router();


/**
 * Add InitTable information to the database
 */
router.post('/add', async (req, res, next) => {  
  try {
    const { PublicationId, UserId } = req.body;
    const user = await User.findByPk(UserId)
    if (!user) return res.status(401);

    user.addPublications(PublicationId);
    const result = await Article.create(req.body)
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/list', async (req, res, next) => {  
  try {
    const result = await Article.findAll()
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.post('/', async (req, res, next) => {  
  try {
    const articleId = req.body.blogId;
    const result = await Article.findByPk(articleId)
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/get/:articleId', async (req, res, next) => {  
  const articleId = req.params.articleId;
  // Get Article info
  const result = await Article.findByPk(articleId)

  // Database => ViewCount + 1
  await Article.update({viewCount: result.viewCount + 1}, { where: {id: articleId} }); 

  return res.status(200).json(result);
});

router.post('/edit/:editId', async (req, res, next) => {  
  const editId = req.params.editId;
  const { title, content, author, thumbnail, volume, issue} = req.body;


  const result = await Article.update(
    {
      title: title,
      content: content,
      author: author,
      thumbnail:thumbnail,
      volume: volume,
      issue: issue,
    },
    { where: { id: editId}}
  )
  if (result[0] == 1) {
    return res.status(200).json({'result':'success'});
  }
  return res.status(500).json({'result':'failed'})
});

module.exports = router;