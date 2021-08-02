const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  name: { type: String, required: false },
  address: { type: String, required: false },
  city: { type: String, required: false },
  phone: { type: String, required: false },
  postalCode: { type: String, required: false }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);