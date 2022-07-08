const express = require("express");
const { registerDefinition } = require("swaggiffy");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

registerDefinition(router, {
  tags: "Auth",
  mappedSchema: "User",
  basePath: "/api/v1/auth",
});

module.exports = router;
