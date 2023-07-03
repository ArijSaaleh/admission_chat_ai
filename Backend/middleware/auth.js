const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel');

const authenticateToken = (req, res, next) => {
  // Retrieve the JWT token from the request headers or cookies
  const token = req.headers.authorization || req.cookies.jwt;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Retrieve the user from the database
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: 'Invalid token. User not found.' });
        }
        
        // Attach the user object to the request
        req.user = user;
        next();
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

function checkTokenExpiration(req, res, next) {
  try {
    const token = req.headers.authorization || req.query.token || req.cookies.token;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });

    const isExpired = decodedToken.exp * 1000 < Date.now();

    if (isExpired) {
      // Perform necessary actions for session expiration or logout
      req.session.destroy(); // Clear the session
      res.clearCookie('jwt'); // Clear the token from the cookie
      return res.status(401).json({ error: 'Session expired' });

    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token', details: error.message });
  }
}

function logout(req, res, next) {
  // Perform necessary actions for logout
  res.clearCookie('jwt');
  res.json({ message: 'Logged out successfully' });
}

const authenticateAdmin = (req, res, next) => {
  // Check if the user is an admin
  if (req.user && req.user.role === 'admin') {
    // User is an admin, allow access to the route
    next();
  } else {
    // User is not an admin, deny access to the route
    res.status(403).json({ error: 'Unauthorized access Only for admins' });
  }
};

module.exports = authenticateAdmin;

module.exports = { authenticateToken, checkTokenExpiration, logout, authenticateAdmin };
