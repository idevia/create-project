const bcrypt = require("bcrypt");
const statusCodes = require("../enums/statusCodes");
const roles = require("../enums/userRoles");

const User = require("../models/User");

let createUser = async (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.status(statusCodes.OK).json({
                success: true,
                message: "Registered successfully."
              });
            })
            .catch(err => {
              res.status(statusCodes.SERVER_ERROR).json({ success: false, ...err });
            });
        });

      } else {
        res.status(statusCodes.BAD_REQUEST).json({ success: false, message: "User already registered." });
      }
    })
    .catch(err => {
      res.status(statusCodes.BAD_REQUEST).json({ success: false, ...err });
    });
};

let users = async (req, res) => {
  let query = {}
  if (req.query.search) {
    query.name = {
      $regex: req.query.search || "",
      $options: "i"
    }
  };
  let users = await User.find(query).select("-password -__v");

  if (!users) {
    return res.status(statusCodes.NOT_FOUND).json({ success: false, message: "User not found" });
  }

  try {
    await res.status(statusCodes.OK).json({
      success: true,
      users
    });
  } catch (err) {
    res.status(statusCodes.SERVER_ERROR).json({ success: false, ...err });
  }
};

let getSingleUser = async (req, res) => {
  let user = await User.findById(req.user._id)
    .select("-password -created_at -updated_at");

  if (!user) {
    return res.status(statusCodes.UNAUTHORIZED).json({ success: false, message: "Please log in" });
  }

  res.status(statusCodes.OK).json({ success: true, data: user });
};

// Edit user for admin
let updateUser = async (req, res) => {
  let updates = Object.keys(req.body);

  let allowedUpdates = [
    "name",
    "email",
    "password",
    "role",
  ];

  // check
  const isValidateOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidateOperation) {
    return res.status(statusCodes.BAD_REQUEST).json({ success: false, error: "Invalid updates" });
  }

  let userId = req.user._id;
  if (req.user.role === role.admin && req.body.user) {
    userId = req.body.user
  }

  const user = await User.findOne({
    _id: userId
  });

  let ignoreParams = [];
  if (req.user.role === roles.user) {
    ignoreParams.push('role');
  }
  updates = updates.filter(item => !ignoreParams.includes(item))

  try {
    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({ error: "User not found" });
    }

    if (req.body.password) {
      var hash = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hash;
    }

    updates.forEach(update => (user[update] = req.body[update]));
    await user.save()
    let data = user.getPublicFields();

    res.status(statusCodes.OK).json({ success: true, message: "User is updated", user: data });

  } catch (e) {
    res.status(statusCodes.BAD_REQUEST).json({ success: false, ...e });
  }
};


let deleteUser = async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id
  });
  try {
    await user.remove();
    res.status(statusCodes.OK).json({ success: true, message: "User successfully deleted." });
  } catch (e) {
    res.status(statusCodes.SERVER_ERROR).json({ success: false, ...e });
  }
};

module.exports = {
  users,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser
};
