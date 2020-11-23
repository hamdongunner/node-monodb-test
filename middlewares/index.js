const { User } = require("../models");
var jwt = require("jsonwebtoken");

module.exports.dummy = (req, res, next) => {
  console.log("Dummy Middleware is Running");
  return next();
};

module.exports.notFound = (req, res, next) => {
  res.statusCode = 404;
  return res.json({ err: "Not Found" });
};

module.exports.userAuth = async (req, res, next) => {
  // get token from the headers ->> not err
  const token = req.headers.token;
  if (!token) {
    res.statusCode = 403;
    return res.json({ err: `Token is required for this route` });
  }
  // get the id from the token -->> not err
  let decoded;
  try {
    decoded = jwt.verify(token, "shhhhh");
  } catch (error) {
    res.statusCode = 403;
    return res.json({ err: `Token is invalid` });
  }

  // search user in the DB by ID -->> not err
  let user = await User.findById(decoded._id);
  if (!user) {
    res.statusCode = 404;
    return res.json({ err: "User not found" });
  }

  req.user = user;

  return next();
};
