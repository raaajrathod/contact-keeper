const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
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
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {name, email, password} = req.body;
    try {
      //  Find User Exists with that  email or Not
      let user = await User.findOne({
        email
      });

      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new User({
        name,
        email,
        password
      });
      // Generates Salt
      const salt = await bcrypt.genSalt(10);
      // Generates HASH for password
      user.password = await bcrypt.hash(password, salt);
      // Save user to database
      await user.save();

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
