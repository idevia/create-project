const express = require("express");
const router = express.Router();

/* IMPORT CONTROLLERS */
const authCtrl = require("../controllers/auth.ctrl");
const userCtrl = require("../controllers/users.ctrl");

/* IMPORT MIDDLEWARE */
const authMid = require("../middleware/auth.middleware");

// AUTH CONTROLLER
router.route("/auth/login").post(authCtrl.login);

//USERS REQUEST
router.route("/users").get(authMid.adminAuth, userCtrl.users);
router.route("/user").get(authMid.auth, userCtrl.getSingleUser);
router.route("/users/create").post(authMid.adminAuth, userCtrl.createUser);
router.route("/users/update").put(authMid.adminAuth, userCtrl.updateUser);
router.route("/users/delete/:id").delete(authMid.adminAuth, userCtrl.deleteUser);

module.exports = router;
