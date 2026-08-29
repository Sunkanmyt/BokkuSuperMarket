const { exists } = require("../Models/Products");
const User = require("../Models/Users");
const bcrypt = require("bcryptjs");

// To get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "No user available" });
    }

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to retrieve users", error: error.message });
  }
};

// To get one user
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "No user available" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to retrieve user", error: error.message });
  }
};

// To create a new User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, gender, hasAdminAccess, phone, role } =
      req.body;

    //   check if all required fields are provided
    if (!name || !email || !password || !gender || !phone) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Email validation
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email alredy exists" });
    }

    // Phone validation
    const existingPhone = await User.findOne({ phone: phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "Phone number is registered to another user " });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      hasAdminAccess,
      phone,
      role,
    });

    const savedUser = await user.save();

    res.status(201).json({ message: "User successfully created", savedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to add user", error: error.message });
  }
};

// To handle User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking if all fields are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Checking if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a token for the user
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Unable to Login", error: error.message });
  }
};

// Update a User
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, gender, hasAdminAccess, phone, role } =
      req.body;

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
      gender,
      hasAdminAccess,
      phone,
      role,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: "User successfully updated", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to update user", error: error.message });
  }
};

// To delete a User
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    res.status(200).json({ message: "User successfully deleted", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to delete user", error: error.message });
  }
};
