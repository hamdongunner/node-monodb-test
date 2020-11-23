const { User } = require("../../models");
const validate = require("validate.js");
const validateObjs = require("../../tools/validations.tools");
var jwt = require("jsonwebtoken");

/**
 *
 */
module.exports = class UserController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static register = async function (req, res) {
    // validation
    let body = req.body;
    let notValid = validate(body, validateObjs.register());
    if (notValid) {
      res.statusCode = 400;
      return res.json({ err: notValid });
    }
    // if alresy exist
    let user = await User.findOne({ email: body.email });
    console.log({ user });
    if (user) {
      res.statusCode = 400;
      return res.json({ err: "User already exists" });
    }

    // Create
    user = new User({ ...body });

    // save
    (await user).save();

    // token
    var token = jwt.sign({ _id: user._id }, "shhhhh");

    return res.json({ token });
  };

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static login = async function (req, res) {
    // validation
    let body = req.body;
    let notValid = validate(body, validateObjs.login());
    if (notValid) {
      res.statusCode = 400;
      return res.json({ err: notValid });
    }

    // find user by email
    let user = await User.findOne({ email: body.email });
    if (!user) {
      res.statusCode = 404;
      return res.json({ err: `User for email ${body.email} not found` });
    }

    // compare the password FIXME:
    if (body.password !== user.password) {
      res.statusCode = 400;
      return res.json({ err: `Password is not correct` });
    }

    // create a token
    var token = jwt.sign({ _id: user._id }, "shhhhh");

    // return the token
    return res.json({ token });
  };
};
