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

module.exports = validationObjs;