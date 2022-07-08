const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("./async");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Make sure token exists
    if (!token) {
      return next(new ErrorResponse("No Token Provided", 400));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id);

      next();
    } catch (err) {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }
  } else {
    return next(new ErrorResponse("No Token Provided", 400));
  }
});
