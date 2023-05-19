const { Schema, model, ObjectId } = require("mongoose");

const Post = new Schema({
  id: { type: ObjectId },
  title: { type: String },
  description: { type: String },
  link: { type: String },
  image: { type: String },
  pubDate: { type: Date, default: Date.now() },
});

module.exports = model("Post", Post);
