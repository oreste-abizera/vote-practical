const express = require("express");
const { registerDefinition } = require("swaggiffy");
const {
  registerCandidate,
  getCandidates,
} = require("../controllers/candidates.controller");

const router = express.Router();

router.get("/", getCandidates);
router.post("/register", registerCandidate);

registerDefinition(router, {
  tags: "Candidate",
  mappedSchema: "Candidate",
  basePath: "/api/v1/candidates",
});

module.exports = router;
