const { User } = require('../models');  
const jwt = require('jsonwebtoken');

exports.authMiddleware = async (req, res, next) => {

  const jwtToken = req.headers.authorization;
  const  payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

  const verifiedUser = await User.findOne({where: {id:payload.user.id, email:payload.user.email}});
  req.user = verifiedUser;
  next();
};



exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
      message: 'Signout success'
  });
};