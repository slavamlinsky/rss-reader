const { Schema, model, ObjectId } = require("mongoose");

const User = new Schema({
  id: { type: ObjectId },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = model("User", User);
