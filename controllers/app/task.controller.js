const validate = require("validate.js");
const validateObjs = require("../../tools/validations.tools");

// FIXME: DUMMY
let todoDB = [
  { id: 1, title: "default", desc: "Create a new task", complete: false },
];

/**
 *
 */
module.exports = class TaskController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static getAll = function (req, res) {
    let data = todoDB;
    return res.json(data);
  };

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static getOne = function (req, res) {
    let id = req.params.id;
    let data = todoDB[id - 1];
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
  static create = function (req, res) {
    // validation
    let body = req.body;
    let notValid = validate(body, validateObjs.task());
    if (notValid) {
      res.statusCode = 400;
      return res.json({ err: notValid });
    }
    let complete = false;

    // create a new task
    let task = {
      id: todoDB.length + 1,
      ...body,
      complete,
    };
    // save the task in the DB
    todoDB.push(task);
    res.statusCode = 201;
    res.json({ task });
  };

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static editOne = function (req, res) {
    let id = req.params.id;
    let body = req.body;
    let notValid = validate(body, validateObjs.task(false));
    if (notValid) {
      res.statusCode = 400;
      return res.json({ err: notValid });
    }
    let task = todoDB[id - 1];
    if (!task) {
      res.statusCode = 404;
      return res.json({ err: `Task #${id} is not found` });
    }
    Object.keys(body).map((key) => (task[key] = body[key]));

    todoDB[id - 1] = task; // save
    res.statusCode = 200;
    return res.json(task);
  };

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static complete = function (req, res) {
    // get the task from the database
    let id = req.params.id;
    let task = todoDB[id - 1];
    // chekc it the task exists -->> not return err
    if (!task) {
      res.statusCode = 404;
      return res.json({ err: `Task #${id} is not found` });
    }
    // change the task complete to !complete
    task.complete = !task.complete;
    // save in the DB
    todoDB[id - 1] = task;
    // return the task (res)
    return res.json(task);
  };
};
