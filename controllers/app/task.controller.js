const validate = require("validate.js");
const validateObjs = require("../../tools/validations.tools");
const { Task } = require("../../models");

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
    let data = await Task.find();
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
      data = await Task.findById(id);
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
    });
    // save the task in the DB
    task.save();
    res.statusCode = 201;
    res.json({ task });
  };

  /**
   *
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
   *
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
};
