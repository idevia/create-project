const randomLib = require("./random-string");

let createSixDigitsCode = () => {
  return randomLib.generateToken(6).toUpperCase();
};

module.exports = {
  createSixDigitsCode
};