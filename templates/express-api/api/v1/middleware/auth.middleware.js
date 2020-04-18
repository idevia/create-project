const User = require("../models/User");
const jwt = require("jsonwebtoken");
const roles = require("../enums/userRoles")

const JWT_SECRET = process.env.APP_SECRET;
const statusCodes = require("../enums/statusCodes")

const adminAuth = async (req, res, next) => {
  // return next();
  const header = await req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findOne({
        _id: decoded.id,
        role: roles.admin
      });
      if (!user) {
        throw new Error();
      }
      req.user = user;
    } catch (e) {
      return res.status(statusCodes.UNAUTHORIZED).json({ error: "please authenticate" });
    }
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.status(statusCodes.FORBIDDEN_ACCESS).json({ success: false, message: "Access Forbidden" });
  }
};

const auth = async (req, res, next) => {
  const header = await req.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findOne({
        _id: decoded.id
      });
      req.user = user;

      if (!user) {
        throw new Error();
      }
    } catch (e) {
      res.status(statusCodes.UNAUTHORIZED).json({ error: "please authenticate" });
    }
    next();
  } else {
    res.status(statusCodes.FORBIDDEN_ACCESS).json({ success: false, message: "Access Forbidden" })
  }
};

module.exports = {
  auth,
  adminAuth
};
