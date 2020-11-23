const express = require("express"); // dox
const routre = express.Router();

// FIXME: DUMMY
let todoDB = [
  {
    id: 1,
    title: "default",
    desc: "Create a new task",
    complete: false,
  },
];

routre.get("/tasks", function (req, res) {
  let tasks = todoDB;
  return res.json({ tasks });
});

module.exports = routre;
