const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  //  Creating Relation Between user and Contacts
  user: {
    type: mongoose.Schema.Types.ObjectId,
    //   Refering to Specific Collections
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "Personal"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("contact", ContactSchema);
