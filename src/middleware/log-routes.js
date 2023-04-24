const logRoutes = (req, res, next) => {
  const timestamp = (new Date()).toLocaleString();
  console.log(`${req.method} ${req.path} - ${timestamp}`);  
  next();
}

module.exports = logRoutes;