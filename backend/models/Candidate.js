const mongoose = require("mongoose");
const { registerSchema } = require("swaggiffy");

const CandidateSchema = mongoose.Schema({
  names: {
    type: String,
    required: [true, "Names are required"],
    minlength: [3, "Names should be at least 3 characters"],
    maxlength: [255, "Names should not be greater than 255 characters"],
  },
  profilePicture: {
    type: String,
    required: [true, "Profile Picture is required"],
  },
  missionStatement: {
    type: String,
    required: [true, "Mission statement is required"],
    minlength: [3, "Mission statement must be at least 3 characters"],
    maxlength: [
      255,
      "Mission statement should not be greater than 255 characters",
    ],
  },
  nationalId: {
    type: String,
    required: [true, "National ID is required"],
    minlength: [16, "National ID must be 16 characters"],
    maxlength: [16, "National ID must be 16 characters"],
    unique: [true, "National ID must be unique"],
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
    enum: ["MALE", "FEMALE"],
  },
});

registerSchema("Candidate", CandidateSchema, { orm: "mongoose" });
const Candidate = mongoose.model("Candidate", CandidateSchema);
module.exports = Candidate;
