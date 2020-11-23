const validate = require("validate.js");
const validateObjs = require("../../tools/validations.tools");
const { Task } = require("../../models");
const imgbbUploader = require("imgbb-uploader");
const fs = require("fs");

/**
 *
 */
module.exports = class TaskController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static getAll = async function (req, res) {
    let data = await Task.find({ author: req.user._id });
    return res.json(data);
  };

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static getOne = async function (req, res) {
    let id = req.params.id;
    let data;
    try {
      data = await Task.findOne({ _id: id, author: req.user._id });
    } catch (error) {
      res.statusCode = 400;
      return res.json({ err: `Task #${id} not correct` });
    }

    if (!data) {
      res.statusCode = 404;
      return res.json({ err: `Task #${id} not found` });
    }
    return res.json(data);
  };

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static create = async function (req, res) {
    // validation
    let body = req.body;
    let notValid = validate(body, validateObjs.task());
    if (notValid) {
      res.statusCode = 400;
      return res.json({ err: notValid });
    }
    let complete = false;

    // create a new task
    let task = new Task({
      ...body,
      complete,
      author: req.user._id,
    });
    // save the task in the DB
    task.save();
    res.statusCode = 201;
    res.json({ task });
  };

  /**
   * TODO:
   * @param {*} req
   * @param {*} res
   */
  static editOne = async function (req, res) {
    let id = req.params.id;
    let body = req.body;
    let notValid = validate(body, validateObjs.task(false));
    if (notValid) {
      res.statusCode = 400;
      return res.json({ err: notValid });
    }

    let task;
    try {
      task = await Task.findById(id);
    } catch (error) {
      res.statusCode = 400;
      return res.json({ err: `Task #${id} not correct` });
    }
    if (!task) {
      res.statusCode = 404;
      return res.json({ err: `Task #${id} is not found` });
    }

    Object.keys(body).map((key) => (task[key] = body[key]));

    task.save(); // save
    res.statusCode = 200;
    return res.json(task);
  };

  /**
   *  TODO:
   * @param {*} req
   * @param {*} res
   */
  static complete = async function (req, res) {
    // get the task from the database
    let id = req.params.id;

    let task;
    try {
      task = await Task.findById(id);
    } catch (error) {
      res.statusCode = 400;
      return res.json({ err: `Task #${id} not correct` });
    }

    // chekc it the task exists -->> not return err
    if (!task) {
      res.statusCode = 404;
      return res.json({ err: `Task #${id} is not found` });
    }
    // change the task complete to !complete
    task.complete = !task.complete;
    // save in the DB

    task.save();
    // return the task (res)
    return res.json(task);
  };

  /**
   *
   * @param req
   * @param res
   */
  static async upload(req, res) {
    if (!req.files) return res.json(`Image is missing`);
    let key = ""; // FIXME: uer you APIN key
    let image = req.files.image;
    let fileName = "image";
    let path = `./public/${fileName}.png`;
    let result;
    try {
      await image.mv(path); // saving the image inside the public folder inside my project
      result = await imgbbUploader(key, path); // upload the image to imgbb server and get the link 
      fs.unlink(path, (error) => console.log(error)); // Delete the image from the my project
    } catch (error) {
      return res.json({ err: "error" });
    }
    return res.json({ result });
  }
};
