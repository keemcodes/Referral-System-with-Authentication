const authMiddleware = (req, res, next) => {

    if (req.isAuthenticated()) {
      return next();
    }

    return res.json('not authenticated');
  };
  
  module.exports = authMiddleware;