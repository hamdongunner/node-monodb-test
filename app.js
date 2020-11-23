// import
const express = require("express"); // dox
const app = express(); // dox
const v1 = require("./routes/app/v1");
const v2 = require("./routes/app/v2");
const { notFound, dummy } = require("./middlewares/all");

// middleware
app.use(express.json()); // allow to use req.body

app.use(dummy);

app.use("/v1", v1);
app.use("/v2", v2);

// by default 404
app.use(notFound);

// DOX
app.listen(3000, () => {
  console.log("Running on 3000");
});
