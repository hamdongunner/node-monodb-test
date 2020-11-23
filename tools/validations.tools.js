let validationObjs = {};

validationObjs.task = (must = true) => ({
  title: {
    presence: must,
    type: "string",
  },
  desc: {
    presence: must,
    type: "string",
  },
});

validationObjs.register = (must = true) => ({
  name: {
    presence: must,
    type: "string",
  },
  email: {
    presence: must,
    type: "string",
    email: true,
  },
  password: {
    presence: must,
    type: "string",
  },
});

validationObjs.login = (must = true) => ({
  email: {
    presence: must,
    type: "string",
    email: true,
  },
  password: {
    presence: must,
    type: "string",
  },
});
module.exports = validationObjs;
