const mongoose = require("../db/conn");
const { Schema } = mongoose;
const User = require("./User");

const FavoriteList = mongoose.model(
  "FavoriteList",
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      products: [
        {
          id: {
            type: Number,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          category: {
            type: String,
            required: true,
          },
          image: {
            type: String
          }
        },
      ],
      user: Object,
      adopter: Object,
    },
    { timestamps: true }
  )
);

module.exports = FavoriteList;
