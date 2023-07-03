// routes/userRoute.js
const router = require("express").Router();
const jwt = require('jsonwebtoken');

const User = require("../models/userModel");
const { authenticateToken, logout } = require("../middleware/auth");

// Retrieve all users
router.get('/users', async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();

    // Send the users as a response
    res.json(users);
  } catch (error) {
    // Handle error if retrieving users fails
    res.status(500).json({ error: error.message });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password, role, administrativeID } = req.body;

    // Check if the user is registering as an admin and if the administrativeID is provided
    if (role === 'admin' && !administrativeID) {
      return res.status(400).json({ error: 'AdministrativeID is required for admin registration' });
    }

    // Verify the administrativeID uniqueness if the user is registering as an admin
    if (role === 'admin') {
      const existingAdmin = await User.findOne({ administrativeID });
      if (existingAdmin) {
        return res.status(400).json({ error: 'Admin ID already exists. Please choose a different ID.' });
      }
    }

    // Create the new user based on the provided data
    const user = new User({
      username,
      password,
      role,
      administrativeID,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    // Extract login credentials from the request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username }).select('+password');;

    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if the provided password matches the user's password
    const isPasswordValid = await user.comparePassword(password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    // Set the token as a cookie or include it in the response body
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    // Send a success response
    res.json({ message: 'Logged in successfully' , user:user});
  } catch (error) {
    // Handle login error
    res.status(400).json({ error: error.message });
  }
});

// Protected route that requires authentication
router.get('/protected', authenticateToken, (req, res) => {
  // Access the authenticated user from req.user
  const userId = req.user._id;
  // Find the user by userId or perform any other necessary logic
  User.findById(userId)
    .then((user) => {
      // If the user is not found, return an error
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Send the protected resource or perform any other necessary logic
      res.json({ message: 'Protected resource' });
    })
    .catch((error) => {
      // Handle any errors that occur during the process
      res.status(500).json({ error: error.message });
    });
});
// Logout the user
router.post('/logout', authenticateToken, logout);

module.exports = router;
