const { User } = require('../models');  
const jwt = require('jsonwebtoken');

exports.authMiddleware = async (req, res, next) => {

  try{
    const jwtToken = req.headers.authorization;
  
    if (jwtToken == null || jwtToken == 'null')  return res.json(null);
    const  payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const verifiedUser = await User.findOne({where: {id:payload.user.id, email:payload.user.email}});
    req.user = verifiedUser;
    next();
  }catch(e) {
    console.error(e);
    next(e);
  }
};



exports.signout = (req, res) => {
  // res.clearCookie('token');
  try{
    return res.json({
        message: 'Signout success'
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};