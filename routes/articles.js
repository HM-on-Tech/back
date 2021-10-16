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
    const { howMany } = req.body;
    const result = await Article.findAll({
      limit: howMany,
    })
    console.log(result)
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post('/scroll', async (req, res, next) => { 
  try {
    const { howMany, length } = req.body;
    const result = await Article.findAll({
      limit: howMany,
      offset: length,
    })
    console.log(result)
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
    const { pubName, howMany, issue, volume } = req.body;
    let articleFilter = {}
    if (issue != null && volume != null ) {
      articleFilter = {
        ...articleFilter,
        issue: issue,
        volume: volume,
      }
    }

    const result = await Publication.findOne({
      where: {
        name: pubName
      },
      include: {
        model: Article,
        where: articleFilter,
        offset: 0,
        limit: howMany,
      },
    })
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/publication/scroll', async (req, res, next) => {  
  try {
    const { howMany, length, pubName } = req.body;
    console.log({howMany, length})
    const result = await Publication.findOne({
      where: {
        name: pubName,
      },
      include: {
        model: Article,
        offset: length,
        limit: howMany,
      },
      
    })
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;