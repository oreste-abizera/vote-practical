const express = require("express");
const { registerDefinition } = require("swaggiffy");
const {
  addVote,
  getVotes,
  getCandidateVotes,
} = require("../controllers/votes.controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/candidate/:candidate", protect, addVote);
router.get("/", getVotes);
router.get("/:candidate", getCandidateVotes);

registerDefinition(router, {
  tags: "Vote",
  mappedSchema: "vote",
  basePath: "/api/v1/votes",
});

module.exports = router;
