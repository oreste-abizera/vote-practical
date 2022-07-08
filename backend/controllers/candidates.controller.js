const asyncHandler = require("../middleware/async");
const Candidate = require("../models/Candidate");
const ErrorResponse = require("../utils/errorResponse");

module.exports.registerCandidate = asyncHandler(async (req, res, next) => {
  const { names, profilePicture, missionStatement, nationalId, gender } =
    req.body;

  const candidateWithNationalId = await Candidate.findOne({ nationalId });
  if (candidateWithNationalId) {
    return next(
      new ErrorResponse("Candidate with same national id already exists", 400)
    );
  }

  let candidate = await Candidate.create({
    names,
    profilePicture,
    missionStatement,
    nationalId,
    gender,
  });

  if (candidate) {
    return res.status(201).json({
      success: true,
      data: candidate,
    });
  } else {
    return next(new ErrorResponse("Candidate not created", 500));
  }
});

module.exports.getCandidates = asyncHandler(async (req, res, next) => {
  const candidates = await Candidate.find();
  if (candidates) {
    return res.status(200).json({
      success: true,
      data: candidates,
    });
  } else {
    return next(new ErrorResponse("No candidates found", 404));
  }
});
