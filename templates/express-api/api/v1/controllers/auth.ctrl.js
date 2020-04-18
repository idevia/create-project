const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const statusCodes = require("../enums/statusCodes")

const User = require("../models/User");

let login = async (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (req.body.password) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
              id: user._id,
              email: user.email
            };
            payload.created_at = user.created_at;
            payload.updated_at = user.updated_at;
            payload.expiry_date = user.updated_at;
            payload.role = user.role;

            const token = jwt.sign(payload, process.env.APP_SECRET, {
              expiresIn: "30d"
            });

            res.status(statusCodes.OK).json({
              success: true,
              token: token,
              payload: payload,
              role: user.role
            });
          } else {
            res.status(statusCodes.BAD_REQUEST).json({ success: false, message: "Credentials do not match." });
          }
        } else {
          res.status(statusCodes.BAD_REQUEST).json({ success: false, message: "Please enter password" });
        }
      } else {
        res.status(statusCodes.BAD_REQUEST).json({ success: false, message: "Email is not registered." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(statusCodes.BAD_REQUEST).json({ success: false, error: err });
    });
};

module.exports = {
  login
};
