const mongoose = require("../db/conn");
const { Schema } = mongoose;

const FavoriteProduct = mongoose.model(
  "FavoriteProduct",
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = FavoriteProduct;
