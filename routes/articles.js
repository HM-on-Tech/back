const express = require('express');
const { authMiddleware } = require('../helper/auth');
const { Article, Publication } = require('../models');


const router = express.Router();


/**
 * Add InitTable information to the database
 */
router.post('/add', async (req, res, next) => {  
  try {
    const result = await Article.create({
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
    const result = await Article.findAll()
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post('/list/:userId', async (req, res, next) => {  
  try {
    const userId = req.params.userId;
    console.log('userId', userId, userId)
    const result = await Article.findAll({where:{ userId: userId}});
    console.log('userId', result.length)
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post('/remove', async (req, res, next) => {  
  try {

    const ids = req.body;
    await Article.destroy({ where: { id: ids }})
    
    return res.status(200).json({data:'successfully deleted', id: ids});
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

router.post('/publication', async (req, res, next) => {  
  try {
    const name = req.body.name;
    const result = await Publication.findOne({
      where: {name:name},
      include: {
        model: Article,
      }
    })
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;