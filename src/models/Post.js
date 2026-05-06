// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true, // creates createdAt & updatedAt
//   },
// );

// module.exports = mongoose.model("Post", postSchema);

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "defaultimage.jpg",
    },

    //USER REFERENCE
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Post", postSchema);
