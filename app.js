// import
const express = require("express"); // dox
const app = express(); // dox
const v1 = require("./routes/app/v1");
const v2 = require("./routes/app/v2");
const { notFound, dummy } = require("./middlewares");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 3000;

// middleware
app.use(express.json()); // allow to use req.body

app.use(dummy);
app.use(fileUpload());
app.use("/v1", v1);
app.use("/v2", v2);

// by default 404
app.use(notFound);

// DOX
app.listen(port, () => {
  console.log("Running on 3000");
});
