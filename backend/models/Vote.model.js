const mongoose = require("mongoose");
const { registerSchema } = require("swaggiffy");

const VoteSchema = mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: [true, "Candidate is required"],
    },
    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Voter is required"],
    },
  },
  { timestamps: true }
);

registerSchema("Vote", VoteSchema, { orm: "mongoose" });
const Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;
