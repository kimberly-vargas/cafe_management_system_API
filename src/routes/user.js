const express = require("express");
const auth = require("../services/authentication")
const checkrole = require("../services/checkRole")
const {
  createUser,
  loginUser,
  forgotPassword,
  getAllUsers,
  updateStatus,
  checkToken,
  changePassword
} = require("../controllers/user");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/forgotPassword", forgotPassword);
router.post("/changePassword", auth.authenticateToken, changePassword);
router.get("/allUsers", auth.authenticateToken, checkrole.checkrole,getAllUsers);
router.get("/checkToken", auth.authenticateToken, checkToken);
router.patch("/updateStatus", auth.authenticateToken, checkrole.checkrole, updateStatus);

module.exports = router;
