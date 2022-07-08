const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

module.exports.register = asyncHandler(async (req, res, next) => {
  const { names, email, phone, password, nationalId, address, isAdmin } =
    req.body;

  const userWithEmail = await User.findOne({ email });
  if (userWithEmail) {
    return next(new ErrorResponse("User with same email already exists", 400));
  }

  const userWithPhone = await User.findOne({ phone });
  if (userWithPhone) {
    return next(
      new ErrorResponse("User with same phone number already exists", 400)
    );
  }

  const userWithNationalId = await User.findOne({ nationalId });
  if (userWithNationalId) {
    return next(
      new ErrorResponse("User with same national id already exists", 400)
    );
  }

  let user = await User.create({
    names,
    email,
    phone,
    password,
    nationalId,
    address,
    isAdmin,
  });

  if (user) {
    return res.status(201).json({
      success: true,
      data: user,
    });
  } else {
    return next(new ErrorResponse("Error creating user", 500));
  }
});

module.exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new ErrorResponse(`User with email ${email} does not exist`, 400)
    );
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  const token = user.getSignedJwtToken();
  return res.status(200).json({
    success: true,
    token,
    data: user,
  });
});
