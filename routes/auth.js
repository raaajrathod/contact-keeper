const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");
// @route  GET api/auth
// @des    Get Loggedin User
// @access Priivate
router.get("/", auth, async (req, res, next) => {
  try {
    // Send the Users Details except the Password
    // select("-password") removes paswword
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/auth
// @des    Auth User an Get Token
// @access Public
// Second Parameter is use for validation (optional)
router.post(
  "/",
  [
    check("email", "Please Include a Valid Email").isEmail(),
    check(
      "password",
      "Please Enter a Password with 6 or More Characters"
    ).exists()
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {email, password} = req.body;

    try {
      let user = await User.findOne({email});
      if (!user) {
        return res.status(400).send({
          msg: "Invalid Credentails"
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send({
          msg: "Invalid Credentails"
        });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      // creating JWT Token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600000
        },
        // Call back
        (error, token) => {
          if (error) {
            throw error;
          } else {
            res.json({
              token
            });
          }
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
