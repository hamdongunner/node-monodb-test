const bcrypt = require("bcrypt");
const saltRounds = 10;

const myPlaintextPassword = "admin";

console.log({ myPlaintextPassword });
bcrypt.genSalt(saltRounds, function (err, salt) {
  console.log({ salt });
  bcrypt.hash(myPlaintextPassword, salt, function (err, hash) { // generate hash
    console.log({ hash });

    bcrypt.compare(myPlaintextPassword, "$2b$10$vMiJccozOcw3QeKcO7OUouwlLasmwH/SqUkjgS2.hrk0AsTV19/ma", function (err, result) {
      // result == true
      console.log({ result });
    });
  });
});
