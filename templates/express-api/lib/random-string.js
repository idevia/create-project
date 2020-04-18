generateToken = length => {
  var token = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return token;
};

module.exports = {
  generateToken
};