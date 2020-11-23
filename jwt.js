var jwt = require("jsonwebtoken");
var token = jwt.sign({ foo: "bar" }, "shhhhh");

let decoded;
try {
  decoded = jwt.verify(token, "shhhhh");
} catch (error) {
  console.log("invalid signature");
}

console.log({ token });
console.log({ decoded });
