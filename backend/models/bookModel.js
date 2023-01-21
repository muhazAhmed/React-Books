const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const bookSchema = mongoose.Schema(
  {
    title: { type: String, unique: true },
    excerpt: {type: String },
    userId: { type: objectId, ref: "User" },
    ISBN: { type: String, unique: true },
    category: { type: String },
    subcategory: { type: String },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    releasedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
