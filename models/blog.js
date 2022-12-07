const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema defines structure
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// model based on schema, name should be singular of collection name (the first argument passed, "Blog")
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
