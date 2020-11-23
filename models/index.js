const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.connect("mongodb://hamdon:hamdon1@ds139251.mlab.com:39251/tododb", {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log(" we're connected!");
});

// Schema
const taskSchema = new mongoose.Schema({
  title: String,
  desc: String,
  complete: Boolean,
  author: ObjectId,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Create tht Mode (create, find, findone, update, delete)
const Task = mongoose.model("Task", taskSchema);

const User = mongoose.model("User", userSchema);

// exporting
module.exports.User = User;
module.exports.Task = Task;
