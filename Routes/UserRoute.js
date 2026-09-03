const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");

// Import middleware to authenticate user
const { authenticate } = require("../Middleware/auth");

// Import middleware to authorize user
const { authorize } = require("../Middleware/role");

// To get all users
router.get("/getusers", userController.getUsers);

// To get one user
router.get(
  "/getuser/:id",
  authenticate,
  authorize("superadmin", "admin"),
  userController.getUser,
);

// To create a user
router.post("/createuser", userController.createUser);

// To update a user
router.put(
  "/updateuser/:id",
  authenticate,
  authorize("superadmin", "admin"),
  userController.updateUser,
);

// To delete a user
router.delete(
  "/deleteuser/:id",
  authenticate,
  authorize("superadmin"),
  userController.deleteUser,
);

// To login a user
router.post("/loginuser", userController.loginUser);

module.exports = router; //Exporting the User Router to be used in the main app
