exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById(authUserId).exec((err, user) => {
      if (err || !user) {
          return res.status(400).json({
              error: 'User not found'
          });
      }
      req.profile = user;
      next();
  });
};


exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET // req.user
});

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
      message: 'Signout success'
  });
};