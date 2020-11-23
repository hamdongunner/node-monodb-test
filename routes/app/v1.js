const express = require("express"); // dox
const routre = express.Router();
const TaskController = require("../../controllers/app/task.controller");
const UserController = require("../../controllers/app/user.controller");
const { userAuth } = require("../../middlewares");

// The route handelres
routre.get("/tasks", userAuth, TaskController.getAll); // auth
routre.get("/task/:id", TaskController.getOne); // auth
routre.post("/task", TaskController.create); // auth
routre.put("/task/:id", TaskController.editOne); // auth
routre.put("/complete/:id", TaskController.complete); // auth

// User
routre.post("/register", UserController.register);
routre.post("/login", UserController.login);

module.exports = routre;
