const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {check, validationResult} = require("express-validator");
const User = require("../models/User");
const Contact = require("../models/Contact");

// @route  GET api/contacts
// @des    Get All Users Coontacts
// @access Private
router.get("/", auth, async (req, res, next) => {
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({data: -1});
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/contacts
// @des    Add New Contacts
// @access Public
router.post(
  "/",
  [
    auth,
    [
      check("name", "Please Add Name")
        .not()
        .isEmpty(),
      check("phone", "Please Enter a Valid Phone Number").isLength({
        min: 10,
        max: 10
      })
    ]
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {name, email, phone, type} = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  GET api/contacts/:id
// @des    Update Contacts
// @access Public
router.put("/:id", auth, async (req, res, next) => {
  const {name, email, phone, type} = req.body;

  const id = req.params.id;
  // Build A Contact Object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        msg: "Contact Not Found"
      });
    }

    // Make Sure User Owns the Contact

    if (contact.user.toString() != req.user.id) {
      return res.status(401).json({
        msg: "Not Authorized"
      });
    }

    contact = await Contact.findByIdAndUpdate(
      id,
      {
        $set: contactFields
      },
      {
        new: true // If Contact Does not exisit then create it
      }
    );

    res.json(contact);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/contacts/:id
// @des    Delete Contacts
// @access Public
router.delete("/:id", auth, async (req, res, next) => {
  const id = req.params.id;

  try {
    let contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        msg: "Contact Not Found"
      });
    }

    // Make Sure User Owns the Contact
    if (contact.user.toString() != req.user.id) {
      return res.status(401).json({
        msg: "Not Authorized"
      });
    }

    await Contact.findByIdAndRemove(id);

    res.json({
      msg: "Contact Delete"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
