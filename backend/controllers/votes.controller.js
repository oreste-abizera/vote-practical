const asyncHandler = require("../middleware/async");
const Candidate = require("../models/Candidate");
const User = require("../models/User");
const Vote = require("../models/Vote.model");
const ErrorResponse = require("../utils/errorResponse");

module.exports.addVote = asyncHandler(async (req, res, next) => {
  const { candidate, voter } = req.body;

  const voterFound = User.findOne({ _id: voter, isAdmin: false });
  if (!voterFound) {
    return next(new ErrorResponse("Voter Not Found", 404));
  }

  const candidateFound = Candidate.findById(candidate);
  if (!candidateFound) {
    return next(new ErrorResponse("No candidate Found", 404));
  }

  const alreadyVoted = Vote.findOne({ candidate, voter });
  if (alreadyVoted) {
    return next(new ErrorResponse("You already voted this candidate", 400));
  }

  const vote = await Vote.create({
    candidate,
    voter,
  });
  if (vote) {
    return res.status(201).json({
      success: true,
      data: vote,
    });
  } else {
    return next(new ErrorResponse("Vote not created", 500));
  }
});

module.exports.getVotes = asyncHandler(async (req, res, next) => {
  const votes = await Vote.find();
  if (votes) {
    return res.status(200).json({
      success: true,
      data: votes,
    });
  } else {
    return next(new ErrorResponse("No votes found", 404));
  }
});

module.exports.getCandidateVotes = asyncHandler(async (req, res, next) => {
  const candidate = req.params.candidate;

  const candidateFound = Candidate.findById(candidate);
  if (!candidateFound) {
    return next(new ErrorResponse("No candidate Found", 404));
  }

  const votes = Vote.find({ candidate });
  if (votes) {
    return res.status(200).json({
      success: true,
      data: votes,
    });
  } else {
    return next(new ErrorResponse("No votes found", 404));
  }
});
