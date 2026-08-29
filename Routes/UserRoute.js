const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");

// To get all users
router.get("/getusers", userController.getUsers);

// To get one user
router.get("/getuser/:id", userController.getUser);

// To create a user
router.post("/createuser", userController.createUser);

// To update a user
router.put("/updateuser/:id", userController.updateUser);

// To delete a user
router.delete("/deleteuser/:id", userController.deleteUser);

// To login a user
router.post("/loginuser", userController.loginUser);

module.exports = router; //Exporting the User Router to be used in the main app
