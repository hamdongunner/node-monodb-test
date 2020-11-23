const express = require("express"); // dox
const routre = express.Router();
const TaskController = require("../../controllers/app/task.controller");
const UserController = require("../../controllers/app/user.controller");
const { userAuth } = require("../../middlewares");

// The route handelres
routre.get("/tasks", userAuth, TaskController.getAll); // auth
routre.get("/task/:id",userAuth, TaskController.getOne); // auth
routre.post("/task", userAuth, TaskController.create); // auth
routre.put("/task/:id", TaskController.editOne); // auth
routre.put("/complete/:id", TaskController.complete); // auth
routre.post("/upload", TaskController.upload);

// User
routre.post("/register", UserController.register);
routre.post("/login", UserController.login);

module.exports = routre;
