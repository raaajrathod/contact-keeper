const express = require("express");
const router = express.Router();

// @route  POST apii/users
// @des    Register a User
// @access Public
router.post("/", (req, res, next) => {
  res.send("Registers a Users");
});

module.exports = router;
