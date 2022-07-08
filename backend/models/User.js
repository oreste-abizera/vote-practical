const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema } = require("swaggiffy");

const UserSchema = new mongoose.Schema({
  names: {
    type: String,
    required: [true, "Names are required"],
    minlength: [3, "Names should be at least 3 characters"],
    maxlength: [255, "Names should not be greater than 255 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: [3, "Email must be at least 3 characters"],
    maxlength: [255, "Email must be less than 255 characters"],
    unique: [true, "Email already exists"],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address",
    ],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    minlength: [10, "Phone must be 10 characters"],
    maxlength: [10, "Phone must be 10 characters"],
    unique: [true, "Phone must be unique"],
  },
  nationalId: {
    type: String,
    required: [true, "National ID is required"],
    minlength: [16, "National ID must be 16 characters"],
    maxlength: [16, "National ID must be 16 characters"],
    unique: [true, "National ID must be unique"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [3, "Address must be at least 3 characters"],
    maxlength: [255, "Address must be less than 255 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: [255, "Password must be less than 255 characters"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id, names: this.names }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

registerSchema("User", UserSchema, { orm: "mongoose" });

const User = mongoose.model("User", UserSchema);
module.exports = User;
