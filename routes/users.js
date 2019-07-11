const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");

const User = require("../models/User");
// @route  POST apii/users
// @des    Register a User
// @access Public
router.post(
  "/",
  [
    check("name", "Please Add Name")
      .not()
      .isEmpty(),
    check("email", "Please Include a Valid Email").isEmail(),
    check(
      "password",
      "Please Enter a Password with 6 or More Characters"
    ).isLength({
      min: 6
    })
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    res.send("Passed");
  }
);

module.exports = router;
