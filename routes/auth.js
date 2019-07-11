const express = require("express");
const router = express.Router();

// @route  GET api/auth
// @des    Get Loggedin User
// @access Priivate
router.get("/", (req, res, next) => {
  res.send("Get Logged in User");
});

// @route  GET api/auth
// @des    Auth User an Get Token
// @access Public
router.post("/", (req, res, next) => {
  res.send("Auth User and Get Token");
});

module.exports = router;
