const express = require("express");
const router = express.Router();

// @route  GET api/contacts
// @des    Get All Users Coontacts
// @access Public
router.get("/", (req, res, next) => {
  res.send("Get All Users Contacts");
});

// @route  GET api/contacts
// @des    Add New Contacts
// @access Public
router.post("/", (req, res, next) => {
  res.send("Add New Conntacts");
});

// @route  GET api/contacts/:id
// @des    Update Contacts
// @access Public
router.put("/:id", (req, res, next) => {
  res.send("Update Conntacts");
});

// @route  GET api/contacts/:id
// @des    Delete Contacts
// @access Public
router.delete("/:id", (req, res, next) => {
  res.send("Delete Conntacts");
}); 

module.exports = router;
