module.exports.dummy = (req, res, next) => {
  console.log("Dummy Middleware is Running");
  return next();
};

module.exports.notFound = (req, res, next) => {
  res.statusCode = 404;
  return res.json({ err: "Not Found" });
};
