const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user.model");

// Middleware to verify JWT token
exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Add user to request object
    req.user = {
      id: user._id,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isVerified: user.isVerified,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    next(error);
  }
};

// Middleware to check if user has required role
exports.checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (roles.includes(req.user.role)) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
    }
  };
};
