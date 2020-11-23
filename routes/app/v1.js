const express = require("express"); // dox
const routre = express.Router();
const TaskController = require("../../controllers/app/task.controller");

// The route handelres
routre.get("/tasks", TaskController.getAll);
routre.get("/task/:id", TaskController.getOne);
routre.post("/task", TaskController.create);
routre.put("/task/:id", TaskController.editOne);
routre.put("/complete/:id", TaskController.complete);

module.exports = routre;
